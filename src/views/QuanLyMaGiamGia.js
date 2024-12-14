import React from "react";
import "./mistyles.css";
import { useEffect, useState } from "react";
import { FormMaGiamGia } from "../components/FormMaGiamGia";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import api from "../api/Api";
import moment from "moment";
import CustomModal from '../components/MessageBox.js';
const QuanLyMaGiamGia = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [magiamgia, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [signal, setSignal] = useState(0);//thêm là 0, sửa là 1
  const [searchCriteria, setSearchCriteria] = useState({
    tenGiamGia: "",
    ngayDau: "",
    ngayCuoi: ""
  });
  const [showDialog, setShowDialog] = useState(false);
  const [ndshow, setNdshow] = useState('');
  const handleShowDialog = (body) => {
    setNdshow(body)
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };
  const handleDeleteRow = async(targetIndex) => {
      const currentDate = new Date();
      const finish = new Date(magiamgia[targetIndex].ngayKetThuc);
      // Reset thời gian về 00:00:00
      currentDate.setHours(0, 0, 0, 0);
      finish.setHours(0, 0, 0, 0);
      if (finish< currentDate) {
        window.confirm('mã giảm giá này đã hết thời hạn có thể điều chỉnh');
        return;
    }
    const shouldDelete = window.confirm(
      'Bạn có chắc chắn muốn xóa tài khoản này không?'
    );
    if (shouldDelete) {
    //   setRows(magiamgia.filter((_, idx) => idx !== targetIndex));
    //   api.deleteDiscount(magiamgia[targetIndex].Id);
    const res = await api.deleteDiscount(magiamgia[targetIndex].maGiamGia)
    if(res?.success){
      setRows(magiamgia.filter((_, idx) => idx !== targetIndex));
    }
    handleShowDialog(res?.message)
    }
  };

  const handleEditRow = (idx) => {
    const currentDate = new Date();
    const finish = new Date(magiamgia[idx].ngayKetThuc);
    // Reset thời gian về 00:00:00
    currentDate.setHours(0, 0, 0, 0);
    finish.setHours(0, 0, 0, 0);
    if (finish< currentDate) {
      window.confirm('mã giảm giá này đã hết thời hạn có thể điều chỉnh');
      return;
  }
  setSignal(1)
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    if (rowToEdit == null) {
    //   const id = await api.addDiscount(newRow);
    //   newRow.Id = id;
    //   setRows([...magiamgia, newRow]);
    const res = await api.createDiscount(newRow)
      if(res?.message == undefined){
        setRows([...magiamgia, res]);
      }
      else{
        handleShowDialog(`Error adding discount! ${res?res?.message:""}`)
      }
    } else {
    //   api.updateDiscount(newRow, newRow.Id);
    //   let updatedDiscounts = magiamgia.map((currRow, idx) => {
    //     if (idx !== rowToEdit) return currRow;
    //     return newRow;
    //   });
    //   setRows(updatedDiscounts);
    const res = await api.updateDiscount(magiamgia[rowToEdit].maGiamGia,{...newRow,MaGiamGia:magiamgia[rowToEdit].maGiamGia})
            if(res?.message == undefined){
              let updated= magiamgia?.map((currRow, idx) => {
                if (idx !== rowToEdit) return currRow;
                return res;
              })
              setRows(updated);
            }
            else{
              handleShowDialog(`Error edit discount! ${res?res?.message:""}`)
            }
    }
  };

  const getDiscounts = async () => {
    const discounts = await api.getAllDiscount()
    setRows(discounts);
  };

  const onSearch = async () => {
    // const searchResults = await api.getDiscountsBySearch(searchCriteria);
    // setRows(searchResults);
    const res = await api.searchDiscount(searchCriteria);
        if(res?.message == undefined){
          setRows(res);
        }
        else{
          handleShowDialog(`Error search discount! ${res?res?.message:""}`)
        }

  };

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getDiscounts();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="mb-2"><b>Tên mã giảm giá</b></div>
          <input
            className="form-control pb-2 pt-2 mb-2"
            type="text"
            id="maGiamGia"
            placeholder="Nhập mã giảm giá"
            name="tenGiamGia"
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="mb-2"><b>Thời gian bắt đầu</b></div>
          <input
            className="form-control pb-2 pt-2 mb-2"
            type="date"
            name="ngayDau"
            id="TGBatDau"
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="mb-2"><b>Thời gian kết thúc</b></div>
          <input
            className="form-control pb-2 pt-2 mb-2"
            type="date"
            name="ngayCuoi"
            id="TGKetThuc"
            onChange={handleChange}
          />
        </div>
        <div className="text-end">
          <button
            onClick={onSearch}
            className="btn pb-2 pt-2 mt-3 mb-3 me-3"
            style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}>
            Tìm kiếm
          </button>
          <button
            onClick={() => {setSignal(0);setModalOpen(true)}}
            className="btn pb-2 pt-2 mt-3 mb-3"
            style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}>
            Thêm
          </button>
        </div>
      </div>
      <div className="text-end">
        <h1 class="noteVND">**Tính theo đơn vị VNĐ</h1>
      </div>
      <table className="table">
        <thead>
          <tr className="table-secondary">
            <th>STT</th>
            <th>Mã giảm giá</th>
            <th>Phần trăm giảm</th>
            <th>Thời gian bắt đầu</th>
            <th>Thời gian kết thúc</th>
            <th>Điều kiện áp dụng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {magiamgia?.map((row, idx) => {
            return (
              <tr key={row.Id}>
                <td>{idx + 1}</td>
                <td>{row.tenGiamGia}</td>
                <td>{row.phanTramGiam}</td>
                <td>{moment(new Date(row.ngayBatDau)).format("DD/MM/YYYY")}</td>
                <td>{moment(new Date(row.ngayKetThuc)).format("DD/MM/YYYY")}</td>
                <td>{row.dieuKienApDung}</td>
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
          signal={signal}
        />
      )}
       <CustomModal
        show={showDialog}
        handleClose={handleCloseDialog}
        body={ndshow}
      />
    </div>
  );
};
export default QuanLyMaGiamGia;
