import React, { useState } from "react";

export const FormDichVu = ({ closeModal, onSubmit, defaultValue, services}) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      maDichVu: "",
      tenDichVu: "",
      loaiDichVu: "",
      giaDichVu: "",
      baoHanh: "Có",
      coTraGop: "Có",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.maDichVu != "" && formState.tenDichVu != "" && formState.loaiDichVu != "" && formState.giaDichVu != "") {
      const isIdExists = services.some(service => service.maDichVu == formState.maDichVu);
      if(!defaultValue && isIdExists){
        setErrors("Mã dịch vụ này đã tồn tại! Vui lòng nhập một mã dịch vụ khác.");
        return false;
      }
      else {
        setErrors("");
        return true;
      }
    } 
    else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (value == "") {
          switch (key){
            case 'maDichVu': 
              errorFields.push("Mã dịch vụ"); break;
            case 'tenDichVu': 
              errorFields.push("Tên dịch vụ"); break;
            case 'loaiDichVu': 
              errorFields.push("Loại dịch vụ"); break;
            case 'giaDichVu': 
              errorFields.push("Giá dịch vụ"); break; 
            default: break;         
          }
        }
      }
      setErrors("Vui lòng nhập: " + errorFields.join(", "));
      return false;
    }

  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
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
            <label for="loaiDichVu">Loại dịch vụ</label>
            <input
              name="loaiDichVu"
              onChange={handleChange}
              type="text"
              value={formState.loaiDichVu}
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
              value={formState.coTraGop}
            >
              <option value="Có">Có</option>
              <option value="Không">Không</option>
            </select>
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
