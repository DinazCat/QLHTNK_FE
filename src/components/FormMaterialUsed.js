import { useState } from "react";
import Select from 'react-select';
export const FormMaterialUsed = ({ closeModal, onSubmit, defaultValue, materials }) => {
    const [formState, setFormState] = useState(
        defaultValue || {
            maVatTu: "",
            tenVatTu: "",
            soLuongTonKho: "",
            donGia: "",
            NgaySuDung: "",
            SL: "",
        }
    );
    const [errors, setErrors] = useState("");

    const validateForm = () => {

    };

    const handleChange = (e) => {

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formState.tenVatTu)
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
                    <div className="mb-2"><b>Mã vật tư thiết bị</b></div>
                    <Select className="mb-2"
                        value={materials.find(item => item.maVatTu === formState.maVatTu)}
                        onChange={(value) => value !== null ? setFormState({ ...formState, maVatTu: value.maVatTu, tenVatTu: value.tenVatTu, soLuongTonKho: value.soLuongTonKho, donGia: value.donGia }) : setFormState({ ...formState, maVatTu: "" })}
                        options={materials}
                        isClearable
                        getOptionLabel={(item) => item.maVatTu}
                        getOptionValue={(item) => item}
                        placeholder=""
                    />
                    <div className="mb-2"><b>Tên vật tư thiết bị</b></div>
                    <Select className="mb-2"

                        value={materials.find(item => item.maVatTu === formState.maVatTu)}
                        onChange={(value) => value !== null ? setFormState({ ...formState, maVatTu: value.maVatTu, tenVatTu: value.tenVatTu, soLuongTonKho: value.soLuongTonKho, donGia: value.donGia }) : setFormState({ ...formState, tenVatTu: "" })}
                        options={materials}
                        isClearable
                        getOptionLabel={(item) => item.tenVatTu}
                        getOptionValue={(item) => item}
                        placeholder=""
                    />
                    <div className="mb-2"><b>Ngày sử dụng</b></div>
                    <input type="date" className="form-control pb-2 pt-2 mb-2" id="NgaySuDung" name="NgaySuDung" value={formState.NgaySuDung} onChange={(e) => { setFormState({ ...formState, [e.target.name]: e.target.value }) }} />
                    <div className="mb-2"><b>Số lượng</b></div>
                    <input type="number" className="form-control pb-2 pt-2 mb-2" min="0" max={formState.soLuongTonKho} id="SL" name="SL" value={formState.SL} onChange={(e) => { setFormState({ ...formState, [e.target.name]: e.target.value }) }} required />
                    <div className="mb-2"><b>Đơn giá</b></div>
                    <div className="form-control pb-2 pt-2 mb-2">{formState.donGia}</div>
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
