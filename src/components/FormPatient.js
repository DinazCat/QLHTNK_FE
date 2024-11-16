import { useState } from "react";
import Select from 'react-select';
export const FormPatient = ({ closeModal, onSubmit, defaultValue, customers }) => {
    const [formState, setFormState] = useState(
        defaultValue || {
            MaBN: "",
            TenBN: "",
            CCCD: "",
            GioiTinh: "",
            NgaySinh: "",
            SDT: "",
            DiaChi: ""
        }
    );
    const [errors, setErrors] = useState("");

    const validateForm = () => {

    };

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })

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
                    <div className="mb-2"><b>Mã bệnh nhân</b></div>
                    <input type="text" className="form-control pb-2 pt-2 mb-2" value={formState.MaBN} id="MaBN" name="MaBN" onChange={handleChange} />
                    <div className="mb-2"><b>Tên bệnh nhân</b></div>
                    <input type="text" className="form-control pb-2 pt-2 mb-2" value={formState.TenBN} id="TenBN" name="TenBN" onChange={handleChange} />
                    <div className="mb-2"><b>Giới tính</b></div>
                    <select className="form-select pb-2 pt-2 mb-2" aria-label="Chọn chi nhánh" value={formState.TenBN}>
                        <option selected value="0">Nam</option>
                        <option value="1">Nữ</option>
                    </select>
                    <div className="mb-2"><b>CCCD</b></div>
                    <input type="text" className="form-control pb-2 pt-2 mb-2" value={formState.CCCD} id="CCCD" name="CCCD" onChange={handleChange} />
                    <div className="mb-2"><b>Ngày sinh</b></div>
                    <input type="date" className="form-control pb-2 pt-2 mb-2" value={formState.NgaySinh} id="NgaySinh" name="NgaySinh" onChange={handleChange} />
                    <div className="mb-2"><b>SĐT</b></div>
                    <input type="text" className="form-control pb-2 pt-2 mb-2" value={formState.SDT} id="SDT" name="SDT" onChange={handleChange} />
                    <div className="mb-2"><b>Địa chỉ</b></div>
                    <input type="text" className="form-control pb-2 pt-2 mb-2" id="DiaChi" name="DiaChi" value={formState.DiaChi} onChange={handleChange} />
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
