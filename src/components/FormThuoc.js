import React, { useState } from "react";

export const FormThuoc = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      maThuoc: "",
      tenThuoc: "",
      soLuongNhap: "",
      donGiaNhap: "",
      donGiaBan: "",
      hanSuDung: "",
      ngayNhap: "",
      soLuongTonKho: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (!defaultValue) formState.soLuongTonKho = formState.soLuongNhap;
    if (
      //formState.maThuoc != "" &&
      formState.tenThuoc != "" &&
      formState.soLuongNhap != "" &&
      formState.donGiaBan != "" &&
      formState.donGiaNhap != "" &&
      formState.hanSuDung != "" &&
      formState.ngayNhap != "" &&
      (defaultValue ? formState.soLuongTonKho != "" : true)
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
            // case 'maThuoc':
            //   errorFields.push("Mã thuốc"); break;
            case "tenThuoc":
              errorFields.push("Tên thuốc");
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
            case "donGiaBan":
              errorFields.push("Đơn giá bán");
              break;
            case "hanSuDung":
              errorFields.push("Hạn sử dụng");
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
          {formState.maThuoc && (
            <div className="form-group">
              <label for="maThuoc">Mã thuốc</label>
              <input
                name="maThuoc"
                onChange={handleChange}
                value={formState.maThuoc}
              />
            </div>
          )}
          <div className="form-group">
            <label for="tenThuoc">Tên thuốc</label>
            <input
              name="tenThuoc"
              onChange={handleChange}
              type="text"
              value={formState.tenThuoc}
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
          <div className="form-group">
            <label htmlFor="donGiaNhap">Đơn giá nhập</label>
            <input
              name="donGiaNhap"
              onChange={handleChange}
              type="number"
              value={formState.donGiaNhap}
            />
          </div>
          <div className="form-group">
            <label htmlFor="donGiaBan">Đơn giá</label>
            <input
              name="donGiaBan"
              type="number"
              onChange={handleChange}
              value={formState.donGiaBan}
            />
          </div>
          <div className="form-group">
            <label htmlFor="hanSuDung">Hạn sử dụng</label>
            <input
              name="hanSuDung"
              type="date"
              onChange={handleChange}
              value={formState.hanSuDung}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ngayNhap">Ngày nhập</label>
            <input
              name="ngayNhap"
              type="date"
              onChange={handleChange}
              value={formState.ngayNhap}
            />
          </div>
          {defaultValue && (
            <div className="form-group">
              <label htmlFor="soLuongTonKho">Số lượng tồn kho</label>
              <input
                name="soLuongTonKho"
                type="number"
                onChange={handleChange}
                value={formState.soLuongTonKho}
              />
            </div>
          )}
          {errors && <div className="error">{errors}</div>}
          <button type="submit" className="btnSummit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
