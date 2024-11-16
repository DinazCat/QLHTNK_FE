import React, { useState } from 'react'
import './style.css'
import moment from 'moment';

const BillManagement = (props) => {
    //fake data
    const customers = [
        {
            MaBN: "BN001",
            TenBN: "Lê Văn Dần",
            CCCD: "066303007350",
            GioiTinh: "Nam",
            NgaySinh: "2023-11-14",
            SDT: "0843593598",
            DiaChi: "502 Hoàng Diệu, TP BMT"
        },
        {
            MaBN: "BN003",
            TenBN: "Lê Trần Long",
            CCCD: "066303007350",
            GioiTinh: "Nam",
            NgaySinh: "2023-11-14",
            SDT: "0843593598",
            DiaChi: "149/3 Ama Khê, TP BMT"
        },
        {
            MaBN: "BN004",
            TenBN: "Lê Trần Long",
            CCCD: "066303007350",
            GioiTinh: "Nam",
            NgaySinh: "2023-11-14",
            SDT: "0843593598",
            DiaChi: "252 Tạ Quang Bửu, quận 9, HCM"
        }
    ]
    const CTHSDT = [
        {
            MaCTHSDT: "CTHS001",
            MaHSDT: "HS001",
            MaNS: "NS001",
            TenNS: "Nguyễn Văn A",
            MaDV: "DV001",
            TenDV: "Phẫu thuật nhổ răng khó mức III",
            DonGia: "1500000",
            SL: "2"
        },
        {
            MaCTHSDT: "CTHS001",
            MaHSDT: "HS001",
            MaDV: "DV001",
            TenDV: "Cấy ghép Implant",
            MaNS: "NS003",
            TenNS: "Nguyễn Văn Thái",
            DonGia: "1500000",
            SL: "1"
        }
    ]
    const CTTOATHUOC = [
        {
            MaTT: "TT001",
            MaThuoc: "T001",
            TenThuoc: "ALPHACHOAY",
            SL: "10",
            DonGia: "5000",
            GhiChu: "Ngày uống 2 lần, mỗi lần 1 viên(sáng chiều - sau ăn)"
        },
        {
            MaTT: "TT001",
            MaThuoc: "T002",
            TenThuoc: "MEDOTASE 10mg",
            SL: "10",
            DonGia: "50000",
            GhiChu: "Ngày uống 2 lần, mỗi lần 1 viên(sáng chiều - sau ăn)"
        },
        {
            MaTT: "TT001",
            MaThuoc: "T001",
            TenThuoc: "ALPHACHOAY",
            SL: "5",
            DonGia: "50",
            GhiChu: "Ngày uống 1 lần, mỗi lần 1 viên(sáng - sau ăn)"
        }
    ]

    const [searchCriteria, setSearchCriteria] = useState({
        MaBN: "",
        TenBN: "",
        CCCD: "",
        GioiTinh: "",
        NgaySinh: "",
        SDT: "",
        DiaChi: ""
    })

    const handleChange = (e) => {
        setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
    };
    const [selectedRow, setSelectedRow] = useState(null);
    const setSelectedRowById = (id) => {
        setSelectedRow(customers[id])
        setPage(2)
    }
    const [page, setPage] = useState(1);
    const nextPage = () => {
        setPage(page + 1);
        window.scrollTo(0, 0);
    }
    const prevPage = () => {
        setPage(page - 1);
        window.scrollTo(0, 0);
    }

    return (
        <div>
            {page === 1 ? <div>
                <div className="row">
                    <form className="row ms-0 me-0" style={{ fontWeight: "500" }}>
                        <div className="col-md-6">
                            <div className="mb-2 col-md-6">Mã bệnh nhân</div>
                            <input type="text" className="form-control pb-2 pt-2 mb-2" id="MaBN" name="MaBN" onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <div className="mb-2">Họ tên</div>
                            <input type="text" className="form-control pb-2 pt-2 mb-2" id="TenBN" name="TenBN" onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <div className="mb-2">Số điện thoại</div>
                            <input type="tel" className="form-control pb-2 pt-2 mb-2" id="SDT" name="SDT" onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <div className="mb-2">Căn cước công dân</div>
                            <input type="text" className="form-control pb-2 pt-2 mb-2" id="CCCD" name="CCCD" onChange={handleChange} />
                        </div>
                        <div className="text-end">
                            <button type="submit" className="btn pb-2 pt-2 mt-2" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}>
                                Tìm kiếm
                            </button>
                        </div>
                    </form>
                </div>

                <table className="table" >
                    <thead>
                        <tr className="table-secondary">
                            <th>Mã bệnh nhân</th>
                            <th>Tên bệnh nhân</th>
                            <th>CCCD</th>
                            <th>Giới tính</th>
                            <th>Ngày sinh</th>
                            <th>SDT</th>
                            <th>Địa chỉ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((item, index) => (
                            <tr key={index} onClick={() => setSelectedRowById(index)}>
                                <td>{item.MaBN}</td>
                                <td>{item.TenBN}</td>
                                <td>{item.CCCD}</td>
                                <td>{item.GioiTinh}</td>
                                <td>{item.NgaySinh}</td>
                                <td>{item.SDT}</td>
                                <td>{item.DiaChi}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> : null}


            {(page === 2) ?
                <div>
                    <div className='row'>
                        <div className='col-md-auto'>
                            <img alt="" src="/images/logo3.png" />
                        </div>
                        <div className='col'>
                            <div style={{ fontSize: "20px", fontWeight: "bold" }}>NHA KHOA LOGOIPSUM</div>
                            <div><span style={{ fontWeight: "600" }}>Địa chỉ:</span> 2 Lô E, KD5, Dương Bá Trạc, Phường 1, quận 8, HCM</div>
                            <div><span style={{ fontWeight: "600" }}>SĐT:</span> 0843593598</div>
                            <div><span style={{ fontWeight: "600" }}>Email:</span> logoipsum@gmail.com</div>
                        </div>
                    </div>
                    <div className='mt-2 pe-2 ps-2'>
                        <div align="center" style={{ fontSize: "25px", fontWeight: "bold" }}>PHIẾU THU</div>
                        <div align="center" style={{ fontStyle: "italic", fontSize: "14px", color: "#6b6b6b" }}>Ngày {moment().date()} tháng {moment().month() + 1} năm {moment().year()}</div>
                        <div><span style={{ fontWeight: "600" }}>Mã hóa đơn: </span>HD001</div>
                        <div><span style={{ fontWeight: "600" }}>Mã BN: </span>BN001</div>
                        <div><span style={{ fontWeight: "600" }}>Địa chỉ: </span>Trần Hưng Đạo, Quận 1, HCM</div>
                        <div><span style={{ fontWeight: "600" }}>Tuổi: </span>24</div>
                        <div><span style={{ fontWeight: "600" }}>Giới tính: </span>Nữ</div>
                        <div><span style={{ fontWeight: "600" }}>Số điện thoại: </span>0893596898</div>

                        <table className="table" >
                            <thead>
                                <tr className="table-secondary">
                                    <th>Người điều trị</th>
                                    <th>Dịch vụ</th>
                                    <th>Đơn giá</th>
                                    <th>Số lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CTHSDT.map((item, index) => (
                                    <tr key={index} onClick={() => setSelectedRowById(index)}>
                                        <td>{item.TenNS}</td>
                                        <td>{item.TenDV}</td>
                                        <td>{item.DonGia}</td>
                                        <td>{item.SL}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='text-end' style={{ fontSize: "18px" }}><b>Tổng tiền điều trị: 50000</b></div>
                        <div align="center" style={{ fontWeight: "bold", fontSize: "18px" }}>ĐƠN THUỐC</div>
                        <table className="table table-borderless" >
                            <tbody>
                                {CTTOATHUOC.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div>
                                                <div><b>{index + 1}/ {item.TenThuoc}</b></div>
                                                <div className='ms-3' style={{ fontStyle: "italic" }}>{item.GhiChu}</div>
                                            </div>
                                        </td>
                                        <td>{item.SL} viên</td>
                                        <td>{item.DonGia}/viên</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='text-end' style={{ fontSize: "18px" }}><b>Tổng tiền thuốc: 50000</b></div>
                        <div className='text-end mt-3' style={{ fontSize: "18px" }}>
                            <div><b>Thành tiền: 900000</b></div>
                            <div><b>Công nợ thanh toán: 4500000</b></div>
                            <div><b>Số tiền đã thanh toán: 5400000</b></div>
                            <div><b>Công nợ sau thanh toán: 0</b></div>
                        </div>
                        <div className='text-end mt-4'>
                            <div style={{ fontSize: "19px" }}><b>NHÂN VIÊN THỰC HIỆN</b></div>
                            <div style={{ height: "50px" }}></div>
                            <div className='mt-5'>
                                <b>
                                    <input type="text" className="form-control pb-2 pt-2 mb-2 text-end signature" id="MaNV" name="MaNV" placeholder='Nhập mã nhân viên' />
                                    <input type="text" className="form-control pb-2 pt-2 mb-2 text-end signature" id="TenNV" name="TenNV" placeholder='Nhập tên nhân viên' />
                                </b>
                            </div>
                            <button type="submit" className="btn pb-2 pt-2 mt-3 mb-3" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}>
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>

                : null}
            <div className="text-end">
                {page !== 1 ? <button type="button"
                    className='btn'
                    style={{ border: "none" }}
                    onClick={() => prevPage()}>
                    <i className="fa-solid fa-chevron-left next_prevBtn"></i>
                </button>
                    : <button className='btn' style={{ border: "none" }}><i className="fa-solid fa-chevron-left next_prevBtn_disabled"></i></button>}
                {(page !== 2 && selectedRow !== null) ? <button type="button"
                    className='btn'
                    style={{ border: "none" }}
                    onClick={() => nextPage()}>
                    <i className="fa-solid fa-chevron-right next_prevBtn"></i>
                </button>
                    : <button className='btn' style={{ border: "none" }}><i className="fa-solid fa-chevron-right next_prevBtn_disabled"></i></button>}
            </div>
        </div >
    );
}

export default BillManagement;