import React, { useState, useEffect,useContext } from "react";
import moment from 'moment'
import { AuthContext } from '../hook/AuthProvider.js'
import '../views/mistyles.css'
export const FormChiTietNhanVien = ({ closeModal, onSubmit, defaultValue, staffs, signal,branches }) => {
  const {user} = useContext(AuthContext);
  const [formState, setFormState] = useState(
    defaultValue?
    {
      TenNv: defaultValue.tenNv,
      SoDienThoai: defaultValue.soDienThoai,
      ChucVu: defaultValue.chucVu,
      Email:defaultValue.email,
      LuongCoBan: defaultValue.luongCoBan,
      MaChiNhanh: defaultValue.maChiNhanh,
      Cccd:defaultValue.cccd,
      GioiTinh:defaultValue.gioiTinh,
      NgaySinh:defaultValue.ngaySinh,
      BangCap:defaultValue.bangCap,
      KinhNghiem:defaultValue.kinhNghiem
    }
    :{
      TenNv: "",
      SoDienThoai: "",
      ChucVu: "Nha sĩ",
      Email:"",
      LuongCoBan: 0,
      MaChiNhanh: branches[0].maCn,
      Cccd:"",
      GioiTinh:"Nam",
      NgaySinh:"",
      BangCap:"",
      KinhNghiem:0
    }
  );
  const [errors, setErrors] = useState("");
  // const [branches, setBranches] = useState(branches);
  const [positions, setPositions] = useState(['Nha sĩ', 'Phụ tá', 'Quản lý', 'Tiếp tân'])
  const [gioitinh, setGioiTinh] = useState(['Nam', 'Nữ'])
  useEffect(() => {
    console.log("haha")
    console.log(defaultValue);
    console.log(branches)
  }, []);

  // const getBranches = async () => {
  //   const branches = await api.getAllBranchs();
  //   setBranches(branches);
  //   if(!defaultValue) formState.chiNhanh = branches[0].tenChiNhanh;  
  // }
  function isPositiveInteger(A) {
    // && Number.isInteger(A)
    if (A > 0) {
        return true; // A là số nguyên dương
    } else {
        return false; // A không phải là số nguyên dương
    }
}
  const validateForm = () => {
    console.log(formState)
    if (formState.TenNv!='' && formState.Email!='' && formState.SoDienThoai!='' && formState.ChucVu!='' && formState.LuongCoBan!='' && formState.MaChiNhanh!=''&& formState.BangCap!=''&&formState.GioiTinh!=''&formState.KinhNghiem!=''&&formState.Cccd!=''&&formState.NgaySinh!='') {
      const isIdExists1 = staffs.some(staff => staff.cccd == formState.Cccd);
      const isIdExists2 = staffs.some(staff => staff.soDienThoai == formState.SoDienThoai);
      const isIdExists3 = staffs.some(staff => staff.email == formState.Email);
      if(isIdExists1){
        setErrors("CCCD này đã tồn tại! Vui lòng nhập CCCD khác.");
        return false;
      }
      if(isIdExists2){
        setErrors("Số điện thoại này đã tồn tại! Vui lòng nhập số điện thoại khác.");
        return false;
      }
      if(isIdExists3){
        setErrors("Email này đã tồn tại! Vui lòng nhập email khác.");
        return false;
      }
      else if (formState.Cccd.length != 12) {
        setErrors("Căn cước công dân này không hợp lệ! Vui lòng nhập căn cước công dân có 12 chữ số.");
        return false;
    }
    else if (formState.SoDienThoai.length != 10) {
        setErrors("Số điện thoại này không hợp lệ! Vui lòng nhập số điện thoại có 10 chữ số.");
        return false;
    }
    else if (!isPositiveInteger(formState.Cccd)) {
        setErrors("Căn cước công dân này không hợp lệ! Vui lòng nhập căn cước công dân là số nguyên dương.");
        return false;
    }
    else if (!isPositiveInteger(formState.SoDienThoai)) {
        setErrors("Số điện thoại này không hợp lệ! Vui lòng nhập số điện thoại là số nguyên dương.");
        return false;
    }
    else if (!isPositiveInteger(formState.LuongCoBan)) {
      setErrors("Lương cơ bản không hợp lệ! Vui lòng nhập số nguyên dương.");
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
            case 'TenNv': 
              errorFields.push("Tên nhân viên"); break;
            case 'SoDienThoai': 
              errorFields.push("Số điện thoại"); break;
            case 'Email': 
              errorFields.push("Email"); break;
            case 'LuongCoBan': 
              errorFields.push("Lương cơ bản"); break;  
              case 'Cccd': 
              errorFields.push("CCCD"); break;
              case 'GioiTinh': 
              errorFields.push("Giới tính"); break;
              case 'BangCap': 
              errorFields.push("Bằng cấp"); break;
              case 'KinhNghiem': 
              errorFields.push("Kinh nghiệm"); break;
              case 'NgaySinh ': 
              errorFields.push("Ngày sinh"); break;
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
        {signal!='1'?<form className="scrollable-form">
          <div className="form-group">
            <label for="TenNv">Họ và tên</label>
            <input name="TenNv" type="text" 
            onChange={handleChange} 
            value={formState.TenNv} />
          </div>
          <div className="form-group">
            <label for="SoDienThoai">Số điện thoại</label>
            <input 
              name="SoDienThoai"
              onChange={handleChange}
              type="text"
              value={formState.SoDienThoai}
            />
          </div>
          <div className="form-group">
            <div className="form-group">
            <label for="ChucVu">Chức vụ</label>
            <select
              name="ChucVu"
              onChange={handleChange}
              value={formState.ChucVu}
              
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
            <label htmlFor="Email">Email</label>
            <input
              name="Email"
              onChange={handleChange}
              type="text"
              value={formState.Email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="LuongCoBan">Lương cơ bản</label>
            <input
            type="number"
              name="LuongCoBan"
              onChange={handleChange}
              value={formState.LuongCoBan}
            />
          </div>
          {
            user?.loaiNguoiDung === "ChuHeThong" && (
              <div>
                <div className="mb-2"><b>Chi nhánh làm việc</b></div>
                <select
                  className="form-select pb-2 pt-2 mb-2"
                  name="MaChiNhanh"
                  onChange={handleChange}
                  value={formState.MaChiNhanh}
                >
                  {branches?.map((item, index) => (
                    <option key={index} value={item.maCn}>
                      {item.tenCn}
                    </option>
                  ))}
                </select>
              </div>
            )
          }
          <div className="form-group">
            <label for="Cccd">CCCD</label>
            <input name="Cccd" type="text"            
            onChange={handleChange} 
            value={formState.Cccd} />
          </div>
          <div className="form-group">
            <label for="GioiTinh">Giới tính</label>
            <select
              name="GioiTinh"
              onChange={handleChange}
              value={formState.GioiTinh}
              
            >
              {gioitinh.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label for="NgaySinh">Ngày sinh</label>
            <input type="date" className="form-control pb-3 pt-3" id="birthday" name="NgaySinh" max={moment().add(-1, "years").format('YYYY-MM-DD')} required onInvalid={e => e.target.setCustomValidity('Mời bạn nhập ngày sinh')} onInput={e => e.target.setCustomValidity('')} onChange={handleChange} value={formState.NgaySinh} />
          </div>
          <div className="form-group">
            <label for="BangCap">Bằng cấp</label>
            <input name="BangCap" type="text"            
            onChange={handleChange} 
            value={formState.BangCap} />
          </div>
          <div className="form-group">
            <label for="KinhNghiem">Kinh nghiệm</label>
            <input name="KinhNghiem"  type="number"            
            onChange={handleChange} 
            value={formState.KinhNghiem} />
          </div>
          {errors && <div className="error">{errors}</div>}
          <button type="submit" className="btnSummit" onClick={handleSubmit}>
            Lưu
          </button>
        </form>:
        <form className="scrollable-form">
        <div className="form-group">
          <label for="TenNv">Họ và tên</label>
          <input name="TenNv" type="text" 
          value={formState.TenNv} 
          readOnly 
          />
        </div>
        <div className="form-group">
          <label for="SoDienThoai">Số điện thoại</label>
          <input 
            name="SoDienThoai"
            type="number"
            value={formState.SoDienThoai}
            readOnly 
          />
        </div>
        <div className="form-group">
          <div className="form-group">
          <label for="ChucVu">Chức vụ</label>
          <select
            name="ChucVu"
            value={formState.ChucVu}
            disabled
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
          <label htmlFor="Email">Email</label>
          <input
            name="Email"
            type="text"
            value={formState.Email}
            readOnly 
          />
        </div>
        <div className="form-group">
          <label htmlFor="LuongCoBan">Lương cơ bản</label>
          <input
          type="number"
            name="LuongCoBan"
            value={formState.LuongCoBan}
            readOnly 
          />
        </div>
        <div className="form-group">
          <label htmlFor="MaChiNhanh">Chi nhánh làm việc</label>
          <select
            name="MaChiNhanh"
            value={formState.MaChiNhanh}      
            disabled  
          >
          {branches.map((item, index) => (
              <option key={index} value={item.maCn}>
                {item.tenCn}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label for="Cccd">CCCD</label>
          <input name="Cccd" type="text"            
          value={formState.Cccd} readOnly />
        </div>
        <div className="form-group">
          <label for="GioiTinh">Giới tính</label>
          <select
            name="GioiTinh"
            value={formState.GioiTinh}
            disabled
          >
            {gioitinh.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label for="NgaySinh">Ngày sinh</label>
          <input type="date" className="form-control pb-3 pt-3" id="birthday" name="NgaySinh" max={moment().add(-1, "years").format('YYYY-MM-DD')} required onInvalid={e => e.target.setCustomValidity('Mời bạn nhập ngày sinh')} onInput={e => e.target.setCustomValidity('')} value={formState.NgaySinh} readOnly  />
        </div>
        <div className="form-group">
          <label for="BangCap">Bằng cấp</label>
          <input name="BangCap" type="text"            
          value={formState.BangCap} readOnly />
        </div>
        <div className="form-group">
          <label for="KinhNghiem">Kinh nghiệm</label>
          <input name="KinhNghiem"  type="number"            
          value={formState.KinhNghiem} readOnly/>
        </div>
      </form>
        }
      </div>
    </div>
  );
};
