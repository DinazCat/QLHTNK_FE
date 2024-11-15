import React, { useState } from "react";
import moment from "moment";
import Select from 'react-select';
import { TimeFrames } from "../constData/TimeFrames";

export const FormSignUpSchedule = ({ closeModal, onSubmit, defaultValue, schedules, time }) => {
    //save new schedule
    const handleSubmit = (e) => {
        e.preventDefault();
        closeModal();
    };
    // list new schedules to add
    const [saveSchedules, setSaveSchedules] = useState([]);

    //custom style for react-select
    const colourStyles = {
        multiValue: (styles) => {
            return {
                ...styles,
                backgroundColor: '#0096FF'

            };
        },
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

                    <div>
                        <div className="mb-2"><b>Ngày: </b>{moment(time).format('MM/DD/YYYY')}</div>
                    </div>
                    <div>
                        <div className="mb-2"><b>Chọn thêm khung giờ</b></div>
                        <Select className="mb-2 basic-multi-select react-select-container"
                            isMulti={true}
                            options={TimeFrames.filter((item) => schedules.filter(item1 => item1.NgayHen === time).every((item1) => item1.GioBatDau !== item.GioBatDau))}
                            placeholder=""
                            getOptionLabel={(item) => `${item.GioBatDau} - ${item.GioKetThuc}`}
                            getOptionValue={(item) => item}
                            closeMenuOnSelect={false}
                            onChange={(e) => setSaveSchedules(e)}
                            styles={colourStyles}
                        >
                        </Select>
                    </div>

                    <div className="text-end">

                        <button type="button" className="btn pb-2 pt-2 ps-3 pe-3 mt-2 me-2" style={{ color: "#0096FF", border: "1px solid #0096FF" }} onClick={() => closeModal()}>
                            Hủy
                        </button>

                        <button type="submit" className="btn pb-2 pt-2 ps-3 pe-3 mt-2" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }} onClick={(e) => handleSubmit(e)}>
                            Lưu
                        </button>

                    </div>
                </form>
            </div>
        </div >
    );
};
