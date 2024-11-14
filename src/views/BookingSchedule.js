import { useState } from "react";
import moment from 'moment'
const BookingSchedule = () => {
    const schedules = [
        {
            MaLH: "LH001",
            TenBN: "Lê Văn Dần",
            TenNS: "Nguyễn Văn A",
            NgayHen: '2023-12-19',
            HocVi: "Tiến sĩ sĩ",
            KinhNghiem: "6",
            GioBatDau: "08:00",
            GioKetThuc: "08:30",
            DichVu: "Nhổ răng khôn",
            GhiChu: "",
            TinhTrang: "Đã đặt"
        },
        {
            MaLH: "LH002",
            TenBN: "Lê Văn Sơn",
            HocVi: "Thạc sĩ",
            KinhNghiem: "3",
            TenNS: "Ngô Nguyễn Trường An",
            NgayHen: '2023-12-20',
            GioBatDau: "06:00",
            GioKetThuc: "06:30",
            DichVu: "Niềng răng",
            GhiChu: "",
            TinhTrang: "Đã đặt"
        },
        {
            MaLH: "LH003",
            TenBN: "Lê Văn Dần",
            TenNS: "Nguyễn Văn A",
            NgayHen: '2023-12-19',
            HocVi: "Tiến sĩ sĩ",
            KinhNghiem: "6",
            GioBatDau: "09:00",
            GioKetThuc: "09:30",
            DichVu: "Nhổ răng khôn",
            GhiChu: "",
            TinhTrang: "Đã đặt"
        },
        {
            MaLH: "LH004",
            TenBN: "Lê Văn Sơn",
            HocVi: "Thạc sĩ",
            KinhNghiem: "3",
            TenNS: "Ngô Nguyễn Trường An",
            NgayHen: '2023-12-20',
            GioBatDau: "15:00",
            GioKetThuc: "15:30",
            DichVu: "Niềng răng",
            GhiChu: "",
            TinhTrang: "Đã đặt"
        }
    ];
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    return (
        <div>
            {schedules.map((item, index) => {
                return (
                    <div className="row g-0 p-2 mt-3" style={{ border: "2px solid grey", borderRadius: "5px", boxShadow: "3px 3px #888888" }}>
                        <div className="row justify-content-center align-items-center col-lg-6">
                            <div className="col-auto">
                                <img alt="" src="/images/ava.png" style={{ borderRadius: "50%", width: "100px" }} />
                            </div>
                            <div className="col">
                                <div>{item.HocVi}, Nha sĩ {item.TenNS}</div>
                                <div>Kinh nghiệm: {item.KinhNghiem} năm</div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="datepicker-wrp">
                                <div className="btn-wrp">
                                    <input type="date" className="btn-clck" value={date} onChange={(e) => setDate(e.target.value)} />
                                </div>
                                <button className="btn btnIconDate">
                                    <img alt="" src="/images/dropdown.png" style={{ width: "15px" }} />
                                </button>
                            </div>
                            <div className="row">
                                {schedules.filter((item) => item.NgayHen === date).map((item, index) => {
                                    return (
                                        <div className="col-auto">
                                            <div className="bg-primary mt-3 p-2">
                                                {item.GioBatDau} - {item.GioKetThuc}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            })}

        </div >
    )
}
export default BookingSchedule