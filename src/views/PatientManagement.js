import React, { useState } from 'react'
import './style.css'
import moment from 'moment';
import { BsFillTrashFill, BsFillPencilFill, BsEye } from "react-icons/bs";
import { FormPatient } from '../components/FormPatient';
import { FormRecordMedicine } from '../components/FormRecordMedicine';
import { FormRecordService } from '../components/FormRecordService';
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
    const CTHSDT = [
        {
            MaCTHSDT: "CTHS002",
            MaHSDT: "HS001",
            maDichVu: "DV798",
            tenDichVu: "Chỉnh hình răng",
            MaNS: "NS003",
            TenNS: "Nguyễn Văn Thái",
            DonGia: "1500000",
            SL: "1",
            Ngay: "2023-10-11",
        }
        ,
        {
            MaCTHSDT: "CTHS003",
            MaHSDT: "HS001",
            maDichVu: "DV007",
            tenDichVu: "Chữa răng",
            MaNS: "NS003",
            TenNS: "Nguyễn Văn Thái",
            DonGia: "1500000",
            SL: "1",
            Ngay: "2023-10-11",
        }
    ]
    const CTTOATHUOC = [
        {
            MaCTHSDT: "CTHS003",
            MaTT: "TT001",
            maThuoc: "T023",
            tenThuoc: "Paracetamol",
            SL: "10",
            DonGia: "50000",
            Ngay: "2023-10-11",
            GhiChu: "Ngày uống 2 lần, mỗi lần 1 viên(sáng chiều - sau ăn)"
        },
        {
            MaTT: "TT001",
            MaCTHSDT: "TT001",
            maThuoc: "T012",
            tenThuoc: "Amoxillin",
            Ngay: "2023-10-11",
            SL: "5",
            DonGia: "50",
            GhiChu: "Ngày uống 1 lần, mỗi lần 1 viên(sáng - sau ăn)"
        }
    ]
    const medicines = [
        {
            maThuoc: "T012",
            tenThuoc: "Amoxillin",
            soLuongNhap: "100",
            donGiaNhap: "100",
            donGia: "10000",
            hanSuDung: "2024-10-23",
            ngayNhap: "2023-10-27",
            soLuongTonKho: "100",
        },
        {
            maThuoc: "T023",
            tenThuoc: "Paracetamol",
            soLuongNhap: "300",
            donGiaNhap: "14000",
            donGia: "18000",
            hanSuDung: "2026-06-18",
            ngayNhap: "2023-12-06",
            soLuongTonKho: "300",
        }
    ]
    const services = [
        {
            maDichVu: "DV007",
            tenDichVu: "Chữa răng",
            loaiDichVu: "Răng",
            giaDichVu: "300000",
            baoHanh: "Không",
            coTraGop: "Có",
        },
        {
            maDichVu: "DV798",
            tenDichVu: "Chỉnh hình răng",
            loaiDichVu: "Móc cài kim loại",
            giaDichVu: "30000000",
            baoHanh: "Có",
            coTraGop: "Có",
        },
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
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [page, setPage] = useState(1);
    const [state, setState] = useState("");
    const [patientModalOpen, setPatientModalOpen] = useState(false);
    const [patientRowToEdit, setPatientRowToEdit] = useState(null);
    const [serviceModalOpen, setServiceModalOpen] = useState(false);
    const [serviceRowToEdit, setServiceRowToEdit] = useState(null);
    const [medicineModalOpen, setMedicineModalOpen] = useState(false);
    const [medicineRowToEdit, setMedicineRowToEdit] = useState(null);
    const nextPage = () => {
        setPage(page + 1);
        window.scrollTo(0, 0);
    }
    const prevPage = () => {
        setPage(page - 1);
        window.scrollTo(0, 0);
    }
    const handleEditRecordRow = (item) => {
        setSelectedRecord(item);
        setPage(3);
        setState("edit");
    }
    const handleSubmit = () => {

    }
    const handleDeleteRecordRow = (item) => {

    }
    const setSelectedPatientRow = (item) => {
        setSelectedPatient(item);
        setPage(2);
    }
    const createNewRecord = () => {
        setPage(3);
        setState("create")
    }
    const handleEditPatientRow = (index) => {
        setPatientRowToEdit(index);
        setPatientModalOpen(true);
    }
    const handleDeletePatientRow = (index) => {
    }
    const handleEditMedicineRow = (index) => {
        setMedicineRowToEdit(index);
        setMedicineModalOpen(true);
    }
    const handleDeleteMedicineRow = (index) => {
    }
    const handleEditServiceRow = (index) => {
        setServiceRowToEdit(index);
        setServiceModalOpen(true);
    }
    const handleDeleteServiceRow = (index) => {
    }
    return (
        <div>
            <div style={{ minHeight: "630px" }}>
                {page === 1 ? <div>
                    <div className="row">
                        <div className="row ms-0 me-0" style={{ fontWeight: "500" }}>
                            <div className="col-md-6">
                                <div className="mb-2 col-md-6">Mã bệnh nhân</div>
                                <input type="text" className="form-control pb-2 pt-2 mb-2" id="MaBN" name="MaBN" onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <div className="mb-2">Tên bệnh nhân</div>
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
                                <button type="submit" className="btn pb-2 pt-2 mt-2 ms-3" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }} onClick={() => setPatientModalOpen(true)}>
                                    Thêm bệnh nhân
                                </button>
                            </div>
                        </div>
                    </div>

                    <table className="table" >
                        <thead>
                            <tr className="table-secondary">
                                <th>Mã bệnh nhân</th>
                                <th>Tên bệnh nhân</th>
                                <th>CCCD</th>
                                <th>Giới tính</th>
                                <th>Ngày sinh</th>
                                <th>SĐT</th>
                                <th>Địa chỉ</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.MaBN}</td>
                                    <td>{item.TenBN}</td>
                                    <td>{item.CCCD}</td>
                                    <td>{item.GioiTinh}</td>
                                    <td>{item.NgaySinh}</td>
                                    <td>{item.SDT}</td>
                                    <td>{item.DiaChi}</td>
                                    <td className="fit">
                                        <span className="actions">
                                            <BsEye
                                                size={19}
                                                color='#0096FF'
                                                onClick={() => setSelectedPatientRow(item)}
                                            />
                                            <BsFillPencilFill
                                                className="edit-btn"
                                                onClick={() => handleEditPatientRow(index)}
                                            />
                                            <BsFillTrashFill
                                                className="delete-btn"
                                                onClick={() => handleDeletePatientRow(index)}
                                            />

                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div> : null}
                {(page === 2 && selectedPatient !== null) ?
                    <div className='pe-2 ps-2'>
                        <div align="center" style={{ fontSize: "25px", fontWeight: "bold" }}>HỒ SƠ ĐIỀU TRỊ</div>
                        <div><span style={{ fontWeight: "600" }}>Mã hồ sơ điều trị: </span>HS001</div>
                        <div><span style={{ fontWeight: "600" }}>Mã BN: </span>BN001</div>
                        <div><span style={{ fontWeight: "600" }}>Tên BN: </span>Lê Văn Dần</div>
                        <div><span style={{ fontWeight: "600" }}>Địa chỉ: </span>Trần Hưng Đạo, Quận 1, HCM</div>
                        <div><span style={{ fontWeight: "600" }}>Tuổi: </span>24</div>
                        <div><span style={{ fontWeight: "600" }}>Giới tính: </span>Nữ</div>
                        <div><span style={{ fontWeight: "600" }}>Số điện thoại: </span>0893596898</div>

                        <div className="row mt-2">
                            <div className="row" style={{ fontWeight: "500" }}>
                                <div className="col-lg-4 col-md-10">
                                    <div className="mb-2 col-md-6">Mã nha sĩ</div>
                                    <input type="text" className="form-control pb-2 pt-2 mb-2" id="MaBN" name="MaBN" />
                                </div>
                                <div className="col-lg-4 col-md-10">
                                    <div className="mb-2">Tên nha sĩ</div>
                                    <input type="text" className="form-control pb-2 pt-2 mb-2" id="TenBN" name="TenBN" />
                                </div>
                                <div className="col-lg-4 col-md-10">
                                    <div className="mb-2">Ngày điều trị</div>
                                    <input type="date" className="form-control pb-2 pt-2 mb-2" id="NgaySuDung" name="NgaySuDung" />
                                </div>
                                <div className="text-end">
                                    <button type="submit" className="btn pb-2 pt-2 mt-2" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}>
                                        Tìm kiếm
                                    </button>
                                </div>
                            </div>
                        </div>

                        <table className="table" >
                            <thead>
                                <tr className="table-secondary">
                                    <th>Mã nha sĩ điều trị</th>
                                    <th>Tên nha sĩ điều trị</th>
                                    <th>Ngày điều trị</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {CTHSDT.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.MaNS}</td>
                                        <td>{item.TenNS}</td>
                                        <td>{item.Ngay}</td>
                                        <td className="fit">
                                            <span className="actions">
                                                <BsEye
                                                    size={19}
                                                    color='#0096FF'
                                                    onClick={() => handleEditRecordRow(item)}
                                                />
                                                <BsFillTrashFill
                                                    className="delete-btn"
                                                    onClick={() => handleDeleteRecordRow(item)}
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="text-end">
                            <button type="submit" className="btn pb-2 pt-2 ps-3 pe-3 mt-2 mb-3" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }} onClick={() => createNewRecord()}>
                                Thêm
                            </button>
                        </div>
                    </div>
                    : null}
                {(page === 3) ?
                    <div className='pe-2 ps-2'>
                        <div align="center" style={{ fontSize: "25px", fontWeight: "bold" }}>CHI TIẾT HỒ SƠ ĐIỀU TRỊ</div>
                        <div align="center" style={{ fontStyle: "italic", fontSize: "14px", color: "#6b6b6b" }}>Ngày 12 tháng 11 năm 2023</div>
                        <div><span style={{ fontWeight: "600" }}>Mã hồ sơ điều trị: </span>HS001</div>
                        <div><span style={{ fontWeight: "600" }}>Mã BN: </span>BN001</div>
                        <div><span style={{ fontWeight: "600" }}>Tên BN: </span>Lê Văn Dần</div>
                        <div><span style={{ fontWeight: "600" }}>Địa chỉ: </span>Trần Hưng Đạo, Quận 1, HCM</div>
                        <div><span style={{ fontWeight: "600" }}>Tuổi: </span>24</div>
                        <div><span style={{ fontWeight: "600" }}>Giới tính: </span>Nữ</div>
                        <div><span style={{ fontWeight: "600" }}>Số điện thoại: </span>0893596898</div>
                        <div className='row'>
                            <div className='col-md-auto mt-auto mb-auto' style={{ fontWeight: "600" }}>Nha sĩ điều trị:</div>
                            <div className='col-md-auto'>
                                <input type="text" className="form-control signature" id="MaNV" name="MaNV" placeholder='Nhập mã nha sĩ' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-auto mt-auto mb-auto' style={{ fontWeight: "600" }}>Chuẩn đoán:</div>
                            <div className='col-md-auto'>
                                <input type="text" className="form-control signature" id="MaNV" name="MaNV" placeholder='Nhập chuẩn đoán' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-auto mt-auto mb-auto' style={{ fontWeight: "600" }}>Ghi chú:</div>
                            <div className='col-md-auto'>
                                <input type="text" className="form-control signature" id="MaNV" name="MaNV" placeholder='Nhập ghi chú' />
                            </div>
                        </div>
                        <div style={{ fontWeight: "600" }}>Ảnh sau khi điều trị:</div>
                        <div className='col-md-4 col-sm-6 m-auto'>
                            <img src="/images/ava.png" style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }} />
                            <input type="file" hidden accept="image/*" name="HinhAnhSauDieuTri" id="HinhAnhSauDieuTri" />
                            <div className="mt-3" align="center">
                                <label for="HinhAnhSauDieuTri" className='btn d-flex btn-primary' style={{ width: "fit-content" }}>
                                    <div><i className="fa-solid fa-cloud-arrow-up me-2" style={{ color: "#FFF", fontSize: "35px" }}></i></div>
                                    <div className='m-auto'>Đăng ảnh</div>

                                </label>
                            </div>
                        </div>
                        <div className="text-end">
                            <button type="submit" className="btn pb-2 pt-2 ps-3 mt-2 pe-3" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }} onClick={() => setServiceModalOpen(true)}>
                                Thêm dịch vụ
                            </button>
                            <button type="submit" className="btn pb-2 pt-2 ps-3 mt-2 pe-3 ms-3" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }} onClick={() => setMedicineModalOpen(true)}>
                                Thêm thuốc
                            </button>
                        </div>
                        <table className="table" >
                            <thead>
                                <tr className="table-secondary">
                                    <th>Dịch vụ</th>
                                    <th>Đơn giá</th>
                                    <th>Số lượng</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {CTHSDT.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.tenDichVu}</td>
                                        <td>{item.DonGia}</td>
                                        <td>{item.SL}</td>
                                        <td className="fit">
                                            <span className="actions">
                                                <BsFillPencilFill
                                                    className="edit-btn"
                                                    onClick={() => handleEditServiceRow(index)}
                                                />
                                                <BsFillTrashFill
                                                    className="delete-btn"
                                                    onClick={() => handleDeleteServiceRow(index)}
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <table className="table table-borderless" >
                            <tbody>
                                {CTTOATHUOC.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div>
                                                <div><b>{index + 1}/ {item.tenThuoc}</b></div>
                                                <div className='ms-3' style={{ fontStyle: "italic" }}>{item.GhiChu}</div>
                                            </div>
                                        </td>
                                        <td>{item.SL} viên</td>
                                        <td>{item.DonGia}/viên</td>
                                        <td className="fit">
                                            <span className="actions">
                                                <BsFillPencilFill
                                                    className="edit-btn"
                                                    onClick={() => handleEditMedicineRow(index)}
                                                />
                                                <BsFillTrashFill
                                                    className="delete-btn"
                                                    onClick={() => handleDeleteMedicineRow(index)}
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='text-end'><b>Thành tiền: 50000</b></div>
                        <div className="text-end">
                            <button type="submit" className="btn pb-2 pt-2 mt-3 mb-3" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}>
                                Lưu
                            </button>
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
                </button> : <button className='btn' style={{ border: "none" }}><i className="fa-solid fa-chevron-left next_prevBtn_disabled"></i></button>}
                {((page === 3) || (page === 1 && selectedPatient === null) || (page === 2 && selectedRecord === null)) ?
                    <button className='btn' style={{ border: "none" }}><i className="fa-solid fa-chevron-right next_prevBtn_disabled"></i></button>
                    : <button type="button"
                        className='btn'
                        style={{ border: "none" }}
                        onClick={() => nextPage()}>
                        <i className="fa-solid fa-chevron-right next_prevBtn"></i>
                    </button>}
            </div>
            {
                patientModalOpen && (
                    <FormPatient
                        closeModal={() => {
                            setPatientModalOpen(false);
                            setPatientRowToEdit(null);
                        }}
                        onSubmit={handleSubmit}
                        defaultValue={patientRowToEdit !== null && customers[patientRowToEdit]}
                        medicines={medicines}
                    />
                )
            }
            {
                medicineModalOpen && (
                    <FormRecordMedicine
                        closeModal={() => {
                            setMedicineModalOpen(false);
                            setMedicineRowToEdit(null);
                        }}
                        onSubmit={handleSubmit}
                        defaultValue={medicineRowToEdit !== null && CTTOATHUOC[medicineRowToEdit]}
                        medicines={medicines}
                    />
                )
            }
            {
                serviceModalOpen && (
                    <FormRecordService
                        closeModal={() => {
                            setServiceModalOpen(false);
                            setServiceRowToEdit(null);
                        }}
                        onSubmit={handleSubmit}
                        defaultValue={serviceRowToEdit !== null && CTHSDT[serviceRowToEdit]}
                        services={services}
                    />
                )
            }
        </div >
    );
}

export default PatientManagement;