import React, { useState } from "react";

export const FormDichVu = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      maDichVu: "",
      tenDichVu: "",
      giaDichVu: "",
      baoHanh: "",
      coTragop: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.maDichVu && formState.tenDichVu && formState.giaDichVu ) {
        setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return true;
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
            <label for="maDichVu">Mã dịch vụ</label>
            <input name="maDichVu" 
            onChange={handleChange} 
            value={formState.maDichVu} />
          </div>
          <div className="form-group">
            <label for="tenDichVu">Tên dịch vụ</label>
            <input
              name="tenDichVu"
              onChange={handleChange}
              type="text"
              value={formState.tenDichVu}
            />
          </div>
          <div className="form-group">
            <label for="giaDichVu">Giá dịch vụ</label>
            <input
              name="giaDichVu"
              onChange={handleChange}
              type="number"
              value={formState.giaDichVu}
            />
          </div>
          <div className="form-group">
            <label htmlFor="baoHanh">Bảo hành</label>
            <select
              name="baoHanh"
              onChange={handleChange}
              value={formState.baoHanh}
            >
              <option value="Có">Có</option>
              <option value="Không">Không</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="coTraGop">Có trả góp</label>
            <select
              name="coTraGop"
              onChange={handleChange}
              value={formState.coTragop}
            >
              <option value="co">Có</option>
              <option value="khong">Không</option>
            </select>
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btnSummit" onClick={handleSubmit}>
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
};
