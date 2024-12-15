import React, { useState, useEffect } from "react";
import "./mistyles.css";
import Api from "../api/Api";
import moment from "moment";
import ExcelJS from "exceljs";

const XemBaoCaoChiNhanhTheoNam = (props) => {
  const [table, setTable] = useState([]);
  const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchData();
  }, [selectedYear]);

  const fetchData = async () => {
    try {
      const chiTietHSDT = await Api.searchCTHSDT({});
      const hoaDon = await Api.getAllBill();
      const chiNhanh = await Api.getAllBranchs();
      updateTable(chiTietHSDT, hoaDon, chiNhanh);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateTable = (chiTietHSDT, hoaDon, chiNhanh) => {
    const branchTable = chiNhanh.reduce((acc, branch) => {
      const maCn = branch.maCn;
      const tenCn = branch.tenCn;

      const records = chiTietHSDT.filter((record) => {
        const ngayDieuTri = moment(record.ngayDieuTri, "YYYY-MM-DD");
        return (
          record.maChiNhanh === maCn &&
          ngayDieuTri.year() === parseInt(selectedYear, 10)
        );
      });

      const soLuongCaThucHien = records.length;
      const soDichVuThucHien = records.reduce(
        (sum, record) => sum + record.dichVuDaSuDungs.length,
        0
      );
      const uniquePatients = new Set(records.map((r) => r.maBn)).size;
      const doanhThu = hoaDon
        .filter((hd) => records.some((r) => r.maCthsdt === hd.maCthsdt))
        .reduce(
          (sum, hd) =>
            sum +
            hd.chiTietThanhToans.reduce(
              (ctSum, ct) => ctSum + (ct.soTienThanhToan || 0),
              0
            ),
          0
        );

      acc[maCn] = {
        chiNhanh: tenCn,
        soLuongCaThucHien,
        soDichVuThucHien,
        soBenhNhan: uniquePatients,
        doanhThu,
      };

      return acc;
    }, {});

    const tongDoanhThu = Object.values(branchTable).reduce(
      (total, row) => total + row.doanhThu,
      0
    );

    const result = Object.values(branchTable).map((item, index) => ({
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
      { header: "Chi nhánh", key: "chiNhanh", width: 30 },
      { header: "Số ca thực hiện", key: "soLuongCaThucHien", width: 20 },
      { header: "Số dịch vụ thực hiện", key: "soDichVuThucHien", width: 20 },
      { header: "Số bệnh nhân", key: "soBenhNhan", width: 20 },
      { header: "Doanh thu", key: "doanhThu", width: 20 },
      { header: "Tỉ lệ(%)", key: "tyLe", width: 20 },
    ];
    sheet.getRow(1).font = { bold: true };
    for (let i = 1; i <= 7; i++) {
      if (i !== 6)
        sheet.getColumn(i).alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };
    }
    sheet.getColumn(6).numFmt = "#,##0";
    sheet.getCell("F1").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    const promise = Promise.all(
      table.map((item) => {
        sheet.addRow({
          stt: item.stt,
          chiNhanh: item.chiNhanh,
          soLuongCaThucHien: item.soLuongCaThucHien,
          soDichVuThucHien: item.soDichVuThucHien,
          soBenhNhan: item.soBenhNhan,
          doanhThu: item.doanhThu,
          tyLe: item.tyLe,
        });
      })
    );
    promise.then(() => {
      sheet.addRow({
        stt: "",
        chiNhanh: "",
        soLuongCaThucHien: "",
        soDichVuThucHien: "",
        soBenhNhan: "",
        doanhThu: totalRevenue,
        tyLe: "",
      });
      sheet.getCell("F" + (table.length + 2)).font = { bold: true };
      workbook.xlsx.writeBuffer().then(function (data) {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download =
          "Báo cáo theo chi nhánh năm " + selectedYear + ".xlsx";
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
            <b>Chọn năm</b>
          </div>
          <input
            type="number"
            min="2010"
            max={moment().format("YYYY")}
            step="1"
            value={selectedYear}
            id="year"
            placeholder="Chọn năm"
            name="year"
            onChange={(e) => setSelectedYear(e.target.value)}
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
            <th>Chi nhánh</th>
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
              <td>{item.stt}</td>
              <td>{item.chiNhanh}</td>
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

export default XemBaoCaoChiNhanhTheoNam;
