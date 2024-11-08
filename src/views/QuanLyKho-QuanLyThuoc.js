import React from 'react'
import './mistyles.css'
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { useEffect, useState, useContext } from 'react';
import { FormThuoc } from '../components/FormThuoc';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const QuanLyThuoc = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [thuoc, setRows] = useState([
        {
            maThuoc: '001',
            tenThuoc: 'Paracetamol ',
            soLuongNhap: '400',
            donGiaNhap: '15000',
            donGia: '15000',
            hanSuDung: '2025-10-20',
            ngayNhap: '2022-10-20',
            soLuongTonKho: '356',
        },
        {
            maThuoc: '002',
            tenThuoc: 'Prilocaine',
            soLuongNhap: '400',
            donGiaNhap: '15000',
            donGia: '15000',
            hanSuDung: '2025-10-20',
            ngayNhap: '2023-10-20',
            soLuongTonKho: '356',
        },
        {
            maThuoc: '003',
            tenThuoc: 'Alaxan  ',
            soLuongNhap: '400',
            donGiaNhap: '15000',
            donGia: '15000',
            hanSuDung: '2025-10-20',
            ngayNhap: '2022-10-20',
            soLuongTonKho: '356',
        },
    ]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const handleDeleteRow = (targetIndex) => {
        setRows(thuoc.filter((_, idx) => idx !== targetIndex));
    };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);
        setModalOpen(true);
    };

    const handleSubmit = (newRow) => {
        rowToEdit === null
        ? setRows([...thuoc, newRow])
        : setRows(
            thuoc.map((currRow, idx) => {
                if (idx !== rowToEdit) return currRow;

                return newRow;
            })
            );
    };
    return (
        <div >
                <div className="mb-3 mt-3">
                    <input className="block m-2 customBox" type="text" id="maThuoc" placeholder="Mã thuốc" name="maThuoc" />
                    <input className="block m-2 customBox" type="text" id="tenThuoc" placeholder="Tên thuốc" name="tenThuoc" />
                    <input className="block m-2 customBox" type="number" id="soLuongNhap" placeholder="Số lượng nhập" name="soLuongNhap" />
                    <input className="block m-2 customBox" type="number" id="donGiaNhap" placeholder="Đơn giá nhập" name="donGiaNhap" />
                    <input className="block m-2 customBox" type="number" id="donGia" placeholder="Đơn giá" name="donGia" />
                    <input className="block m-2 customBox" type="date" id="hanSuDung" placeholder="" name="hanSuDung" />
                    <input className="block m-2 customBox" type="date" id="ngayNhap" placeholder="" name="ngayNhap" />
                    <input className="block m-2 customBox" type="number" id="soLuongTonKho" placeholder="Số lượng tồn kho" name="soLuongTonKho" />
                </div>
                <button type="submit" className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Tìm kiếm</button>
                <button onClick={() => setModalOpen(true)} className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                Thêm
            </button>

            <h1 className="noteVND">**Nếu thuốc dạng viên đơn vị tính là viên, còn lại hộp</h1>
            <br/>
            <h1 className="noteVND">**Tính theo đơn vị VNĐ</h1>
            <table className="table" >
                <thead>
                    <tr className="table-secondary">
                        <th>Mã Thuốc</th>
                        <th>Tên thuốc</th>
                        <th>Số lượng nhập</th>
                        <th>Đơn giá nhập</th>
                        <th>Đơn giá</th>
                        <th>Hạn sử dụng</th>
                        <th>Ngày nhập</th>
                        <th>Số lượng tồn kho</th>
                        <th></th>
                    </tr>
                </thead>
                {thuoc.map((row, idx) => {
                    return (
                    <tr key={row}>
                        <td>{row.maThuoc}</td>
                        <td>{row.tenThuoc}</td>
                        <td>{row.soLuongNhap}</td>
                        <td>{row.donGiaNhap}</td>
                        <td>{row.donGia}</td>
                        <td>{row.hanSuDung}</td>
                        <td>{row.ngayNhap}</td>
                        <td>{row.soLuongTonKho}</td>
                        <td className="fit">
                            <span className="actions">
                                <BsFillTrashFill
                                className="delete-btn"
                                onClick={() => handleDeleteRow(idx)}
                                />
                                <BsFillPencilFill
                                className="edit-btn"
                                onClick={() => handleEditRow(idx)}
                                />
                            </span>
                        </td>
                    </tr>
                    );
                    })}
                <tbody>

                </tbody>
            </table>
            {modalOpen &&(
        <FormThuoc
        closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && thuoc[rowToEdit]}
        />
      )}
        </div>
    );
}
export default QuanLyThuoc;