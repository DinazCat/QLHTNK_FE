import { useState } from 'react';
import Select from 'react-select';
const ScheduleList = () => {
    const schedules = [
        {
            MaLH: "LH001",
            TenBN: "Lê Văn Dần",
            TenNS: "Nguyễn Văn A",
            NgayHen: '19/12/2023',
            GioBatDau: "08:00",
            GioKetThuc: "08:30",
            DichVu: "Nhổ răng khôn",
            GhiChu: "",
            TinhTrang: "Đã đặt"
        },
        {
            MaLH: "LH002",
            TenBN: "Lê Văn Sơn",
            TenNS: "Ngô Nguyễn Trường An",
            NgayHen: '19/12/2023',
            GioBatDau: "06:00",
            GioKetThuc: "06:30",
            DichVu: "Niềng răng",
            GhiChu: "",
            TinhTrang: "Đã đặt"
        },
    ];
    const services = [
        { value: 'Nhổ răng khôn', label: 'Nhổ răng khôn' },
        { value: 'Nhổ răng', label: 'Nhổ răng' },
        { value: 'Niềng răng', label: 'Niềng răng' },
    ];
    const doctors = [
        { value: 'Nguyễn Văn A', label: 'Nguyễn Văn A' },
        { value: 'Ngô Nguyễn Trường An', label: 'Nguyễn Văn A' },
        { value: 'Lan Châu', label: 'Lan Châu' }
    ]
    const customs = [
        { value: 'Lê Văn Dần', label: 'Lê Văn Dần' },
        { value: 'Lê Văn Sơn', label: 'Lê Văn Sơn' },
        { value: 'Lâm Châu', label: 'Lâm Châu' }
    ]
    const [searchCriteria, setSearchCriteria] = useState({

        TenBN: "",
        TenNS: "",
        NgayHen: "",
        GioBatDau: "",
        GioKetThuc: "",
        DichVu: "",
        GhiChu: "",
    })

    return (
        <div>
            <div className="row">
                <div className="col-md-3 col-sm-6">
                    <div className="mb-2"><b>Tên bệnh nhân</b></div>
                    <Select className="mb-2"
                        value={searchCriteria.TenBN}
                        onChange={(value) => setSearchCriteria({ ...searchCriteria, TenBN: value })}
                        options={customs}
                        placeholder=""
                    />
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="mb-2"><b>Tên bệnh nhân</b></div>
                    <Select className="mb-2"
                        value={searchCriteria.TenNS}
                        onChange={(value) => setSearchCriteria({ ...searchCriteria, TenNS: value })}
                        options={doctors}
                        placeholder=""
                    />
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="mb-2"><b>Tên dịch vụ</b></div>
                    <Select className="mb-2"
                        value={searchCriteria.DichVu}
                        onChange={(value) => setSearchCriteria({ ...searchCriteria, DichVu: value })}
                        options={services}
                        placeholder=""
                    />
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="mb-2"><b>Ngày hẹn</b></div>
                    <input type="date" class="form-control pb-2 pt-2" id="birthday" name="birthday" onChange={(e) => { setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value }) }} />
                </div>
                <div className="text-end">
                    <button type="submit" className="btn pb-2 pt-2 mt-3" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}>
                        Tìm kiếm
                    </button>
                </div>
            </div>

            <table class="table" >
                <thead>
                    <tr class="table-secondary">
                        <th >Mã lịch hẹn</th>
                        <th>Tên bệnh nhân</th>
                        <th>Tên bác sĩ</th>
                        <th>Ngày hẹn</th>
                        <th>Giờ hẹn</th>
                        <th>Dịch vụ</th>
                        <th>Ghi chú</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((item, index) => (
                        <tr key={index}>
                            <td>{item.MaLH}</td>
                            <td>{item.TenBN}</td>
                            <td>{item.TenNS}</td>
                            <td>{item.NgayHen}</td>
                            <td>{item.GioBatDau} - {item.GioKetThuc}</td>
                            <td>{item.DichVu}</td>
                            <td>{item.GhiChu}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}
export default ScheduleList