import React, { useState, useEffect, useContext } from "react";
import "./mistyles.css";
import Api from "../api/Api";
import moment from "moment";
import { AuthContext } from "../hook/AuthProvider";
import ExcelJS from "exceljs";

const XemBaoCaoBacSiTheoNam = (props) => {
  const { user } = useContext(AuthContext);
  const [table, setTable] = useState([]);
  const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
  const [totalCases, setTotalCases] = useState(0);

  useEffect(() => {
    fetchData();
  }, [selectedYear]);

  const fetchData = async () => {
    try {
      const chiTietHSDT = await Api.searchCTHSDT({});
      const nhaSi = await Api.searchStaff({ chucVu: "Nha sĩ" });
      updateTable(chiTietHSDT, nhaSi);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const updateTable = (chiTietHSDT, nhaSi) => {
    const doctorTable = nhaSi.reduce((acc, doctor) => {
      const maNhaSi = doctor.maNv;
      const tenNhaSi = doctor.tenNv;

      const records = chiTietHSDT?.filter((record) => {
        const ngayDieuTri = moment(record.ngayDieuTri, "YYYY-MM-DD");
        return (
          record.maNhaSi === maNhaSi &&
          ngayDieuTri.year() === parseInt(selectedYear, 10)
        );
      });

      const soLuongCaThucHien = records.length;
      const uniquePatients = new Set(records.map((r) => r.maBn)).size;

      acc[maNhaSi] = {
        maNhaSi,
        tenNhaSi,
        soLuongCaThucHien,
        soBenhNhan: uniquePatients,
      };

      return acc;
    }, {});

    const tongSoCa = Object.values(doctorTable).reduce(
      (total, row) => total + row.soLuongCaThucHien,
      0
    );

    const result = Object.values(doctorTable).map((item, index) => ({
      stt: index + 1,
      ...item,
      tyLe: parseFloat(((item.soLuongCaThucHien * 100) / tongSoCa).toFixed(1)),
    }));

    setTable(result);
    setTotalCases(tongSoCa);
  };

  const handleExport = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Báo cáo");
    sheet.columns = [
      { header: "STT", key: "stt", width: 10 },
      { header: "Mã nha sĩ", key: "maNhaSi", width: 20 },
      { header: "Tên nha sĩ", key: "tenNhaSi", width: 25 },
      { header: "Số ca thực hiện", key: "soLuongCaThucHien", width: 20 },
      { header: "Số bệnh nhân", key: "soBenhNhan", width: 20 },
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
    sheet.getCell("E1").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    const promise = Promise.all(
      table.map((item) => {
        sheet.addRow({
          stt: item.stt,
          maNhaSi: item.maNhaSi,
          tenNhaSi: item.tenNhaSi,
          soLuongCaThucHien: item.soLuongCaThucHien,
          soBenhNhan: item.soBenhNhan,
          tyLe: item.tyLe,
        });
      })
    );
    promise.then(() => {
      sheet.addRow({
        stt: "",
        maNhaSi: "",
        tenNhaSi: "",
        soLuongCaThucHien: totalCases,
        soBenhNhan: "",
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
        anchor.download = "Báo cáo theo bác sĩ năm " + selectedYear + ".xlsx";
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
        <h1 className="noteVND">**Tính theo đơn vị VNĐ</h1>
      </div>
      <table className="table">
        <thead style={{ verticalAlign: "middle" }}>
          <tr className="table-secondary">
            <th>STT</th>
            <th>Mã nha sĩ</th>
            <th>Tên nha sĩ</th>
            <th>Số ca thực hiện</th>
            <th>Số bệnh nhân</th>
            <th>Tỷ lệ ca thực hiện (%)</th>
          </tr>
        </thead>
        <tbody>
          {table.map((item, index) => (
            <tr key={index}>
              <td>{item.stt}</td>
              <td>{item.maNhaSi}</td>
              <td>{item.tenNhaSi}</td>
              <td>{item.soLuongCaThucHien}</td>
              <td>{item.soBenhNhan}</td>
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
          Tổng số ca thực hiện: {totalCases}
        </h1>
      </div>
    </div>
  );
};

export default XemBaoCaoBacSiTheoNam;
