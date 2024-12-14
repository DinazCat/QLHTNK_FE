import React from 'react'
import './mistyles.css'
import { BsFillTrashFill, BsFillPencilFill, BsEye } from "react-icons/bs";
import { useEffect, useState, useContext } from 'react';
import { FormChiTietNhanVien } from '../components/FormChiTietNhanVien';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../api/Api";
import CustomModal from '../components/MessageBox.js';
import { AuthContext } from "../hook/AuthProvider";

const XemThongTinNhanVien = (props) => {
  const { user } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [signal, setSignal] = useState(null);
    const [ndshow, setNdshow] = useState('');
    const handleShowDialog = (body) => {
      setNdshow(body)
      setShowDialog(true);
    };
  
    const handleCloseDialog = () => {
      setShowDialog(false);
    };

  const [searchCriteria, setSearchCriteria] = useState({
    maNhanVien: '',
    tenNhanVien: '',
    chucVu: 'Tất cả',
    chiNhanh: 'Tất cả',
    luongDau: '',
    luongCuoi: '',
  })

  const [branches, setBranches] = useState([]);
  const [positions, setPositions] = useState(['Tất cả', 'Nha sĩ', 'Phụ tá', 'Quản lý', 'Tiếp tân'])

  useEffect(() => {
    getStaffs();
    getBranches();
  }, [user]);

  const getStaffs = async () => {
    const staffs = await api.getAllStaff();
    console.log(staffs)
    if (user !=null&&user?.loaiNguoiDung !== "ChuHeThong") {
      console.log("hihi")
      const fil2 = staffs?.filter((item, idx) => item.maChiNhanh=== user?.maCN);
      setStaffs(fil2);
    } else {
      console.log("hiha")
      setStaffs(staffs);
    }
  }

  const getBranches = async () => {
    const branches = await api.getAllBranchs();
    setBranches([{ tenCn: 'Tất cả',maCn:null }, ...branches]);
  }

  const handleDeleteRow = async (targetIndex) => {
    const shouldDelete = window.confirm('Bạn có chắc chắn muốn xóa nhân viên này không?');
    if (shouldDelete) {
      // setStaffs(staffs.filter((_, idx) => idx !== targetIndex));
      // api.deleteStaff(staffs[targetIndex].Id);
      const res = await api.deleteEmployee(staffs[targetIndex].maNv);
      if(res?.success){
        setStaffs(staffs?.filter((_, idx) => idx !== targetIndex));
      }
      handleShowDialog(res?.message)
    }
  };

  const handleEditRow = (idx) => {
    console.log("hjahjsj")
    console.log(staffs[idx])
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    console.log(newRow);
    let chiNhanh = "";
    if (user?.loaiNguoiDung === "ChuHeThong") {
      chiNhanh = newRow.MaChiNhanh;
    } else {
      chiNhanh = user.maCN;
    }  
    if (rowToEdit == null) {
      const res = await api.createStaff({...newRow,MaChiNhanh:chiNhanh});
      if(res?.message == undefined){
        setStaffs([...staffs, res]);
      }
      else{
        handleShowDialog(`Error adding staff! ${res?res?.message:""}`)
      }
    }
    else {
      const id = staffs[rowToEdit].maNv
      const res = await api.updateStaff(id, {...newRow,MaNv:id, An: staffs[rowToEdit].an, MaChiNhanh:chiNhanh});
      if(res?.message == undefined){
        let updatedStaffs = staffs.map((currRow, idx) => {
          if (idx !== rowToEdit) return currRow;
          return res;
        })
        setStaffs(updatedStaffs);
      }
      else{
        handleShowDialog(`Error edit staff! ${res?res?.message:""}`)
      }
    }
  };

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const onSearch = async () => {
    console.log(searchCriteria)
    const res = await api.searchStaff(searchCriteria);
    console.log(res)
    if(res?.message == undefined){
      setStaffs(res);
    }
    else{
      handleShowDialog(`Error search staff! ${res?res?.message:""}`)
    }
    
  }
  return (
    <div >
      <div className="mb-3 mt-3">
        <input className="block m-2 customBox" type="text" placeholder="Nhập mã nhân viên" name="maNhanVien"
          onChange={handleChange} />
        <input className="block m-2 customBox" type="text" id="name" placeholder="Nhập tên nhân viên" name="tenNhanVien"
          onChange={handleChange} />

        <text>Chức vụ: </text>
        <select className="customBox" id="type" name="chucVu"
          onChange={handleChange}>
          {positions.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <text style={{ marginLeft: 10 }}>Chi nhánh: </text>
        <select className="customBox" id="type" name="chiNhanh"
          onChange={handleChange}>
           {user?.loaiNguoiDung === "ChuHeThong" ? (
              branches.map((item, index) => (
                <option key={index} value={item.tenCn}>
                  {item.tenCn}
                </option>
              ))
            ) : (
              <option value={user?.maCN}>{user?.maCN}</option>
            )}
        </select>
        <div>
          <text>Lương cơ bản:  Từ </text>
          <input className="block m-2 px-4 customBox" type="number" placeholder="0" name="luongDau"
            onChange={handleChange} />
          <text>đến</text>
          <input className="block m-2 px-4 customBox" type="number" placeholder="1000000000" name="luongCuoi"
            onChange={handleChange} />
        </div>
      </div>
      <button type="submit" className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick={onSearch}>Tìm kiếm
      </button>
      <button onClick={() => {setModalOpen(true); setSignal('0')}} className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
        Thêm
      </button>
      <h1 className="noteVND">**Tính theo đơn vị VNĐ</h1>
      <table className="table" >
        <thead>
          <tr className="table-secondary">
            <th>MaNV</th>
            <th>Họ tên</th>
            <th>SDT</th>
            <th>Chức vụ</th>
            <th>Email</th>
            <th>Lương cơ bản</th>
            <th>Chi nhánh</th>
            {/* <th>CCCD</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Bằng cấp</th>
            <th>Kinh nghiệm</th> */}
            <th></th>
          </tr>
        </thead>
        {staffs?.map((row, idx) => {
          return (
            <tr key={row.Id}>
              <td>{row.maNv}</td>
              <td>{row.tenNv}</td>
              <td>{row.soDienThoai}</td>
              <td>{row.chucVu}</td>
              <td>{row.email}</td>
              <td>{row.luongCoBan}</td>
              <td>{row.maChiNhanh}</td>
              {/* <td>{row.cccd}</td>
            <td>{row.gioiTinh}</td>
            <td>{row.ngaySinh}</td>
            <td>{row.bangCap}</td>
            <td>{row.kinhNghiem}</td> */}

              <td className="fit">
                <span className="actions">
                  <BsEye
                    className="edit-btn"
                    onClick={() => {handleEditRow(idx);setSignal('1')}}
                  />
                  <BsFillTrashFill
                    className="delete-btn"
                    onClick={() => handleDeleteRow(idx)}
                  />
                  <BsFillPencilFill
                    className="edit-btn"
                    onClick={() => {handleEditRow(idx);setSignal('0')}}
                  />
                </span>
              </td>
            </tr>
          );
        })}
        <tbody>

        </tbody>
      </table>
      {modalOpen && (
        <FormChiTietNhanVien
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null ? staffs[rowToEdit] : undefined}
          staffs={rowToEdit!=null?staffs?.filter(st => st.maNv !== staffs[rowToEdit].maNv):staffs}
          signal = {signal}
          branches={branches?.filter(branch => branch.tenCn !== "Tất cả")}
        />
      )}
      <CustomModal
        show={showDialog}
        handleClose={handleCloseDialog}
        body={ndshow}
      />
    </div>
  );
}
export default XemThongTinNhanVien;

