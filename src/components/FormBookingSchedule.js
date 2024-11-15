import React, { useState } from "react";
import Select from 'react-select';

export const FormBookingSchedule = ({ closeModal, onSubmit, defaultValue, schedules }) => {
    const [formState, setFormState] = useState(
        defaultValue || {
            MaLH: "",
            TenBN: "",
            MaBN: "",
            TenNS: "",
            MaNS: "",
            NgayHen: "",
            GioBatDau: "",
            GioKetThuc: "",
            DichVu: "",
            GhiChu: "",
            TinhTrang: ""
        }
    );
    const [errors, setErrors] = useState("");

    const validateForm = () => {
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
    const customers = [
        {
            MaBN: "BN001",
            TenBN: "Lê Văn Dần",
        },
        {
            MaBN: "BN003",
            TenBN: "Lê Trần Long",
        }
    ]

    return (
        <div
            className="modal-container"
            onClick={(e) => {
                if (e.target.className === "modal-container") closeModal();
            }}

        >
            <div className="col-sm-4 modal1" style={{ overflowY: "auto", height: "80%" }}>
                <form>
                    <div className="mb-2" style={{ fontWeight: "500" }}>Mã bệnh nhân</div>
                    <Select className="mb-2"
                        value={customers.find(item => item.MaBN === formState.MaBN) || ''}
                        onChange={(value) => value !== null ? setFormState({ ...formState, MaBN: value.MaBN, TenBN: value.TenBN }) : setFormState({ ...formState, MaBN: "", TenBN: "" })}
                        options={customers}
                        isClearable
                        getOptionLabel={(item) => item.MaBN}
                        getOptionValue={(item) => item}
                        placeholder=""
                    />
                    <div className="mb-2" style={{ fontWeight: "500" }}>Tên bệnh nhân</div>
                    <Select className="mb-2"
                        value={customers.find(item => item.MaBN === formState.MaBN) || ''}
                        onChange={(value) => value !== null ? setFormState({ ...formState, MaBN: value.MaBN, TenBN: value.TenBN }) : setFormState({ ...formState, MaBN: "", TenBN: "" })}
                        options={customers}
                        isClearable
                        getOptionLabel={(item) => item.TenBN}
                        getOptionValue={(item) => item}
                        placeholder=""
                    />
                    <div className="mb-2" style={{ fontWeight: "500" }}>Mã nha sĩ</div>
                    <div className="form-control pb-2 pt-2 mb-2">{formState.MaNS}</div>
                    <div className="mb-2" style={{ fontWeight: "500" }}>Tên nha sĩ</div>
                    <div className="form-control pb-2 pt-2 mb-2">{formState.TenNS}</div>
                    <div className="mb-2" style={{ fontWeight: "500" }}>Ngày hẹn</div>
                    <div className="form-control pb-2 pt-2 mb-2">{formState.NgayHen}</div>
                    <div className="mb-2" style={{ fontWeight: "500" }}>Giờ</div>
                    <div className="form-control pb-2 pt-2 mb-2">{formState.GioBatDau} - {formState.GioKetThuc}</div>
                    <div className="mb-2" style={{ fontWeight: "500" }}>Dịch vụ</div>
                    <div className="form-control pb-2 pt-2 mb-2">{formState.DichVu}</div>
                    <div className="mb-2" style={{ fontWeight: "500" }}>Ghi chú</div>
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
        </div>
    );
};
