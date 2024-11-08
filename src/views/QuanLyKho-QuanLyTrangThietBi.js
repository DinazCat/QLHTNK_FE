import React from 'react'
import './mistyles.css' 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { FormVatTuThietBi } from '../components/FormVatTuThietBi';
import { useEffect, useState, useContext } from 'react';
const QuanLyTrangThietBi = (props) => { 
    const [modalOpen, setModalOpen] = useState(false);
    const [vttb, setRows] = useState([
        {
            maVatTu: '001',
            tenVatTu: 'Mắc cài',
            soLuongNhap: '1000',
            soLuongTonKho: '200',
            donGiaNhap: '5000',
            ngayNhap: '2022-10-03',
        },
        {
            maVatTu: '002',
            tenVatTu: 'Tay khoan',
            soLuongNhap: '100',
            soLuongTonKho: '88',
            donGiaNhap: '100000',
            ngayNhap: '2022-10-03',
        },
        {
            maVatTu: '003',
            tenVatTu: 'Máy cạo vôi',
            soLuongNhap: '10',
            soLuongTonKho: '10',
            donGiaNhap: '500000',
            ngayNhap: '2022-10-03',
        },
    ]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [addMGG, setaddMGG] = useState(true);
    const handleDeleteRow = (targetIndex) => {
        setRows(vttb.filter((_, idx) => idx !== targetIndex));
    };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);
        setModalOpen(true);
    };

    const handleSubmit = (newRow) => {
        rowToEdit === null
        ? setRows([...vttb, newRow])
        : setRows(
            vttb.map((currRow, idx) => {
                if (idx !== rowToEdit) return currRow;

                return newRow;
            })
            );
    };
    return (
        <div >
            <div className="mb-3 mt-3">
            <input className="block m-2 px-4 customBox" type="text" id="maThuoc" placeholder="Mã vật tư" name="maThuoc" />
                    <input className="block m-2 px-4 customBox" type="text" id="tenThuoc" placeholder="Tên vật tư" name="tenThuoc" />
                    <input className="block m-2 px-4 customBox" type="number" id="soLuongNhap" placeholder="Số lượng nhập" name="soLuongNhap" />
                    <input className="block m-2 px-4 customBox" type="number" id="soLuongTonKho" placeholder="Số lượng tồn kho" name="soLuongTonKho" />
                    <input className="block m-2 px-4 customBox" type="number" id="donGiaNhap" placeholder="Đơn giá nhập" name="donGiaNhap" />
                    <input className="block m-2 px-4 customBox" type="date" id="ngayNhap" placeholder="" name="ngayNhap" />
                </div>
                <button type="submit" className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Tìm kiếm</button>
                <button onClick={() => setModalOpen(true)} className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                Thêm
            </button>

            <h1 className="noteVND">**Tính theo đơn vị VNĐ</h1>
            <table className="table" >
                <thead>
                    <tr className="table-secondary">
                        <th>Mã vật tư thiết bị</th>
                        <th>Tên vật tư thiết bị</th>
                        <th>Số lượng nhập</th>
                        <th>Số lượng tồn kho</th>
                        <th>Đơn giá nhập</th>
                        <th>Ngày nhập</th>
                        <th></th>
                    </tr>
                </thead>
                {vttb.map((row, idx) => {
                    return (
                    <tr key={row}>
                        <td>{row.maVatTu}</td>
                        <td>{row.tenVatTu}</td>
                        <td>{row.soLuongNhap}</td>
                        <td>{row.soLuongTonKho}</td>
                        <td>{row.donGiaNhap}</td>
                        <td>{row.ngayNhap}</td>
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
        <FormVatTuThietBi
        closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && vttb[rowToEdit]}
        />
      )}
        </div>
    );
}
export default QuanLyTrangThietBi;