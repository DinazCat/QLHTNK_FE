import { useState, useEffect, useContext } from "react";
import moment from "moment";
import { FormBookingSchedule } from "../components/FormBookingSchedule";
import Api from "../api/Api";
import NotificationModal from "../components/NotificationModal";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

const BookingOnline = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [doctorSchedules, setDoctorSchedules] = useState();
  const [doctors, setDoctors] = useState([]);
  const [flag, setFlag] = useState("");

  useEffect(() => {
    getDoctorSchedules();
  }, []);

  const getDoctorSchedules = async () => {
    const doctorSchedules = await Api.getDocs("Appointment/DoctorSchedule");
    if (doctorSchedules.length != 0) {
      setDoctorSchedules(doctorSchedules);
    }
    const res = await Api.searchStaff({ chucVu: "Nha sĩ" });
    if (res?.message == undefined) {
      setDoctors(
        res.map((item) => ({
          ...item,
          date: moment().format("YYYY-MM-DD"), // Add date field here
        }))
      );
    }
  };

  const changeDate = (e, MaNS) => {
    setDoctors(
      doctors.map((item) =>
        item?.maNv === MaNS ? { ...item, date: e.target.value } : item
      )
    );
  };

  const handleSubmit = async (newData) => {
    if (flag == "add") {
      const data = {
        maChiNhanh: 1000,
        hoTen: newData.hoTen,
        soDienThoai: newData.soDienThoai,
        ngay: newData.ngay,
        gio: newData.gioBatDau,
        lyDoKham: newData.lyDoKham,
        loaiLichHen: "Khám lần đầu",
        trangThai: "Chờ xác nhận",
      };
      const res = await Api.addDoc("Appointment", data);

      if (res) {
        newData = {
          ...newData,
          ghiChu: res.maLichHen.toString(),
        };
        console.log(newData);
        await Api.updateDoc(
          "Appointment/DoctorSchedule",
          newData.maLichLamViec,
          newData
        );
        setDoctorSchedules(
          doctorSchedules.map((item) =>
            item.maLichLamViec == newData.maLichLamViec ? newData : item
          )
        );
      }
    } else if (flag == "edit") {
      await Api.updateDoc("Appointment", newData.maLichHen, newData);
    }
  };

  const handleDelete = async (formData) => {
    console.log(formData);
    await Api.deleteDoc("Appointment", formData.maLichHen);

    const newData = {
      ...formData,
      ghiChu: null,
    };

    await Api.updateDoc(
      "Appointment/DoctorSchedule",
      newData.maLichLamViec,
      newData
    );
    setDoctorSchedules(
      doctorSchedules.map((item) =>
        item.maLichLamViec == newData.maLichLamViec ? newData : item
      )
    );
  };

  const setItemToEdit = async (worktime, doctor) => {
    if (isTimeRangePassed(worktime.gioBatDau, doctor.date)) return;
    if (!worktime.ghiChu) {
      setFlag("add");
      const appointment = {
        ...worktime,
        maBn: "",
        hoTen: "",
        soDienThoai: "",
        maNs: doctor.maNv,
        tenNs: doctor.tenNv,
        ngay: doctor.date,
        gioBatDau: worktime.gioBatDau,
        lyDoKham: "",
        ghiChu: "",
      };
      setSelectedItem({
        appointment: appointment,
        doctor: doctor,
        selectedWorkTime: worktime,
      });
      setModalOpen(true);
    } else {
      setFlag("edit");
      const appointment = await Api.getDoc("Appointment", worktime.ghiChu);
      console.log(appointment);
      setSelectedItem({
        appointment: {
          ...appointment,
          maLichLamViec: worktime.maLichLamViec,
          gioBatDau: appointment.gio,
        },
        doctor: doctor,
        selectedWorkTime: worktime,
      });
      setModalOpen(true);
    }
  };

  function convertDateFormat(targetDate) {
    const parts = targetDate?.split("-");
    const formattedDate = `${parseInt(parts[2])}/${parseInt(
      parts[1]
    )}/${parseInt(parts[0])}`;
    return formattedDate;
  }

  function getWorkTimes(item) {
    const doctorSchedule = doctorSchedules.filter((item1) => {
      return item?.maNv === item1?.maNs && item?.date == item1?.ngay;
    });
    return doctorSchedule;
  }

  function getWorkTime(item) {
    return doctorSchedules.find((item1) => {
      return item?.maNv === item1?.maNs && item?.date == item1?.ngay;
    });
  }

  const isTimeRangePassed = (timeRange, date) => {
    const startTime = timeRange;

    const startDate = new Date(date);
    const [startHour, startMinute] = startTime?.split(":");
    startDate.setHours(parseInt(startHour, 10));
    startDate.setMinutes(parseInt(startMinute, 10));

    return startDate < new Date();
  };

  return (
    <div>
      {doctors?.map((item) => {
        return (
          <div
            className="row p-2 mt-3"
            style={{
              border: "2px solid grey",
              borderRadius: "5px",
              boxShadow: "3px 3px #888888",
            }}
          >
            <div className="col-lg-6 mt-2">
              <div className="row justify-content-center align-items-center">
                <div className="col-auto">
                  <img
                    alt=""
                    src="/images/ava.png"
                    style={{ borderRadius: "50%", width: "100px" }}
                  />
                </div>
                <div className="col">
                  <div>
                    {item?.bangCap}, {item?.tenNv}
                  </div>
                  <div>Kinh nghiệm: {item?.kinhNghiem} năm</div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="datepicker-wrp">
                <div className="btn-wrp">
                  <input
                    type="date"
                    className="btn-clck"
                    value={item?.date}
                    min={moment().format("YYYY-MM-DD")}
                    onChange={(e) => changeDate(e, item?.maNv)}
                  />
                </div>
                <button className="btn btnIconDate">
                  <img alt="" src="/images/dropdown.png" />
                </button>
              </div>
              <div
                style={{
                  height: "340px",
                  overflowY: "auto",
                  fontWeight: "bold",
                }}
              >
                <div className="row ms-0 me-0" style={{ fontWeight: "bold" }}>
                  {!getWorkTime(item) ? (
                    <div className="mt-3">Không có lịch</div>
                  ) : (
                    getWorkTimes(item)?.map((worktime, index) => {
                      return (
                        <div className="col-auto" style={{ cursor: "default" }}>
                          <div
                            className="mt-3 p-2"
                            style={{
                              backgroundColor:
                                worktime.ghiChu ||
                                isTimeRangePassed(worktime.gioBatDau, item.date)
                                  ? "#bfbfbf"
                                  : "#0096FF",
                            }}
                            onClick={() => setItemToEdit(worktime, item)}
                          >
                            {worktime.gioBatDau}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {modalOpen && (
        <FormBookingSchedule
          closeModal={() => {
            setModalOpen(false);
            setSelectedItem(null);
          }}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          defaultValue={selectedItem !== null && selectedItem.appointment}
          flag={flag}
        />
      )}
    </div>
  );
};
export default BookingOnline;
