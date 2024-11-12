import React, { useState } from "react";

export const FormChiNhanh = ({ closeModal, onSubmit, defaultValue, branchs }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      maChiNhanh: "",
      tenChiNhanh: "",
      soLuongPhong: "",
      diaChi: "",
    } 
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.maChiNhanh!="" && formState.tenChiNhanh!="" && formState.diaChi!="" && formState.soLuongPhong!="") {
      const isIdExists = branchs.some(branch => branch.maChiNhanh == formState.maChiNhanh);
      if(!defaultValue && isIdExists){
        setErrors("Mã chi nhánh này đã tồn tại! Vui lòng nhập một mã chi nhánh khác.");
        return false;
      }
      else {
        setErrors("");
        return true;
      }
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (value == "") {
          switch (key){
            case 'maChiNhanh': 
              errorFields.push("Mã chi nhánh"); break;
            case 'tenChiNhanh': 
              errorFields.push("Tên chi nhánh"); break;
            case 'soLuongPhong': 
              errorFields.push("Số lượng phòng"); break;
            case 'diaChi': 
              errorFields.push("Địa chỉ"); break; 
            default: break;         
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
          <div className="form-group">
            <label for="maChiNhanh">Mã chi nhánh</label>
            <input name="maChiNhanh" 
            onChange={handleChange} 
            value={formState.maChiNhanh} />
          </div>
          <div className="form-group">
            <label for="tenChiNhanh">Tên chi nhánh</label>
            <input
              name="tenChiNhanh"
              onChange={handleChange}
              type="text"
              value={formState.tenChiNhanh}
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
            <label htmlFor="soLuongPhong">Số lượng phòng</label>
            <input
              name="soLuongPhong"
              onChange={handleChange}
              type="number"
              value={formState.soLuongPhong}
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
