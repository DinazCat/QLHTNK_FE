import React, { useState, useEffect } from "react";
import Select from "react-select";
import Api from "../api/Api";
import moment from "moment";
import { FormAppointment } from "../components/FormAppointment";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import api from "../api/Api";

const ScheduleList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    MaBN: "",
    TenBN: "",
    MaNS: "",
    TenNS: "",
    NgayHen: "",
    DichVu: "",
    LoaiLichHen: "",
    TrangThai: "",
  });
  const [selectedDate, setSelectedDate] = useState();
  const [rowToEdit, setRowToEdit] = useState(null);
  const [dentists, setDentists] = useState([]);
  const [patients, setPatients] = useState([]);

  const appointmentTypes = ["Tất cả", "Khám lần đầu", "Tái khám", "Chữa bệnh"];
  const statuses = [
    "Tất cả",
    "Chờ xác nhận",
    "Đã xác nhận",
    "Đã đến",
    "Đang khám",
    "Đã ra về",
    "Đã hủy",
  ];

  useEffect(() => {
    getAppointments();
    getDentists();
    getPatients();
  }, []);

  const normalizeDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const getAppointments = async () => {
    const bookings = await Api.getDocs("Appointment");
    if (bookings) {
      const list = bookings
        .filter(
          (item) => item.loaiLichHen !== "WebBooking"
          // && item.ngay == moment().format("YYYY-MM-DD")
        )
        .sort((a, b) => {
          const dateTimeA = new Date(`${normalizeDate(a.ngay)}T${a.gio}`);
          const dateTimeB = new Date(`${normalizeDate(b.ngay)}T${b.gio}`);
          return dateTimeB - dateTimeA;
        });

      setAppointments(list);
    }
  };

  const getDentists = async () => {
    const res = await api.searchStaff({ chucVu: "Nha sĩ" });
    if (res?.message == undefined) {
      setDentists(res);
    }
  };

  const getPatients = async () => {
    const res = await api.getAllPatient();

    if (res?.length != 0) setPatients(res);
  };

  const onSearch = async () => {
    console.log(searchCriteria);
    const appointments = await Api.getDocsBySeacrh(
      "Appointment",
      searchCriteria
    );
    setAppointments(
      appointments
        .filter((item) => item.loaiLichHen !== "WebBooking")
        .sort((a, b) => {
          const dateTimeA = new Date(`${normalizeDate(a.ngay)}T${a.gio}`);
          const dateTimeB = new Date(`${normalizeDate(b.ngay)}T${b.gio}`);
          return dateTimeB - dateTimeA;
        })
    );
  };

  const handleChange = (e) => {
    setSearchCriteria({
      ...searchCriteria,
      [e.target.name]: e.target.value != "Tất cả" ? e.target.value : "",
    });
    if (e.target.name == "NgayHen") setSelectedDate(e.target.value);
  };

  const handleDeleteRow = (targetIndex) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );
    if (shouldDelete) {
      setAppointments(appointments.filter((_, idx) => idx !== targetIndex));
      api.deleteDoc("Appointment", appointments[targetIndex].maLichHen);
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    console.log(newRow);

    if (rowToEdit == null) {
      const data = {
        maChiNhanh: 1000,
        maBn: newRow.benhNhan?.maBn,
        hoTen: newRow.benhNhan?.tenBn,
        maNs: newRow.nhaSi?.maNv,
        soDienThoai: newRow.benhNhan?.soDienThoai,
        ngay: newRow.ngay,
        gio: newRow.gio,
        lyDoKham: newRow.lyDoKham,
        loaiLichHen: newRow.loaiLichHen,
        trangThai: newRow.trangThai,
        ghiChu: newRow.ghiChu,
      };
      console.log(data);
      const res = await api.addDoc("Appointment", data);
      setAppointments([...appointments, res]);
    } else {
      newRow = {
        ...newRow,
        maBn: newRow.benhNhan?.maBn || newRow.maBn,
        hoTen: newRow.benhNhan?.tenBn || newRow.hoTen,
        maNs: newRow.nhaSi?.maNv || newRow.maNs,
        soDienThoai: newRow.benhNhan?.soDienThoai || newRow.soDienThoai,
      };

      api.updateDoc("Appointment", newRow.maLichHen, newRow);
      let updatedAppointments = appointments.map((currRow, idx) => {
        if (idx !== rowToEdit) return currRow;
        return newRow;
      });
      setAppointments(updatedAppointments);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-3 col-md-6">
          <div className="mb-2">
            <b>Mã bệnh nhân</b>
          </div>
          <input
            className="form-control pb-2 pt-2 mb-3"
            name="MaBN"
            onChange={handleChange}
            value={searchCriteria.MaBN}
          ></input>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="mb-2">
            <b>Tên bệnh nhân</b>
          </div>
          <input
            className="form-control pb-2 pt-2 mb-3"
            name="TenBN"
            onChange={handleChange}
            value={searchCriteria.TenBN}
          ></input>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="mb-2">
            <b>Mã nha sĩ</b>
          </div>
          <input
            className="form-control pb-2 pt-2 mb-3"
            name="MaNS"
            onChange={handleChange}
            value={searchCriteria.MaNS}
          ></input>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="mb-2">
            <b>Tên nha sĩ</b>
          </div>
          <input
            className="form-control pb-2 pt-2 mb-3"
            name="TenNS"
            onChange={handleChange}
            value={searchCriteria.TenNS}
          ></input>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="mb-2">
            <b>Lý do khám</b>
          </div>
          <input
            className="form-control pb-2 pt-2 mb-3"
            name="DichVu"
            onChange={handleChange}
            value={searchCriteria.DichVu}
          ></input>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="mb-2">
            <b>Ngày hẹn</b>
          </div>
          <input
            type="date"
            className="form-control pb-2 pt-2"
            id="NgayHen"
            name="NgayHen"
            value={selectedDate}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="mb-2">
            <b>Loại lịch hẹn</b>
          </div>
          <select
            className="form-select"
            name="LoaiLichHen"
            onChange={handleChange}
            value={searchCriteria.LoaiLichHen}
          >
            {appointmentTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="mb-2">
            <b>Trạng thái</b>
          </div>
          <select
            className="form-select"
            name="TrangThai"
            onChange={handleChange}
            value={searchCriteria.TrangThai}
          >
            {statuses.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="text-end">
          <button
            onClick={() => setModalOpen(true)}
            type="submit"
            className="btn pb-2 pt-2 mt-3 me-2"
            style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
          >
            Thêm
          </button>

          <button
            type="submit"
            className="btn pb-2 pt-2 mt-3"
            style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
            onClick={onSearch}
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr className="table-secondary">
            <th>Mã bệnh nhân</th>
            <th>Tên bệnh nhân</th>
            <th>Số điện thoại</th>
            <th>Mã nha sĩ</th>
            <th>Tên nha sĩ</th>
            <th>Ngày hẹn</th>
            <th>Giờ hẹn</th>
            <th>Lý do khám</th>
            <th>Loại lịch hẹn</th>
            <th>Trạng thái</th>
            <th>Ghi chú</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((item, index) => (
            <tr key={index}>
              <td>{item.maBn}</td>
              <td>{item.hoTen}</td>
              <td>{item.soDienThoai}</td>
              <td>{item.maNs}</td>
              <td>
                {dentists.find((dentist) => dentist.maNv === item.maNs)
                  ?.tenNv || ""}
              </td>
              <td>{item.ngay}</td>
              <td>{item.gio}</td>
              <td>{item.lyDoKham}</td>
              <td>{item.loaiLichHen}</td>
              <td>{item.trangThai}</td>
              <td>{item.ghiChu}</td>
              <td className="fit">
                <span className="actions">
                  <BsFillTrashFill
                    className="delete-btn"
                    onClick={() => handleDeleteRow(index)}
                  />
                  <BsFillPencilFill
                    className="edit-btn"
                    onClick={() => handleEditRow(index)}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <FormAppointment
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && appointments[rowToEdit]}
          appointments={appointments}
          dentists={dentists}
          patients={patients}
        />
      )}
    </div>
  );
};
export default ScheduleList;
