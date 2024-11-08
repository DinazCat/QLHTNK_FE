import React, { useState } from "react";

export const FormVatTuThietBi = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      maVatTu: "",
      tenVatTu: "",
      soLuongNhap: "",
      soLuongTonKho: "",
      donGiaNhap: "",
      ngayNhap: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.maVatTu && formState.tenVatTu && formState.soLuongNhap && formState.soLuongTonKho && formState.donGiaNhap && formState.ngayNhap) {
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
            <label for="maVatTu">Mã vật tư</label>
            <input name="maVatTu" 
            onChange={handleChange} 
            value={formState.maVatTu} />
          </div>
          <div className="form-group">
            <label for="tenVatTu">Tên vật tư</label>
            <input
              name="tenVatTu"
              onChange={handleChange}
              type="text"
              value={formState.tenVatTu}
            />
          </div>
          <div className="form-group">
            <label for="soLuongNhap">Số lương nhập</label>
            <input
              name="soLuongNhap"
              onChange={handleChange}
              type="number"
              value={formState.soLuongNhap}
            />
          </div>
          <div className="form-group">
            <label for="soLuongTonKho">Số lương tồn kho</label>
            <input
              name="soLuongTonKho"
              onChange={handleChange}
              type="number"
              value={formState.soLuongTonKho}
            />
          </div>
          <div className="form-group">
            <label for="donGiaNhap">Đơn giá nhập</label>
            <input
              name="donGiaNhap"
              onChange={handleChange}
              type="number"
              value={formState.donGiaNhap}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ngayNhap">Ngày nhập</label>
            <input
              name="ngayNhap"
              onChange={handleChange}
              type="date"
              value={formState.ngayNhap}
            />
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
