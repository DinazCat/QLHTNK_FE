import React, { useState } from "react";

export const FormMaGiamGia = ({ closeModal, onSubmit, defaultValue,signal }) => {
  const [formState, setFormState] = useState(
    defaultValue? 
    {
      TenGiamGia: defaultValue.tenGiamGia,
      PhanTramGiam: defaultValue.phanTramGiam,
      NgayBatDau:defaultValue.ngayBatDau,
      NgayKetThuc:defaultValue.ngayKetThuc,
      DieuKienApDung: defaultValue.dieuKienApDung,
    }:
     {
      TenGiamGia: "",
      PhanTramGiam: "",
      NgayBatDau: "",
      NgayKetThuc: "",
      DieuKienApDung: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.TenGiamGia && formState.PhanTramGiam && formState.NgayBatDau && formState.NgayKetThuc && formState.DieuKienApDung) {
      const start = new Date(formState.NgayBatDau);
      const currentDate = new Date();
      const finish = new Date(formState.NgayKetThuc);
      // Reset thời gian về 00:00:00
      start.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);
      finish.setHours(0, 0, 0, 0);
      if(formState.PhanTramGiam <= 0 || formState.PhanTramGiam > 100 ){
        setErrors("Phần trăm giảm không được bằng hay nhỏ hơn 0 và lớn hơn 100")
        return false
      }
      if(start > finish){
        setErrors("Ngày bắt đầu không được lớn hơn ngày kết thúc")
        return false
      }
      if(start < currentDate && signal == 0){
        setErrors("Ngày bắt đầu không được là ngày trong quá khứ")
        return false
      }
      
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
            <label for="TenGiamGia">Tên mã giảm giá</label>
            <input name="TenGiamGia" 
            onChange={handleChange} 
            value={formState.TenGiamGia} />
          </div>
          <div className="form-group">
            <label for="PhanTramGiam">Phần trăm giảm</label>
            <input
              name="PhanTramGiam"
              onChange={handleChange}
              type="number"
              value={formState.PhanTramGiam}
            />
          </div>
          <div className="form-group">
            <label for="NgayBatDau">Thời gian bắt đầu</label>
            <input
              name="NgayBatDau"
              onChange={handleChange}
              type="date"
              value={formState.NgayBatDau}
            />
          </div>
          <div className="form-group">
            <label htmlFor="NgayKetThuc">Thời gian kết thúc</label>
            <input
              name="NgayKetThuc"
              onChange={handleChange}
              type="date"
              value={formState.NgayKetThuc}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ĐieuKienApDung">Điều kiện áp dụng</label>
            <textarea
              name="DieuKienApDung"
              onChange={handleChange}
              value={formState.DieuKienApDung}
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
