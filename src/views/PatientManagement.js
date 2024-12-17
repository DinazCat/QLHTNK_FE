import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import moment from "moment";
import { BsFillTrashFill, BsFillPencilFill, BsEye } from "react-icons/bs";
import { FormPatient } from "../components/FormPatient";
import { FormRecordMedicine } from "../components/FormRecordMedicine";
import { FormRecordService } from "../components/FormRecordService";
import api from "../api/Api";
// import upload from '../api/upload';
import axios from "axios";
import Select from "react-select";
import { AuthContext } from "../hook/AuthProvider";
import CustomModal from "../components/MessageBox.js";

const PatientManagement = (props) => {
  const [customers, setCustomers] = useState([]);
  const [imageFile1, setImageFile1] = useState(null);
  const { user } = useContext(AuthContext);
  const [errors, setErrors] = useState("");
  const [medicines, setMedicines] = useState(null);

  const [services, setServices] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [ndshow, setNdshow] = useState("");
  const handleShowDialog = (body) => {
    setNdshow(body);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const [searchCriteria, setSearchCriteria] = useState({
    maBn: "",
    tenBn: "",
    cccd: "",
    soDienThoai: "",
  });
  const [searchCriteria1, setSearchCriteria1] = useState({
    MaNhaSi: "",
    TenNhaSi: "",
    NgayDieuTri: "",
  });

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };
  const handleChange1 = (e) => {
    setSearchCriteria1({ ...searchCriteria1, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    // setImageFile1(e.target.files[0]);
    // var file = e.target.files[0]
    // if (file) {
    //     var reader = new FileReader();
    //     // Đọc file như là một URL Data (base64) và hiển thị ảnh
    //     reader.readAsDataURL(file);
    //     reader.onload = function (e) {
    //         var preview = document.getElementById('imagePreview');
    //         preview.src = e.target.result; // Hiển thị ảnh trong thẻ img
    //     };
    // }
  };
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [page, setPage] = useState(1);
  const [state, setState] = useState("");
  const [patientModalOpen, setPatientModalOpen] = useState(false);
  const [patientRowToEdit, setPatientRowToEdit] = useState(null);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [serviceRowToEdit, setServiceRowToEdit] = useState(null);
  const [medicineModalOpen, setMedicineModalOpen] = useState(false);
  const [medicineRowToEdit, setMedicineRowToEdit] = useState(null);
  const [recordRowToEdit, setRecordRowToEdit] = useState(null);
  const [khoiphucSL, setKhoiPhucSL] = useState(null);
  const [nhasi, setNhaSi] = useState(
    user?.loaiNguoiDung === "Phụ tá" ? [] : user?.ten
  );
  const [hsdt, setHSDT] = useState(null);
  const [cthsdt, setCTHSDT] = useState({
    MaNhaSi: user?.loaiNguoiDung === "Phụ tá" ? "" : user?.maNV,
    MaBn: selectedPatient?.maBn || 0,
    MaChiNhanh: user?.maCN,
    ChanDoan: "",
    NgayDieuTri: "",
    LyDoKham: "",
    GhiChu: "",
    DichVu: [],
    Thuoc: [],
  });
  const [listcthsdt, setListCTHSDT] = useState(null);
  useEffect(() => {
    console.log(user);
    getNhaSi();
    getPatients();
    getService();
    getMedicine();
  }, [user]);
  const getNhaSi = async () => {
    if (user?.loaiNguoiDung === "Phụ tá") {
      const response = await api.getAllStaff();
      console.log("hhhhh");
      console.log(response);
      var nhasi1 = response?.filter((ns) => {
        return ns.chucVu === "Nha sĩ";
      });
      const fil = nhasi1.filter((item, idx) => item.maChiNhanh === user.maCN);
      console.log(fil);
      setNhaSi(fil);
    }
  };
  const getService = async () => {
    const services = await api.getAllServices();
    console.log(services);
    setServices(services);
  };
  const getMedicine = async () => {
    const medicine = await api.getAllDrugs();
    const fil = medicine.filter((item, idx) => item.maChiNhanh === user?.maCN);
    console.log(fil);
    setMedicines(fil);
  };
  const getPatients = async () => {
    const patients = await api.getAllPatient();
    // const fil = patients.filter((item, idx)=>item.chiNhanh===user?.chinhanh)
    setCustomers(patients);
  };
  //------------------------------------------------------------------------
  // controller patient
  const setSelectedPatientRow = async (item) => {
    setSelectedPatient(item);
    setHSDT(item);
    getlistCTHSDT(item?.maBn);
    setPage(2);
  };
  const handleEditPatientRow = (index) => {
    setPatientRowToEdit(index);
    setPatientModalOpen(true);
  };
  const handleDeletePatientRow = async (targetIndex) => {
    const shouldDelete = window.confirm(
      "Bạn có chắc muốn xóa bệnh nhân này không?"
    );
    if (shouldDelete) {
      const res = await api.deletePatient(customers[targetIndex].maBn);
      if (res?.success) {
        setCustomers(customers.filter((_, idx) => idx !== targetIndex));
        setListCTHSDT(null);
      }
      handleShowDialog(res?.message);
    }
  };
  const handleSubmit = async (newRow) => {
    console.log(newRow);
    if (patientRowToEdit == null) {
      const res = await api.createPatient(newRow);
      if (res?.message == undefined) {
        console.log(customers);
        console.log(res);
        setCustomers([...customers, res]);
      } else {
        handleShowDialog(`Error adding patient! ${res ? res?.message : ""}`);
      }
    } else {
      const id = customers[patientRowToEdit]?.maBn;
      const res = await api.updatePatient(id, { ...newRow, MaBn: id });
      if (res?.message == undefined) {
        let updated = customers?.map((currRow, idx) => {
          if (idx !== patientRowToEdit) return currRow;
          return res;
        });
        setCustomers(updated);
      } else {
        handleShowDialog(`Error edit patient! ${res ? res?.message : ""}`);
      }
    }
  };
  const onSearch = async () => {
    const res = await api.searchPatient(searchCriteria);
    if (res?.message == undefined) {
      setCustomers(res);
    } else {
      handleShowDialog(`Error search patient! ${res ? res?.message : ""}`);
    }
  };
  //------------------------------------------------------------------------

  //CHI TIẾT HSDT

  const getlistCTHSDT = async (patientId) => {
    const res = await api.getAllCTHSDT(patientId);
    if (res?.message == undefined) {
      setListCTHSDT(res);
    } else {
      setListCTHSDT([]);
    }
  };
  const createNewRecord = () => {
    setPage(3);
    setCTHSDT({
      MaNhaSi: user?.loaiNguoiDung === "Phụ tá" ? "" : user?.maNV,
      MaBn: selectedPatient?.maBn,
      MaChiNhanh: user?.maCN,
      ChanDoan: "",
      NgayDieuTri: "",
      LyDoKham: "",
      GhiChu: "",
      DichVu: [],
      Thuoc: [],
    });
    setState("create");
    setSelectedRecord(null);
  };

  //--------------------------------------------------------------------------
  const nextPage = () => {
    setPage(page + 1);
    window.scrollTo(0, 0);
  };
  const prevPage = () => {
    setPage(page - 1);
    window.scrollTo(0, 0);
  };
  const handleEditRecordRow = async (item, index) => {
    //check xem ca này đã xong chưa mới cho xóa sửa, đã thanh toán 1 phần thì không cho xóa
    setSelectedRecord({ ...item });
    setRecordRowToEdit(index);
    const obj = {
      MaNhaSi: item.maNhaSi,
      MaBn: selectedPatient?.maBn,
      MaChiNhanh: item.maChiNhanh,
      ChanDoan: item.chanDoan,
      NgayDieuTri: item.ngayDieuTri,
      LyDoKham: item.lyDoKham,
      GhiChu: item.ghiChu,
      DichVu: item.dichVuDaSuDungs.map((dv) => {
        const dv1 = services?.find((med) => med.maDv === dv.maDv);
        return {
          tenDichVu: dv1?.tenDv,
          maDichVu: dv.maDv,
          SL: dv.soLuong,
          DonGia: dv.donGia / dv.soLuong,
          ChietKhau: dv.chietKhau,
          GhiChu: dv.ghiChu,
          taiKham: dv.taiKham || null,
          Gia: dv.giaDichVu,
          GiaMin: dv1?.giaThapNhat,
          GiaMax: dv1?.giaCaoNhat,
        };
      }),
      Thuoc: item.thuocDaKes?.map((thuoc) => {
        const med = medicines?.find((med) => med.maThuoc === thuoc.maThuoc);
        return {
          tenThuoc: med?.tenThuoc,
          maThuoc: med?.maThuoc,
          DonGia: thuoc.donGia, //là đã nhân sl
          SL: thuoc.soLuong,
          Gia: thuoc.gia, //là giá bán/viên
          GhiChu: thuoc.ghiChu,
          donGiaBan: thuoc.gia,
        };
      }),
    };
    setCTHSDT({ ...item, ...obj });
    setPage(3);
    setState("edit");
  };

  const onSearch1 = async () => {
    const res = await api.searchCTHSDT(searchCriteria1);
    if (res?.message == undefined) {
      setListCTHSDT(res);
    } else {
      handleShowDialog(`Error search treatment! ${res ? res?.message : ""}`);
    }
  };
  const handleDeleteRecordRow = async (targetIndex) => {
    const shouldDelete = window.confirm(
      "Bạn có chắc muốn xóa hồ sơ điều trị này không?"
    );
    if (shouldDelete) {
      const res = await api.deleteCTHSDT(listcthsdt[targetIndex].maCthsdt);
      if (res?.success) {
        setListCTHSDT(listcthsdt.filter((_, idx) => idx !== targetIndex));
        setCTHSDT({
          MaNhaSi: user?.loaiNguoiDung === "Phụ tá" ? "" : user?.maNV,
          MaBn: selectedPatient?.maBn,
          MaChiNhanh: user?.maCN,
          ChanDoan: "",
          NgayDieuTri: "",
          LyDoKham: "",
          GhiChu: "",
          DichVu: [],
          Thuoc: [],
        });
      }
      handleShowDialog(res?.message);
    }
  };

  const handleEditMedicineRow = (index) => {
    setMedicineRowToEdit(index);
    setMedicineModalOpen(true);
  };
  const handleDeleteMedicineRow = (index) => {
    const fil = cthsdt.Thuoc.filter((_, idx) => idx !== index);
    setCTHSDT({ ...cthsdt, Thuoc: fil });
    // api.updateCTHSDT({ Thuoc: fil }, cthsdt.Id);
  };
  const handleEditServiceRow = (index) => {
    setServiceRowToEdit(index);
    setServiceModalOpen(true);
  };
  const handleDeleteServiceRow = (index) => {
    const fil = cthsdt.DichVu.filter((_, idx) => idx !== index);
    setCTHSDT({ ...cthsdt, DichVu: fil });
  };
  const getTuoi = (ngaysinh) => {
    let tuoi = ngaysinh.split("-");
    var now = new Date();
    var currentYear = now.getFullYear();
    return currentYear - tuoi[0];
  };
  const ThanhTien = () => {
    let tien = 0;
    for (let i = 0; i < cthsdt.DichVu.length; i++) {
      // if (cthsdt.DichVu[i].taiKham === false)
      tien =
        tien +
        parseInt(cthsdt.DichVu[i].DonGia) * parseInt(cthsdt.DichVu[i].SL);
    }
    for (let i = 0; i < cthsdt.Thuoc.length; i++) {
      tien =
        tien + parseInt(cthsdt.Thuoc[i].Gia) * parseInt(cthsdt.Thuoc[i].SL);
    }
    return tien;
  };
  const handlechangeformCTHSDT = (e) => {
    if (cthsdt.edit !== true || state === "create") {
      setCTHSDT({ ...cthsdt, [e.target.name]: e.target.value });
    }
  };
  const validateForm = () => {
    if (
      cthsdt.MaNhaSi != "" &&
      cthsdt.ChanDoan != "" &&
      cthsdt.DichVu.length > 0
    ) {
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(cthsdt)) {
        if (value == "" || value == []) {
          switch (key) {
            case "MaNhaSi":
              errorFields.push("Nha sĩ");
              break;
            case "ChanDoan":
              errorFields.push("Chuẩn đoán");
              break;
            case "DichVu":
              errorFields.push("Dịch vụ");
              break;
            default:
              break;
          }
        }
      }
      setErrors("Vui lòng nhập: " + errorFields.join(", "));
      return false;
    }
  };
  const saveCTHSDT = async () => {
    if (!validateForm()) return;
    // const maNS = cthsdt.MaNhaSi;
    // const response = await api.getAllStaffs();
    // var nhasi = response.find(function (ns) {
    //     return ns.maNhanVien === maNS;
    // });
    // let image = imageFile1;
    // if (imageFile1 != null && typeof imageFile1 !== 'string') {
    //     try {
    //         const formData = new FormData();
    //         formData.append('image', imageFile1);
    //         const response = await axios.post(upload.upImage, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });
    //         image = response.data.photo
    //         console.log(image)
    //     }
    //     catch (e) {
    //     }
    // }

    if (selectedRecord == null) {
      var now = new Date();

      var year = now.getFullYear();
      var month = ("0" + (now.getMonth() + 1)).slice(-2); // Thêm '0' ở trước nếu tháng < 10
      var day = ("0" + now.getDate()).slice(-2); // Thêm '0' ở trước nếu ngày < 10
      var formattedDate = year + "-" + month + "-" + day;
      // const branchdiachi = await api.getBranchsBySeacrh({ tenChiNhanh: user?.chinhanh, maChiNhanh: '', slpDau: '', slpCuoi: '' })
      // console.log(branchdiachi)
      const dichvuList = cthsdt.DichVu.map((item) => ({
        MaDv: item.maDichVu,
        GiaDichVu: item.Gia,
        SoLuong: item.SL,
        ChietKhau: item.ChietKhau,
        DonGia: item.DonGia * item.SL,
        GhiChu: item.GhiChu,
        TaiKham: item.taiKham,
      }));
      const MedicineList = cthsdt.Thuoc.map((item) => ({
        MaThuoc: item.maThuoc,
        SoLuong: item.SL,
        Gia: item.Gia,
        DonGia: item.DonGia,
        GhiChu: item.GhiChu,
      }));

      const data = {
        ChiTietHsdt: {
          MaBn: selectedPatient?.maBn,
          LyDoKham: cthsdt.LyDoKham,
          ChanDoan: cthsdt.ChanDoan,
          NgayDieuTri: formattedDate,
          MaNhaSi: cthsdt.MaNhaSi,
          MaChiNhanh: user?.maCN,
          GhiChu: cthsdt.GhiChu,
        },
        HoaDon: {
          MaBn: selectedPatient?.maBn,
          NgayLap: formattedDate,
        },
        DichVus: dichvuList,
        Thuocs: MedicineList,
      };
      const res = await api.createCTHSDT(
        data.ChiTietHsdt,
        data.DichVus,
        data.Thuocs,
        null,
        data.HoaDon
      );
      if (res?.message == undefined) {
        console.log(listcthsdt);
        console.log(res);
        setListCTHSDT((prev) => [...prev, res.chiTietHsdt]);
        setPage(2);
      } else {
        handleShowDialog(
          `Error adding treatment detail! ${res ? res?.message : ""}`
        );
      }
    } else {
      const dichvuList = cthsdt.DichVu.map((item) => ({
        MaDv: item.maDichVu,
        GiaDichVu: item.Gia,
        SoLuong: item.SL,
        ChietKhau: item.ChietKhau,
        DonGia: item.DonGia * item.SL,
        GhiChu: item.GhiChu,
        TaiKham: item.taiKham,
      }));
      const MedicineList = cthsdt.Thuoc.map((item) => ({
        MaThuoc: item.maThuoc,
        SoLuong: item.SL,
        Gia: item.Gia,
        DonGia: item.DonGia,
        GhiChu: item.GhiChu,
      }));

      const data = {
        ChiTietHsdt: {
          MaCthsdt: listcthsdt[recordRowToEdit].maCthsdt,
          MaBn: selectedPatient?.maBn,
          LyDoKham: cthsdt.LyDoKham,
          ChanDoan: cthsdt.ChanDoan,
          NgayDieuTri: listcthsdt[recordRowToEdit].ngayDieuTri,
          MaNhaSi: cthsdt.MaNhaSi,
          MaChiNhanh: user.maCN,
          GhiChu: cthsdt.GhiChu,
        },
        DichVus: dichvuList,
        Thuocs: MedicineList,
        ThuocsOld: listcthsdt[recordRowToEdit].thuocDaKes,
        DichVusOld: listcthsdt[recordRowToEdit].dichVuDaSuDungs,
      };
      console.log(data);
      // await api.updateCTHSDT(data, data.Id)
      // let updated = listcthsdt.map((currRow, idx) => {
      //     if (idx !== recordRowToEdit) return currRow;
      //     return data;
      // })
      // setListCTHSDT(updated)

      const id = listcthsdt[recordRowToEdit].maCthsdt;
      const res = await api.updateCTHSDT(id, { ...data });
      if (res?.message == undefined) {
        console.log(res);
        let updated = listcthsdt.map((currRow, idx) => {
          if (idx !== recordRowToEdit) return currRow;
          return res;
        });
        setListCTHSDT(updated);
        setPage(2);
      } else {
        handleShowDialog(`Error edit CTHSDT! ${res ? res?.message : ""}`);
      }
    }
  };
  return (
    <div>
      <div style={{ minHeight: "630px" }}>
        {page === 1 ? (
          <div>
            <div className="row">
              <div className="row ms-0 me-0" style={{ fontWeight: "500" }}>
                <div className="col-md-6">
                  <div className="mb-2 col-md-6">Mã bệnh nhân</div>
                  <input
                    type="text"
                    className="form-control pb-2 pt-2 mb-2"
                    id="MaBN"
                    name="maBn"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <div className="mb-2">Họ tên</div>
                  <input
                    type="text"
                    className="form-control pb-2 pt-2 mb-2"
                    id="TenBN"
                    name="tenBn"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <div className="mb-2">Số điện thoại</div>
                  <input
                    type="tel"
                    className="form-control pb-2 pt-2 mb-2"
                    id="SDT"
                    name="soDienThoai"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <div className="mb-2">Căn cước công dân</div>
                  <input
                    type="text"
                    className="form-control pb-2 pt-2 mb-2"
                    id="CCCD"
                    name="cccd"
                    onChange={handleChange}
                  />
                </div>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn pb-2 pt-2 mt-2"
                    style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
                    onClick={onSearch}
                  >
                    Tìm kiếm
                  </button>
                  <button
                    type="submit"
                    className="btn pb-2 pt-2 mt-2 ms-3"
                    style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
                    onClick={() => {
                      setErrors("");
                      setPatientModalOpen(true);
                    }}
                  >
                    Thêm bệnh nhân
                  </button>
                </div>
              </div>
            </div>

            <table className="table">
              <thead style={{ verticalAlign: "middle" }}>
                <tr className="table-secondary">
                  <th>STT</th>
                  <th>Tên bệnh nhân</th>
                  <th>CCCD</th>
                  <th>Giới tính</th>
                  <th>Ngày sinh</th>
                  <th>SĐT</th>
                  <th>Địa chỉ</th>
                  <th>Tiền sử bệnh lý</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {customers &&
                  customers?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.tenBn}</td>
                      <td>{item.cccd}</td>
                      <td>{item.gioiTinh}</td>
                      <td>
                        {moment(new Date(item.ngaySinh)).format("DD/MM/YYYY")}
                      </td>
                      <td>{item.soDienThoai}</td>
                      <td>{item.diaChi}</td>
                      <td>{item.tienSuBenhLy}</td>
                      <td className="fit">
                        <span className="actions">
                          <BsEye
                            size={19}
                            color="#0096FF"
                            onClick={() => setSelectedPatientRow(item)}
                          />
                          <BsFillPencilFill
                            className="edit-btn"
                            onClick={() => handleEditPatientRow(index)}
                          />
                          <BsFillTrashFill
                            className="delete-btn"
                            onClick={() => {
                              handleDeletePatientRow(index);
                            }}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : null}
        {page === 2 && selectedPatient !== null ? (
          <div className="pe-2 ps-2">
            <div
              align="center"
              style={{ fontSize: "25px", fontWeight: "bold" }}
            >
              HỒ SƠ ĐIỀU TRỊ
            </div>
            <div
              style={{
                marginTop: "10px",
                marginBottom: "20px",
                backgroundColor: "lightgray",
                padding: "10px",
                borderRadius: "5px",
              }}
              className="mt-3 row"
            >
              <div className="col-lg-4 col-md-auto mb-2">
                <span style={{ fontWeight: "600" }}>Mã bệnh nhân: </span>
                {hsdt?.maBn}
              </div>
              <div className="col-lg-4 col-md-auto mb-2">
                <span style={{ fontWeight: "600" }}>Tên bệnh nhân: </span>
                {hsdt?.tenBn}
              </div>
              <div className="col-lg-4 col-md-auto mb-2">
                <span style={{ fontWeight: "600" }}>Số điện thoại: </span>
                {hsdt?.soDienThoai}
              </div>
              <div className="col-lg-4 col-md-auto mb-2">
                <span style={{ fontWeight: "600" }}>Tuổi: </span>
                {getTuoi(hsdt?.ngaySinh)}
              </div>
              <div className="col-lg-4 col-md-auto mb-2">
                <span style={{ fontWeight: "600" }}>Ngày sinh: </span>
                {hsdt?.ngaySinh}
              </div>
              <div className="col-lg-4 col-md-auto mb-2">
                <span style={{ fontWeight: "600" }}>Giới tính: </span>
                {hsdt?.gioiTinh}
              </div>
              <div className="col-lg-4 col-md-auto mb-2">
                <span style={{ fontWeight: "600" }}>Địa chỉ: </span>
                {hsdt?.diaChi}
              </div>
              <div className="col-lg-4 col-md-auto mb-2">
                <span style={{ fontWeight: "600" }}>Tiền sử bệnh lý: </span>
                {hsdt?.tienSuBenhLy}
              </div>
            </div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              Lịch sử điều trị
            </div>
            <div className="row mt-2">
              <div className="row" style={{ fontWeight: "500" }}>
                <div className="col-lg-4 col-md-10">
                  <div className="mb-2 col-md-6">Mã nha sĩ</div>
                  <input
                    type="text"
                    className="form-control pb-2 pt-2 mb-2"
                    id="MaBN"
                    name="MaNhaSi"
                    onChange={handleChange1}
                  />
                </div>
                <div className="col-lg-4 col-md-10">
                  <div className="mb-2">Tên nha sĩ</div>
                  <input
                    type="text"
                    className="form-control pb-2 pt-2 mb-2"
                    id="TenBN"
                    name="TenNhaSi"
                    onChange={handleChange1}
                  />
                </div>
                <div className="col-lg-4 col-md-10">
                  <div className="mb-2">Ngày điều trị</div>
                  <input
                    type="date"
                    className="form-control pb-2 pt-2 mb-2"
                    id="NgaySuDung"
                    name="NgayDieuTri"
                    onChange={handleChange1}
                  />
                </div>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn pb-2 pt-2 mt-2"
                    style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
                    onClick={onSearch1}
                  >
                    Tìm kiếm
                  </button>
                  <button
                    type="submit"
                    className="btn pb-2 pt-2 mt-2 ms-3"
                    style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
                    onClick={() => createNewRecord()}
                  >
                    Thêm
                  </button>
                </div>
              </div>
            </div>

            <table className="table">
              <thead style={{ verticalAlign: "middle" }}>
                <tr className="table-secondary">
                  <th>STT</th>
                  <th>Mã nha sĩ điều trị</th>
                  <th>Tên nha sĩ điều trị</th>
                  <th>Chẩn đoán</th>
                  <th>Ngày điều trị</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {listcthsdt?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.maNhaSi}</td>
                    <td>{item.maNhaSiNavigation?.tenNv}</td>
                    <td>{item.chanDoan}</td>
                    <td>
                      {moment(new Date(item.ngayDieuTri)).format("DD/MM/YYYY")}
                    </td>
                    <td className="fit">
                      <span className="actions">
                        <BsEye
                          className="edit-btn"
                          onClick={() => handleEditRecordRow(item, index)}
                        />
                        {item?.edit !== true && (
                          <BsFillTrashFill
                            className="delete-btn"
                            onClick={() => handleDeleteRecordRow(index)}
                          />
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        {page === 3 ? (
          <div className="pe-2 ps-2">
            <div
              align="center"
              style={{ fontSize: "25px", fontWeight: "bold" }}
            >
              CHI TIẾT HỒ SƠ ĐIỀU TRỊ
            </div>
            <div
              align="center"
              style={{
                fontStyle: "italic",
                fontSize: "14px",
                color: "#6b6b6b",
              }}
            >
              {cthsdt?.NgayDieuTri ? (
                <div
                  align="center"
                  style={{
                    fontStyle: "italic",
                    fontSize: "14px",
                    color: "#6b6b6b",
                  }}
                >
                  Ngày {cthsdt?.NgayDieuTri.split("-")[2]} tháng{" "}
                  {cthsdt?.NgayDieuTri.split("-")[1]} năm{" "}
                  {cthsdt?.NgayDieuTri.split("-")[0]}
                </div>
              ) : (
                <div
                  align="center"
                  style={{
                    fontStyle: "italic",
                    fontSize: "14px",
                    color: "#6b6b6b",
                  }}
                >
                  Ngày {new Date().getDate()} tháng{" "}
                  {parseInt(new Date().getMonth()) + 1} năm{" "}
                  {new Date().getFullYear()}
                </div>
              )}
            </div>
            <div
              className="mt-3 row"
              style={{
                marginTop: "10px",
                marginBottom: "20px",
                backgroundColor: "lightgray",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              {/* <div className="col-lg-4 col-md-auto mb-2">
                  <span style={{ fontWeight: "600" }}>Mã hồ sơ điều trị: </span>
                  {hsdt?.MaHSDT}
                </div> */}
              <div className="col-lg-4 col-md-auto mb-2">
                <span style={{ fontWeight: "600" }}>Mã bệnh nhân: </span>
                {selectedPatient?.maBn}
              </div>
              <div className="col-lg-4 col-md-auto mb-2">
                <span style={{ fontWeight: "600" }}>Tên bệnh nhân: </span>
                {selectedPatient?.tenBn}
              </div>
              <div className="col-lg-4 col-md-auto mb-2">
                <span style={{ fontWeight: "600" }}>Số điện thoại: </span>
                {selectedPatient?.soDienThoai}
              </div>
              <div className="col-lg-4 col-md-auto mb-2">
                <span style={{ fontWeight: "600" }}>Tuổi: </span>
                {getTuoi(selectedPatient?.ngaySinh)}
              </div>
              <div className="col-lg-4 col-md-auto mb-2">
                <span style={{ fontWeight: "600" }}>Ngày sinh: </span>
                {selectedPatient?.ngaySinh}
              </div>
              <div className="col-lg-4 col-md-auto mb-2">
                <span style={{ fontWeight: "600" }}>Giới tính: </span>
                {selectedPatient?.gioiTinh}
              </div>
              <div className="col-lg-4 col-md-auto mb-2">
                <span style={{ fontWeight: "600" }}>Địa chỉ: </span>
                {selectedPatient?.diaChi}
              </div>
              <div className="col-lg-4 col-md-auto mb-2">
                <span style={{ fontWeight: "600" }}>Tiền sử bệnh lý: </span>
                {selectedPatient?.tienSuBenhLy}
              </div>
            </div>
            <div>
              <div
                className="mb-2"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div style={{ fontWeight: "600", marginRight: "10px" }}>
                  Nha sĩ điều trị:{" "}
                </div>
                {user?.loaiNguoiDung === "Nha sĩ" && (
                  <div>
                    {state === "create"
                      ? user?.ten
                      : cthsdt.maNhaSiNavigation.tenNv}
                  </div>
                )}
                {user?.loaiNguoiDung === "Phụ tá" && (
                  <Select
                    className="mb-2"
                    value={
                      nhasi.find((item) => item.maNv === cthsdt.MaNhaSi) || ""
                    }
                    onChange={(value) =>
                      value !== null
                        ? setCTHSDT({ ...cthsdt, MaNhaSi: value.maNv })
                        : setCTHSDT({ ...cthsdt, MaNhaSi: "" })
                    }
                    options={nhasi}
                    isClearable
                    getOptionLabel={(item) => item.maNv + "-" + item.tenNv}
                    getOptionValue={(item) => item}
                    placeholder=""
                  />
                )}
              </div>
            </div>
            <div>
              <div
                className="mb-2"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div
                  className="col-md-auto mt-auto mb-auto"
                  style={{ fontWeight: "600" }}
                >
                  Lý do khám:
                </div>
                <div>
                  <input
                    type="text"
                    className="form-control signature"
                    id="MaNV"
                    name="LyDoKham"
                    onChange={handlechangeformCTHSDT}
                    value={cthsdt?.LyDoKham}
                  />
                </div>
              </div>
            </div>
            <div
              className="mb-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                className="col-md-auto mt-auto mb-auto"
                style={{ fontWeight: "600" }}
              >
                Chẩn đoán:
              </div>
              <div>
                <input
                  type="text"
                  className="form-control signature"
                  id="MaNV"
                  name="ChanDoan"
                  onChange={handlechangeformCTHSDT}
                  value={cthsdt?.ChanDoan}
                />
              </div>
            </div>
            <div
              className="mb-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                className="col-md-auto mt-auto mb-auto"
                style={{ fontWeight: "600" }}
              >
                Ghi chú:
              </div>
              <div>
                <input
                  type="text"
                  className="form-control signature"
                  id="MaNV"
                  name="GhiChu"
                  onChange={handlechangeformCTHSDT}
                  value={cthsdt?.GhiChu}
                />
              </div>
            </div>
            {/* <div style={{ fontWeight: "600" }}>Ảnh sau khi điều trị:</div> */}
            {/* <div className="col-md-4 col-sm-6 m-auto"> */}
            {/* <img
                  src={
                    cthsdt.AnhSauDieuTri != null
                      ? cthsdt.AnhSauDieuTri
                      : "/images/after_treatment.png"
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  id="imagePreview"
                /> */}
            {/* <input
                  type="file"
                  hidden
                  accept="image/*"
                  name="HinhAnhSauDieuTri"
                  id="HinhAnhSauDieuTri"
                  onChange={handleImageChange}
                /> */}
            {/* {(cthsdt.edit !== true || state === "create") && (
                  <div className="mt-3" align="center">
                    <label
                      for="HinhAnhSauDieuTri"
                      className="btn d-flex btn-primary"
                      style={{ width: "fit-content" }}
                    >
                      <div>
                        <i
                          className="fa-solid fa-cloud-arrow-up me-2"
                          style={{ color: "#FFF", fontSize: "35px" }}
                        ></i>
                      </div>
                      <div className="m-auto">Đăng ảnh</div>
                    </label>
                  </div>
                )} */}
            {/* </div> */}
            {(cthsdt?.edit !== true || state == "create") && (
              <div className="text-end">
                <button
                  type="submit"
                  className="btn pb-2 pt-2 ps-3 mt-2 pe-3"
                  style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
                  onClick={() => setServiceModalOpen(true)}
                >
                  Thêm dịch vụ
                </button>
                <button
                  type="submit"
                  className="btn pb-2 pt-2 ps-3 mt-2 pe-3 ms-3"
                  style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
                  onClick={() => setMedicineModalOpen(true)}
                >
                  Thêm thuốc
                </button>
              </div>
            )}
            <table className="table">
              <thead style={{ verticalAlign: "middle" }}>
                <tr className="table-secondary">
                  <th>STT</th>
                  <th>Dịch vụ</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Tái khám</th>
                  <th>Ghi chú</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cthsdt?.DichVu?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.tenDichVu}</td>
                    <td>
                      {new Intl.NumberFormat("en-DE").format(item.DonGia)}
                    </td>
                    <td>{item.SL}</td>
                    <td>{item.taiKham || ""}</td>
                    <td>{item.GhiChu}</td>
                    <td className="fit">
                      {cthsdt?.edit != true && (
                        <span className="actions">
                          <BsFillTrashFill
                            className="delete-btn"
                            onClick={() => handleDeleteServiceRow(index)}
                          />
                          <BsFillPencilFill
                            className="edit-btn"
                            onClick={() => handleEditServiceRow(index)}
                          />
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="table table-borderless">
              <tbody>
                {cthsdt?.Thuoc?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div>
                        <div>
                          <b>
                            {index + 1}/ {item.tenThuoc}
                          </b>
                        </div>
                        <div className="ms-3" style={{ fontStyle: "italic" }}>
                          {item.GhiChu}
                        </div>
                      </div>
                    </td>
                    <td>{item.SL} viên</td>
                    <td>
                      {new Intl.NumberFormat("en-DE").format(item.Gia)}
                      /viên
                    </td>
                    <td className="fit">
                      {cthsdt?.edit != true && (
                        <span className="actions">
                          <BsFillTrashFill
                            className="delete-btn"
                            onClick={() => handleDeleteMedicineRow(index)}
                          />
                          <BsFillPencilFill
                            className="edit-btn"
                            onClick={() => handleEditMedicineRow(index)}
                          />
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-end mb-2">
              <b>
                Thành tiền: {Intl.NumberFormat("en-DE").format(ThanhTien())}
              </b>
            </div>
            {errors && <div className="error">{errors}</div>}
            {(cthsdt.edit != true || state == "create") && (
              <div className="text-end">
                <button
                  type="submit"
                  className="btn pb-2 pt-2 mt-3 mb-3"
                  style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
                  onClick={saveCTHSDT}
                >
                  Lưu
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
      <div className="text-end">
        {page !== 1 ? (
          <button
            type="button"
            className="btn"
            style={{ border: "none" }}
            onClick={() => prevPage()}
          >
            <i className="fa-solid fa-chevron-left next_prevBtn"></i>
          </button>
        ) : (
          <button className="btn" style={{ border: "none" }}>
            <i className="fa-solid fa-chevron-left next_prevBtn_disabled"></i>
          </button>
        )}
        {page === 3 ||
        (page === 1 && selectedPatient === null) ||
        (page === 2 && selectedRecord === null) ? (
          <button className="btn" style={{ border: "none" }}>
            <i className="fa-solid fa-chevron-right next_prevBtn_disabled"></i>
          </button>
        ) : (
          <button
            type="button"
            className="btn"
            style={{ border: "none" }}
            onClick={() => nextPage()}
          >
            <i className="fa-solid fa-chevron-right next_prevBtn"></i>
          </button>
        )}
      </div>
      {patientModalOpen && (
        <FormPatient
          closeModal={() => {
            setPatientModalOpen(false);
            setPatientRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={
            patientRowToEdit !== null && customers[patientRowToEdit]
          }
          medicines={medicines}
        />
      )}

      {medicineModalOpen && (
        <FormRecordMedicine
          closeModal={() => {
            setMedicineModalOpen(false);
            setMedicineRowToEdit(null);
          }}
          onSubmit={async (item) => {
            if (medicineRowToEdit == null) {
              let list = cthsdt;
              list.Thuoc.push(item);
              setCTHSDT(list);
            } else {
              let updated = cthsdt.Thuoc.map((currRow, idx) => {
                if (idx !== medicineRowToEdit) return currRow;
                return item;
              });
              let list = cthsdt;
              list.Thuoc = updated;
              setCTHSDT(list);
            }
          }}
          defaultValue={
            medicineRowToEdit !== null && cthsdt?.Thuoc[medicineRowToEdit]
          }
          medicines={medicines.filter(
            (medicine) =>
              !cthsdt.Thuoc.some(
                (selectedMedicine) =>
                  selectedMedicine.maThuoc === medicine.maThuoc
              )
          )}
          rootMedicine={medicines}
        />
      )}
      {serviceModalOpen && services && (
        <FormRecordService
          closeModal={() => {
            setServiceModalOpen(false);
            setServiceRowToEdit(null);
          }}
          onSubmit={async (item) => {
            if (serviceRowToEdit == null) {
              let list = cthsdt;
              list.DichVu.push(item);
              setCTHSDT(list);
            } else {
              let updated = cthsdt.DichVu.map((currRow, idx) => {
                if (idx !== serviceRowToEdit) return currRow;
                return item;
              });
              let list = cthsdt;
              list.DichVu = updated;
              setCTHSDT(list);
            }
          }}
          defaultValue={
            serviceRowToEdit !== null && cthsdt?.DichVu[serviceRowToEdit]
          }
          services={services.filter(
            (sv) =>
              !cthsdt.DichVu.some((selected) => selected.maDichVu === sv.maDv)
          )}
          rootServices={services}
        />
      )}
      <CustomModal
        show={showDialog}
        handleClose={handleCloseDialog}
        body={ndshow}
      />
    </div>
  );
};

export default PatientManagement;
