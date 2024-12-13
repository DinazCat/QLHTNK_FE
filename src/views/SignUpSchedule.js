import { useState, useEffect } from "react";
import Api from "../api/Api";
import NotificationModal from "../components/NotificationModal";

const table = [
  {
    Thu: "Chủ nhật",
    Sang: false,
    Chieu: false,
    Toi: false,
  },
  {
    Thu: "Thứ hai",
    Sang: false,
    Chieu: false,
    Toi: false,
  },
  {
    Thu: "Thứ ba",
    Sang: false,
    Chieu: false,
    Toi: false,
  },
  {
    Thu: "Thứ tư",
    Sang: false,
    Chieu: false,
    Toi: false,
  },
  {
    Thu: "Thứ năm",
    Sang: false,
    Chieu: false,
    Toi: false,
  },
  {
    Thu: "Thứ sáu",
    Sang: false,
    Chieu: false,
    Toi: false,
  },
  {
    Thu: "Thứ bảy",
    Sang: false,
    Chieu: false,
    Toi: false,
  },
];
const SignUpSchedule = () => {
  const doctorId = "1006";
  const doctorName = "Lê Minh Phương";
  const [scheduleSignedUp, setScheduleSignUp] = useState(table);
  const [currentSchedule, setCurrentSchedule] = useState(table);
  const [doctorSchedule, setDoctorSchedule] = useState(null);
  const [showNoti, setShowNoti] = useState(false);
  const [showNoti2, setShowNoti2] = useState(false);
  const [notiBody, setNotiBody] = useState("");
  const [flag, setFlag] = useState("Save");
  const [selectedMonth, setSelectedMonth] = useState("current");

  useEffect(() => {
    getDoctorSchedule();
  }, []);

  const getDoctorSchedule = async () => {
    const currentDate = new Date();
    let Month = currentDate.getMonth();
    let Year = currentDate.getFullYear();

    const currentSchedule = JSON.parse(localStorage.getItem("doctorSchedule1"));

    if (currentSchedule) setCurrentSchedule(currentSchedule.lichTuan);

    //Next month schedule
    Month += 1;
    if (Month > 11) {
      Month = 0;
      Year += 1;
    }

    const doctorSchedule = JSON.parse(localStorage.getItem("doctorSchedule2"));
    if (doctorSchedule) {
      setScheduleSignUp(doctorSchedule.lichTuan);
      setDoctorSchedule(doctorSchedule);
      setFlag("Update");
    }
  };

  const onSave = async () => {
    const countTrue = scheduleSignedUp.reduce((count, day) => {
      return (
        count + (day.Sang ? 1 : 0) + (day.Chieu ? 1 : 0) + (day.Toi ? 1 : 0)
      );
    }, 0);

    if (countTrue < 4) {
      setNotiBody("Phải đăng ký ít nhất 4 buổi trong 1 tuần!");
      setShowNoti(true);
      return;
    }

    if (selectedMonth == "next") {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() + 1);

      const data = {
        maNs: doctorId,
        tenNs: doctorName,
        lichTuan: scheduleSignedUp,
        thang: currentDate.getMonth() + 1,
        nam: currentDate.getFullYear(),
      };
      localStorage.setItem("doctorSchedule2", JSON.stringify(data));

      //generate Monthly Schedule
      const schedules = generateMonthlySchedule(data);
      for (const item of schedules) {
        await Api.addDoc("Appointment/DoctorSchedule", item);
      }
    } else {
      const data = {
        maNs: doctorId,
        tenNs: doctorName,
        lichTuan: scheduleSignedUp,
        thang: new Date().getMonth() + 1,
        nam: new Date().getFullYear(),
      };
      localStorage.setItem("doctorSchedule1", JSON.stringify(data));
    }

    setNotiBody("Đăng ký lịch thành công!");
    setShowNoti(true);
    setFlag("Update");
  };

  const onUpdate = async () => {
    const countTrue = scheduleSignedUp.reduce((count, day) => {
      return (
        count + (day.Sang ? 1 : 0) + (day.Chieu ? 1 : 0) + (day.Toi ? 1 : 0)
      );
    }, 0);

    if (countTrue < 4) {
      setNotiBody("Phải đăng ký ít nhất 4 buổi trong 1 tuần!");
      setShowNoti(true);
      return;
    }

    setNotiBody("Bạn có chắc muốn thay đổi lịch không?");
    setShowNoti2(true);
  };

  const handleUpdate = async () => {
    setShowNoti2(false);

    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);

    const data = {
      maNs: doctorId,
      tenNs: doctorName,
      lichTuan: scheduleSignedUp,
      thang: currentDate.getMonth() + 1,
      nam: currentDate.getFullYear(),
    };

    localStorage.setItem("doctorSchedule2", JSON.stringify(data));
  };

  function generateMonthlySchedule(data) {
    const { maNs, tenNs, lichTuan, thang, nam } = data;

    const shifts = [
      { time: "Sang", start: "8:00", end: "12:00" },
      { time: "Chieu", start: "13:00", end: "17:00" },
      { time: "Toi", start: "17:00", end: "20:00" },
    ];

    const schedule = [];

    // Hàm chuyển đổi thời gian từ string sang phút
    function timeToMinutes(time) {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    }

    // Hàm chuyển đổi từ phút sang string thời gian
    function minutesToTime(minutes) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}:${mins < 10 ? "0" : ""}${mins}`;
    }

    // Lặp qua từng ngày trong tháng
    const daysInMonth = new Date(nam, thang, 0).getDate(); // Số ngày trong tháng
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(nam, thang - 1, day);
      const weekDayIndex = date.getDay(); // 0 = Chủ nhật, 1 = Thứ hai, ...
      const weekDayName = [
        "Chủ nhật",
        "Thứ hai",
        "Thứ ba",
        "Thứ tư",
        "Thứ năm",
        "Thứ sáu",
        "Thứ bảy",
      ][weekDayIndex];

      // Kiểm tra nếu ngày này có lịch làm việc (dựa trên lichTuan)
      const daySchedule = lichTuan.find((item) => item.Thu === weekDayName);

      if (daySchedule) {
        shifts.forEach((shift) => {
          if (daySchedule[shift.time]) {
            let startTime = timeToMinutes(shift.start);
            const endTime = timeToMinutes(shift.end);

            // Chia lịch làm việc thành các khung giờ 30 phút
            while (startTime < endTime) {
              const nextTime = startTime + 30;
              schedule.push({
                maNs,
                tenNs,
                ngay: `${nam}-${String(thang).padStart(2, "0")}-${String(
                  day
                ).padStart(2, "0")}`,
                GioBatDau: minutesToTime(startTime),
                GioKetThuc: minutesToTime(nextTime),
              });
              startTime = nextTime;
            }
          }
        });
      }
    }

    return schedule;
  }

  const onDefault = () => {
    setScheduleSignUp(currentSchedule);
  };

  const handleChange = (Thu, Buoi, GiaTri) => {
    setScheduleSignUp(
      scheduleSignedUp.map((item) =>
        item.Thu === Thu
          ? {
              ...item,
              [Buoi]: !GiaTri,
            }
          : item
      )
    );
  };

  return (
    <div>
      <div className="mb-3">
        <h1 className="noteVND">**Sáng: 8h-12h</h1>
        <h1 className="noteVND">**Chiều: 13h-17h </h1>
        <h1 className="noteVND">**Tối: 17h-20h </h1>
        <select
          className="form-control pb-2 pt-2 mb-2"
          name="thang"
          onChange={(e) => setSelectedMonth(e.target.value)}
          value={selectedMonth}
        >
          <option value="current">Lịch tháng này</option>
          <option value="next">Đăng ký lịch tháng sau</option>
        </select>
      </div>
      <div className="row g-0">
        {selectedMonth === "current" &&
          currentSchedule.map((item, index) => (
            <div
              className="col-lg col-auto seven-color text-center"
              style={{ color: "#FFF" }}
            >
              <div
                className="wrapcolor d-flex align-items-center justify-content-center"
                style={{ height: "65px" }}
              >
                <b>{item.Thu}</b>
              </div>
              <div className="p-3">
                <div
                  className="mb-3 p-2"
                  style={{
                    backgroundColor: item.Sang ? "#bfbfbf" : "#0096FF",
                    borderRadius: "10px",
                  }}
                >
                  Sáng
                </div>
                <div
                  className="mb-3 p-2"
                  style={{
                    backgroundColor: item.Chieu ? "#bfbfbf" : "#0096FF",
                    borderRadius: "10px",
                  }}
                >
                  Chiều
                </div>
                <div
                  className="mb-3 p-2"
                  style={{
                    backgroundColor: item.Toi ? "#bfbfbf" : "#0096FF",
                    borderRadius: "10px",
                  }}
                >
                  Tối
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="row g-0">
        {selectedMonth === "next" &&
          scheduleSignedUp.map((item, index) => (
            <div
              className="col-lg col-auto seven-color text-center"
              style={{ color: "#FFF" }}
            >
              <div
                className="wrapcolor d-flex align-items-center justify-content-center"
                style={{ height: "65px" }}
              >
                <b>{item.Thu}</b>
              </div>
              <div className="p-3">
                <div
                  className="mb-3 p-2"
                  style={{
                    backgroundColor: item.Sang ? "#bfbfbf" : "#0096FF",
                    borderRadius: "10px",
                  }}
                  onClick={() => handleChange(item.Thu, "Sang", item.Sang)}
                >
                  Sáng
                </div>
                <div
                  className="mb-3 p-2"
                  style={{
                    backgroundColor: item.Chieu ? "#bfbfbf" : "#0096FF",
                    borderRadius: "10px",
                  }}
                  onClick={() => handleChange(item.Thu, "Chieu", item.Chieu)}
                >
                  Chiều
                </div>
                <div
                  className="mb-3 p-2"
                  style={{
                    backgroundColor: item.Toi ? "#bfbfbf" : "#0096FF",
                    borderRadius: "10px",
                  }}
                  onClick={() => handleChange(item.Thu, "Toi", item.Toi)}
                >
                  Tối
                </div>
              </div>
            </div>
          ))}
      </div>
      {selectedMonth === "next" && (
        <div className="text-end">
          <button
            type="button"
            className="btn pb-2 pt-2 ps-3 pe-3 mt-2 me-2"
            style={{ color: "#0096FF", border: "1px solid #0096FF" }}
            onClick={onDefault}
          >
            Mặc định
          </button>
          {flag == "Save" ? (
            <button
              type="submit"
              className="btn pb-2 pt-2 mt-2"
              style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
              onClick={onSave}
            >
              Lưu
            </button>
          ) : (
            <button
              type="submit"
              className="btn pb-2 pt-2 mt-2"
              style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
              onClick={onUpdate}
            >
              Lưu thay đổi
            </button>
          )}
        </div>
      )}

      <NotificationModal
        show={showNoti}
        onHide={() => setShowNoti(false)}
        title="LOGOIPSUM"
        message={notiBody}
      />
      <NotificationModal
        show={showNoti2}
        onHide={() => {
          setShowNoti2(false);
          setScheduleSignUp(doctorSchedule.lichTuan);
        }}
        title="LOGOIPSUM"
        message={notiBody}
        onConfirm={handleUpdate}
      />
    </div>
  );
};
export default SignUpSchedule;
