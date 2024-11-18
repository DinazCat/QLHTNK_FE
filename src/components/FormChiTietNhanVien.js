import React, { useState, useEffect } from "react";
import api from '../api/Api';
export const FormChiTietNhanVien = ({ closeModal, onSubmit, defaultValue, staffs }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      maNhanVien: "",
      tenNhanVien: "",
      soDienThoai: "",
      chucVu: "Nha sĩ",
      email: "",
      luongCoBan: "",
      chiNhanh: "",
    }
  );
  const [errors, setErrors] = useState("");
  const [branches, setBranches] = useState([]);
  const [positions, setPositions] = useState(['Nha sĩ', 'Phụ tá', 'Quản lý', 'Tiếp tân'])
  useEffect(() => {
    getBranches();
  }, []);

  const getBranches = async () => {
    const branches = await api.getAllBranchs();
    setBranches(branches);
    if (!defaultValue) formState.chiNhanh = branches[0].tenChiNhanh;
  }
  const validateForm = () => {
    console.log(formState)
    if (formState.maNhanVien != '' && formState.tenNhanVien != '' && formState.soDienThoai != '' && formState.chucVu != '' && formState.email != '' && formState.chiNhanh != '') {
      const isIdExists = staffs.some(staff => staff.maNhanVien == formState.maNhanVien);
      if (!defaultValue && isIdExists) {
        setErrors("Mã nhân viên này đã tồn tại! Vui lòng nhập một mã nhân viên khác.");
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
          switch (key) {
            case 'maNhanVien':
              errorFields.push("Mã nhân viên"); break;
            case 'tenNhanVien':
              errorFields.push("Tên nhân viên"); break;
            case 'soDienThoai':
              errorFields.push("Số điện thoại"); break;
            case 'email':
              errorFields.push("Email"); break;
            case 'luongCoBan':
              errorFields.push("Lương cơ bản"); break;
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
            <label for="maNhanVien">Mã nhân viên</label>
            <input name="maNhanVien" type="text"
              onChange={handleChange}
              value={formState.maNhanVien} />
          </div>
          <div className="form-group">
            <label for="tenNhanVien">Họ và tên</label>
            <input name="tenNhanVien" type="text"
              onChange={handleChange}
              value={formState.tenNhanVien} />
          </div>
          <div className="form-group">
            <label for="soDienThoai">Số điện thoại</label>
            <input
              name="soDienThoai"
              onChange={handleChange}
              type="number"
              value={formState.soDienThoai}
            />
          </div>
          <div className="form-group">
            <div className="form-group">
              <label for="chucVu">Chức vụ</label>
              <select
                name="chucVu"
                onChange={handleChange}
                value={formState.chucVu}

              >
                {positions.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              onChange={handleChange}
              type="text"
              value={formState.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="luongCoBan">Lương cơ bản</label>
            <input
              type="number"
              name="luongCoBan"
              onChange={handleChange}
              value={formState.luongCoBan}
            />
          </div>
          <div className="form-group">
            <label htmlFor="chiNhanh">Chi nhánh làm việc</label>
            <select
              name="chiNhanh"
              onChange={handleChange}
              value={formState.chiNhanh}
            >
              {branches.map((item, index) => (
                <option key={index} value={item.tenChiNhanh}>
                  {item.tenChiNhanh}
                </option>
              ))}
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
