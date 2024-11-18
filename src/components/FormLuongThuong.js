import React, { useState } from "react";

export const FormLuongThuong = ({ closeModal, onSubmit, defaultValue, bonuses }) => {

    const [formState, setFormState] = useState(defaultValue || {
        LoaiLuongThuong: "",
        Tien: "",
        Thang: "",
        Nam: "",
        LoaiNhanVien: "",
        MaNV: "",
        GhiChu: ""
    });
    const [errors, setErrors] = useState("");

    const validateForm = () => {


    };

    const handleChange = (e) => {

        setFormState({ ...formState, [e.target.name]: e.target.value });

    };

    const handleSubmit = (e) => {
    }

    return (
        <div
            className="modal-container"
            onClick={(e) => {
                if (e.target.className === "modal-container") closeModal();
            }}
        >
            <div className="col-sm-4 modal1">
                <form>
                    <div className="mb-2"><b>Loại lương thưởng</b></div>
                    <input type="text" className="form-control pb-2 pt-2 mb-2" value={formState.LoaiLuongThuong} id="LoaiLuongThuong" name="LoaiLuongThuong" onChange={handleChange} />
                    <div className="mb-2"><b>Tiền</b></div>
                    <input type="number" className="form-control pb-2 pt-2 mb-2" value={formState.Tien} id="Tien" name="Tien" onChange={handleChange} />
                    <div className="mb-2"><b>Ghi chú</b></div>
                    <input type="text" className="form-control pb-2 pt-2 mb-2" value={formState.GhiChu} id="GhiChu" name="GhiChu" onChange={handleChange} />
                    <div className="mb-2"><b>Loại nhân viên</b></div>
                    <select className="form-select pb-2 pt-2 mb-2" aria-label="Chọn chi nhánh" id="LoaiNhanVien" name="LoaiNhanVien" value={formState.LoaiNhanVien} onChange={handleChange}>
                        <option value="Tất cả">Tất cả</option>
                        <option selected value="Tiếp tân">Tiếp tân</option>
                        <option value="Bác sĩ">Bác sĩ</option>
                        <option value="Phụ tá">Phụ tá</option>
                        <option value="Quản lý">Quản lý</option>
                        <option value="Cá nhân">Cá nhân</option>
                    </select>
                    {formState.LoaiNhanVien === "Cá nhân" ?
                        <div>
                            <div className="mb-2"><b>Mã nhân viên</b></div>
                            <input type="text" className="form-control pb-2 pt-2 mb-2" value={formState.MaNV} id="MaNV" name="MaNV" onChange={handleChange} />
                        </div> : null}
                    {errors && <div className="error">{errors}</div>}
                    <div className="text-end">
                        <button type="submit" className="btn pb-2 pt-2 ps-3 pe-3 mt-2" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }} onClick={(e) => handleSubmit(e)}>
                            Lưu
                        </button>

                    </div>
                </form>
            </div>
        </div >
    );
};
