import React, { useState, useEffect, useContext } from "react";
// import Api from "../api/Api";
import { AuthContext } from "../hook/AuthProvider";

export const FormLuongThuong = ({
  closeModal,
  onSubmit,
  defaultValue,
  branches,
  staffs0
}) => {
  const { user } = useContext(AuthContext);
  const [formState, setFormState] = useState(
    defaultValue?
    {
      LoaiLT: defaultValue.loaiLT,
      Tien: defaultValue.tien,
      Thang: defaultValue.thang,
      Nam: defaultValue.nam,
      LoaiNV: defaultValue.loaiNV,
      MaNV:defaultValue.maNV,
      GhiChu: defaultValue.ghiChu||"",
      MaChiNhanh: defaultValue.maCN,
    } : {
      LoaiLT: "",
      Tien: 0,
      Thang: new Date().getMonth() + 1,
      Nam: new Date().getFullYear(),
      LoaiNV: "Tất cả",
      MaNV:null,
      GhiChu: "",
      MaChiNhanh: branches[0].maCn,
    }
  );
  const [errors, setErrors] = useState("");
  const [staffs, setStaffs] = useState(staffs0);

  // useEffect(() => {
  //   getStaffs();
  // }, []);

  // const getStaffs = async () => {
  //   const staffs = await staffApi.getAllStaff();
  //   // console.log(staffs)
  //   setStaffs(staffs)
  //   if (user?.Loai !== "ChuHeThong") {
  //     const fil = staffs.filter((item, idx) => item.chiNhanh === user.chinhanh);
  //     setStaffs(fil);
  //   } else {
  //     const fil = staffs.filter(
  //       (item, idx) => item.chiNhanh === formState.chiNhanh
  //     );
  //     console.log(fil);
  //     setStaffs(fil);
  //   }
  // };
  const validateForm = () => {
    let validate = true;
    if (formState.LoaiLT != "" && formState.Tien != ""&& formState.LoaiNV != "") {
      if (formState.LoaiNV == "Cá nhân" && formState.MaNV == null)
      {
        // setFormState({...formState, MaNV:staffs&&staffs[0]?.maNv})
        validate = false
      }
    } else validate = false;
    if (validate) {
      setErrors("");
      console.log(1);
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (value == "" || value == 0 || value == null) {
          switch (key) {
            case "LoaiLT":
              errorFields.push("Loại lương thưởng");
              break;
            case "Tien":
              errorFields.push("Số tiền");
              break;
            case "LoaiNV":
              errorFields.push("Loại nhân viên");
              break;
            case "MaNV":
              if (formState.LoaiNV == "Cá nhân")
                errorFields.push("Mã nhân viên");
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

  const handleChange = async (e) => {
        if (e.target.name === "MaChiNhanh") {
      const fil = staffs0.filter(
        (item, idx) => item.maCn === e.target.value
      );
      setStaffs(fil);
    }
    if (e.target.name=='LoaiNV'&&e.target.value != "Cá nhân"){
      setFormState({ ...formState, [e.target.name]: e.target.value, MaNV: null });
    }
    else if(e.target.name=='LoaiNV'&&e.target.value == "Cá nhân"){
      setFormState({ ...formState, [e.target.name]: e.target.value, MaNV: staffs&&staffs[0].maNv });
    }
    else {
      setFormState({...formState,[e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    // console.log(formState)
    onSubmit(formState);

    closeModal();
  };

  const isNumberPress = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 86) {
    } else {
      const validKeyForPayment = ["-", "."];
      if (validKeyForPayment.includes(e.key)) {
        e.preventDefault();
      }
    }
  };
  const isNumberCopy = (e) => {
    let data = e.clipboardData.getData("text");
    if (data.match(/[^\d]/)) {
      e.preventDefault();
    }
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
          <div className="mb-2">
            <b>Loại lương thưởng</b>
          </div>
          <input
            type="text"
            className="form-control pb-2 pt-2 mb-2"
            value={formState.LoaiLT}
            id="LoaiLuongThuong"
            name="LoaiLT"
            onChange={handleChange}
          />
          <div className="mb-2">
            <b>Tiền</b>
          </div>
          <input
            type="number"
            className="form-control pb-2 pt-2 mb-2"
            value={formState.Tien}
            id="Tien"
            name="Tien"
            onChange={handleChange}
            onKeyDown={isNumberPress}
            onPaste={isNumberCopy}
          />
          <div className="mb-2">
            <b>Ghi chú</b>
          </div>
          <input
            type="text"
            className="form-control pb-2 pt-2 mb-2"
            value={formState.GhiChu}
            id="GhiChu"
            name="GhiChu"
            onChange={handleChange}
          />
          <div className="mb-2">
            <b>Loại nhân viên</b>
          </div>
          <select
            className="form-select pb-2 pt-2 mb-2"
            aria-label="Chọn chi nhánh"
            id="LoaiNhanVien"
            name="LoaiNV"
            value={formState.LoaiNV}
            onChange={handleChange}
          >
            <option value="Tất cả">Tất cả</option>
            <option selected value="Tiếp tân">
              Tiếp tân
            </option>
            <option value="Nha sĩ">Nha sĩ</option>
            <option value="Phụ tá">Phụ tá</option>
            <option value="Quản lý">Quản lý</option>
            <option value="Cá nhân">Cá nhân</option>
          </select>
          {user?.loaiNguoiDung === "ChuHeThong" && (
            <div>
              <div className="mb-2">
                <b>Chi nhánh áp dụng</b>
              </div>
              <select
                className="form-select pb-2 pt-2 mb-2"
                id="type"
                name="MaChiNhanh"
                onChange={handleChange}
                value={formState.MaChiNhanh}
              >
                {formState.LoaiNV === "Cá nhân"
                  ? branches?.map((item, index) => {
                      if (item.tenCn !== "Tất cả")
                        return (
                          <option key={index} value={item.maCn}>
                            {item.tenCn}
                          </option>
                        );
                    })
                  : branches?.map((item, index) => (
                      <option key={index} value={item.maCn}>
                        {item.tenCn}
                      </option>
                    ))}
              </select>
            </div>
          )}
          {formState.LoaiNV === "Cá nhân" ? (
            <div>
              <div className="mb-2">
                <b>Nhân viên</b>
              </div>
              <select
                className="form-select pb-2 pt-2 mb-2"
                id="type"
                name="MaNV"
                onChange={handleChange}
                value={formState.MaNV}
              >
                {staffs?.map((item, index) => (
                  <option key={index} value={item?.maNv}>
                    {item?.tenNv}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          {errors && <div className="error">{errors}</div>}
          <div className="text-end">
            <button
              type="submit"
              className="btn pb-2 pt-2 ps-3 pe-3 mt-2"
              style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
              onClick={(e) => handleSubmit(e)}
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
