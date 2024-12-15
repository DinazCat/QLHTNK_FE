import React, { useState, useEffect, useRef, useContext } from "react";
import "./mistyles.css";
import Api from "../api/Api";
import moment from "moment";
import { AuthContext } from "../hook/AuthProvider";
import ExcelJS from "exceljs";

const XemBaoCaoCPPKTheoNam = (props) => {
  const { user } = useContext(AuthContext);
  const [table, setTable] = useState([]);
  const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    fetchData();
  }, [selectedYear]);

  const fetchData = async () => {
    try {
      const thuoc = await Api.getAllDrugs();
      const vatTu = await Api.getAllMaterials();
      const totalSalary = await calSalary();

      const drugCost = thuoc.reduce((total, item) => {
        if (
          moment(item.ngayNhap, "YYYY-MM-DD").format("YYYY") === selectedYear
        ) {
          return total + item.soLuongNhap * item.donGiaNhap;
        }
        return total;
      }, 0);

      const materialCost = vatTu.reduce((total, item) => {
        if (
          moment(item.ngayNhap, "YYYY-MM-DD").format("YYYY") === selectedYear
        ) {
          return total + item.soLuongNhap * item.donGiaNhap;
        }
        return total;
      }, 0);

      const totalExpenses = drugCost + materialCost + totalSalary;

      setTable([
        {
          tenChiPhi: "Tiền thuốc",
          soTien: drugCost,
          tyLe: ((drugCost / totalExpenses) * 100).toFixed(2),
        },
        {
          tenChiPhi: "Tiền vật tư thiết bị",
          soTien: materialCost,
          tyLe: ((materialCost / totalExpenses) * 100).toFixed(2),
        },
        {
          tenChiPhi: "Tiền lương nhân viên",
          soTien: totalSalary,
          tyLe: ((totalSalary / totalExpenses) * 100).toFixed(2),
        },
      ]);

      setTotalExpenses(totalExpenses);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calSalary = async () => {
    const res = await Api.getDocs("Employee/Attendance");
    const workTimes = res.filter(
      (entry) =>
        moment(entry.ngay, "YYYY-MM-DD").format("YYYY") === selectedYear
    );

    const staffs = await Api.getAllStaff();

    const hoursWorked = workTimes.reduce((acc, entry) => {
      acc[entry.maNv] = (acc[entry.maNv] || 0) + entry.soGioLam;
      return acc;
    }, {});

    const bonuses = await Api.getAllBonus();
    const bonusMap = bonuses.reduce((acc, bonus) => {
      staffs.forEach((staff) => {
        const bonusYear = bonus.nam.toString();
        if (
          bonusYear === selectedYear &&
          (bonus.loaiNV === "Tất cả" ||
            bonus.loaiNV === staff.chucVu ||
            bonus.maNV === staff.maNv)
        ) {
          acc[staff.maNv] = (acc[staff.maNv] || 0) + bonus.tien;
        }
      });
      return acc;
    }, {});

    const totalSalary = staffs.reduce((total, staff) => {
      const hours = hoursWorked[staff.maNv] || 0;
      const bonus = bonusMap[staff.maNv] || 0;
      const hourlyRate = staff.luongCoBan / (26 * 8);
      const salaryFromHours = Math.round(hourlyRate * hours);
      return total + salaryFromHours + bonus;
    }, 0);

    return totalSalary;
  };

  const handleExport = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Báo cáo");
    sheet.columns = [
      { header: "Tên chi phí", key: "tenChiPhi", width: 20 },
      { header: "Số tiền đã chi trả", key: "soTien", width: 20 },
      { header: "Tỷ lệ", key: "tyLe", width: 20 },
    ];
    sheet.getRow(1).font = { bold: true };
    for (let i = 1; i <= 3; i++) {
      if (i !== 2)
        sheet.getColumn(i).alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };
    }
    sheet.getColumn(2).numFmt = "#,##0";
    sheet.getCell("B1").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    const promise = Promise.all(
      table.map((item, index) => {
        sheet.addRow({
          tenChiPhi: item?.tenChiPhi,
          soTien: item?.soTien,
          tyLe: item?.tyLe,
        });
      })
    );
    promise.then(() => {
      sheet.addRow({
        tenChiPhi: "",
        soTien: totalExpenses,
        tyLe: "",
      });
      sheet.getCell("B" + (table.length + 2)).font = { bold: true };
      workbook.xlsx.writeBuffer().then(function (data) {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download =
          "Báo cáo theo chi phí phòng khám năm " + selectedYear + ".xlsx";
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
        <h1 class="noteVND">**Tính theo đơn vị VNĐ</h1>
      </div>
      <table class="table">
        <thead style={{ verticalAlign: "middle" }}>
          <tr class="table-secondary">
            <th>Tên chi phí</th>
            <th>Số tiền đã chi trả</th>
            <th>Tỷ lệ</th>
          </tr>
        </thead>
        <tbody>
          {table.map((item, index) => (
            <tr key={index}>
              <td>{item.tenChiPhi}</td>
              <td>{new Intl.NumberFormat("en-DE").format(item.soTien)}</td>
              <td>{new Intl.NumberFormat("en-DE").format(item.tyLe)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end">
        <h1 class="noteVND" style={{ fontWeight: "bold", fontSize: "17px" }}>
          Tổng chi phí:{" "}
          {totalExpenses
            ? new Intl.NumberFormat("en-DE").format(totalExpenses)
            : null}
        </h1>
      </div>
    </div>
  );
};

export default XemBaoCaoCPPKTheoNam;
