import React, { useState } from 'react';
import Select from 'react-select';
const ScheduleList = () => {
    const schedules = [
        {
            MaLH: "LH001",
            TenBN: "Lê Văn Dần",
            MaBN: "BN001",
            TenNS: "Nguyễn Văn A",
            MaNS: "NV001",
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
            MaBN: "BN002",
            MaNS: "NV003",
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
        { MaDV: "DV001", TenDV: "Nhổ răng khôn" },
        { MaDV: "DV002", TenDV: "Nhổ răng" },
        { MaDV: "DV003", TenDV: "Niềng răng" },
    ];
    const doctors = [
        {
            MaNS: "NS001",
            TenNS: "Nguyễn Văn A",
            HocVi: "Tiến sĩ sĩ",
            KinhNghiem: "6",
        },
        {
            MaNS: "NS003",
            TenNS: "Ngô Nguyễn Trường An",
            HocVi: "Tiến sĩ sĩ",
            KinhNghiem: "3",
        }
    ]
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
    const [searchCriteria, setSearchCriteria] = useState({
        MaBN: "",
        TenBN: "",
        MaNS: "",
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
                <div className="col-lg-4 col-md-6">
                    <div className="mb-2"><b>Mã bệnh nhân</b></div>
                    <Select className="mb-2"
                        value={searchCriteria.MaBN}
                        onChange={(value) => setSearchCriteria({ ...searchCriteria, MaBN: value })}
                        options={customers}
                        isClearable
                        getOptionLabel={(item) => item.MaBN}
                        getOptionValue={(item) => item.MaBN}
                        placeholder=""
                    />
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="mb-2"><b>Tên bệnh nhân</b></div>
                    <Select className="mb-2"
                        value={searchCriteria.TenBN}
                        onChange={(value) => setSearchCriteria({ ...searchCriteria, TenBN: value })}
                        options={customers}
                        isClearable
                        placeholder=""
                        getOptionLabel={(item) => item.TenBN}
                        getOptionValue={(item) => item.TenBN}
                    />
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="mb-2"><b>Mã nha sĩ</b></div>
                    <Select className="mb-2"
                        value={searchCriteria.MaNS}
                        isClearable
                        onChange={(value) => setSearchCriteria({ ...searchCriteria, MaNS: value })}
                        options={doctors}
                        placeholder=""
                        getOptionLabel={(item) => item.MaNS}
                        getOptionValue={(item) => item.MaNS}
                    />
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="mb-2"><b>Tên nha sĩ</b></div>
                    <Select className="mb-2"
                        value={searchCriteria.TenNS}
                        isClearable
                        onChange={(value) => setSearchCriteria({ ...searchCriteria, TenNS: value })}
                        options={doctors}
                        placeholder=""
                        getOptionLabel={(item) => item.TenNS}
                        getOptionValue={(item) => item.TenNS}
                    />
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="mb-2"><b>Tên dịch vụ</b></div>
                    <Select className="mb-2"
                        value={searchCriteria.DichVu}
                        isClearable
                        onChange={(value) => setSearchCriteria({ ...searchCriteria, DichVu: value })}
                        options={services}
                        placeholder=""
                        getOptionLabel={(item) => item.TenDV}
                        getOptionValue={(item) => item.TenDV}
                    >
                    </Select>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="mb-2"><b>Ngày hẹn</b></div>
                    <input type="date" class="form-control pb-2 pt-2" onChange={(e) => { setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value }) }} />
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
                        <th>Mã bệnh nhân</th>
                        <th>Tên bệnh nhân</th>
                        <th>Mã nha sĩ</th>
                        <th>Tên nha sĩ</th>
                        <th>Ngày hẹn</th>
                        <th>Giờ hẹn</th>
                        <th>Dịch vụ</th>
                        <th>Ghi chú</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((item, index) => (
                        <tr key={index}>
                            <td>{item.MaBN}</td>
                            <td>{item.TenBN}</td>
                            <td>{item.MaNS}</td>
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