import React, { useState, useEffect } from "react";
import Select from "react-select";

export const FormAppointment = ({
  closeModal,
  onSubmit,
  defaultValue,
  appointments,
  patients,
  dentists,
}) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      benhNhan: "",
      nhaSi: "",
      ngay: "",
      gio: "",
      lyDoKham: "",
      loaiLichHen: "Khám lần đầu",
      trangThai: "Chờ xác nhận",
      ghiChu: "",
    }
  );
  const [errors, setErrors] = useState("");
  const appointmentTypes = ["Khám lần đầu", "Tái khám", "Chữa bệnh"];
  const statuses = [
    "Chờ xác nhận",
    "Đã xác nhận",
    "Đã đến",
    "Đang khám",
    "Đã ra về",
    "Đã hủy",
  ];

  const validateForm = () => {
    console.log(formState);
    if (
      (formState.benhNhan || formState.maBn || formState.hoTen) &&
      //formState.soDienThoai &&
      formState.ngay &&
      formState.gio &&
      formState.lyDoKham
    ) {
      const existingAppointment = appointments.find(
        (appointment) =>
          appointment.maNs == formState.nhaSi?.maNv &&
          appointment.ngay == formState.ngay &&
          appointment.gio == formState.gio
      );
      if (formState.nhaSi && existingAppointment) {
        setErrors("Nha sĩ đã có lịch hẹn vào thời gian này.");
        return false;
      }
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (value === "") {
          switch (key) {
            case "benhNhan":
              errorFields.push("Bệnh nhân");
              break;
            case "nhaSi":
              errorFields.push("Nha sĩ");
              break;
            case "ngay":
              errorFields.push("Ngày hẹn");
              break;
            case "gio":
              errorFields.push("Giờ hẹn");
              break;
            case "lyDoKham":
              errorFields.push("Lý do khám");
              break;
            default:
              break;
          }
        }
      }
      setErrors("Vui lòng nhập: " + errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    if (actionMeta.name === "benhNhan") {
      setFormState({
        ...formState,
        maBn: selectedOption.value.maBn,
        benhNhan: selectedOption.value,
      });
    } else if (actionMeta.name === "nhaSi") {
      setFormState({
        ...formState,
        maNs: selectedOption.value.maNv,
        nhaSi: selectedOption.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="col-sm-4 modal1">
        <form>
          <div className="form-group">
            <label htmlFor="benhNhan">Bệnh nhân</label>
            {!defaultValue || (defaultValue && defaultValue.maBn) ? (
              <Select
                options={patients.map((v) => ({
                  value: v,
                  label: `${v.tenBn} - id${v.maBn}`,
                }))}
                isDisabled={defaultValue ? true : false}
                name="benhNhan"
                onChange={handleSelectChange}
                placeholder={"..."}
                value={{
                  value: patients.find(
                    (patient) => patient.maBn === formState.maBn
                  ),
                  label: patients.find(
                    (patient) => patient.maBn === formState.maBn
                  )
                    ? `${
                        patients.find(
                          (patient) => patient.maBn === formState.maBn
                        ).tenBn
                      } - id${formState.maBn}`
                    : "",
                }}
              />
            ) : (
              <input
                name="benhNhan"
                disabled={true}
                value={formState.hoTen}
              ></input>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="nhaSi">Nha sĩ</label>
            <Select
              options={dentists.map((v) => ({
                value: v,
                label: `${v.tenNv} - id${v.maNv}`,
              }))}
              className="react-select"
              name="nhaSi"
              onChange={handleSelectChange}
              placeholder={"..."}
              value={{
                value: dentists.find(
                  (dentist) => dentist.maNv === formState.maNs
                ),
                label: dentists.find(
                  (dentist) => dentist.maNv === formState.maNs
                )
                  ? `${
                      dentists.find(
                        (dentist) => dentist.maNv === formState.maNs
                      ).tenNv
                    } - id${formState.maNs}`
                  : "",
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ngay">Ngày hẹn</label>
            <input
              type="date"
              name="ngay"
              onChange={handleChange}
              value={formState.ngay}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gio">Giờ hẹn</label>
            <input
              type="time"
              name="gio"
              onChange={handleChange}
              value={formState.gio}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lyDoKham">Lý do khám</label>
            <input
              type="text"
              name="lyDoKham"
              onChange={handleChange}
              value={formState.lyDoKham}
            />
          </div>
          <div className="form-group">
            <label htmlFor="loaiLichHen">Loại lịch hẹn</label>
            <select
              className="form-select"
              name="loaiLichHen"
              onChange={handleChange}
              value={formState.loaiLichHen}
            >
              {appointmentTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="trangThai">Trạng thái</label>
            <select
              className="form-select"
              name="trangThai"
              onChange={handleChange}
              value={formState.trangThai}
            >
              {statuses.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="ghiChu">Ghi chú</label>
            <textarea
              name="ghiChu"
              onChange={handleChange}
              value={formState.ghiChu}
            />
          </div>
          {errors && <div className="error">{errors}</div>}
          <button type="submit" className="btnSummit" onClick={handleSubmit}>
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
};
