import moment from "moment";
import { useState, useEffect, useRef } from "react";
import Api from "../api/Api";
import NotificationModal from "../components/NotificationModal";

const ChamCong = () => {
  const BANGCHAMCONG = useRef();
  const staffs = useRef();
  const [table, setTable] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [showNoti, setShowNoti] = useState(false);
  const [notiBody, setNotiBody] = useState("");

  useEffect(() => {
    getWorkTimes();
  }, []);

  const getWorkTimes = async () => {
    BANGCHAMCONG.current = await Api.getDocs("Employee/Attendance");

    staffs.current = await Api.getAllStaff();

    const filteredAttendance = BANGCHAMCONG.current.filter(
      (item) =>
        moment(item.ngay).format("YYYY-MM-DD") ===
        moment(selectedDate).format("YYYY-MM-DD")
    );

    const newTable = staffs.current.map((staff) => {
      const attendanceRecord = filteredAttendance.find(
        (item) => item.maNv === staff.maNv
      );
      return {
        maNv: staff.maNv,
        tenNv: staff.tenNv,
        ngay: selectedDate,
        maCc: attendanceRecord ? attendanceRecord.maCc : null,
        soGioLam: attendanceRecord ? attendanceRecord.soGioLam : 0,
      };
    });

    console.log(newTable);

    setTable(newTable);
  };

  const handleChange = (e, row) => {
    setTable(
      table.map((item) =>
        item.maNv === row.maNv
          ? {
              ...item,
              soGioLam: e.target.value,
            }
          : item
      )
    );
  };

  const onSave = async () => {
    console.log(table);

    for (const row of table) {
      if (row.maCc === null) {
        const newDoc = {
          maNv: row.maNv,
          ngay: selectedDate,
          soGioLam: row.soGioLam,
        };
        const res = await Api.addDoc("Employee/Attendance", newDoc);
        if (res && res.maCc) {
          row.maCc = res.maCc;
        }
      } else {
        const recordIndex = BANGCHAMCONG.current.findIndex(
          (item) => item.maCc === row.maCc
        );
        if (recordIndex !== -1) {
          BANGCHAMCONG.current[recordIndex].SoGioLam = row.soGioLam;
          await Api.updateDoc("Employee/Attendance", row.maCc, row);
        }
      }
    }
    setNotiBody("Đã lưu thành công!");
    setShowNoti(true);
  };

  const onSee = async () => {
    getWorkTimes();
  };
  return (
    <div>
      <div className="col-lg-4 col-md-6 mt-2">
        <input
          type="date"
          className="form-control pb-2 pt-2"
          id="Ngay"
          name="Ngay"
          min={moment().startOf("month").format("YYYY-MM-DD")}
          max={moment().format("YYYY-MM-DD")}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <div className="text-start">
          <button
            type="submit"
            className="btn pb-2 pt-2 mt-2"
            style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
            onClick={onSee}
          >
            Xem
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr className="table-secondary">
            <th>Mã nhân viên</th>
            <th>Họ và tên</th>
            <th>Số giờ làm</th>
          </tr>
        </thead>
        {table.map((row, idx) => {
          return (
            <tr>
              <td>{row.maNv}</td>
              <td>{row.tenNv}</td>
              <td>
                <input
                  className="signature"
                  type="text"
                  value={row.soGioLam}
                  onChange={(e) => handleChange(e, row)}
                />
              </td>
            </tr>
          );
        })}
        <tbody></tbody>
      </table>
      <div className="text-end">
        <button
          type="submit"
          className="btn pb-2 pt-2 mt-2"
          style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
          onClick={onSave}
        >
          Lưu
        </button>
      </div>
      <NotificationModal
        show={showNoti}
        onHide={() => setShowNoti(false)}
        title="LOGOIPSUM"
        message={notiBody}
      />
    </div>
  );
};
export default ChamCong;
