import React, { useState, useEffect, useRef, useContext } from "react";
import "./mistyles.css";
import Api from "../api/Api";
import moment from "moment";
import { AuthContext } from "../hook/AuthProvider";
import ExcelJS from "exceljs";

const XemBaoCaoTheoDichVuTheoThang = (props) => {
  const { user } = useContext(AuthContext);
  const [table, setTable] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(
    moment().format("YYYY-MM")
  );
  const [totalRevenue, setTotalRevenue] = useState();

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  const fetchData = async () => {
    try {
      const chiTietHSDT = await Api.searchCTHSDT({});
      const hoaDon = await Api.getAllBill();
      const dichVu = await Api.getAllServices();
      updateTable(chiTietHSDT, hoaDon, dichVu);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateTable = (chiTietHSDT, hoaDon, dichVu) => {
    const selectedMonthStart = moment(selectedMonth).startOf("month");
    const selectedMonthEnd = moment(selectedMonth).endOf("month");

    const revenueTable = chiTietHSDT?.reduce((acc, record) => {
      const ngayDieuTri = moment(record.ngayDieuTri, "YYYY-MM-DD");
      if (
        ngayDieuTri.isBetween(selectedMonthStart, selectedMonthEnd, null, "[]")
      ) {
        const sortedServices = [...record.dichVuDaSuDungs].sort(
          (a, b) => (a.donGia || 0) - (b.donGia || 0)
        );

        const totalPayment = hoaDon
          .filter((hd) => hd.maCthsdt === record.maCthsdt)
          .reduce(
            (sum, hd) =>
              sum +
              hd.chiTietThanhToans.reduce(
                (ctSum, ct) => ctSum + (ct.soTienThanhToan || 0),
                0
              ),
            0
          );

        let remainingPayment = totalPayment;

        sortedServices.forEach((dv) => {
          const tenDv =
            dichVu.find((d) => d.maDv === dv.maDv)?.tenDv || "Unknown";
          const soLuongDaBan = dv.soLuong || 0;
          const serviceRevenue = Math.min(
            remainingPayment,
            dv.donGia * soLuongDaBan
          );

          const uniquePatients = new Set(
            chiTietHSDT
              .filter((r) => r.dichVuDaSuDungs.some((d) => d.maDv === dv.maDv))
              .map((r) => r.maBn)
          ).size;

          if (!acc[tenDv]) {
            acc[tenDv] = {
              dichVu: tenDv,
              soLuongDaBan: 0,
              soBenhNhan: 0,
              doanhThu: 0,
            };
          }

          acc[tenDv].soLuongDaBan += soLuongDaBan;
          acc[tenDv].soBenhNhan = uniquePatients;
          acc[tenDv].doanhThu += serviceRevenue;

          remainingPayment -= serviceRevenue;
        });
      }
      return acc;
    }, {});

    const tongDoanhThu = Object.values(revenueTable).reduce(
      (total, row) => total + row.doanhThu,
      0
    );

    const result = Object.values(revenueTable).map((item, index) => ({
      stt: index + 1,
      ...item,
      tyLe: parseFloat(((item.doanhThu * 100) / tongDoanhThu).toFixed(1)),
    }));

    setTable(result);
    setTotalRevenue(tongDoanhThu);
  };

  const handleExport = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Báo cáo");
    sheet.columns = [
      { header: "STT", key: "stt", width: 10 },
      { header: "Dịch vụ", key: "dichVu", width: 30 },
      { header: "Doanh số", key: "soLuongDaBan", width: 20 },
      { header: "Số bệnh nhân", key: "soBenhNhan", width: 20 },
      { header: "Doanh thu", key: "doanhThu", width: 20 },
      { header: "Tỉ lệ(%)", key: "tyLe", width: 20 },
    ];
    sheet.getRow(1).font = { bold: true };
    for (let i = 1; i <= 6; i++) {
      if (i !== 5 && i !== 2)
        sheet.getColumn(i).alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };
    }
    sheet.getColumn(2).alignment = { vertical: "middle", wrapText: true };
    sheet.getColumn(5).numFmt = "#,##0";
    sheet.getCell("E1").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };
    sheet.getCell("B1").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    const promise = Promise.all(
      table.map((item) => {
        sheet.addRow({
          stt: item.stt,
          dichVu: item.dichVu,
          soLuongDaBan: item.soLuongDaBan,
          soBenhNhan: item.soBenhNhan,
          doanhThu: item.doanhThu,
          tyLe: item.tyLe,
        });
      })
    );
    promise.then(() => {
      sheet.addRow({
        stt: "",
        dichVu: "",
        soLuongDaBan: "",
        soBenhNhan: "",
        doanhThu: totalRevenue,
        tyLe: "",
      });
      sheet.getCell("E" + (table.length + 2)).font = { bold: true };
      workbook.xlsx.writeBuffer().then(function (data) {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download =
          "Báo cáo theo dịch vụ " +
          moment(new Date(selectedMonth)).format("MM/YYYY") +
          ".xlsx";
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <div className="mb-2">
            <b>Chọn tháng, năm</b>
          </div>
          <input
            type="month"
            id="month"
            placeholder="Chọn tháng năm"
            name="month"
            max={moment().format("YYYY-MM")}
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="form-control pb-2 pt-2 mb-3"
          />
          <div className="text-end">
            <button
              onClick={handleExport}
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
              onClick={fetchData}
            >
              Xem
            </button>
          </div>
        </div>
      </div>

      <div className="text-end">
        <h1 className="noteVND">**Tính theo đơn vị VNĐ</h1>
      </div>
      <table className="table">
        <thead style={{ verticalAlign: "middle" }}>
          <tr className="table-secondary">
            <th>STT</th>
            <th>Dịch vụ</th>
            <th>Doanh số (Số lượng đã bán)</th>
            <th>Số bệnh nhân</th>
            <th>Doanh thu</th>
            <th>Tỷ lệ (%)</th>
          </tr>
        </thead>
        <tbody>
          {table.map((item, index) => (
            <tr key={index}>
              <td>{item.stt}</td>
              <td>{item.dichVu}</td>
              <td>{item.soLuongDaBan}</td>
              <td>{item.soBenhNhan}</td>
              <td>{new Intl.NumberFormat("en-DE").format(item.doanhThu)}</td>
              <td>{new Intl.NumberFormat("en-DE").format(item.tyLe)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end">
        <h1
          className="noteVND"
          style={{ fontWeight: "bold", fontSize: "17px" }}
        >
          Tổng doanh thu:{" "}
          {totalRevenue
            ? new Intl.NumberFormat("en-DE").format(totalRevenue)
            : null}
        </h1>
      </div>
    </div>
  );
};

export default XemBaoCaoTheoDichVuTheoThang;
