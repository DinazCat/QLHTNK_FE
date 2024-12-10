import { useState } from "react";
import Select from 'react-select';
export const FormRecordService = ({ closeModal, onSubmit, defaultValue, services, rootServices }) => {
  // const [formState, setFormState] = useState(
  //     defaultValue || {
  //         MaCTHSDT: "",
  //         MaHSDT: "",
  //         maDichVu: "",
  //         tenDichVu: "",
  //         MaNS: "",
  //         TenNS: "",
  //         DonGia: "",
  //         SL: "",
  //         Ngay: "",
  //         GhiChu: ""
  //     }
  // );
  const [formState, setFormState] = useState(
    defaultValue || {
      maDichVu: "",
      tenDichVu: "",
      DonGia: 0, //đơn giá sau chiết khấu
      SL: 0,
      taiKham: null,
      GhiChu:"",
      ChietKhau:0,
      Gia:0, //giá nhập vào
      GiaMin:0,
      GiaMax:0,
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.maDichVu != '' && formState.tenDichVu != '' && formState.SL != ''&& formState.Gia != '') {
      if (parseInt(formState.SL) <= 0) {
        setErrors("Số lượng phải là một số nguyên dương lớn hơn 0.");
        return false;
      }
      else if (parseInt(formState.Gia) < parseInt(formState.GiaMin)||parseInt(formState.Gia) > parseInt(formState.GiaMax)) {
        setErrors("Giá đã nhập không phù hợp theo quy định.");
        return false;
      }
      else if (parseInt(formState.ChietKhau) > parseInt(formState.Gia)){
        setErrors("Chiết khấu không được lớn hơn giá đã nhập");
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
            case 'maDichVu':
              errorFields.push("Mã Dịch Vụ"); break;
            case 'tenDichVu':
              errorFields.push("Tên Dịch Vụ"); break;
            case 'SL':
              errorFields.push("SL"); break;
            default: break;
          }
        }
      }
      setErrors("Vui lòng nhập: " + errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {

  };
  const TinhGia = (SL) => {
    var dichvu = services.find(function (sv) {
      return sv.maDichVu === formState.maDichVu;
    });
    const a = dichvu.giaDichVu
    return a
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formState)
    if (!validateForm()) return;
    // var dichvu = services.find(function (sv) {
    //   return sv.maDichVu === formState.maDichVu;
    // });

    // formState.DonGia = parseInt(formState.SL)*parseInt(dichvu.giaDichVu)
    console.log("Gia:", formState.Gia, "ChietKhau:", formState.ChietKhau);
    if(formState.ChietKhau==undefined ) setFormState(formState)
    if(parseInt(formState.ChietKhau) <= 100){
      formState.DonGia = parseInt(formState.Gia) * (1-parseInt(formState.ChietKhau)/100)
    }
    else{
      formState.DonGia = parseInt(formState.Gia) - parseInt(formState.ChietKhau)
    }
    onSubmit(formState)
    closeModal()
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
            <b>Mã dịch vụ</b>
          </div>
          <Select
            className="mb-2"
            value={
              rootServices.find((item) => item.maDv === formState.maDichVu) ||
              ""
            }
            onChange={(value) =>
              value !== null
                ? setFormState({
                  ...formState,
                  maDichVu:value.maDv,
                  tenDichVu:value.tenDv,
                  GiaMin: value.giaThapNhat,
                  GiaMax: value.giaCaoNhat,
                })
                : setFormState({ ...formState, maDichVu: "", tenDichVu: "" })
            }
            options={services}
            isClearable
            getOptionLabel={(item) => item.maDv}
            getOptionValue={(item) => item}
            placeholder=""
          />
          <div className="mb-2">
            <b>Tên dịch vụ</b>
          </div>
          <Select
            className="mb-2"
            value={
              rootServices.find((item) => item.maDv === formState.maDichVu) ||
              ""
            }
            onChange={(value) =>
              value !== null
                ? setFormState({
                 ...formState,
                  maDichVu:value.maDv,
                  tenDichVu:value.tenDv,
                  GiaMin: value.giaThapNhat,
                  GiaMax: value.giaCaoNhat,
                })
                : setFormState({ ...formState, maDichVu: "", tenDichVu: "" })
            }
            options={services}
            isClearable
            getOptionLabel={(item) => item.tenDv + '-' + item.loaiDv}
            getOptionValue={(item) => item}
            placeholder=""
          />
          <div className="mb-2">
            <b>Số lượng</b>
          </div>
          <input
            type="number"
            className="form-control pb-2 pt-2 mb-2"
            min="0"
            max={formState.SL}
            id="SL"
            name="SL"
            value={formState.SL}
            onChange={(e) => {
              setFormState({ ...formState, [e.target.name]: e.target.value });
            }}
            required
          />
           <div className="mb-2">
            <b>Nhập giá: từ {formState?.GiaMin} đến {formState?.GiaMax}</b>
          </div>
          <input
            type="number"
            className="form-control pb-2 pt-2 mb-2"
            min={formState?.GiaMin}
            max={formState?.GiaMax}
            id="SL"
            name="Gia"
            value={formState.Gia}
            onChange={(e) => {
              setFormState({ ...formState, [e.target.name]: e.target.value });
            }}
            required
          />
          <div className="mb-2">
            <b>Chiết khấu</b>
          </div>
          <input
            type="number"
            className="form-control pb-2 pt-2 mb-2"
            min={0}
            max={formState?.GiaMax}
            id="SL"
            name="ChietKhau"
            value={formState.ChietKhau}
            onChange={(e) => {
              const value = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
              setFormState({ ...formState, [e.target.name]: value });
            }}
          />
          {/* <div className="mb-2">
            <b>Đơn giá</b>
          </div>
          <div
            className="form-control pb-2 pt-2 mb-2"
            style={{ minHeight: "40px" }}
          >
            {formState.DonGia}
          </div> */}
          <div className="mb-2"><b>Ngày tái khám</b></div>
          <input type="date" className="form-control pb-2 pt-2 mb-2" value={formState.taiKham} id="NgaySinh" name="taiKham" onChange={(e) => {
                        setFormState({ ...formState, [e.target.name]: e.target.value });
                      }} />
          {/* <label>
            <b>Tái khám:</b>
            <input
              type="checkbox"
              style={{ marginLeft: "10px", verticalAlign: "middle" }}
              checked={formState.taiKham}
              onChange={(e) => {
                setFormState({ ...formState, taiKham: e.target.checked });
              }}
            />
          </label> */}
          <div className="mb-2"><b>Ghi chú</b></div>
                    <textarea className="form-control pb-2 pt-2 mb-2"
                      name="GhiChu"
                      onChange={(e) => {
                        setFormState({ ...formState, [e.target.name]: e.target.value });
                      }}
                      value={formState.GhiChu}
                    />
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
