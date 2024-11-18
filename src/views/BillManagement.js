import React, { useState } from 'react'
import './style.css'
import moment from 'moment';

const BillManagement = (props) => {
    //fake data
    const CTHD = [
        {
            MaBN: "BN001",
            TenBN: "Lê Văn Dần",
            MaHD: "HD001",
            Ngay: "2023-28-12",
            TinhTrang: "Chưa thanh toán",
        },
        {
            MaBN: "BN003",
            TenBN: "Lê Trần Long",
            MaHD: "HD001",
            Ngay: "2023-29-12",
            TinhTrang: "Chưa thanh toán",
        },
        {
            MaBN: "BN004",
            TenBN: "Lê Trần Long",
            MaHD: "HD001",
            Ngay: "2023-28-12",
            TinhTrang: "Đã thanh toán",
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
            Ngay: "2023-10-26",
            DonGia: "1500000",
            SL: "2",
            MaHD: ""
        },
        {
            MaCTHSDT: "CTHS001",
            MaHSDT: "HS001",
            MaDV: "DV001",
            TenDV: "Cấy ghép Implant",
            MaNS: "NS003",
            TenNS: "Nguyễn Văn Thái",
            Ngay: "2023-10-26",
            DonGia: "1500000",
            MaHD: "",
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
            Ngay: "2023-10-11",
            GhiChu: "Ngày uống 2 lần, mỗi lần 1 viên(sáng chiều - sau ăn)"
        },
        {
            MaTT: "TT001",
            MaThuoc: "T002",
            TenThuoc: "MEDOTASE 10mg",
            SL: "10",
            DonGia: "50000",

            Ngay: "2023-10-11",
            GhiChu: "Ngày uống 2 lần, mỗi lần 1 viên(sáng chiều - sau ăn)"
        },
        {
            MaTT: "TT001",
            MaThuoc: "T001",
            TenThuoc: "ALPHACHOAY",
            SL: "5",
            DonGia: "50",
            Ngay: "2023-10-11",
            GhiChu: "Ngày uống 1 lần, mỗi lần 1 viên(sáng - sau ăn)",

        }
    ]

    const [searchCriteria, setSearchCriteria] = useState({
        MaHD: "",
        MaBN: "",
        TenBN: "",
        Ngay: "",
        TinhTrang: ""
    })

    const handleChange = (e) => {
        setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
    };
    const [selectedRow, setSelectedRow] = useState(null);
    const setSelectedRowById = (id) => {
        setSelectedRow(CTHD[id])
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
            <div style={{ minHeight: "630px" }}>
                {page === 1 ? <div>
                    <div className="row">
                        <form className="row ms-0 me-0" style={{ fontWeight: "500" }}>
                            <div className="col-md-6">
                                <div className="mb-2 col-md-6">Mã hóa đơn</div>
                                <input type="text" className="form-control pb-2 pt-2 mb-2" id="MaHD" name="MaHD" onChange={handleChange} value={searchCriteria.MaHD} />
                            </div>
                            <div className="col-md-6">
                                <div className="mb-2 col-md-6">Mã bệnh nhân</div>
                                <input type="text" className="form-control pb-2 pt-2 mb-2" id="MaBN" name="MaBN" onChange={handleChange} value={searchCriteria.MaBN} />
                            </div>
                            <div className="col-md-6">
                                <div className="mb-2">Tên bệnh nhân</div>
                                <input type="text" className="form-control pb-2 pt-2 mb-2" id="TenBN" name="TenBN" onChange={handleChange} value={searchCriteria.TenBN} />
                            </div>
                            <div className="col-md-6">
                                <div className="mb-2">Ngày lập gần nhất</div>
                                <input type="date" className="form-control pb-3 pt-3" id="Ngay" name="Ngay" value={searchCriteria.Ngay} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <div className="mb-2">Tình trạng</div>
                                <select className="form-select pb-2 pt-2 mb-2" aria-label="Chọn tình trạng" id="TinhTrang" name="TinhTrang" onChange={handleChange} value={searchCriteria.TinhTrang}>
                                    <option value="Tất cả">Tất cả</option>
                                    <option value="Đã thanh toán">Đã thanh toán</option>
                                    <option value="Chưa thanh toán">Chưa thanh toán</option>
                                </select>
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
                                <th>Mã hóa đơn</th>
                                <th>Mã bệnh nhân</th>
                                <th>Tên bệnh nhân</th>
                                <th>Ngày lập gần nhất</th>
                                <th>Tình trạng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CTHD.map((item, index) => (
                                <tr key={index} onClick={() => setSelectedRowById(index)}>
                                    <td>{item.MaHD}</td>
                                    <td>{item.MaBN}</td>
                                    <td>{item.TenBN}</td>
                                    <td>{item.Ngay}</td>
                                    <td style={{ fontStyle: "italic", color: item.TinhTrang === "Đã thanh toán" ? "#269A6C" : "#B74141" }}>{item.TinhTrang}</td>
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
                            <div align="center" style={{ fontSize: "25px", fontWeight: "bold" }}>HÓA ĐƠN</div>
                            <div align="center" style={{ fontStyle: "italic", fontSize: "14px", color: "#6b6b6b" }}>Ngày {moment().date()} tháng {moment().month() + 1} năm {moment().year()}</div>
                            <div><span style={{ fontWeight: "600" }}>Mã hóa đơn: </span>HD001</div>
                            <div><span style={{ fontWeight: "600" }}>Mã BN: </span>BN001</div>
                            <div><span style={{ fontWeight: "600" }}>Tên BN: </span>Lê Văn Dần</div>
                            <div><span style={{ fontWeight: "600" }}>Tên NS: </span>Lê Hoài An</div>
                            <div><span style={{ fontWeight: "600" }}>Địa chỉ: </span>Trần Hưng Đạo, Quận 1, HCM</div>
                            <div><span style={{ fontWeight: "600" }}>Tuổi: </span>24</div>
                            <div><span style={{ fontWeight: "600" }}>Giới tính: </span>Nữ</div>
                            <div><span style={{ fontWeight: "600" }}>Số điện thoại: </span>0893596898</div>

                            <table className="table" >
                                <thead>
                                    <tr className="table-secondary">
                                        <th>Dịch vụ</th>
                                        <th>Đơn giá</th>
                                        <th>Số lượng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {CTHSDT.map((item, index) => (
                                        <tr key={index} onClick={() => setSelectedRowById(index)}>
                                            <td>{item.TenDV}</td>
                                            <td>{item.DonGia}</td>
                                            <td>{item.SL}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div style={{ fontSize: "18px" }}><b>Tổng tiền điều trị: 50000</b></div>
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
                            <div style={{ fontSize: "18px" }}><b>Tổng tiền thuốc: 50000</b></div>

                            <div align="right" className='mt-3'>
                                <table className="table table-borderless table-sm w-auto" style={{ fontSize: "18px", borderSpacing: 0, borderCollapse: "separate" }}>
                                    <tbody>
                                        <tr>
                                            <th>Thành tiền:</th>
                                            <th>4500000</th>
                                        </tr>
                                        <tr>
                                            <th>Công nợ trước thanh toán:</th>
                                            <th>900000</th>
                                        </tr>
                                        <tr>
                                            <th>Số tiền đã thanh toán:</th>
                                            <th>
                                                <input type="text" className='signature' id="MaNV" name="MaNV" size={1} placeholder="" style={{
                                                    width: "100%",
                                                    boxSizing: "border-box"
                                                }} />

                                            </th>
                                        </tr>
                                        <tr>
                                            <th> Công nợ sau thanh toán:</th>
                                            <th>0</th>
                                        </tr>
                                        <tr>
                                            <th>Thành tiền:</th>
                                            <th>900000</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='text-end mt-4'>
                                <div style={{ fontSize: "19px" }}><b>NHÂN VIÊN THỰC HIỆN</b></div>
                                <div style={{ height: "50px" }}></div>
                                <div className='mt-5'>
                                    <input type="text" className="text-end signature" style={{ fontSize: "19px", fontWeight: "bold", direction: "RTL" }} id="MaNV" name="MaNV" placeholder='Nhập mã nhân viên' />
                                </div>
                                <div>
                                    <input type="text" className="text-end signature" style={{ fontSize: "19px", fontWeight: "bold" }} id="TenNV" name="TenNV" placeholder='Nhập tên nhân viên' />
                                </div>
                                <button type="submit" className="btn pb-2 pt-2 mt-3 mb-3" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}>
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>

                    : null}
            </div>
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