import Scheduler, { Resource, View } from 'devextreme-react/scheduler';
import { useState } from 'react';
import { ColorList } from "../constData/ColorList"
import AppointmentToolTip from '../components/AppointmentToolTip';

//fake doctors
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
        HocVi: "Thạc sĩ",
        KinhNghiem: "3",
    }
    ,
    {
        MaNS: "NS002",
        TenNS: "Ngô A",
        HocVi: "Tiến sĩ",
        KinhNghiem: "5",
    }
]

//fake schedule list 
const schedules = [
    {
        MaLH: "LH001",
        TenBN: "Lê Văn Dần",
        MaBN: "BN001",
        TenNS: "Nguyễn Văn A",
        MaNS: "NS001",
        NgayHen: '2023-12-23',
        GioBatDau: '08:00',
        GioKetThuc: '08:30',
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
        NgayHen: '2023-12-20',
        GioBatDau: '07:00',
        GioKetThuc: '07:30',
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
        NgayHen: '2023-12-22',
        GioBatDau: '09:00',
        GioKetThuc: '09:30',
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
        NgayHen: '2023-12-22',
        GioBatDau: '15:00',
        GioKetThuc: '15:30',
        DichVu: "Niềng răng",
        GhiChu: "",
        TinhTrang: "Đã đặt"
    }
];

const ScheduleDetail = () => {
    //default views
    const views = ["day", "week", "agenda"]

    //set color for each doctor 
    const [colorDoctors, setColorDoctors] = useState(doctors.map((item, index) => { return { ...item, color: ColorList[index], id: item.MaNS, text: item.TenNS } }))//must set property id to change color

    //set appointment for scheduler
    const [appointment, setAppointment] = useState(schedules.filter(itm => itm.TinhTrang !== "Trống").map(item => { return { ...item, startDate: new Date(item.NgayHen + 'T' + item.GioBatDau + ':00.000Z'), endDate: new Date(item.NgayHen + 'T' + item.GioKetThuc + ':00.000Z'), text: item.DichVu } }))

    return (
        <div>
            <div>

            </div>
            <Scheduler
                timeZone='Greenwich'
                dataSource={colorDoctors.map(itm => ({
                    ...appointment.find((item) => (item.MaNS === itm.MaNS)),
                    ...itm
                }))}
                views={views}
                showCurrentTimeIndicator={false}
                defaultCurrentView='day'
                startDayHour={7}
                endDayHour={17}
                cellDuration={15}
                editing={false}
                showAllDayPanel={false}
                style={{ minWidth: "400px" }}
                onAppointmentDblClick={(e) => { e.cancel = true }}
                appointmentTooltipComponent={AppointmentToolTip}

            >
                <Resource
                    dataSource={colorDoctors}
                    fieldExpr="MaNS"
                    label="Tên nha sĩ"
                />
            </Scheduler>
        </div >
    )
};

export default ScheduleDetail