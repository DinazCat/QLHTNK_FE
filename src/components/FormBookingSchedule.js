import React, { useState, useEffect } from "react";
import Select from "react-select";
import api from "../api/Api";

export const FormBookingSchedule = ({
  closeModal,
  onSubmit,
  onDelete,
  defaultValue,
  flag,
}) => {
  const [formState, setFormState] = useState(defaultValue);
  const [errors, setErrors] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    console.log(defaultValue);
  }, []);

  const validateForm = () => {
    if (
      formState.hoTen != "" &&
      formState.soDienThoai != "" &&
      formState.lyDoKham != ""
    ) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (value == "") {
          switch (key) {
            case "hoTen":
              errorFields.push("Tên bệnh nhân");
              break;
            case "soDienThoai":
              errorFields.push("Số điện thoại");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  const handleDelete = (e) => {
    e.preventDefault();

    onDelete(formState);

    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div
        className="col-sm-4 modal1"
        style={{ overflowY: "auto", height: "80%" }}
      >
        <form>
          <div className="mb-2" style={{ fontWeight: "500" }}>
            Tên bệnh nhân
          </div>
          <input
            className="form-control pb-2 pt-2 mb-3"
            name="hoTen"
            onChange={handleChange}
            value={formState.hoTen}
          ></input>
          <div className="mb-2" style={{ fontWeight: "500" }}>
            Số điện thoại
          </div>
          <input
            className="form-control pb-2 pt-2 mb-3"
            name="soDienThoai"
            onChange={handleChange}
            value={formState.soDienThoai}
          ></input>
          <div className="mb-2" style={{ fontWeight: "500" }}>
            Ngày hẹn
          </div>
          <div
            className="form-control pb-2 pt-2 mb-2"
            style={{ minHeight: "40px" }}
          >
            {formState.ngay}
          </div>
          <div className="mb-2" style={{ fontWeight: "500" }}>
            Giờ
          </div>
          <div
            className="form-control pb-2 pt-2 mb-2"
            style={{ minHeight: "40px" }}
          >
            {formState.gioBatDau}
          </div>
          <div className="mb-2" style={{ fontWeight: "500" }}>
            Lý do khám
          </div>
          <input
            className="form-control pb-2 pt-2 mb-3"
            name="lyDoKham"
            onChange={handleChange}
            value={formState.lyDoKham}
          ></input>
          <div className="mb-2" style={{ fontWeight: "500" }}>
            Ghi chú
          </div>
          <div
            className="send-area mb-2"
            style={{ borderRadius: "5px", borderColor: "#D9D9D9" }}
          >
            <textarea
              rows="2"
              id="GhiChu"
              name="GhiChu"
              onChange={handleChange}
            >
              {formState.ghiChu}
            </textarea>
          </div>
          {errors && <div className="error">{errors}</div>}
          {flag == "add" && (
            <div className="text-end">
              <button
                type="button"
                className="btn pb-2 pt-2 ps-3 pe-3 mt-2 me-2"
                style={{ color: "#0096FF", border: "1px solid #0096FF" }}
                onClick={() => closeModal()}
              >
                Hủy
              </button>

              <button
                type="submit"
                className="btn pb-2 pt-2 ps-3 pe-3 mt-2"
                style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
                onClick={handleSubmit}
              >
                Lưu
              </button>
            </div>
          )}{" "}
          {flag == "edit" && (
            <div className="text-end">
              <button
                type="button"
                className="btn pb-2 pt-2 ps-3 pe-3 mt-2 me-2"
                style={{ color: "#0096FF", border: "1px solid #0096FF" }}
                onClick={handleDelete}
              >
                Xóa lịch hẹn
              </button>

              <button
                type="submit"
                className="btn pb-2 pt-2 ps-3 pe-3 mt-2"
                style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
                onClick={handleSubmit}
              >
                Cập nhật
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
