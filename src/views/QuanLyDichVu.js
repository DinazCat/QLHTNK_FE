import React from "react";
import "./mistyles.css";
import AddDichVu from "../components/AddDichVu";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { useEffect, useState, useContext } from "react";
import { FormDichVu } from "../components/FormDichVu";
import api from "../api/Api";

const QuanLyDichVu = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    maDichVu: "",
    tenDichVu: "",
    loaiDichVu: "",
    giaDau: "",
    giaCuoi: "",
  });
  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    const services = await api.getAllServices();
    setServices(services);
  };

  const handleDeleteRow = (targetIndex) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (shouldDelete) {
      setServices(services.filter((_, idx) => idx !== targetIndex));
      api.deleteService(services[targetIndex].maDv);
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    const data = {
      tenDv: newRow.tenDv,
      loaiDv: newRow.loaiDv,
      giaThapNhat: newRow.giaThapNhat,
      giaCaoNhat: newRow.giaCaoNhat,
      moTa: newRow.moTa,
      chinhSachBaoHanh: newRow.chinhSachBaoHanh,
    };
    if (rowToEdit == null) {
      const id = await api.addService(data);
      //newRow.Id = id;
      setServices([...services, newRow]);
    } else {
      api.updateService(newRow.maDv, newRow);
      let updatedServices = services.map((currRow, idx) => {
        if (idx !== rowToEdit) return currRow;
        return newRow;
      });
      setServices(updatedServices);
    }
  };

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const onSearch = async () => {
    console.log(searchCriteria);

    const searchResults = await api.getServicesBySeacrh(searchCriteria);
    console.log(searchResults);
    setServices(searchResults);
  };
  return (
    <div>
      <div className="mb-3 mt-3">
        <input
          className="block m-2 px-4 customBox"
          type="text"
          id="maDichVu"
          placeholder="Nhập mã dịch vụ"
          name="maDichVu"
          value={searchCriteria.maDichVu}
          onChange={handleChange}
        />
        <input
          className="block m-2 px-4 customBox"
          type="text"
          id="tenDichVu"
          placeholder="Nhập tên dịch vụ"
          name="tenDichVu"
          value={searchCriteria.tenDichVu}
          onChange={handleChange}
        />
        <input
          className="block m-2 px-4 customBox"
          type="text"
          id="loaiDichVu"
          placeholder="Nhập loại dịch vụ"
          name="loaiDichVu"
          value={searchCriteria.loaiDichVu}
          onChange={handleChange}
        />
        <div>
          <text>Đơn giá: Từ </text>
          <input
            className="block m-2 px-4 customBox"
            type="number"
            placeholder="0"
            name="giaDau"
            value={searchCriteria.giaDau}
            onChange={handleChange}
          />
          <text>đến</text>
          <input
            className="block m-2 px-4 customBox"
            type="number"
            placeholder="1000000000"
            name="giaCuoi"
            value={searchCriteria.giaCuoi}
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
            <th>Mã dịch vụ</th>
            <th>Tên dịch vụ</th>
            <th>Loại dịch vụ</th>
            <th>Giá thấp nhất</th>
            <th>Giá cao nhất</th>
            <th>Mô tả</th>
            <th>Bảo hành</th>
            <th></th>
          </tr>
        </thead>
        {services.map((row, idx) => {
          return (
            <tr key={row.Id}>
              <td>{row.maDv}</td>
              <td>{row.tenDv}</td>
              <td>{row.loaiDv}</td>
              <td>{new Intl.NumberFormat("en-DE").format(row.giaThapNhat)}</td>
              <td>{new Intl.NumberFormat("en-DE").format(row.giaCaoNhat)}</td>
              <td>{row.moTa}</td>
              <td>{row.chinhSachBaoHanh}</td>
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
        <FormDichVu
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && services[rowToEdit]}
          services={services}
        />
      )}
    </div>
  );
};
export default QuanLyDichVu;
