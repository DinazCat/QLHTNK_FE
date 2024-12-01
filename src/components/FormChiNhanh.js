import React, { useState } from "react";

export const FormChiNhanh = ({
  closeModal,
  onSubmit,
  defaultValue,
  branchs,
}) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      maCn: "",
      tenCn: "",
      moTa: "",
      diaChi: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (
      //formState.maCn != "" &&
      formState.tenCn != "" &&
      formState.diaChi != ""
    ) {
      const isIdExists = branchs.some(
        (branch) => branch.maCn == formState.maCn
      );
      if (!defaultValue && defaultValue.maCn != formState.maCn && isIdExists) {
        setErrors(
          "Mã chi nhánh này đã tồn tại! Vui lòng nhập một mã chi nhánh khác."
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
            // case "maCn":
            //   errorFields.push("Mã chi nhánh");
            //   break;
            case "tenCn":
              errorFields.push("Tên chi nhánh");
              break;
            case "diaChi":
              errorFields.push("Địa chỉ");
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
          {formState.maCn && (
            <div className="form-group">
              <label for="maCn">Mã chi nhánh</label>
              <input
                name="maCn"
                onChange={handleChange}
                value={formState.maCn}
              />
            </div>
          )}
          <div className="form-group">
            <label for="tenCn">Tên chi nhánh</label>
            <input
              name="tenCn"
              onChange={handleChange}
              type="text"
              value={formState.tenCn}
            />
          </div>
          <div className="form-group">
            <label for="diaChi">Địa chỉ</label>
            <input
              name="diaChi"
              onChange={handleChange}
              type="text"
              value={formState.diaChi}
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

          {errors && <div className="error">{errors}</div>}
          <button type="submit" className="btnSummit" onClick={handleSubmit}>
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
};
