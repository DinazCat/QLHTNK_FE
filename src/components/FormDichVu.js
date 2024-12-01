import React, { useState } from "react";

export const FormDichVu = ({
  closeModal,
  onSubmit,
  defaultValue,
  services,
}) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      maDv: "",
      tenDv: "",
      loaiDv: "",
      giaThapNhat: "",
      giaCaoNhat: "",
      moTa: "",
      chinhSachBaoHanh: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (
      //formState.maDv != "" &&
      formState.tenDv != "" &&
      formState.loaiDv != "" &&
      formState.giaThapNhat != "" &&
      formState.giaCaoNhat != ""
    ) {
      const isIdExists = services.some(
        (service) => service.maDv == formState.maDv
      );
      if (!defaultValue && defaultValue.maDv != formState.maDv && isIdExists) {
        setErrors(
          "Mã dịch vụ này đã tồn tại! Vui lòng nhập một mã dịch vụ khác."
        );
        return false;
      } else {
        setErrors("");
        return true;
      }
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (value == "") {
          switch (key) {
            // case "maDv":
            //   errorFields.push("Mã dịch vụ");
            //   break;
            case "tenDv":
              errorFields.push("Tên dịch vụ");
              break;
            case "loaiDv":
              errorFields.push("Loại dịch vụ");
              break;
            case "giaThapNhat":
              errorFields.push("Giá thấp nhất");
              break;
            case "giaCaoNhat":
              errorFields.push("Giá cao nhất");
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
          {formState.maDv && (
            <div className="form-group">
              <label for="maDichVu">Mã dịch vụ</label>
              <input
                name="maDv"
                onChange={handleChange}
                value={formState.maDv}
                disabled
              />
            </div>
          )}
          <div className="form-group">
            <label for="tenDichVu">Tên dịch vụ</label>
            <input
              name="tenDv"
              onChange={handleChange}
              type="text"
              value={formState.tenDv}
            />
          </div>
          <div className="form-group">
            <label for="loaiDichVu">Loại dịch vụ</label>
            <input
              name="loaiDv"
              onChange={handleChange}
              type="text"
              value={formState.loaiDv}
            />
          </div>
          <div className="form-group">
            <label for="giaThapNhat">Giá thấp nhất</label>
            <input
              name="giaThapNhat"
              onChange={handleChange}
              type="number"
              value={formState.giaThapNhat}
            />
          </div>
          <div className="form-group">
            <label for="giaCaoNhat">Giá cao nhất</label>
            <input
              name="giaCaoNhat"
              onChange={handleChange}
              type="number"
              value={formState.giaCaoNhat}
            />
          </div>
          <div className="form-group">
            <label htmlFor="moTa">Mô tả</label>
            <input
              name="moTa"
              onChange={handleChange}
              type="text"
              value={formState.moTa}
            />
          </div>
          <div className="form-group">
            <label htmlFor="chinhSachBaoHanh">Chính sách bảo hành</label>
            <input
              name="chinhSachBaoHanh"
              onChange={handleChange}
              type="text"
              value={formState.chinhSachBaoHanh}
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
