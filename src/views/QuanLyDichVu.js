import React from 'react'
import './mistyles.css'
import AddDichVu from '../components/AddDichVu';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { useEffect, useState, useContext } from 'react';
import { FormDichVu } from '../components/FormDichVu';
const QuanLyDichVu = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [dichvu,setRows] = useState([
        {
            maDichVu: '001',
            tenDichVu: 'Niềng răng',
            giaDichVu: '35000000',
            baoHanh: 'Có',
            coTraGop: 'Có',
        },
        {
            maDichVu: '002',
            tenDichVu: 'Nhổ răng',
            giaDichVu: '1000000',
            baoHanh: 'Có',
            coTraGop: 'Không',
        },
        {
            maDichVu: '003',
            tenDichVu: 'Trám răng',
            giaDichVu: '350000',
            baoHanh: 'Có',
            coTraGop: 'Không',
        },
    ]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [addMGG, setaddMGG] = useState(true);
    const handleDeleteRow = (targetIndex) => {
        setRows(dichvu.filter((_, idx) => idx !== targetIndex));
    };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);
        setModalOpen(true);
    };

    const handleSubmit = (newRow) => {
        rowToEdit === null
        ? setRows([...dichvu, newRow])
        : setRows(
            dichvu.map((currRow, idx) => {
                if (idx !== rowToEdit) return currRow;

                return newRow;
            })
            );
    };
    return (
        <div>
            <div className="mb-3 mt-3">
                <input className="block m-2 px-4 customBox" type="text" id="maDichVu" placeholder="Nhập mã dịch vụ" name="maDichVu" />
                <input className="block m-2 px-4 customBox" type="text" id="tenDichVu" placeholder="Nhập tên dịch vụ" name="tenDichVu" />
            </div>
            <button
                onClick={props.toggleShow}
                className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
                Tìm kiếm
            </button>
            <button onClick={() => setModalOpen(true)} className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                Thêm
            </button>
            <h1 className="noteVND">**Tính theo đơn vị VNĐ</h1>
            <table className="table" >
                <thead>
                    <tr className="table-secondary">
                        <th>Mã dịch vụ</th>
                        <th>Tên dịch vụ</th>
                        <th>Giá thành</th>
                        <th>Bảo hành</th>
                        <th>Có trả góp hay không</th>
                        <th></th>
                    </tr>
                </thead>
                {dichvu.map((row, idx) => {
                    
                    return (
                    <tr key={row}>
                        <td>{row.maDichVu}</td>
                        <td>{row.tenDichVu}</td>
                        <td>{row.giaDichVu}</td>
                        <td>
                        {row.baoHanh}
                        </td>
                        <td>
                        {row.coTraGop}
                        </td>
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
        <FormDichVu
        closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && dichvu[rowToEdit]}
        />
      )}
        </div>
    );
}
export default QuanLyDichVu;