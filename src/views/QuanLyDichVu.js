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
    maDv: "",
    tenDv: "",
    loaiDv: "",
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

  const handleDeleteRow = async (targetIndex) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (shouldDelete) {
      const res = await api.deleteService(services[targetIndex].maDv);
      if (res == "error") {
        alert(
          "Không thể xóa vì dữ liệu này có liên kết đến các thông tin khác trong hệ thống."
        );
      } else {
        setServices(services.filter((_, idx) => idx !== targetIndex));
      }
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
      const newService = await api.addService(data);
      setServices([...services, newService]);
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
    const searchResults = await api.getServicesBySearch(searchCriteria);

    console.log(searchResults);
    setServices(searchResults.services);
  };
  return (
    <div>
      <div className="mb-3 mt-3">
        <input
          className="block m-2 px-4 customBox"
          type="text"
          id="maDv"
          placeholder="Nhập mã dịch vụ"
          name="maDv"
          value={searchCriteria.maDv}
          onChange={handleChange}
        />
        <input
          className="block m-2 px-4 customBox"
          type="text"
          id="tenDv"
          placeholder="Nhập tên dịch vụ"
          name="tenDv"
          value={searchCriteria.tenDv}
          onChange={handleChange}
        />
        <input
          className="block m-2 px-4 customBox"
          type="text"
          id="loaiDv"
          placeholder="Nhập loại dịch vụ"
          name="loaiDv"
          value={searchCriteria.loaiDv}
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
            placeholder="1000000"
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
        {services?.map((row, idx) => {
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
