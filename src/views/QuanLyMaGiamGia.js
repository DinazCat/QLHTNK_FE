import React from "react";
import "./mistyles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState, useContext } from "react";
import { FormMaGiamGia } from "../components/FormMaGiamGia";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import AddMaGiamGia from "../components/AddMaGiamGia";
import api from "../api/Api";
const QuanLyMaGiamGia = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [magiamgia, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    maGiamGia: "",
    TGBatDau: "",
    TGKetThuc: "",
  });

  const handleDeleteRow = (targetIndex) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this discount?"
    );
    if (shouldDelete) {
      setRows(magiamgia.filter((_, idx) => idx !== targetIndex));
      api.deleteDiscount(magiamgia[targetIndex].Id);
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    if (rowToEdit == null) {
      const id = await api.addDiscount(newRow);
      newRow.Id = id;
      setRows([...magiamgia, newRow]);
    } else {
      api.updateDiscount(newRow, newRow.Id);
      let updatedDiscounts = magiamgia.map((currRow, idx) => {
        if (idx !== rowToEdit) return currRow;
        return newRow;
      });
      setRows(updatedDiscounts);
    }
  };

  const getDiscounts = async () => {
    const discounts = await api.getAllDiscounts();
    setRows(discounts);
  };

  const onSearch = async () => {
    const searchResults = await api.getDiscountsBySearch(searchCriteria);
    setRows(searchResults);
  };

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getDiscounts();
  }, []);

  return (
    <div>
      <div className="mb-3 mt-3">
        <input
          className="block m-2 px-4 customBox"
          type="text"
          id="maGiamGia"
          placeholder="Nhập id mã giảm giá"
          name="maGiamGia"
          onChange={handleChange}
        />
        <div>
          <text>Ngày bắt đầu từ: </text>
          <input
            className="block m-2 px-4 customBox"
            type="date"
            name="TGBatDau"
            id="TGBatDau"
            onChange={handleChange}
          />
        </div>
        <div>
          <text>đến ngày: </text>
          <input
            className="block m-2 px-4 customBox"
            type="date"
            name="TGKetThuc"
            id="TGKetThuc"
            onChange={handleChange}
          />
        </div>
      </div>
      <button
        onClick={onSearch}
        className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Tìm kiếm
      </button>
      <button
        onClick={() => setModalOpen(true)}
        className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Thêm
      </button>
      <h1 className="noteVND">**Tính theo đơn vị VNĐ</h1>
      <table className="table">
        <thead>
          <tr className="table-secondary">
            <th>ID mã giảm giá</th>
            <th>Phần trăm giảm</th>
            <th>Thời gian bắt đầu</th>
            <th>Thời gian kết thúc</th>
            {/* <th>Dịch vụ áp dụng</th> */}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {magiamgia.map((row, idx) => {
            return (
              <tr key={row.Id}>
                <td>{row.maGiamGia}</td>
                <td>{row.phanTram}</td>
                <td>{row.TGBatDau}</td>
                <td>{row.TGKetThuc}</td>
                {/* <td>{row.dichVuApDung}</td> */}
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
        </tbody>
      </table>

      {modalOpen && (
        <FormMaGiamGia
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && magiamgia[rowToEdit]}
          discounts={magiamgia}
        />
      )}
    </div>
  );
};
export default QuanLyMaGiamGia;
