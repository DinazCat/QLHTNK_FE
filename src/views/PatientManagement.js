import React, { useState } from 'react'
import './style.css'
import moment from 'moment';

const PatientManagement = (props) => {
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
            <div className="text-end">
                {page !== 1 ? <button type="button"
                    className="btn pb-2 pt-2 mt-2 col-auto"
                    style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
                    onClick={() => prevPage()}>
                    <i className="fa-solid fa-chevron-left"></i>
                </button> : <button>Prev</button>}
                {page !== 3 ? <button type="button" className="btn pb-2 pt-2 mt-2 col-auto" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }} onClick={() => nextPage()}>
                    <i className="fa-solid fa-chevron-right"></i>
                </button> : <button>Next</button>}
            </div>
        </div >
    );
}

export default PatientManagement;