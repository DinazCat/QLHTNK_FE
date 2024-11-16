import Scheduler, { Resource } from 'devextreme-react/scheduler';
import { useState, useRef } from 'react';
import { ColorList } from "../constData/ColorList"
import AppointmentToolTip from '../components/AppointmentToolTip';
import { locale, loadMessages, formatMessage } from 'devextreme/localization';
import viMessages from 'devextreme/localization/messages/vi.json';
import Select from 'react-select';

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
        TenBN: "Lê Văn Dần",
        MaBN: "BN001",
        TenNS: "Nguyễn Văn A",
        MaNS: "NS001",
        NgayHen: '2023-12-22',
        GioBatDau: '14:00',
        GioKetThuc: '14:30',
        DichVu: "Nhổ răng khôn",
        GhiChu: "",
        TinhTrang: "Đã đặt"
    },
    {
        MaLH: "LH005",
        TenBN: "Lê Văn Sơn",
        MaBN: "BN002",
        MaNS: "NS003",
        TenNS: "Ngô Nguyễn Trường An",
        NgayHen: '2023-12-22',
        GioBatDau: '14:00',
        GioKetThuc: '14:30',
        DichVu: "Niềng răng",
        GhiChu: "Liên lạc sau giờ hành chính",
        TinhTrang: "Đã đặt"
    }
];
const ScheduleDetail = () => {
    //default views
    const views = ["day", "week", "agenda"]

    //setting vi language
    locale('vi');
    loadMessages(viMessages);

    const [MaNS, setMaNS] = useState("");

    //set color for each doctor 
    const [colorDoctors, setColorDoctors] = useState(doctors.map((item, index) => { return { ...item, color: ColorList[index], id: item.MaNS, text: item.TenNS } }))//must set property id to change color

    //set appointment for scheduler
    const [appointment, setAppointment] = useState(schedules.filter(itm => itm.TinhTrang === "Đã đặt").map(item => { return { ...item, startDate: new Date(item.NgayHen + 'T' + item.GioBatDau + ':00.000Z'), endDate: new Date(item.NgayHen + 'T' + item.GioKetThuc + ':00.000Z'), text: item.DichVu } }))
    //set today button
    const schedulerRef = useRef();
    const moveToToday = () => {
        let element = document.querySelectorAll(".dx-scheduler-navigator");
        const container = document.createElement("div");
        schedulerRef.current.instance.option("currentDate", new Date());
    }


    return (
        <div>
            <div className='row sticky-top'>
                <div className='col-md-auto mb-2'>
                    <button type="button" className="btn pb-2 pt-2 ps-3 pe-3 me-1" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }} onClick={() => moveToToday()}>
                        Hôm nay
                    </button>
                </div>
                <div className='col-lg-6 col-md mb-2'>
                    <Select
                        value={MaNS}
                        onChange={(value) => setMaNS(value)}
                        options={colorDoctors}
                        isClearable
                        getOptionLabel={(item) => item.MaNS}
                        getOptionValue={(item) => item.MaNS}
                        placeholder="Nhập mã nha sĩ"
                    />
                </div>
            </div>
            <Scheduler
                ref={schedulerRef}
                timeZone='Greenwich'
                dataSource={appointment.map(itm => ({
                    ...colorDoctors.find((item) => (item.MaNS === itm.MaNS)),
                    ...itm, id: itm.MaLH
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
                height={600}
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