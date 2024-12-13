import React, { useState } from "react";

export const FormHandleSchedule = ({
  closeModal,
  onSubmit,
  defaultValue,
  sentSchedules,
}) => {
  const [formState, setFormState] = useState(defaultValue);
  const [errors, setErrors] = useState("");
  const [showCheckupSchedule, setShowCheckupSchedule] = useState(false);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
      <div className="col-sm-4 modal1" style={{ fontWeight: "500" }}>
        <form>
          <div className="mb-2">Chọn tình trạng</div>
          <select
            className="form-select pb-2 pt-2 mb-2"
            aria-label="Chọn tình trạng"
            id="trangThai"
            name="trangThai"
            onChange={handleChange}
            value={formState.trangThai}
          >
            <option value="Chưa xử lý">Chưa xử lý</option>
            <option value="Đã xử lý">Đã xử lý</option>
          </select>
          <div className="mb-2">Ghi chú</div>
          <div
            className="send-area mb-2"
            style={{ borderRadius: "5px", borderColor: "#D9D9D9" }}
          >
            <textarea
              rows="2"
              id="ghiChu"
              name="ghiChu"
              onChange={handleChange}
            >
              {formState.ghiChu}
            </textarea>
          </div>

          {formState.trangThai == "Đã xử lý" && (
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="datLichKiemTra"
                name="datLichKiemTra"
                checked={showCheckupSchedule}
                onChange={(e) => {
                  setShowCheckupSchedule(e.target.checked);
                }}
              />
              <label className="form-check-label" htmlFor="datLichKiemTra">
                Đặt lịch cho bệnh nhân
              </label>
            </div>
          )}

          {formState.trangThai == "Đã xử lý" && showCheckupSchedule && (
            <div className="mb-3">
              <div className="mb-2">Ngày hẹn</div>
              <div className="mb-2">
                <input
                  type="date"
                  className="form-control"
                  id="ngay"
                  name="ngay"
                  value={formState.ngay || ""}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="mb-2">Giờ hẹn</div>
              <div className="mb-2">
                <input
                  type="time"
                  className="form-control"
                  id="gio"
                  name="gio"
                  value={formState.gio || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {errors && <div className="error">{errors}</div>}
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
        </form>
      </div>
    </div>
  );
};
