import { useState } from "react";
import moment from 'moment'
import { FormBookingSchedule } from "../components/FormBookingSchedule";
const BookingSchedule = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const doctors = [
        {
            MaNS: "NS001",
            TenNS: "Nguyễn Văn A",
            HocVi: "Tiến sĩ",
            KinhNghiem: "6",
        },
        {
            MaNS: "NS003",
            TenNS: "Ngô Nguyễn Trường An",
            HocVi: "Tiến sĩ",
            KinhNghiem: "3",
        }
    ]
    const schedules = [
        {
            MaLH: "LH001",
            TenBN: "Lê Văn Dần",
            MaBN: "BN001",
            TenNS: "Nguyễn Văn A",
            MaNS: "NS001",
            NgayHen: '2023-12-23',
            GioBatDau: "08:00",
            GioKetThuc: "08:30",
            DichVu: "Nhổ răng khôn",
            GhiChu: "",
            TinhTrang: "Đã đặt"
        },
        {
            MaLH: "LH002",
            TenBN: "",
            MaBN: "",
            MaNS: "NS003",
            TenNS: "Ngô Nguyễn Trường An",
            NgayHen: '2023-12-27',
            GioBatDau: "06:00",
            GioKetThuc: "06:30",
            DichVu: "Niềng răng",
            GhiChu: "",
            TinhTrang: "Trống"
        },
        {
            MaLH: "LH004",
            TenBN: "",
            MaBN: "",
            TenNS: "Nguyễn Văn A",
            MaNS: "NS001",
            NgayHen: '2023-12-27',
            GioBatDau: "09:00",
            GioKetThuc: "09:30",
            DichVu: "Nhổ răng khôn",
            GhiChu: "",
            TinhTrang: "Trống"
        },
        {
            MaLH: "LH003",
            TenBN: "Lê Văn Sơn",
            MaBN: "BN002",
            MaNS: "NS003",
            TenNS: "Ngô Nguyễn Trường An",
            NgayHen: '2023-12-27',
            GioBatDau: "15:00",
            GioKetThuc: "15:30",
            DichVu: "Niềng răng",
            GhiChu: "",
            TinhTrang: "Đã đặt"
        }
    ];

    //set date picker for each doctors
    const [dateDoctors, setDateDoctors] = useState(doctors.map(item => { return { ...item, date: moment().format('YYYY-MM-DD') } }))

    //change date for each doctor
    const changeDate = (e, MaNS) => {
        setDateDoctors(dateDoctors.map(item => item.MaNS === MaNS ? { ...item, date: e.target.value } : item));
    }

    const handleSubmit = () => {

    }
    const setItemToEdit = (id) => {
        setSelectedItem(id);
        setModalOpen(true);
    }
    return (
        <div>
            {dateDoctors.map((item) => {
                return (
                    <div className="row p-2 mt-3" style={{ border: "2px solid grey", borderRadius: "5px", boxShadow: "3px 3px #888888" }}>
                        <div className="col-lg-6 mt-2">
                            <div className="row justify-content-center align-items-center">
                                <div className="col-auto">
                                    <img alt="" src="/images/ava.png" style={{ borderRadius: "50%", width: "100px" }} />
                                </div>
                                <div className="col">
                                    <div>{item.HocVi}, Nha sĩ {item.TenNS}</div>
                                    <div>Kinh nghiệm: {item.KinhNghiem} năm</div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="datepicker-wrp">
                                <div className="btn-wrp">
                                    <input type="date" className="btn-clck" value={item.date} min={moment().format('YYYY-MM-DD')} onChange={(e) => changeDate(e, item.MaNS)} />
                                </div>
                                <button className="btn btnIconDate">
                                    <img alt="" src="/images/dropdown.png" />
                                </button>
                            </div>
                            <div style={{ height: "340px", overflowY: "auto", fontWeight: "bold" }}>
                                <div className="row ms-0 me-0" style={{ fontWeight: "bold" }}>
                                    {schedules.filter((item1) => item1.NgayHen === item.date && item.MaNS === item1.MaNS).length === 0 ?
                                        <div className="mt-3">
                                            Không có lịch
                                        </div>
                                        : (schedules.filter((item1) => item1.NgayHen === item.date && item.MaNS === item1.MaNS)).map((item, index) => {
                                            return (
                                                <div className="col-auto" style={{ cursor: "default" }}>
                                                    <div className="mt-3 p-2" style={{ backgroundColor: item.TinhTrang === "Đã đặt" ? "#bfbfbf" : "#0096FF" }} onClick={() => setItemToEdit(item)}>
                                                        {item.GioBatDau} - {item.GioKetThuc}
                                                    </div>
                                                </div>
                                            )
                                        })}

                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            {modalOpen && (
                <FormBookingSchedule
                    closeModal={() => {
                        setModalOpen(false);
                        setSelectedItem(null);
                    }}
                    onSubmit={handleSubmit}
                    defaultValue={selectedItem !== null && selectedItem}
                    schedules={schedules}
                />
            )}

        </div >
    )
}
export default BookingSchedule