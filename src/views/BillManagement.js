import React, { useEffect, useState, useContext, useRef } from "react";
import "./style.css";
import moment from "moment";
import ReactToPrint from "react-to-print";
import api from "../api/Api";
import Select from "react-select";
import { AuthContext } from "../hook/AuthProvider";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { buildQueries } from "@testing-library/react";

const BillManagement = (props) => {
  const { user } = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [CTHSDT, setCTHSDT] = useState(null);
  const [staffs, setStaffs] = useState([]);
  const [maGiamGia, setMaGiamGia] = useState([]);
  const [recentDiscount, setRecentDiscount] = useState(null);
  const [ThanhTienSauGiamGia, setTTSGG] = useState(0);
  const [SoTienGiam, setSoTienGiam] = useState(0);
  const [conNo, setConNo] = useState(ThanhTienSauGiamGia);
  const [noSauThanhToan, setNoSauThanhToan] = useState(0);
  const [disableDiscount, setDisaleDiscount] = useState(false);
  const [patient, setPatient] = useState();
  const [traGop, setTraGop] = useState(false);
  const [minimum, setMinimum] = useState(0);

  //Mine
  const [isModal, setIsModal] = useState(false);
  const [tongTienThanhToan, setTongTienThanhToan] = useState(0);
  const [formState, setFormState] = useState({
    ngayThanhToan: "",
    soTienThanhToan: 0,
  });

  const [CTTT, setCTTT] = useState(null);
  const [CTTTnew, setCTTTnew] = useState(null);
  const [errors, setErrors] = useState("");
  const validateForm = () => {
    if (formState.ngayThanhToan != "" && formState.soTienThanhToan != 0) {
      if (parseInt(formState.soTienThanhToan) <= 0) {
        setErrors(`Số tiền thanh toán phải là số dương lớn hơn 0`);
        return false;
      } else if (parseInt(formState.soTienThanhToan) > conNo) {
        setErrors(
          `Số tiền thanh toán không được lớn hơn số tiền cần phải trả là: ${conNo}`
        );
        return false;
      } else {
        setErrors("");
        return true;
      }
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (value == "") {
          switch (key) {
            case "ngayThanhToan":
              errorFields.push("Ngày thanh toán");
              break;
            case "soTienThanhToan":
              errorFields.push("Số tiền thanh toán");
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

  const handleSubmitthanhtoan = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    let tt = 0;
    for (let i = 0; i < CTTT?.length; i++) {
      tt += parseInt(CTTT[i].soTienThanhToan);
    }
    setTongTienThanhToan(tt + parseInt(formState.soTienThanhToan));
    setConNo(conNo - parseInt(formState.soTienThanhToan));
    if (CTTT == null) {
      setCTTT([formState]);
      setCTTTnew([formState]);
    } else {
      setCTTT([...CTTT, formState]);
      if(CTTTnew == null){
        setCTTTnew([formState]);
      }
      else{
        setCTTTnew([...CTTTnew, formState]);
      }
    }
    setIsModal(false);
  };

  //component to print
  const componentToPrintRef = useRef();

  const [recentStaff, setRecentStaff] = useState({
    maNhanVien: "",
    tenNhanVien: "",
  });
  const [searchCriteria, setSearchCriteria] = useState({
    maHoaDon: "",
    maBenhNhan: "",
    tenBenhNhan: "",
    ngayLap: "",
    tinhTrang: "Tất cả",
  });

  var TongTienDT = 0;
  var TongTienThuoc = 0;
  var TongTienDV = 0;

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const setSelectedRowById = async (id, cthsdt) => {
    setSelectedRow(id);
    setPatient(cthsdt.maBnNavigation);
    setCTHSDT(cthsdt);
    let conno = 0;
    for (let i = 0; i < cthsdt.thuocDaKes.length; i++) {
      conno += cthsdt.thuocDaKes[i].donGia;
    }
    for (let i = 0; i < cthsdt.dichVuDaSuDungs.length; i++) {
      if(cthsdt.dichVuDaSuDungs[i].chietKhau <= 100){
        conno += cthsdt.dichVuDaSuDungs[i].donGia*(1 - cthsdt.dichVuDaSuDungs[i].chietKhau/100);
      }
      else{
        conno += cthsdt.dichVuDaSuDungs[i].donGia - cthsdt.dichVuDaSuDungs[i].chietKhau;
      }
     
    }
    if (bills[id].tinhTrang == null) {
      setConNo(conno);
      setRecentDiscount(null);
      setSoTienGiam(0);
      setDisaleDiscount(false);
      setCTTT(null);
      setCTTTnew(null);
      setTongTienThanhToan(0);
      setTTSGG(0);
    } else {
      setDisaleDiscount(true);
      setCTTT(bills[id]?.chiTietThanhToans?.sort((a, b) => {
        const dateA = new Date(a.ngayThanhToan);  // Chuyển 'ngayLap' thành đối tượng Date
        const dateB = new Date(b.ngayThanhToan);  // Chuyển 'ngayLap' thành đối tượng Date
      
        return dateA - dateB;  // So sánh theo thứ tự giảm dần (mới nhất -> cũ nhất)
      }));
      setCTTTnew(null);
      setConNo(bills[id].soTienConNo);
      setTongTienThanhToan(bills[id].soTienDaThanhToan);
      setSoTienGiam(bills[id].soTienGiam);
      setRecentDiscount(bills[id].maGiamGiaNavigation);
      setTTSGG(conno - bills[id].soTienGiam);
    }

    setPage(2);
  };
  const [page, setPage] = useState(1);
  const nextPage = () => {
    setPage(page + 1);
    window.scrollTo(0, 0);
  };
  const prevPage = () => {
    // // alert("presv");
    // if (!disableDiscount) {
    //   // document.getElementById("maGiamGia").value = "";
    //   // setSoTienGiam(0);
    //   setRecentDiscount(null);
    // }
    setIsModal(false);

    setPage(page - 1);
    window.scrollTo(0, 0);
  };

  const getBills = async () => {
    const res = await api.getAllBill();
    console.log(res[1].tinhTrang);
    if (user != null) {
      let fil = res?.filter(
        (item, idx) => item.maCthsdtNavigation.maChiNhanh === user?.maCN
      );
      fil = fil?.sort((a, b) => {
        const dateA = new Date(a.ngayLap);  // Chuyển 'ngayLap' thành đối tượng Date
        const dateB = new Date(b.ngayLap);  // Chuyển 'ngayLap' thành đối tượng Date
      
        return dateB - dateA;  // So sánh theo thứ tự giảm dần (mới nhất -> cũ nhất)
      });
      setBills(fil);
    }
  };

  const getStaffs = async () => {
    const staffs = await api.getAllStaff();
    const fil = staffs?.filter((item, idx) => item.maChiNhanh === user?.maCN);
    setStaffs(fil);
  };

  const getDiscounts = async () => {
    const discounts = await api.getAllDiscount();
    if (Array(discounts)) {
      const discountsFilter = discounts?.filter((discount) => {
        const currentDate = new Date();
        const start = new Date(discount.ngayBatDau);
        const finish = new Date(discount.ngayKetThuc);
        // Reset thời gian về 00:00:00
        currentDate.setHours(0, 0, 0, 0);
        finish.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);
        //   const dateBD = new Date(discount.TGBatDau);
        //   let dateKT = new Date(discount.TGKetThuc);
        //   dateKT.setHours(23);
        //   dateKT.setMinutes(59);

        const matchDateBD = start <= currentDate;
        const matchDateKT = finish >= currentDate;
        return matchDateBD && matchDateKT;
      });
      setMaGiamGia(discountsFilter);
    }
  };

  const validSubmitData = () => {
    if (conNo < 0) {
      alert("Còn nợ không được là số âm!!!");
      return false;
    } else if (
      (conNo > 0 && TongTienDV + TongTienThuoc < 5000000) ||
      (conNo > 0 && recentDiscount != null && ThanhTienSauGiamGia < 5000000)
    ) {
      alert("Trường hợp hóa đơn nhỏ hơn 5000000 không được phép trả góp!");
      return false;
    }
    else if(CTTT==null || CTTT?.length == 0){
      alert("Vui lòng thanh toán hóa đơn trước khi lưu!");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validSubmitData()) return;
    const choice = window.confirm("Xác nhận thanh toán?");
    if (choice) {
      const bill = bills[selectedRow];
      const obj1 = {
        MaHd: bill.maHd,
        MaBn: bill.maBn,
        MaNv: user?.maNV,
        MaCthsdt: bill.maCthsdt,
        MaGiamGia: recentDiscount?.maGiamGia || null,
        NgayLap: bill.ngayLap,
        SoTienGiam: SoTienGiam,
        SoTienDaThanhToan: tongTienThanhToan,
        SoTienConNo: conNo,
        TinhTrang:
          conNo == 0
            ? "Đã thanh toán"
            : conNo < TongTienDV + TongTienThuoc - SoTienGiam
            ? "Còn nợ"
            : null,
      };
      const obj2 = CTTTnew.map((item) => ({
        MaHd: bill.maHd,
        NgayThanhToan: item.ngayThanhToan,
        soTienThanhToan: item.soTienThanhToan,
      }));
      const res = await api.updateBill(bill.maHd, { bill: obj1, CTTT: obj2 });
      if (res?.message == undefined) {
        let updated = bills.map((currRow, idx) => {
          if (idx !== selectedRow) return currRow;
          return res;
        });
        setBills(updated);
      } else {
        alert(`Error update! ${res ? res?.message : ""}`);
      }
      TongTienDV = 0;
      TongTienThuoc = 0;
      setPage(1);
    }
  };

  const onSearch = async () => {
    // const searchResults = await api.getBillsBySearch(searchCriteria);
    // setBills(searchResults);
    const res = await api.searchBill(searchCriteria);
    if (res?.message == undefined) {
      const fil = res?.filter(
        (item, idx) => item.maCthsdtNavigation.maChiNhanh === user?.maCN
      );
      setBills(fil);
    } else {
      alert(`Error search used item! ${res ? res?.message : ""}`);
    }
  };

  useEffect(() => {
    getBills();
    getStaffs();
    getDiscounts();
  }, [user]);

  //   useEffect(() => { }, [selectedRow]);

  return (
    <div>
      <div style={{ minHeight: "630px" }}>
        {page === 1 ? (
          <div>
            <div className="row">
              <div className="row ms-0 me-0" style={{ fontWeight: "500" }}>
                <div className="col-md-6">
                  <div className="mb-2 col-md-6">Mã hóa đơn</div>
                  <input
                    type="text"
                    className="form-control pb-2 pt-2 mb-2"
                    id="maHoaDon"
                    name="maHoaDon"
                    onChange={handleChange}
                    value={searchCriteria?.maHoaDon}
                  />
                </div>
                <div className="col-md-6">
                  <div className="mb-2 col-md-6">Mã bệnh nhân</div>
                  <input
                    type="text"
                    className="form-control pb-2 pt-2 mb-2"
                    id="maBenhNhan"
                    name="maBenhNhan"
                    onChange={handleChange}
                    value={searchCriteria?.maBenhNhan}
                  />
                </div>
                <div className="col-md-6">
                  <div className="mb-2">Tên bệnh nhân</div>
                  <input
                    type="text"
                    className="form-control pb-2 pt-2 mb-2"
                    id="tenBenhNhan"
                    name="tenBenhNhan"
                    onChange={handleChange}
                    value={searchCriteria?.tenBenhNhan}
                  />
                </div>
                <div className="col-md-6">
                  <div className="mb-2">Ngày lập</div>
                  <input
                    type="date"
                    className="form-control pb-3 pt-3"
                    id="ngayLap"
                    name="ngayLap"
                    value={searchCriteria?.ngayLap}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <div className="mb-2">Tình trạng</div>
                  <select
                    className="form-select pb-2 pt-2 mb-2"
                    aria-label="Chọn tình trạng"
                    id="tinhTrang"
                    name="tinhTrang"
                    onChange={handleChange}
                    value={searchCriteria?.tinhTrang}
                  >
                    <option value="Tất cả">Tất cả</option>
                    <option value="Đã thanh toán">Đã thanh toán</option>
                    <option value=''>Chưa thanh toán</option>
                    <option value="Còn nợ">Còn nợ</option>
                  </select>
                </div>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn pb-2 pt-2 mt-2"
                    onClick={onSearch}
                    style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
                  >
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </div>

            <table className="table">
              <thead style={{ verticalAlign: "middle" }}>
                <tr className="table-secondary">
                  <th>STT</th>
                  <th>Mã hóa đơn</th>
                  <th>Mã bệnh nhân</th>
                  <th>Tên bệnh nhân</th>
                  <th>Ngày lập</th>
                  <th>Tình trạng</th>
                </tr>
              </thead>
              <tbody>
                {bills?.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() =>
                      setSelectedRowById(index, item.maCthsdtNavigation)
                    }
                  >
                    <td>{index + 1}</td>
                    <td>{item.maHd}</td>
                    <td>{item.maBn}</td>
                    <td>{item.maBnNavigation.tenBn}</td>
                    <td>
                      {moment(new Date(item.ngayLap)).format("DD/MM/YYYY")}
                    </td>
                    <td
                      style={{
                        fontStyle: "italic",
                        color:
                           (item?.tinhTrang =="Ðã thanh toán" ||item?.tinhTrang == "Đã thanh toán")
                            ? "#269A6C"
                            : item.tinhTrang == null
                            ? "#B74141"
                            : "#FFCC00",
                      }}
                    >
                      {item.tinhTrang == null
                        ? "Chưa thanh toán"
                        : item.tinhTrang}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {page === 2 && selectedRow != null ? (
          <div>
            <div className="row">
              <div className="col-md-auto">
                <img alt="" src="/images/logo3.png" />
              </div>
              <div className="col">
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                  NHA KHOA LOGOIPSUM
                </div>
                <div>
                  <span style={{ fontWeight: "600" }}>Địa chỉ:</span> 2 Lô E,
                  KD5, Dương Bá Trạc, Phường 1, quận 8, HCM
                </div>
                <div>
                  <span style={{ fontWeight: "600" }}>SĐT:</span> 0843593598
                </div>
                <div>
                  <span style={{ fontWeight: "600" }}>Email:</span>{" "}
                  logoipsum@gmail.com
                </div>
              </div>
            </div>
            <div>
              <div className="mt-2 pe-2 ps-2" ref={componentToPrintRef}>
                <div
                  align="center"
                  style={{ fontSize: "25px", fontWeight: "bold" }}
                >
                  HÓA ĐƠN
                </div>
                <div
                  align="center"
                  style={{
                    fontStyle: "italic",
                    fontSize: "14px",
                    color: "#6b6b6b",
                  }}
                >
                  Ngày {moment().date()} tháng {moment().month() + 1} năm{" "}
                  {moment().year()}
                </div>
                <div className="mt-3 row">
                  <div className="col-lg-4 col-md-auto mb-2">
                    <span style={{ fontWeight: "600" }}>Mã hóa đơn: </span>
                    {bills[selectedRow]?.maHd}
                  </div>
                  <div className="col-lg-4 col-md-auto mb-2">
                    <span style={{ fontWeight: "600" }}>Mã BN: </span>
                    {bills[selectedRow]?.maBn}
                  </div>
                  <div className="col-lg-4 col-md-auto mb-2">
                    <span style={{ fontWeight: "600" }}>Tên BN: </span>
                    {bills[selectedRow]?.maBnNavigation.tenBn}
                  </div>
                  <div className="col-lg-4 col-md-auto mb-2">
                    <span style={{ fontWeight: "600" }}>Tên NS: </span>
                    {CTHSDT !== null ? CTHSDT.maNhaSiNavigation.tenNv : ""}
                  </div>
                  <div className="mb-2">
                    <span style={{ fontWeight: "600" }}>Địa chỉ: </span>
                    {bills[selectedRow]?.maBnNavigation.diaChi}
                  </div>
                  <div className="col-lg-4 col-md-auto mb-2">
                    <span style={{ fontWeight: "600" }}>Tuổi: </span>
                    {Math.abs(
                      new Date(
                        Date.now() -
                          new Date(
                            bills[selectedRow]?.maBnNavigation.ngaySinh
                          ).getTime()
                      ).getUTCFullYear() - 1970
                    )}
                  </div>
                  <div className="col-lg-4 col-md-auto mb-2">
                    <span style={{ fontWeight: "600" }}>Giới tính: </span>
                    {bills[selectedRow]?.maBnNavigation.gioiTinh}
                  </div>
                  <div className="col-lg-4 col-md-auto mb-2">
                    <span style={{ fontWeight: "600" }}>Số điện thoại: </span>
                    {bills[selectedRow]?.maBnNavigation.soDienThoai}
                  </div>
                </div>

                <table className="table">
                  <thead style={{ verticalAlign: "middle" }}>
                    <tr className="table-secondary">
                      <th>STT</th>
                      <th>Dịch vụ</th>
                      <th>Giá dịch vụ</th>
                      <th>Số lượng</th>
                      <th>Chiết khấu</th>
                      <th>Giá cuối</th>
                      <th>Tái khám</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CTHSDT !== null ? (
                      CTHSDT.dichVuDaSuDungs.map((item, index) => {
                        if(item.chietKhau <= 100){
                          TongTienDV+= item.donGia*(1 - item.chietKhau/100);
                        }
                        else{
                          TongTienDV += item.donGia - item.chietKhau;
                        }
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.maDvNavigation.tenDv}</td>
                            {/* {item.taiKham ? (
                              <td>0</td>
                            ) : (
                              <td>
                                {new Intl.NumberFormat("en-DE").format(
                                  item.DonGia
                                )}
                              </td>
                            )} */}
                            <td>
                              {new Intl.NumberFormat("en-DE").format(
                                item.giaDichVu
                              )}
                            </td>
                            <td>{item.soLuong}</td>
                            <td>{item.chietKhau}</td>
                            <td>{  new Intl.NumberFormat("en-DE").format((item.chietKhau) <= 100 ? item.donGia *(1-item.chietKhau/100): item.donGia - item.chietKhau)}</td>
                            {item.taiKham ? (
                              <td>{item.taiKham}</td>
                            ) : (
                              <td>Không tái khám</td>
                            )}
                          </tr>
                        );
                      })
                    ) : (
                      <tr></tr>
                    )}
                  </tbody>
                </table>
                <div style={{ fontSize: "18px" }}>
                  <b>
                    Tổng tiền điều trị:{" "}
                    {new Intl.NumberFormat("en-DE").format(TongTienDV)}
                  </b>
                </div>
                <div
                  align="center"
                  style={{ fontWeight: "bold", fontSize: "18px" }}
                >
                  ĐƠN THUỐC
                </div>
                <table className="table table-borderless">
                  <tbody>
                    {CTHSDT !== null ? (
                      CTHSDT.thuocDaKes.map((item, index) => {
                        TongTienThuoc += parseInt(item.donGia);
                        return (
                          <tr key={index}>
                            <td>
                              <div>
                                <div>
                                  <b>
                                    {index + 1}/{" "}
                                    {item.maThuocNavigation.tenThuoc}
                                  </b>
                                </div>
                                <div
                                  className="ms-3"
                                  style={{ fontStyle: "italic" }}
                                >
                                  {item.ghiChu}
                                </div>
                              </div>
                            </td>
                            <td>{item.soLuong} viên</td>
                            <td>
                              {new Intl.NumberFormat("en-DE").format(item.gia)}
                              /viên
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr></tr>
                    )}
                  </tbody>
                </table>
                <div style={{ fontSize: "18px" }}>
                  <b>
                    Tổng tiền thuốc:{" "}
                    {new Intl.NumberFormat("en-DE").format(TongTienThuoc)}
                  </b>
                </div>

                <div className="mt-3">
                  <table
                    className="table table-borderless table-sm"
                    style={{
                      fontSize: "18px",
                      borderSpacing: 0,
                      borderCollapse: "separate",
                    }}
                  >
                    <tbody>
                      <tr>
                        <th>Thành tiền:</th>
                        <th>
                          {new Intl.NumberFormat("en-DE").format(
                            TongTienDV + TongTienThuoc
                          )}
                        </th>
                      </tr>
                      <tr>
                        <th>Mã giảm giá:</th>
                        <th>
                          <Select
                            styles={{
                              container: (provided) => ({
                                ...provided,
                                maxWidth: "200px",
                              }),
                            }}
                            value={
                              maGiamGia.find(
                                (item) =>
                                  item.maGiamGia === recentDiscount?.maGiamGia
                              ) || ""
                            }
                            isDisabled={disableDiscount}
                            onChange={(value) => {
                              if (value !== null) {
                                setSoTienGiam(
                                  ((TongTienDV + TongTienThuoc) *
                                    value.phanTramGiam) /
                                    100
                                );
                                setTTSGG(
                                  TongTienDV +
                                    TongTienThuoc -
                                    ((TongTienDV + TongTienThuoc) *
                                      value.phanTramGiam) /
                                      100
                                );
                                setConNo(
                                  TongTienDV +
                                    TongTienThuoc -
                                    ((TongTienDV + TongTienThuoc) *
                                      value.phanTramGiam) /
                                      100 -
                                    tongTienThanhToan
                                );
                                // setNoSauThanhToan(
                                //   patient.congNo +
                                //   TongTienDV +
                                //   TongTienThuoc -
                                //   (TongTienDV * value.phanTramGiam) / 100
                                // ),
                                setRecentDiscount(value);
                              } else {
                                // Nếu người dùng xóa lựa chọn (bấm vào dấu "X")
                                // Thực hiện các hành động cần thiết khi không có lựa chọn
                                setSoTienGiam(0);
                                setTTSGG(TongTienDV + TongTienThuoc);
                                setConNo(
                                  TongTienDV + TongTienThuoc - tongTienThanhToan
                                );
                                setRecentDiscount(null); // Đặt lại recentDiscount
                              }
                            }}
                            options={maGiamGia}
                            isClearable
                            id="maGiamGia"
                            getOptionLabel={(item) => item.tenGiamGia}
                            getOptionValue={(item) => item}
                            //placeholder={"Chọn mã giảm giá"}
                          />
                        </th>
                      </tr>
                      {recentDiscount && (
                        <tr>
                          <th>Điều kiện áp dụng:</th>
                          <th
                            style={{
                              fontWeight: 500,
                              fontSize: 15,
                            }}
                          >
                            {recentDiscount.dieuKienApDung}
                          </th>
                        </tr>
                      )}
                      <tr>
                        <th>Số tiền giảm:</th>
                        <th>
                          {SoTienGiam
                            ? new Intl.NumberFormat("en-DE").format(SoTienGiam)
                            : 0}
                        </th>
                      </tr>
                      {SoTienGiam ? (
                        <tr>
                          <th>Thành tiền sau khi giảm:</th>
                          <th>
                            {new Intl.NumberFormat("en-DE").format(
                              ThanhTienSauGiamGia
                            )}
                          </th>
                        </tr>
                      ) : (
                        <></>
                      )}
                      <tr>
                        <th>Số tiền đã thanh toán:</th>
                        <th>
                          {new Intl.NumberFormat("en-DE").format(
                            tongTienThanhToan
                          )}
                        </th>
                      </tr>

                      <tr>
                        <td className="">
                          <div
                            className="table-responsive mx-auto"
                            style={{ maxWidth: "900px" }}
                          >
                            <table className="table table-borderless">
                              <tbody>
                                {CTTT !== null ? (
                                  CTTT?.map((item, index) => (
                                    <tr key={index}>
                                      <td>
                                        <div>
                                          <b>
                                            {index + 1}/
                                            {"Thanh toán lần " + (index + 1)}
                                          </b>
                                        </div>
                                      </td>
                                      <td>
                                        {new Intl.NumberFormat("en-DE").format(
                                          item.soTienThanhToan
                                        )}
                                      </td>
                                      <td>
                                        {"Ngày thanh toán: " +
                                          moment(
                                            new Date(item.ngayThanhToan)
                                          ).format("DD/MM/YYYY")}
                                      </td>
                                      {item?.maCTTT == undefined && (
                                        <td className="fit">
                                          <span className="actions">
                                            <BsFillTrashFill
                                              className="delete-btn"
                                              onClick={() => {
                                                //đã thanh toán trừ ra, còn nợ tăng lên
                                                setTongTienThanhToan(
                                                  parseInt(
                                                    formState.soTienThanhToan
                                                  ) -
                                                    parseInt(
                                                      item.soTienThanhToan
                                                    )
                                                );
                                                setConNo(
                                                  conNo +
                                                    parseInt(
                                                      item.soTienThanhToan
                                                    )
                                                );
                                                setCTTT(
                                                  CTTT?.filter(
                                                    (_, idx) => idx !== index
                                                  )
                                                );
                                                setCTTTnew(
                                                  CTTTnew?.filter(
                                                    (item1, idx) =>
                                                      item1 !== item
                                                  )
                                                );
                                              }}
                                            />
                                          </span>
                                        </td>
                                      )}
                                    </tr>
                                  ))
                                ) : (
                                  <tr></tr>
                                )}

                                {isModal && (
                                  <tr>
                                    <td colSpan="1">
                                      <div className="">
                                        <form>
                                          <div className="form-group">
                                            <label htmlFor="ngayThanhToan">
                                              Ngày thanh toán
                                            </label>
                                            <input
                                              name="ngayThanhToan"
                                              type="date"
                                              max={
                                                new Date()
                                                  .toISOString()
                                                  .split("T")[0]
                                              }
                                              value={formState.ngayThanhToan}
                                              onChange={(e) =>
                                                setFormState({
                                                  ...formState,
                                                  [e.target.name]:
                                                    e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                          <div className="form-group">
                                            <label htmlFor="soTienThanhToan">
                                              Số tiền thanh toán
                                            </label>
                                            <input
                                              name="soTienThanhToan"
                                              value={formState.soTienThanhToan}
                                              onChange={(e) =>
                                                setFormState({
                                                  ...formState,
                                                  [e.target.name]:
                                                    e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                          {errors && (
                                            <div className="error">{`${errors}`}</div>
                                          )}
                                          <button
                                            type="submit"
                                            className="btnSummit"
                                            onClick={handleSubmitthanhtoan}
                                          >
                                            Lưu
                                          </button>
                                          <button
                                            type="submit"
                                            className="btnSummit"
                                            style={{
                                              marginLeft: "10px",
                                              backgroundColor: "#FFFFFF",
                                              color: "#0096FF",
                                            }}
                                            onClick={() => setIsModal(false)}
                                          >
                                            Hủy
                                          </button>
                                        </form>
                                      </div>
                                    </td>
                                  </tr>
                                )}

                                {selectedRow != null &&
                                !isModal &&
                                bills[selectedRow].tinhTrang !=
                                  "Đã thanh toán" ? (
                                  <tr>
                                    <td colSpan="1">
                                      <button
                                        onClick={() => setIsModal(true)}
                                        className="btn"
                                        style={{
                                          backgroundColor: "#0096FF",
                                          color: "#FFFFFF",
                                        }}
                                      >
                                        Thêm thanh toán
                                      </button>
                                    </td>
                                  </tr>
                                ) : (
                                  <tr></tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th> Còn nợ:</th>
                        <th>{new Intl.NumberFormat("en-DE").format(conNo)}</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-end mt-4">
                  <div style={{ fontSize: "19px" }}>
                    <b>NHÂN VIÊN THỰC HIỆN</b>
                  </div>
                  <div style={{ height: "15px" }}></div>
                  <div
                    className="mt-5 text-uppercase"
                    style={{ fontSize: "19px" }}
                  >
                    <b>{user?.ten}</b>
                  </div>
                </div>
              </div>
              <div className="text-end">
              {(bills[selectedRow]?.tinhTrang !=null ||bills[selectedRow]?.tinhTrang != null)&& <ReactToPrint
                  trigger={() => (
                    <button
                      className="btn pb-2 pt-2 mt-3 mb-3 me-3"
                      style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
                    >
                      In hóa đơn
                    </button>
                  )}
                  content={() => componentToPrintRef.current}
                />}
                {(bills[selectedRow]?.tinhTrang =="Còn nợ" || bills[selectedRow]?.tinhTrang ==null)?<button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn pb-2 pt-2 mt-3 mb-3"
                  style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
                >
               Lưu
                </button>:<></>}
              </div>
            </div>
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
        {page !== 2 && selectedRow != null ? (
          <button
            type="button"
            className="btn"
            style={{ border: "none" }}
            onClick={() => nextPage()}
          >
            <i className="fa-solid fa-chevron-right next_prevBtn"></i>
          </button>
        ) : (
          <button className="btn" style={{ border: "none" }}>
            <i className="fa-solid fa-chevron-right next_prevBtn_disabled"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default BillManagement;
