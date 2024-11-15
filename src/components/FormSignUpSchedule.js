import React, { useState } from "react";
import moment from "moment";
import Select from 'react-select';


//timeFrames is default
const timeFrames = [
    {
        GioBatDau: "07:30",
        GioKetThuc: "08:00",
    },
    {
        GioBatDau: "08:00",
        GioKetThuc: "08:30",
    },
    {
        GioBatDau: "08:30",
        GioKetThuc: "09:00",
    },
    {
        GioBatDau: "09:00",
        GioKetThuc: "09:30",
    },
    {
        GioBatDau: "09:30",
        GioKetThuc: "10:00",
    },
    {
        GioBatDau: "10:00",
        GioKetThuc: "10:30",
    },
    {
        GioBatDau: "10:30",
        GioKetThuc: "11:00",
    },
    {
        GioBatDau: "11:00",
        GioKetThuc: "11:30",
    },
    {
        GioBatDau: "11:30",
        GioKetThuc: "12:00",
    },
    {
        GioBatDau: "12:00",
        GioKetThuc: "12:30",
    },
    {
        GioBatDau: "12:30",
        GioKetThuc: "13:00",
    },
    {
        GioBatDau: "13:00",
        GioKetThuc: "13:30",
    },
    {
        GioBatDau: "13:30",
        GioKetThuc: "14:00",
    },
    {
        GioBatDau: "14:00",
        GioKetThuc: "14:30",
    },
    {
        GioBatDau: "14:30",
        GioKetThuc: "15:00",
    },
    {
        GioBatDau: "15:00",
        GioKetThuc: "15:30",
    },
    {
        GioBatDau: "15:30",
        GioKetThuc: "16:00",
    },
    {
        GioBatDau: "16:00",
        GioKetThuc: "16:30",
    }
]

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
                            options={timeFrames.filter((item) => schedules.filter(item1 => item1.NgayHen === time).every((item1) => item1.GioBatDau !== item.GioBatDau))}
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
