import { useState } from "react";
import Select from 'react-select';
export const FormRecordMedicine = ({ closeModal, onSubmit, defaultValue, medicines }) => {
    const [formState, setFormState] = useState(
        defaultValue || {
            MaCTHSDT: "",
            MaHSDT: "",
            maDV: "",
            tenDV: "",
            MaNS: "",
            TenNS: "",
            DonGia: "",
            SL: "",
            Ngay: "",
            GhiChu: ""
        }
    );
    const [errors, setErrors] = useState("");

    const validateForm = () => {

    };

    const handleChange = (e) => {

    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                        value={medicines.find(item => item.maThuoc === formState.maThuoc) || ''}
                        onChange={(value) => value !== null ? setFormState({ ...formState, ...value }) : setFormState({ ...formState, maThuoc: "", tenThuoc: "" })}
                        options={medicines}
                        isClearable
                        getOptionLabel={(item) => item.maThuoc}
                        getOptionValue={(item) => item}
                        placeholder=""
                    />
                    <div className="mb-2"><b>Tên thuốc</b></div>
                    <Select className="mb-2"
                        value={medicines.find(item => item.maThuoc === formState.maThuoc) || ''}
                        onChange={(value) => value !== null ? setFormState({ ...formState, ...value }) : setFormState({ ...formState, maThuoc: "", tenThuoc: "" })}
                        options={medicines}
                        isClearable
                        getOptionLabel={(item) => item.tenThuoc}
                        getOptionValue={(item) => item}
                        placeholder=""
                    />
                    <div className="mb-2"><b>Số lượng</b></div>
                    <input type="number" className="form-control pb-2 pt-2 mb-2" min="0" max={formState.SL} id="SL" name="SL" value={formState.SL} onChange={(e) => { setFormState({ ...formState, [e.target.name]: e.target.value }) }} required />
                    <div className="mb-2"><b>Đơn giá</b></div>
                    <div className="form-control pb-2 pt-2 mb-2" style={{ minHeight: "40px" }}>{formState.DonGia}</div>
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
