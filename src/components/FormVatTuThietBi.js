import React, { useState } from "react";

export const FormVatTuThietBi = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      maVt: "",
      tenVt: "",
      soLuongNhap: "",
      soLuongTonKho: "",
      donGiaNhap: "",
      ngayNhap: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (!defaultValue) formState.soLuongTonKho = formState.soLuongNhap;
    if (
      //formState.maVt!="" &&
      formState.tenVt != "" &&
      formState.soLuongNhap != "" &&
      (defaultValue ? formState.soLuongTonKho != "" : true) &&
      formState.donGiaNhap != "" &&
      formState.ngayNhap != ""
    ) {
      if (parseInt(formState.soLuongNhap) < parseInt(formState.soLuongTonKho)) {
        setErrors("Số lượng tồn kho không được lớn hơn số lượng nhập!");
        return false;
      }
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (value == "") {
          switch (key) {
            // case 'maVt':
            //   errorFields.push("Mã vật tư"); break;
            case "tenVt":
              errorFields.push("Tên vật tư");
              break;
            case "soLuongNhap":
              errorFields.push("Số lượng nhập");
              break;
            case "soLuongTonKho":
              errorFields.push("Số lượng tồn kho");
              break;
            case "donGiaNhap":
              errorFields.push("Đơn giá nhập");
              break;
            case "ngayNhap":
              errorFields.push("Ngày nhập");
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

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="col-sm-4 modal1">
        <form>
          {formState.maVt && (
            <div className="form-group">
              <label for="maVt">Mã vật tư</label>
              <input
                name="maVt"
                onChange={handleChange}
                value={formState.maVt}
              />
            </div>
          )}
          <div className="form-group">
            <label for="tenVt">Tên vật tư</label>
            <input
              name="tenVt"
              onChange={handleChange}
              type="text"
              value={formState.tenVt}
            />
          </div>
          <div className="form-group">
            <label for="soLuongNhap">Số lượng nhập</label>
            <input
              name="soLuongNhap"
              onChange={handleChange}
              type="number"
              value={formState.soLuongNhap}
            />
          </div>
          {defaultValue && (
            <div className="form-group">
              <label for="soLuongTonKho">Số lương tồn kho</label>
              <input
                name="soLuongTonKho"
                onChange={handleChange}
                type="number"
                value={formState.soLuongTonKho}
              />
            </div>
          )}
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

          {errors && <div className="error">{errors}</div>}
          <button type="submit" className="btnSummit" onClick={handleSubmit}>
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
};
