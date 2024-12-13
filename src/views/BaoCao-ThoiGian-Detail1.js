import React, { useState, useEffect } from "react";
import "./mistyles.css";
import Api from "../api/Api";
import moment from "moment";
import { AuthContext } from "../hook/AuthProvider";
// ExcelJS from "exceljs";

const XemBaoCaoTheoThang = (props) => {
  const [table, setTable] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(
    moment().format("YYYY-MM")
  );
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chiTietHSDT = await Api.getAllChiTietHSDT();
        const dichVuDaSuDung = await Api.getAllDichVuDaSuDung();
        const hoaDon = await Api.getAllHoaDon();
        const chiTietThanhToan = await Api.getAllChiTietThanhToan();
        updateTable(chiTietHSDT, dichVuDaSuDung, hoaDon, chiTietThanhToan);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  const updateTable = (
    chiTietHSDT,
    dichVuDaSuDung,
    hoaDon,
    chiTietThanhToan
  ) => {
    const selectedMonthStart = moment(selectedMonth).startOf("month");
    const selectedMonthEnd = moment(selectedMonth).endOf("month");

    const revenueTable = chiTietHSDT.reduce((acc, record) => {
      const ngayDieuTri = moment(record.NgayDieuTri, "YYYY-MM-DD");
      if (
        ngayDieuTri.isBetween(selectedMonthStart, selectedMonthEnd, null, "[]")
      ) {
        const soCa = 1;
        const soDichVu = dichVuDaSuDung
          .filter((dv) => dv.MaCTHSDT === record.MaCTHSDT)
          .reduce((sum, dv) => sum + dv.SoLuong, 0);
        const soBenhNhan = 1; // Each record represents one patient
        const doanhThu = chiTietThanhToan
          .filter(
            (ct) =>
              ct.MaHD ===
              hoaDon.find((hd) => hd.MaCTHSDT === record.MaCTHSDT)?.MaHD
          )
          .reduce((sum, ct) => sum + ct.SoTienThanhToan, 0);

        if (!acc[ngayDieuTri.format("YYYY-MM-DD")]) {
          acc[ngayDieuTri.format("YYYY-MM-DD")] = {
            ngay: ngayDieuTri.format("YYYY-MM-DD"),
            soLuongCaThucHien: 0,
            soDichVuThucHien: 0,
            soBenhNhan: 0,
            doanhThu: 0,
          };
        }

        acc[ngayDieuTri.format("YYYY-MM-DD")].soLuongCaThucHien += soCa;
        acc[ngayDieuTri.format("YYYY-MM-DD")].soDichVuThucHien += soDichVu;
        acc[ngayDieuTri.format("YYYY-MM-DD")].soBenhNhan += soBenhNhan;
        acc[ngayDieuTri.format("YYYY-MM-DD")].doanhThu += doanhThu;
      }
      return acc;
    }, {});

    const tongDoanhThu = Object.values(revenueTable).reduce(
      (total, row) => total + row.doanhThu,
      0
    );

    const result = Object.values(revenueTable).map((item) => ({
      ...item,
      tyLe: parseFloat(((item.doanhThu * 100) / tongDoanhThu).toFixed(1)),
    }));

    setTable(result);
    setTotalRevenue(tongDoanhThu);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <div className="mb-2">
            <b>Chọn tháng, năm</b>
          </div>
          <input
            className="form-control pb-2 pt-2 mb-3"
            type="month"
            id="month"
            placeholder="Chọn tháng năm"
            name="month"
            max={moment().format("YYYY-MM")}
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
          <div className="text-end">
            <button
              //onClick={handleExport}
              className="btn pb-2 pt-2 mb-3 me-3"
              style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
            >
              Xuất Excel
              <i className="fa fa-download ms-2"></i>
            </button>
            <button
              type="submit"
              className="btn pb-2 pt-2 mb-3"
              style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
              onClick={updateTable}
            >
              Xem
            </button>
          </div>
        </div>
      </div>
      <div className="text-end">
        <h1 class="noteVND">**Tính theo đơn vị VNĐ</h1>
      </div>
      <table class="table">
        <thead style={{ verticalAlign: "middle" }}>
          <tr class="table-secondary">
            <th>Ngày</th>
            <th>Số ca thực hiện</th>
            <th>Số dịch vụ thực hiện</th>
            <th>Số bệnh nhân</th>
            <th>Doanh thu</th>
            <th>Tỷ lệ (%)</th>
          </tr>
        </thead>
        <tbody>
          {table.map((item, index) => (
            <tr key={index}>
              <td>{moment(new Date(item.ngay)).format("DD/MM/YYYY")}</td>
              <td>{item.soLuongCaThucHien}</td>
              <td>{item.soDichVuThucHien}</td>
              <td>{item.soBenhNhan}</td>
              <td>{new Intl.NumberFormat("en-DE").format(item.doanhThu)}</td>
              <td>{new Intl.NumberFormat("en-DE").format(item.tyLe)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end">
        <h1 class="noteVND" style={{ fontWeight: "bold", fontSize: "17px" }}>
          Tổng doanh thu:{" "}
          {totalRevenue
            ? new Intl.NumberFormat("en-DE").format(totalRevenue)
            : null}
        </h1>
      </div>
    </div>
  );
};

export default XemBaoCaoTheoThang;
