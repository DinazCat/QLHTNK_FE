import React, { useEffect, useState } from "react";
import "./style.css";
import moment from "moment";
import api from "../api/Api";
import Select from "react-select";

const BillManagement = (props) => {
  const [bills, setBills] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [CTHSDT, setCTHSDT] = useState(null);
  const [staffs, setStaffs] = useState([]);
  const [maGiamGia, setMaGiamGia] = useState([]);
  const [recentDiscount, setRecentDiscount] = useState("");
  const [ThanhTienSauGiamGia, setTTSGG] = useState(0);
  const [SoTienGiam, setSoTienGiam] = useState(0);
  const [conNo, setConNo] = useState(0);
  const [noSauThanhToan, setNoSauThanhToan] = useState(0);
  const [disableDiscount, setDisaleDiscount] = useState(true);
  const [recentStaff, setRecentStaff] = useState({
    maNhanVien: "",
    tenNhanVien: "",
  });
  const [searchCriteria, setSearchCriteria] = useState({
    maHoaDon: "",
    maBenhNhan: "",
    tenBenhNhan: "",
    ngayLap: "",
    tinhTrang: "",
  });
  var TongTienDT = 0;
  var TongTienThuoc = 0;
  var ThanhTien = 0;

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const setSelectedRowById = async (id, cthsdtId) => {
    setSelectedRow(id);
    await getCTHSDT(id, cthsdtId);
    setPage(2);
  };
  const [page, setPage] = useState(1);
  const nextPage = () => {
    setPage(page + 1);
    window.scrollTo(0, 0);
  };
  const prevPage = () => {
    setPage(page - 1);
    window.scrollTo(0, 0);
  };

  const getBills = async () => {
    const bills = await api.getAllBills();
    setBills(bills);
  };

  const getStaffs = async () => {
    const staffs = await api.getAllStaffs();
    setStaffs(staffs);
  };

  const getDiscounts = async () => {
    const discounts = await api.getAllDiscounts();
    const discountsFilter = discounts.filter((discount) => {
      const dateBD = new Date(discount.TGBatDau);
      let dateKT = new Date(discount.TGKetThuc);
      dateKT.setHours(23);
      dateKT.setMinutes(59);

      const matchDateBD = !(dateBD > new Date());
      const matchDateKT = !(dateKT < new Date());
      return matchDateBD && matchDateKT;
    });
    setMaGiamGia(discountsFilter);
  };

  const getCTHSDT = async (id, cthsdtId) => {
    let CTHSDT = await api.getTreatmentRecordDetailById(cthsdtId);
    const status = bills[id].tinhTrang;
    const Id = bills[id].Id;
    TongTienDT = 0;
    CTHSDT.DichVu.map((item, index) => {
      TongTienDT += parseInt(item.DonGia);
      return 0;
    });
    CTHSDT.Thuoc.map((item, index) => {
      TongTienDT += parseInt(item.DonGia);
      return 0;
    });

    if (status == "Chưa thanh toán") {
      let newBill = bills[id];
      newBill.conNo = TongTienDT;
      setConNo(newBill.conNo);
      setTTSGG(newBill.conNo);
      setNoSauThanhToan(newBill.conNo);
      setDisaleDiscount(false);
      await api.updateBill(newBill, Id);
      let updatedBills = bills.map((currRow, idx) => {
        if (idx !== id) return currRow;
        return newBill;
      });
      setBills(updatedBills);
    } else {
      let newBill = bills[id];
      setConNo(newBill.conNo);
      setTTSGG(TongTienDT - (TongTienDT * newBill.phanTram) / 100);
      setSoTienGiam((TongTienDT * newBill.phanTram) / 100);
      setNoSauThanhToan(newBill.conNo);
      setDisaleDiscount(true);
      setRecentDiscount({
        maGiamGia: newBill.maGiamGia,
        phanTram: newBill.phanTram,
      });
      setRecentStaff({
        maNhanVien: newBill.maNhanVien,
        tenNhanVien: newBill.tenNhanVien,
      });
    }
    setCTHSDT(CTHSDT);
  };

  const validSubmitData = () => {
    if (bills[selectedRow].tinhTrang === "Đã thanh toán") return true;
    const soTienThanhToan = document.getElementById("soTienDaThanhToan").value;
    const matchSoTienThanhToan =
      soTienThanhToan != "" &&
      soTienThanhToan > 0 &&
      soTienThanhToan < TongTienDT - SoTienGiam;
    if (!matchSoTienThanhToan)
      alert("Vui lòng nhập số tiền thanh toán hợp lệ!");
    const matchMaNhanVien = document.getElementById("maNhanVien").value != "";
    return matchMaNhanVien && matchSoTienThanhToan;
  };

  const handleSubmit = async () => {
    if (validSubmitData()) {
      const newBill = bills[selectedRow];
      const Id = newBill.Id;
      newBill.daThanhToan =
        parseInt(newBill.daThanhToan) +
        parseInt(document.getElementById("soTienDaThanhToan").value);
      newBill.conNo =
        conNo - parseInt(document.getElementById("soTienDaThanhToan").value);
      if (!disableDiscount) {
        newBill.maGiamGia = recentDiscount.maGiamGia || "";
        newBill.phanTram = recentDiscount.phanTram || 0;
        newBill.maNhanVien = recentStaff.maNhanVien;
        newBill.tenNhanVien = recentStaff.tenNhanVien;
      }
      newBill.tinhTrang = "Đã thanh toán";
      api.updateBill(newBill, Id);
      let updatedBills = bills.map((currRow, idx) => {
        if (idx !== selectedRow) return currRow;
        return newBill;
      });
      setBills(updatedBills);
      setDisaleDiscount(true);
      setRecentDiscount(null);
      setRecentStaff(null);
      alert("Lưu thành công");
    }
  };

  const onSearch = async () => {
    const searchResults = await api.getBillsBySearch(searchCriteria);
    setBills(searchResults);
  };

  useEffect(() => {
    getBills();
    getStaffs();
    getDiscounts();
  }, []);

  useEffect(() => {
    if (!disableDiscount) {
      setSoTienGiam((TongTienDT * recentDiscount.phanTram) / 100 || 0);
      setTTSGG(TongTienDT - SoTienGiam);
      setConNo(TongTienDT - SoTienGiam);
      setNoSauThanhToan(TongTienDT - SoTienGiam);
    }
  }, [recentDiscount]);

  return (
    <div>
      <div style={{ minHeight: "630px" }}>
        {page === 1 ? (
          <div>
            <div className="row">
              <form className="row ms-0 me-0" style={{ fontWeight: "500" }}>
                <div className="col-md-6">
                  <div className="mb-2 col-md-6">Mã hóa đơn</div>
                  <input
                    type="text"
                    className="form-control pb-2 pt-2 mb-2"
                    id="maHoaDon"
                    name="maHoaDon"
                    onChange={handleChange}
                    value={searchCriteria.maHoaDon}
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
                    value={searchCriteria.maBenhNhan}
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
                    value={searchCriteria.tenBenhNhan}
                  />
                </div>
                <div className="col-md-6">
                  <div className="mb-2">Ngày lập</div>
                  <input
                    type="date"
                    className="form-control pb-3 pt-3"
                    id="ngayLap"
                    name="ngayLap"
                    value={searchCriteria.ngayLap}
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
                    value={searchCriteria.tinhTrang}
                  >
                    <option value="">Tất cả</option>
                    <option value="Đã thanh toán">Đã thanh toán</option>
                    <option value="Chưa thanh toán">Chưa thanh toán</option>
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
              </form>
            </div>

            <table className="table">
              <thead>
                <tr className="table-secondary">
                  <th>Mã hóa đơn</th>
                  <th>Mã bệnh nhân</th>
                  <th>Tên bệnh nhân</th>
                  <th>Ngày lập</th>
                  <th>Tình trạng</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((item, index) => (
                  <tr
                    key={item.Id}
                    onClick={() => setSelectedRowById(index, item.maCTHSDT)}
                  >
                    <td>{item.maHoaDon}</td>
                    <td>{item.maBenhNhan}</td>
                    <td>{item.tenBenhNhan}</td>
                    <td>{item.ngayLap}</td>
                    <td
                      style={{
                        fontStyle: "italic",
                        color:
                          item.tinhTrang === "Đã thanh toán"
                            ? "#269A6C"
                            : "#B74141",
                      }}
                    >
                      {item.tinhTrang}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {page === 2 ? (
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
            <div className="mt-2 pe-2 ps-2">
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
              <div>
                <span style={{ fontWeight: "600" }}>Mã hóa đơn: </span>
                {bills[selectedRow].maHoaDon}
              </div>
              <div>
                <span style={{ fontWeight: "600" }}>Mã BN: </span>
                {bills[selectedRow].maBenhNhan}
              </div>
              <div>
                <span style={{ fontWeight: "600" }}>Tên BN: </span>
                {bills[selectedRow].tenBenhNhan}
              </div>
              <div>
                <span style={{ fontWeight: "600" }}>Tên NS: </span>
                {CTHSDT !== null ? CTHSDT.TenNhaSi : ""}
              </div>
              <div>
                <span style={{ fontWeight: "600" }}>Địa chỉ: </span>
                {bills[selectedRow].DiaChi}
              </div>
              <div>
                <span style={{ fontWeight: "600" }}>Tuổi: </span>
                {bills[selectedRow].tuoi}
              </div>
              <div>
                <span style={{ fontWeight: "600" }}>Giới tính: </span>
                {bills[selectedRow].GioiTinh}
              </div>
              <div>
                <span style={{ fontWeight: "600" }}>Số điện thoại: </span>
                {bills[selectedRow].soDienThoai}
              </div>

              <table className="table">
                <thead>
                  <tr className="table-secondary">
                    <th>Dịch vụ</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Trả góp</th>
                  </tr>
                </thead>
                <tbody>
                  {CTHSDT !== null ? (
                    CTHSDT.DichVu.map((item, index) => {
                      TongTienDT += parseInt(item.DonGia);
                      return (
                        <tr
                          key={item.Id}
                          onClick={() => setSelectedRowById(index)}
                        >
                          <td>{item.tenDichVu}</td>
                          <td>{item.DonGia}</td>
                          <td>{item.SL}</td>
                          <td>{item.coTraGop}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr></tr>
                  )}
                </tbody>
              </table>
              <div style={{ fontSize: "18px" }}>
                <b>Tổng tiền điều trị: {TongTienDT}</b>
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
                    CTHSDT.Thuoc.map((item, index) => {
                      TongTienThuoc += parseInt(item.DonGia);
                      return (
                        <tr key={index}>
                          <td>
                            <div>
                              <div>
                                <b>
                                  {index + 1}/ {item.tenThuoc}
                                </b>
                              </div>
                              <div
                                className="ms-3"
                                style={{ fontStyle: "italic" }}
                              >
                                {item.GhiChu}
                              </div>
                            </div>
                          </td>
                          <td>{item.SL} viên</td>
                          <td>{item.DonGia}/viên</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr></tr>
                  )}
                </tbody>
              </table>
              <div style={{ fontSize: "18px" }}>
                <b>Tổng tiền thuốc: {TongTienThuoc}</b>
              </div>

              <div align="right" className="mt-3">
                <table
                  className="table table-borderless table-sm w-auto"
                  style={{
                    fontSize: "18px",
                    borderSpacing: 0,
                    borderCollapse: "separate",
                  }}
                >
                  <tbody>
                    <tr>
                      <th>Thành tiền:</th>
                      <th>{TongTienDT + TongTienThuoc}</th>
                    </tr>
                    <tr>
                      <th>Mã giảm giá:</th>
                      <th>
                        {disableDiscount ? (
                          <Select
                            className="mb-2"
                            value={recentDiscount}
                            isDisabled
                            onChange={(value) =>
                              value !== null
                                ? (setSoTienGiam(
                                    (TongTienDT * value.phanTram) / 100
                                  ),
                                  setTTSGG(TongTienDT - SoTienGiam),
                                  setConNo(TongTienDT - SoTienGiam),
                                  setNoSauThanhToan(TongTienDT - SoTienGiam),
                                  setRecentDiscount(value))
                                : setRecentDiscount("")
                            }
                            options={maGiamGia}
                            id="maGiamGia"
                            getOptionLabel={(item) => item.maGiamGia}
                            getOptionValue={(item) => item}
                            placeholder={bills[selectedRow].maGiamGia}
                          />
                        ) : (
                          <Select
                            className="mb-2"
                            value={recentDiscount}
                            onChange={(value) =>
                              value !== null
                                ? (setSoTienGiam(
                                    (TongTienDT * value.phanTram) / 100
                                  ),
                                  setTTSGG(TongTienDT - SoTienGiam),
                                  setConNo(TongTienDT - SoTienGiam),
                                  setRecentDiscount(value))
                                : setRecentDiscount("")
                            }
                            options={maGiamGia}
                            id="maGiamGia"
                            getOptionLabel={(item) => item.maGiamGia}
                            getOptionValue={(item) => item}
                            placeholder=""
                          />
                        )}
                      </th>
                    </tr>
                    <tr>
                      <th>Số tiền giảm:</th>
                      <th>{SoTienGiam}</th>
                    </tr>
                    <tr>
                      <th>Thành tiền sau khi giảm:</th>
                      <th>{ThanhTienSauGiamGia}</th>
                    </tr>
                    <tr>
                      <th>Công nợ trước thanh toán:</th>
                      <th>{conNo}</th>
                    </tr>
                    <tr>
                      <th>Số tiền đã thanh toán:</th>
                      <th>
                        <input
                          type="number"
                          className="signature"
                          id="soTienDaThanhToan"
                          name="soTienDaThanhToan"
                          size={1}
                          onChange={(value) => {
                            setNoSauThanhToan(
                              conNo -
                                parseInt(
                                  document.getElementById("soTienDaThanhToan")
                                    .value,
                                  0
                                )
                            );
                          }}
                          placeholder=""
                          min={(20 * TongTienDT) / 100}
                          max={TongTienDT - SoTienGiam}
                          style={{
                            width: "100%",
                            boxSizing: "border-box",
                            fontWeight: "bold",
                          }}
                        />
                      </th>
                    </tr>
                    <tr>
                      <th> Công nợ sau thanh toán:</th>
                      <th>{noSauThanhToan}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-end mt-4">
                <div style={{ fontSize: "19px" }}>
                  <b>NHÂN VIÊN THỰC HIỆN</b>
                </div>
                <div style={{ height: "50px" }}></div>
                <div className="mt-5">
                  <Select
                    className="mb-2"
                    value={
                      staffs.find(
                        (item) => item.maNhanVien === recentStaff.maNhanVien
                      ) || ""
                    }
                    onChange={(value) =>
                      value !== null
                        ? setRecentStaff({
                            ...recentStaff,
                            maNhanVien: value.maNhanVien,
                            tenVatTu: value.tenNhanVien,
                          })
                        : setRecentStaff({
                            ...recentStaff,
                            maNhanVien: "",
                            tenNhanVien: "",
                          })
                    }
                    options={staffs}
                    id="maNhanVien"
                    isClearable
                    getOptionLabel={(item) => item.maNhanVien}
                    getOptionValue={(item) => item}
                    placeholder=""
                  />
                  {/* <input
                    type="text"
                    className="text-end signature"
                    style={{
                      fontSize: "19px",
                      fontWeight: "bold",
                      direction: "RTL",
                    }}
                    id="MaNV"
                    name="MaNV"
                    placeholder="Nhập mã nhân viên"
                  /> */}
                </div>
                <div>
                  <Select
                    className="mb-2"
                    value={
                      staffs.find(
                        (item) => item.maNhanVien === recentStaff.maNhanVien
                      ) || ""
                    }
                    onChange={(value) =>
                      value !== null
                        ? setRecentStaff({
                            ...recentStaff,
                            maNhanVien: value.maNhanVien,
                            tenVatTu: value.tenNhanVien,
                          })
                        : setRecentStaff({
                            ...recentStaff,
                            maNhanVien: "",
                            tenNhanVien: "",
                          })
                    }
                    options={staffs}
                    isClearable
                    id="tenNhanVien"
                    getOptionLabel={(item) => item.tenNhanVien}
                    getOptionValue={(item) => item}
                    placeholder=""
                  />
                  {/* <input
                    type="text"
                    className="text-end signature"
                    style={{ fontSize: "19px", fontWeight: "bold" }}
                    id="TenNV"
                    name="TenNV"
                    placeholder="Nhập tên nhân viên"
                  /> */}
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn pb-2 pt-2 mt-3 mb-3"
                  style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
                >
                  Lưu
                </button>
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
        {page !== 2 && selectedRow !== null ? (
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
