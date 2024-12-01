import React from "react";
import "./mistyles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { FormVatTuThietBi } from "../components/FormVatTuThietBi";
import { useEffect, useState, useContext } from "react";
import api from "../api/Api";

const QuanLyTrangThietBi = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    maVt: "",
    tenVt: "",
    slnDau: "",
    slnCuoi: "",
    sltkDau: "",
    sltkCuoi: "",
    giaDau: "",
    giaCuoi: "",
    ngayDau: "",
    ngayCuoi: "",
  });

  useEffect(() => {
    getMaterials();
  }, []);

  const getMaterials = async () => {
    const materials = await api.getAllMaterials();
    setMaterials(materials);
  };

  const handleDeleteRow = (targetIndex) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this material?"
    );
    if (shouldDelete) {
      setMaterials(materials.filter((_, idx) => idx !== targetIndex));
      api.deleteMaterial(materials[targetIndex].maVt);
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    console.log(newRow);
    const data = {
      tenVt: newRow.tenVt,
      soLuongNhap: newRow.soLuongNhap,
      soLuongTonKho: newRow.soLuongTonKho,
      donGiaNhap: newRow.donGiaNhap,
      ngayNhap: newRow.ngayNhap,
      maCn: 1000,
    };
    if (rowToEdit == null) {
      const id = await api.addMaterial(data);
      //newRow.maVt = id;
      setMaterials([...materials, newRow]);
    } else {
      api.updateMaterial(newRow, newRow.maVt);
      let updatedMaterials = materials.map((currRow, idx) => {
        if (idx !== rowToEdit) return currRow;
        return newRow;
      });
      setMaterials(updatedMaterials);
    }
  };

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const onSearch = async () => {
    console.log(searchCriteria);

    const searchResults = await api.getMaterialsBySeacrh(searchCriteria);
    console.log(searchResults);
    setMaterials(searchResults);
  };
  return (
    <div>
      <div className="mb-3 mt-3">
        <input
          className="block m-2 px-4 customBox"
          type="text"
          id="maVt"
          placeholder="Mã vật tư"
          name="maVt"
          onChange={handleChange}
        />
        <input
          className="block m-2 px-4 customBox"
          type="text"
          id="tenVt"
          placeholder="Tên vật tư"
          name="tenVt"
          onChange={handleChange}
        />
        <div>
          <text>Số lượng nhập: Từ </text>
          <input
            className="block m-2 px-4 customBox"
            type="number"
            placeholder="0"
            name="slnDau"
            onChange={handleChange}
          />
          <text>đến</text>
          <input
            className="block m-2 px-4 customBox"
            type="number"
            placeholder="1000000000"
            name="slnCuoi"
            onChange={handleChange}
          />
        </div>
        <div>
          <text>Số lượng tồn kho: Từ </text>
          <input
            className="block m-2 px-4 customBox"
            type="number"
            placeholder="0"
            name="sltkDau"
            onChange={handleChange}
          />
          <text>đến</text>
          <input
            className="block m-2 px-4 customBox"
            type="number"
            placeholder="1000000000"
            name="sltkCuoi"
            onChange={handleChange}
          />
        </div>
        <div>
          <text>Giá nhập: Từ </text>
          <input
            className="block m-2 px-4 customBox"
            type="number"
            placeholder="0"
            name="giaDau"
            onChange={handleChange}
          />
          <text>đến</text>
          <input
            className="block m-2 px-4 customBox"
            type="number"
            placeholder="1000000000"
            name="giaCuoi"
            onChange={handleChange}
          />
        </div>
        <div>
          <text>Ngày nhập: Từ </text>
          <input
            className="block m-2 px-4 customBox"
            type="date"
            name="ngayDau"
            onChange={handleChange}
          />
          <text>đến</text>
          <input
            className="block m-2 px-4 customBox"
            type="date"
            name="ngayCuoi"
            onChange={handleChange}
          />
        </div>
      </div>
      <button
        type="submit"
        className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick={onSearch}
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
            <th>Mã vật tư thiết bị</th>
            <th>Tên vật tư thiết bị</th>
            <th>Số lượng nhập</th>
            <th>Số lượng tồn kho</th>
            <th>Đơn giá nhập</th>
            <th>Ngày nhập</th>
            <th></th>
          </tr>
        </thead>
        {materials.map((row, idx) => {
          return (
            <tr key={row.maVt}>
              <td>{row.maVt}</td>
              <td>{row.tenVt}</td>
              <td>{row.soLuongNhap}</td>
              <td>{row.soLuongTonKho}</td>
              <td>{new Intl.NumberFormat("en-DE").format(row.donGiaNhap)}</td>
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
        <tbody></tbody>
      </table>
      {modalOpen && (
        <FormVatTuThietBi
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && materials[rowToEdit]}
        />
      )}
    </div>
  );
};
export default QuanLyTrangThietBi;
