import { useState } from "react";
import moment from 'moment'
import { FormSignUpSchedule } from "../components/FormSignUpSchedule";
const SignUpSchedule = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const schedules = [
        {
            MaLH: "LH001",
            TenBN: "Lê Văn Dần",
            MaBN: "",
            TenNS: "",
            MaNS: "NV001",
            NgayHen: '2023-12-21',
            GioBatDau: "08:00",
            GioKetThuc: "08:30",
            DichVu: "Nhổ răng khôn",
            GhiChu: "",
            TinhTrang: "Trống"
        },
        {
            MaLH: "LH002",
            TenBN: "Lê Văn Sơn",
            MaBN: "BN002",
            MaNS: "NV003",
            TenNS: "Ngô Nguyễn Trường An",
            NgayHen: '2023-12-22',
            GioBatDau: "16:00",
            GioKetThuc: "16:30",
            DichVu: "Niềng răng",
            GhiChu: "",
            TinhTrang: "Đã đặt"
        },
        {
            MaLH: "LH002",
            TenBN: "Lê Văn Sơn",
            MaBN: "BN002",
            MaNS: "NV003",
            TenNS: "Ngô Nguyễn Trường An",
            NgayHen: '2023-12-22',
            GioBatDau: "15:00",
            GioKetThuc: "15:30",
            DichVu: "Niềng răng",
            GhiChu: "",
            TinhTrang: "Đã đặt"
        },
        {
            MaLH: "LH002",
            TenBN: "Lê Văn Sơn",
            MaBN: "BN002",
            TenNS: "Nguyễn Văn A",
            MaNS: "NS001",
            NgayHen: '2023-12-20',
            GioBatDau: "15:00",
            GioKetThuc: "15:30",
            DichVu: "Niềng răng",
            GhiChu: "",
            TinhTrang: "Đã đặt"
        }
        ,
        {
            MaLH: "LH002",
            TenBN: "Lê Văn Sơn",
            MaBN: "BN002",
            TenNS: "Nguyễn Văn A",
            MaNS: "NS001",
            NgayHen: '2023-12-20',
            GioBatDau: "15:00",
            GioKetThuc: "15:30",
            DichVu: "Niềng răng",
            GhiChu: "",
            TinhTrang: "Đã đặt"
        }
        ,
        {
            MaLH: "LH002",
            TenBN: "Lê Văn Sơn",
            MaBN: "BN002",
            TenNS: "Nguyễn Văn A",
            MaNS: "NS001",
            NgayHen: '2023-12-21',
            GioBatDau: "15:00",
            GioKetThuc: "15:30",
            DichVu: "Niềng răng",
            GhiChu: "",
            TinhTrang: "Đã đặt"
        }
        ,
        {
            MaLH: "LH002",
            TenBN: "Lê Văn Sơn",
            MaBN: "BN002",
            TenNS: "Nguyễn Văn A",
            MaNS: "NS001",
            NgayHen: '2023-12-21',
            GioBatDau: "15:00",
            GioKetThuc: "15:30",
            DichVu: "Niềng răng",
            GhiChu: "",
            TinhTrang: "Đã đặt"
        }
        ,
        {
            MaLH: "LH002",
            TenBN: "Lê Văn Sơn",
            MaBN: "BN002",
            TenNS: "Nguyễn Văn A",
            MaNS: "NS001",
            NgayHen: '2023-12-25',
            GioBatDau: "15:00",
            GioKetThuc: "15:30",
            DichVu: "Niềng răng",
            GhiChu: "",
            TinhTrang: "Đã đặt"
        }
        ,
        {
            MaLH: "LH002",
            TenBN: "Lê Văn Sơn",
            MaBN: "BN002",
            TenNS: "Nguyễn Văn A",
            MaNS: "NS001",
            NgayHen: '2023-12-25',
            GioBatDau: "15:00",
            GioKetThuc: "15:30",
            DichVu: "Niềng răng",
            GhiChu: "",
            TinhTrang: "Đã đặt"
        },
        {
            MaLH: "LH002",
            TenBN: "",
            MaBN: "",
            TenNS: "Nguyễn Văn A",
            MaNS: "NS001",
            NgayHen: '2023-12-25',
            GioBatDau: "10:00",
            GioKetThuc: "10:30",
            DichVu: "Niềng răng",
            GhiChu: "",
            TinhTrang: "Trống"
        },
        {
            MaLH: "LH002",
            TenBN: "Lê Văn Sơn",
            MaBN: "BN002",
            TenNS: "Nguyễn Văn A",
            MaNS: "NS001",
            NgayHen: '2023-12-21',
            GioBatDau: "15:00",
            GioKetThuc: "15:30",
            DichVu: "Niềng răng",
            GhiChu: "",
            TinhTrang: "Đã đặt"
        }
    ];

    const handleSubmit = () => {

    }
    //delete schedule
    const deleteSchedule = () => {
    }
    const [date, setDate] = useState(moment().add(1, 'days').format('YYYY-MM-DD'));
    return (
        <div className="row">
            <div className="col-3"></div>
            <div className="col-lg" style={{ backgroundColor: "#F0F6FB" }}>
                <div className="datepicker-wrp">
                    <div className="btn-wrp">
                        <input type="date" className="btn-clck" value={date} onChange={(e) => setDate(e.target.value)} min={moment().add(1, 'days').format('YYYY-MM-DD')} />
                    </div>
                    <button className="btn btnIconDate">
                        <img alt="" src="/images/dropdown.png" style={{ width: "15px" }} />
                    </button>
                </div>
                <div style={{ height: "340px", overflowY: "auto", fontWeight: "bold" }}>
                    <div className="row ms-0 me-0" >
                        {schedules.filter((item1) => item1.NgayHen === date).length === 0 ?
                            <div className="mt-3">
                                Không có lịch
                            </div>
                            : schedules.filter((item1) => item1.NgayHen === date).map((item, index) => {
                                return (
                                    <div className="col-auto" style={{ cursor: "default" }}>
                                        <div className="mt-3 p-2" style={{ backgroundColor: item.TinhTrang === "Đã đặt" ? "#bfbfbf" : "#0096FF" }}>
                                            {item.GioBatDau} - {item.GioKetThuc}
                                            {item.TinhTrang === "Trống" ? <span className="ms-1"><i class="fa-solid fa-xmark" onClick={() => deleteSchedule(item.MaLH)}></i></span> : null}
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <div className="text-end">
                    <button type="submit" className="btn pb-2 pt-2 mt-3 mb-3" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }} onClick={() => setModalOpen(true)}>
                        Thêm lịch
                    </button>
                </div>
            </div>
            <div className="col-3"></div>
            {modalOpen && (
                <FormSignUpSchedule
                    closeModal={() => {
                        setModalOpen(false);
                    }}
                    onSubmit={handleSubmit}
                    schedules={schedules}
                    time={date}
                />
            )}
        </div >
    )
}
export default SignUpSchedule