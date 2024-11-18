import React, { useState } from "react";

export const FormHandleSchedule = ({ closeModal, onSubmit, defaultValue, sentSchedules }) => {
    //sentSchedules: list schedule that customer not sign in enter info to be supported
    const [formState, setFormState] = useState(defaultValue || {
        MaLDG: "",
        MaNV: "",
        TenNV: "",
        TinhTrang: "",
        GhiChu: ""

    });
    const [errors, setErrors] = useState("");

    const validateForm = () => {
        if (formState.MaNV === "" && formState.TenNV === "" && formState.TinhTrang !== "Chưa sắp lịch") {
            setErrors("Nếu đã sắp được lịch vui lòng ghi tên nhân viên đã xử lý");
            return false;
        }
        else {
            if (formState.MaNV !== "" && formState.TenNV !== "" && formState.TinhTrang === "Chưa sắp lịch") {
                setErrors("Nếu đã có nhân viên sắp lịch vui lòng chọn tình trạng khác");
                return false;
            }
            else {
                setErrors("");
                return true;
            }
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
                    <div className="mb-2">Chọn tình trạng</div>
                    <select className="form-select pb-2 pt-2 mb-2" aria-label="Chọn tình trạng" id="TinhTrang" name="TinhTrang" onChange={handleChange} value={formState.TinhTrang}>
                        <option value="Đã sắp lịch">Đã sắp lịch</option>
                        <option value="Chưa sắp lịch">Chưa sắp lịch</option>
                    </select>
                    <div className="mb-2">Ghi chú</div>
                    <div className="send-area mb-2" style={{ borderRadius: "5px", borderColor: "#D9D9D9" }}>
                        <textarea rows="3" id="GhiChu" name="GhiChu" onChange={handleChange}>{formState.GhiChu}</textarea>
                    </div>

                    {errors && <div className="error">{errors}</div>}
                    <div className="text-end">

                        <button type="button" className="btn pb-2 pt-2 ps-3 pe-3 mt-2 me-2" style={{ color: "#0096FF", border: "1px solid #0096FF" }} onClick={() => closeModal()}>
                            Hủy
                        </button>

                        <button type="submit" className="btn pb-2 pt-2 ps-3 pe-3 mt-2" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }} onClick={handleSubmit}>
                            Lưu
                        </button>

                    </div>
                </form>
            </div>
        </div >
    );
};
