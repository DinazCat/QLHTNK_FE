import React from "react";
import "./mistyles.css";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { useEffect, useState, useContext } from "react";
import { FormThuoc } from "../components/FormThuoc";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../api/Api";

const QuanLyThuoc = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [drugs, setDrugs] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    maThuoc: "",
    tenThuoc: "",
    slnDau: "",
    slnCuoi: "",
    sltkDau: "",
    sltkCuoi: "",
    giaNhapDau: "",
    giaNhapCuoi: "",
    giaDau: "",
    giaCuoi: "",
    hsdDau: "",
    hsdCuoi: "",
    ngayDau: "",
    ngayCuoi: "",
  });

  useEffect(() => {
    getDrugs();
  }, []);

  const getDrugs = async () => {
    const drugs = await api.getAllDrugs();
    setDrugs(drugs);
  };

  const handleDeleteRow = (targetIndex) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this drug?"
    );
    if (shouldDelete) {
      setDrugs(drugs.filter((_, idx) => idx !== targetIndex));
      api.deleteDrug(drugs[targetIndex].maThuoc);
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    console.log(newRow);

    const data = {
      tenThuoc: newRow.tenThuoc,
      soLuongNhap: newRow.soLuongNhap,
      donGiaNhap: newRow.donGiaNhap,
      donGiaBan: newRow.donGiaBan,
      hanSuDung: newRow.hanSuDung,
      ngayNhap: newRow.ngayNhap,
      soLuongTonKho: newRow.soLuongTonKho,
      maCn: 1000,
    };
    if (rowToEdit == null) {
      const newDrug = await api.addDrug(data);
      setDrugs([...drugs, newDrug]);
    } else {
      api.updateDrug(newRow, newRow.maThuoc);
      let updatedDrugs = drugs.map((currRow, idx) => {
        if (idx !== rowToEdit) return currRow;
        return newRow;
      });
      setDrugs(updatedDrugs);
    }
  };

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const onSearch = async () => {
    console.log(searchCriteria);

    const searchResults = await api.getDrugsBySeacrh(searchCriteria);
    console.log(searchResults);
    setDrugs(searchResults);
  };
  return (
    <div>
      <div className="mb-3 mt-3">
        <input
          className="block m-2 customBox"
          type="text"
          id="maThuoc"
          placeholder="Mã thuốc"
          name="maThuoc"
          onChange={handleChange}
        />
        <input
          className="block m-2 customBox"
          type="text"
          id="tenThuoc"
          placeholder="Tên thuốc"
          name="tenThuoc"
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
            placeholder="1000"
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
            placeholder="1000"
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
            name="giaNhapDau"
            onChange={handleChange}
          />
          <text>đến</text>
          <input
            className="block m-2 px-4 customBox"
            type="number"
            placeholder="1000000"
            name="giaNhapCuoi"
            onChange={handleChange}
          />
        </div>
        <div>
          <text>Đơn giá: Từ </text>
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
            placeholder="1000000"
            name="giaCuoi"
            onChange={handleChange}
          />
        </div>
        <div>
          <text>Hạn sử dụng: Từ </text>
          <input
            className="block m-2 px-4 customBox"
            type="date"
            name="hsdDau"
            onChange={handleChange}
          />
          <text>đến</text>
          <input
            className="block m-2 px-4 customBox"
            type="date"
            name="hsdCuoi"
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

      <h1 className="noteVND">
        **Nếu thuốc dạng viên đơn vị tính là viên, còn lại hộp
      </h1>
      <br />
      <h1 className="noteVND">**Tính theo đơn vị VNĐ</h1>
      <table className="table">
        <thead>
          <tr className="table-secondary">
            <th>Mã Thuốc</th>
            <th>Tên thuốc</th>
            <th>Số lượng nhập</th>
            <th>Số lượng tồn kho</th>
            <th>Đơn giá nhập</th>
            <th>Đơn giá</th>
            <th>Hạn sử dụng</th>
            <th>Ngày nhập</th>
            <th></th>
          </tr>
        </thead>
        {drugs.map((row, idx) => {
          return (
            <tr key={row.maThuoc}>
              <td>{row.maThuoc}</td>
              <td>{row.tenThuoc}</td>
              <td>{row.soLuongNhap}</td>
              <td>{row.soLuongTonKho}</td>
              <td>{new Intl.NumberFormat("en-DE").format(row.donGiaNhap)}</td>
              <td>{new Intl.NumberFormat("en-DE").format(row.donGiaBan)}</td>
              <td>{row.hanSuDung}</td>
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
        <FormThuoc
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && drugs[rowToEdit]}
        />
      )}
    </div>
  );
};
export default QuanLyThuoc;
