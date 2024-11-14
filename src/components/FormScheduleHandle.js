import React, { useState } from "react";

const FormScheduleHandle = ({ closeModal, onSubmit, defaultValue }) => {
    const [formState, setFormState] = useState(defaultValue || {
        maThuoc: "",
        tenThuoc: "",
        soLuongNhap: "",
        donGiaNhap: "",
        donGia: "",
        hanSuDung: "",
        ngayNhap: "",
        soLuongTonKho: "",
    });
    const [errors, setErrors] = useState("");

    const validateForm = () => {
        if (formState.maThuoc && formState.tenThuoc && formState.soLuongNhap && formState.donGia && formState.donGiaNhap
            && formState.hanSuDung && formState.ngayNhap && formState.soLuongTonKho) {
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
            return true;
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
            <div className="col-sm-4 modal1" style={{ fontWeight: "500" }}>
                <form>
                    <div className="mb-2">Nhân viên xử lý</div>
                    <input type="text" class="form-control pb-2 pt-2 mb-2" id="staff" name="staff" />
                    <div className="mb-2">Chọn tình trạng</div>
                    <select class="form-select pb-2 pt-2 mb-2" aria-label="Chọn trạng thái">
                        <option selected value="all">Tất cả</option>
                        <option value="completed">Đã sắp lịch</option>
                        <option value="incompleted">Chưa sắp lịch</option>
                        <option value="other">Khác</option>
                    </select>
                    <div className="mb-2">Ghi chú</div>
                    <div className="send-area mb-2" style={{ borderRadius: "5px", borderColor: "#D9D9D9" }}>
                        <textarea rows="3" onChange={handleChange}>{formState.tenThuoc}</textarea>
                    </div>

                    {errors && <div className="error">{`Please include: ${errors}`}</div>}
                    <div className="text-end">

                        <button type="submit" className="btn pb-2 pt-2 ps-3 pe-3 mt-2 me-2" style={{ color: "#0096FF", border: "1px solid #0096FF" }} onClick={() => closeModal()}>
                            Hủy
                        </button>

                        <button type="submit" className="btn pb-2 pt-2 ps-3 pe-3 mt-2" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }} onClick={() => closeModal()}>
                            Lưu
                        </button>

                    </div>
                </form>
            </div>
        </div >
    );
};
export default FormScheduleHandle
