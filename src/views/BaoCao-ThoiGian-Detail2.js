import React, { useState, useEffect, useRef, useContext } from "react";
import "./mistyles.css";
import Api from "../api/Api";
import moment from "moment";
import { AuthContext } from "../hook/AuthProvider";
import ExcelJS from "exceljs";

const XemBaoCaoTheoNam = (props) => {
  const { user } = useContext(AuthContext);
  const [table, setTable] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [totalRevenue, setTotalRevenue] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const chiTietHSDT = await Api.searchCTHSDT({});
      const hoaDon = await Api.getAllBill();
      updateTable(chiTietHSDT, hoaDon);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateTable = (chiTietHSDT, hoaDon) => {
    const revenueTable = chiTietHSDT?.reduce((acc, record) => {
      const ngayDieuTri = moment(record.ngayDieuTri, "YYYY-MM-DD");
      if (ngayDieuTri.year() === parseInt(selectedYear, 10)) {
        const month = ngayDieuTri.format("MM");
        const soCa = 1;
        const soDichVu = record.dichVuDaSuDungs.reduce(
          (sum, dv) => sum + (dv.soLuong || 0),
          0
        );

        // Count unique patients by maBn
        const uniquePatients = new Set(
          chiTietHSDT
            .filter((r) =>
              moment(r.ngayDieuTri, "YYYY-MM-DD").isSame(ngayDieuTri, "month")
            )
            .map((r) => r.maBn)
        ).size;

        const doanhThu = hoaDon
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

        if (!acc[month]) {
          acc[month] = {
            thang: month,
            soLuongCaThucHien: 0,
            soDichVuThucHien: 0,
            soBenhNhan: 0,
            doanhThu: 0,
          };
        }

        acc[month].soLuongCaThucHien += soCa;
        acc[month].soDichVuThucHien += soDichVu;
        acc[month].soBenhNhan = uniquePatients;
        acc[month].doanhThu += doanhThu;
      }
      return acc;
    }, {});

    const tongDoanhThu = Object.values(revenueTable).reduce(
      (total, row) => total + row.doanhThu,
      0
    );

    const result = Object.values(revenueTable)
      .map((item) => ({
        ...item,
        tyLe: parseFloat(((item.doanhThu * 100) / tongDoanhThu).toFixed(1)),
      }))
      .sort((a, b) => a.thang - b.thang); // Sort by month

    setTable(result);
    setTotalRevenue(tongDoanhThu);
  };

  const handleExport = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Báo cáo");
    sheet.columns = [
      { header: "Tháng", key: "thang", width: 20 },
      { header: "Số ca thực hiện", key: "soLuongCaThucHien", width: 20 },
      { header: "Số dịch vụ thực hiện", key: "soDichVuThucHien", width: 20 },
      { header: "Số bệnh nhân", key: "soBenhNhan", width: 20 },
      { header: "Doanh thu", key: "doanhThu", width: 20 },
      { header: "Tỉ lệ(%)", key: "tyLe", width: 20 },
    ];
    sheet.getRow(1).font = { bold: true };
    for (let i = 1; i <= 6; i++) {
      if (i !== 5)
        sheet.getColumn(i).alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };
    }
    sheet.getColumn(5).numFmt = "#,##0";
    sheet.getCell("E1").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    const promise = Promise.all(
      table.map((item, index) => {
        sheet.addRow({
          thang: item?.thang,
          soLuongCaThucHien: item?.soLuongCaThucHien,
          soDichVuThucHien: item?.soDichVuThucHien,
          soBenhNhan: item?.soBenhNhan,
          doanhThu: item?.doanhThu,
          tyLe: item?.tyLe,
        });
      })
    );
    promise.then(() => {
      sheet.addRow({
        thang: "",
        soLuongCaThucHien: "",
        soDichVuThucHien: "",
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
        anchor.download = "Báo cáo năm " + selectedYear + ".xlsx";
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
    });
  };

  return (
    <div>
      <div class="row">
        <div className="col-md-4">
          <div className="mb-2">
            <b>Chọn tháng, năm</b>
          </div>
          <input
            className="form-control pb-2 pt-2 mb-3"
            type="number"
            min="2010"
            max="2024"
            step="1"
            value={selectedYear}
            id="year"
            placeholder="Chọn năm bắt đầu"
            name="year"
            onChange={(e) => setSelectedYear(e.target.value)}
          />
          <div className="text-start">
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
        <h1 class="noteVND">**Tính theo đơn vị VNĐ</h1>
      </div>
      <table class="table">
        <thead style={{ verticalAlign: "middle" }}>
          <tr class="table-secondary">
            <th>Tháng</th>
            <th>Số ca thực hiện</th>
            <th>Số dịch vụ thực hiện</th>
            <th>Số bệnh nhân</th>
            <th>Tổng doanh thu</th>
            <th>Tỷ lệ (%)</th>
          </tr>
        </thead>
        <tbody>
          {table.map((item, index) => (
            <tr key={index}>
              <td>{item.thang}</td>
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

export default XemBaoCaoTheoNam;
