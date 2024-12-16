import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Api from "../api/Api";

const XemBangLuong = (props) => {
  const [table, setTable] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(
    moment().format("YYYY-MM")
  );
  const CHAMCONG = useRef();
  useEffect(() => {
    calSalary();
  }, []);

  const calSalary = async () => {
    const res = await Api.getDocs("Employee/Attendance");
    const workTimes = res.filter(
      (entry) =>
        moment(entry.ngay, "YYYY-MM-DD").format("YYYY-MM") === selectedMonth
    );

    const staffs = await Api.getAllStaff();

    // Calculate total working hours for each employee
    const hoursWorked = workTimes.reduce((acc, entry) => {
      acc[entry.maNv] = (acc[entry.maNv] || 0) + entry.soGioLam;
      return acc;
    }, {});

    // Fetch bonus data
    const bonuses = await Api.getAllBonus();
    console.log(bonuses);
    const bonusMap = bonuses.reduce((acc, bonus) => {
      staffs.forEach((staff) => {
        const bonusMonthYear = `${bonus.nam}-${bonus.thang
          .toString()
          .padStart(2, "0")}`;
        if (
          bonusMonthYear == selectedMonth &&
          (bonus.loaiNV == "Tất cả" ||
            bonus.loaiNV == staff.chucVu ||
            bonus.maNV === staff.maNv)
        ) {
          acc[staff.maNv] = (acc[staff.maNv] || 0) + bonus.tien;
        }
      });
      return acc;
    }, {});

    // Calculate salary for each employee

    const salaryTable = staffs.map((staff) => {
      const hours = hoursWorked[staff.maNv] || 0;
      const bonus = bonusMap[staff.maNv] || 0;
      const hourlyRate = staff.luongCoBan / (26 * 8);
      const salaryFromHours = Math.round(hourlyRate * hours);
      const totalSalary = salaryFromHours + bonus;

      return {
        MaNV: staff.maNv,
        TenNV: staff.tenNv,
        LuongCoBan: staff.luongCoBan,
        SoGioLam: hours,
        LuongThuong: bonus,
        TongLuong: totalSalary,
      };
    });

    setTable(salaryTable);
  };
  return (
    <div>
      {/* <form name="xemBangLuong" action="/action_page.php"> */}
      <div class="mb-3 mt-3">
        <label for="nameNhanVien">
          <b>Chọn tháng muốn xem</b>
        </label>{" "}
        <br />
        <input
          type="month"
          class="customBox"
          name="nameNhanVien"
          value={selectedMonth}
          max={new Date().toISOString().slice(0, 7)}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="btn pb-2 pt-2 mt-2"
        style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
        // class="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick={calSalary}
      >
        Xem
      </button>
      {/* </form> */}
      <h1 class="noteVND">**Tính theo đơn vị VNĐ</h1>
      <table class="table">
        <thead>
          <tr class="table-secondary">
            <th>Mã nhân viên</th>
            <th>Tên nhân viên</th>
            <th>Lương cơ bản (26 ngày công)</th>
            <th>Số giờ làm</th>
            <th>Lương thưởng</th>
            <th>Tổng lương</th>
          </tr>
        </thead>
        <tbody>
          {table.map((item, index) => (
            <tr key={index}>
              <td>{item.MaNV}</td>
              <td>{item.TenNV}</td>
              <td>{new Intl.NumberFormat("en-DE").format(item.LuongCoBan)}</td>
              <td>{item.SoGioLam}</td>
              <td>{new Intl.NumberFormat("en-DE").format(item.LuongThuong)}</td>
              <td>{new Intl.NumberFormat("en-DE").format(item.TongLuong)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default XemBangLuong;
