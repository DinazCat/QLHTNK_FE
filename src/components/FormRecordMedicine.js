import { useState } from "react";
import Select from 'react-select';
export const FormRecordMedicine = ({ closeModal, onSubmit, defaultValue, medicines, rootMedicine }) => {
    // const [formState, setFormState] = useState(
    //     defaultValue || {
    //         MaCTHSDT: "",
    //         MaTT: "",
    //         maThuoc: "",
    //         tenThuoc: "",
    //         SL: "",
    //         DonGia: "",
    //         Ngay: "",
    //         GhiChu: ""
    //     }
    // );
    const [formState, setFormState] = useState(
        defaultValue || {
            maThuoc: "",
            tenThuoc: "",
            SL: 0,
            GhiChu: "",
            DonGia:0,
            Gia:0
        }
    );
    const [errors, setErrors] = useState("");

    const validateForm = () => {
        if (formState.maThuoc!='' && formState.tenThuoc!='' && formState.SL!='') {
          const thuoc = medicines.find(item=>item.maThuoc===formState.maThuoc)
          if( parseInt(formState.SL)<=0){
            setErrors("Số lượng phải là một số nguyên dương lớn hơn 0.");
            return false;
          }
          else if( parseInt(formState.SL) > thuoc.soLuongTonKho){
            setErrors("Số lượng tồn kho của loại thuốc "+formState.tenThuoc+ " chỉ còn lại "+thuoc.soLuongTonKho);
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
                case 'maThuoc': 
                  errorFields.push("Mã Thuốc"); break;
                case 'tenThuoc': 
                  errorFields.push("Tên Thuốc"); break;
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
        setFormState({ ...formState, [e.target.name]: e.target.value })
    };
    const TinhGia = (SL)=>{
        var thuoc = medicines.find(function(t) {
            return t.maThuoc === formState.maThuoc;
        });
        // const a = parseInt(SL)*parseInt(thuoc.donGia)
        const a = thuoc.donGia
        return a
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        // var Gia = parseInt(formState.SL) * parseInt(formState.DonGia);
        onSubmit({...formState})
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
                    <div className="mb-2"><b>Mã thuốc</b></div>
                    <Select className="mb-2"
                        value={ rootMedicine.find(item => item.maThuoc === formState.maThuoc) || ''}
                        onChange={(value) => value !== null ? setFormState({ ...formState, ...value, Gia:value.donGiaBan }) : setFormState({ ...formState, maThuoc: "", tenThuoc: "" })}
                        options={medicines}
                        isClearable
                        getOptionLabel={(item) => item.maThuoc}
                        getOptionValue={(item) => item}
                        placeholder=""
                    />
                    <div className="mb-2"><b>Tên thuốc</b></div>
                    <Select className="mb-2"
                        value={ rootMedicine.find(item => item.maThuoc === formState.maThuoc) || ''}
                        onChange={(value) => value !== null ? setFormState({ ...formState, ...value, Gia:value.donGiaBan}) : setFormState({ ...formState, maThuoc: "", tenThuoc: "" })}
                        options={medicines}
                        isClearable
                        getOptionLabel={(item) => item.tenThuoc}
                        getOptionValue={(item) => item}
                        placeholder=""
                    />
                    <div className="mb-2"><b>Số lượng</b></div>
                    <input type="number" className="form-control pb-2 pt-2 mb-2" min="0" max={formState.SL} id="SL" name="SL" value={formState.SL} onChange={(e) => { setFormState({ ...formState, [e.target.name]: e.target.value}) }} required />
                    <div className="mb-2"><b>Đơn giá</b></div>
                    <div className="form-control pb-2 pt-2 mb-2" style={{ minHeight: "40px" }}>{formState.donGiaBan}</div>
                    <div className="mb-2"><b>Ghi chú</b></div>
                    <input type="text" className="form-control pb-2 pt-2 mb-2" value={formState.GhiChu} id="GhiChu" name="GhiChu" onChange={handleChange} />
                    {errors && <div className="error">{errors}</div>}
                    <div className="text-end">
                        <button type="submit" className="btn pb-2 pt-2 ps-3 pe-3 mt-2" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }} onClick={(e) => handleSubmit(e)}>
                            Lưu
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};
