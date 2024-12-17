import React, { useState, useEffect, useContext } from 'react'
import './style.css'
import moment from 'moment';
import { BsFillTrashFill, BsFillPencilFill, BsEye } from "react-icons/bs";
import { FormPatient } from '../components/FormPatient';
import { FormRecordMedicine } from '../components/FormRecordMedicine';
import { FormRecordService } from '../components/FormRecordService';
import api from '../api/Api';
import axios from 'axios';
import { AuthContext } from '../hook/AuthProvider'
import TopNav from "../components/TopNav";
import Footer from '../components/Footer';
import patientApi from '../api/patientApi';
import cthsdtApi from '../api/cthsdtApi';
import Select from "react-select";

const XemHSDT = () => {
    const { user } = useContext(AuthContext);

    const onSearch1 = async () => {
        // const res = await cthsdtApi.searchCTHSDT(searchCriteria1)
        // console.log(res)
        // if(res?.message == undefined){
        //   setListCTHSDT(res);
        // }
        // else{
        //   alert(`Error search treatment! ${res?res?.message:""}`)
        // }
        console.log(searchCriteria1)
        if(listcthsdt != null){
          let fil = listcthsdt1
        if(searchCriteria1.MaNhaSi != ''&& searchCriteria1.MaNhaSi != null ){
          fil = fil?.filter((item, idx) => item.maNhaSi == searchCriteria1.MaNhaSi);
        }
        if(searchCriteria1.NgayDieuTri != ''){
          fil = fil?.filter((item, idx) => item.ngayDieuTri == searchCriteria1.NgayDieuTri)
        }
        if (searchCriteria1.NgayDieuTri == '' && (searchCriteria1.MaNhaSi == null && searchCriteria1.MaNhaSi == ''))
          fil = listcthsdt1
          setListCTHSDT(fil)
        }
    }
    const [searchCriteria1, setSearchCriteria1] = useState({
        MaNhaSi: '',
        TenNhaSi: '',
        NgayDieuTri: '',
    })

    const handleChange1 = (e) => {
        setSearchCriteria1({ ...searchCriteria1, [e.target.name]: e.target.value });
    };

    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [page, setPage] = useState(2);
    const [state, setState] = useState("");

    const [recordRowToEdit, setRecordRowToEdit] = useState(null);
    const [hsdt, setHSDT] = useState(null);
    const [cthsdt, setCTHSDT] = useState({
        MaNhaSi: user?.Loai === 'Phụ tá' ? '' : user?.maNV||1002,
        MaBn: selectedPatient?.maBn||0,
        MaChiNhanh:1000,
        ChanDoan: '',
        NgayDieuTri:'',
        LyDoKham:'',
        GhiChu: '',
        DichVu:[],
        Thuoc:[]
      })
    const [listcthsdt, setListCTHSDT] = useState(null);
    const [listcthsdt1, setListCTHSDT1] = useState(null);
    const getlistCTHSDT = async (patientId) => {
        const res = await cthsdtApi.getAllCTHSDT(patientId);
            if (res?.message == undefined) {
              setListCTHSDT(res);
              setListCTHSDT1(res);
            } else {
              setListCTHSDT([]);
              setListCTHSDT1([]);
            }
    }
      const [medicines, setMedicines] = useState(null);
    
      const [services, setServices] = useState(null);
      const [nhasi, setNhaSi] = useState([])
    useEffect(() => {
      if(user != null)
        getPatient();
      getService();
      getMedicine();
      getNhaSi();
    }, [user]);
      const getNhaSi = async () => {
          const response = await api.getAllStaff();
          console.log("hhhhh");
          console.log(response);
          var nhasi1 = response?.filter((ns) => {
            return ns.chucVu === "Nha sĩ";
          });

          setNhaSi(nhasi1);
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
    const getPatient = async () => {
        const patients = await patientApi.searchPatient({
            maBn: "",
            tenBn: "",
            cccd: user?.maNguoiDung,
            soDienThoai: ""
        })
        console.log(patients)
        if(patients && patients.length > 0){
        setSelectedPatient(patients[0])
        setHSDT(patients[0])
        getlistCTHSDT(patients[0]?.maBn)
        }
    }
    const nextPage = () => {
        setPage(page + 1);
        window.scrollTo(0, 0);
    }
    const prevPage = () => {
        setPage(page - 1);
        window.scrollTo(0, 0);
    }
    const handleEditRecordRow = (item, index) => {
      console.log(item)
        setSelectedRecord(item);
        setRecordRowToEdit(index)
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
    }




    const getTuoi = (ngaysinh) => {
        try {
            let tuoi = ngaysinh.split('-')
            var now = new Date();
            var currentYear = now.getFullYear();
            return currentYear - tuoi[0]
        }
        catch (e) {
            return ''
        }

    }
    const ThanhTien = () => {
      let tien = 0;
    for (let i = 0; i < cthsdt.DichVu.length; i++) {
      // if (cthsdt.DichVu[i].taiKham === false)
      if(parseInt(cthsdt.DichVu[i].ChietKhau) <= 100){
        tien =tien +parseInt(cthsdt.DichVu[i].Gia) * parseInt(cthsdt.DichVu[i].SL) *(1-parseInt(cthsdt.DichVu[i].ChietKhau)/100);
      }
      else{
        tien =tien +parseInt(cthsdt.DichVu[i].Gia) * parseInt(cthsdt.DichVu[i].SL) -parseInt(cthsdt.DichVu[i].ChietKhau);
      }
    
    }
    for (let i = 0; i < cthsdt.Thuoc.length; i++) {
      tien =
        tien + parseInt(cthsdt.Thuoc[i].Gia) * parseInt(cthsdt.Thuoc[i].SL);
    }
    return tien;
    }


    return (
        <div>
            <TopNav />
            <div className='m-4'>
                <div style={{ minHeight: "600px" }}>
                    {(page === 2 && selectedPatient !== null) ?
                        <div className='pe-2 ps-2'>
                            <div align="center" style={{ fontSize: "25px", fontWeight: "bold" }}>HỒ SƠ ĐIỀU TRỊ</div>
                            <div className='mt-3 row'>
                                {/* <div className='col-lg-4 col-md-auto mb-2'>
                                    <span style={{ fontWeight: "600" }}>Mã hồ sơ điều trị: </span>{hsdt?.maHsdt}
                                </div> */}
                                <div className='col-lg-4 col-md-auto mb-2'>
                                    <span style={{ fontWeight: "600" }}>Mã BN: </span>{hsdt?.maBn}
                                </div>
                                <div className='col-lg-4 col-md-auto mb-2'><span style={{ fontWeight: "600" }}>Tên BN: </span>{selectedPatient?.tenBn}</div>
                                <div className='mb-2'><span style={{ fontWeight: "600" }}>Địa chỉ: </span>{selectedPatient?.diaChi}</div>
                                <div className='col-lg-4 col-md-auto mb-2'>
                                    <span style={{ fontWeight: "600" }}>Tuổi: </span>{getTuoi(selectedPatient?.ngaySinh)}
                                </div>
                                <div className='col-lg-4 col-md-auto mb-2'>
                                    <span style={{ fontWeight: "600" }}>Giới tính: </span>{selectedPatient?.gioiTinh}
                                </div>
                                <div className='col-lg-4 col-md-auto mb-2'>
                                    <span style={{ fontWeight: "600" }}>Số điện thoại: </span>{selectedPatient?.soDienThoai}
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="row" style={{ fontWeight: "600" }}>
                                    <div className="col-lg-4 col-md-10">
                                    <div className="mb-2 col-md-6">Mã nha sĩ</div>
                  <Select
                    className="mb-2"
                    value={
                     nhasi.find((item) => item.maNv === searchCriteria1.MaNhaSi) ||""
                    }
                    onChange={(value) =>
                      value !== null
                        ?   setSearchCriteria1({ ...searchCriteria1, MaNhaSi: value.maNv,TenNhaSi: value.tenNv })
                        : setSearchCriteria1({ ...searchCriteria1, MaNhaSi: null})
                    }
                    options={nhasi}
                    isClearable
                    getOptionLabel={(item) => item.maNv}
                    getOptionValue={(item) => item}
                    placeholder=""
                  />
                </div>
                <div className="col-lg-4 col-md-10">
                  <div className="mb-2">Tên nha sĩ</div>
                  <Select
                    className="mb-2"
                    value={
                      nhasi.find((item) => item.maNv === searchCriteria1.MaNhaSi) ||""
                     }
                    onChange={(value) =>
                      value !== null
                        ?   setSearchCriteria1({ ...searchCriteria1, TenNhaSi:value.tenNv, MaNhaSi:value.maNv })
                        : setSearchCriteria1({ ...searchCriteria1, TenNhaSi: null})
                    }
                    options={nhasi}
                    isClearable
                    getOptionLabel={(item) => item.tenNv}
                    getOptionValue={(item) => item}
                    placeholder=""
                  />
                </div>
                                    <div className="col-lg-4 col-md-10">
                                        <div className="mb-2">Ngày điều trị</div>
                                        <input type="date" className="form-control pb-2 pt-2 mb-2" id="NgaySuDung"   name="NgayDieuTri" onChange={handleChange1} />
                                    </div>
                                    <div className="text-end">
                                        <button type="submit" className="btn pb-2 pt-2 mt-2" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }} onClick={onSearch1}>
                                            Tìm kiếm
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
                        {moment(new Date(item.ngayDieuTri)).format(
                          "DD/MM/YYYY"
                        )}
                      </td>
                      <td className="fit">
                        <span className="actions">
                          <BsEye
                            className="edit-btn"
                            onClick={() => handleEditRecordRow(item, index)}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
                        </div>
                        : null}
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
              <div className="mt-3 row">
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
                <div className="mb-2">
                  <span style={{ fontWeight: "600" }}>Địa chỉ: </span>
                  {selectedPatient?.diaChi}
                </div>
                <div className="col-lg-4 col-md-auto mb-2">
                  <span style={{ fontWeight: "600" }}>Tuổi: </span>
                  {getTuoi(selectedPatient?.ngaySinh)}
                </div>
                <div className="col-lg-4 col-md-auto mb-2">
                  <span style={{ fontWeight: "600" }}>Giới tính: </span>
                  {selectedPatient?.gioiTinh}
                </div>
                <div className="col-lg-4 col-md-auto mb-2">
                  <span style={{ fontWeight: "600" }}>Số điện thoại: </span>
                  {selectedPatient?.soDienThoai}
                </div>
              </div>
              <div>
              <div className='col-md-auto mt-auto mb-auto' style={{ fontWeight: "600" }}>Nha sĩ điều trị:</div>
                                <div>
                                    <input type="text" className="form-control signature" id="MaNV" name="MaNhaSi" placeholder='Nhập mã nha sĩ' value={cthsdt?.maNhaSiNavigation.tenNv} />
                                </div>
              </div>
              <div>
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
                    value={cthsdt?.lyDoKham}
                  />
                </div>
              </div>
              <div>
              <div className='col-md-auto mt-auto mb-auto' style={{ fontWeight: "600" }}>Chẩn đoán:</div>
                                <div>
                                    <input type="text" className="form-control signature" id="MaNV" name="ChuanDoan" value={cthsdt?.chanDoan} />
                                </div>
              </div>
              <div>
              <div className='col-md-auto mt-auto mb-auto' style={{ fontWeight: "600" }}>Ghi chú:</div>
                                <div>
                                    <input type="text" className="form-control signature" id="MaNV" name="GhiChu" value={cthsdt?.ghiChu} />
                                </div>
              </div>
              {/* <div style={{ fontWeight: "600" }}>Ảnh sau khi điều trị:</div>
              <div className='col-md-4 col-sm-6 m-auto'>
                                <img src={cthsdt.AnhSauDieuTri != null ? cthsdt.AnhSauDieuTri : "/images/after_treatment.png"} style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                }} id="imagePreview" />
                            </div> */}

              <table className="table">
                <thead style={{ verticalAlign: "middle" }}>
                  <tr className="table-secondary">
                    <th>STT</th>
                    <th>Dịch vụ</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Tái khám</th>
                    <th>Ghi chú</th>
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
                    
                  </tr>
                ))}
                </tbody>
              </table>
              <div className="text-end mb-2">
                <b>
                  Thành tiền: {Intl.NumberFormat("en-DE").format(ThanhTien())}
                </b>
              </div>
            </div>
          ) : null}
                </div>
                <div className="text-end">
                    {page !== 2 ? <button type="button"
                        className='btn'
                        style={{ border: "none" }}
                        onClick={() => prevPage()}>
                        <i className="fa-solid fa-chevron-left next_prevBtn"></i>
                    </button> : <button className='btn' style={{ border: "none" }}><i className="fa-solid fa-chevron-left next_prevBtn_disabled"></i></button>}
                    {((page === 3) || (page === 2 && selectedRecord === null)) ?
                        <button className='btn' style={{ border: "none" }}><i className="fa-solid fa-chevron-right next_prevBtn_disabled"></i></button>
                        : <button type="button"
                            className='btn'
                            style={{ border: "none" }}
                            onClick={() => nextPage()}>
                            <i className="fa-solid fa-chevron-right next_prevBtn"></i>
                        </button>}
                </div>

            </div>
            <Footer style={{ marginTop: 0 }} />
        </div >
    );
}

export default XemHSDT;