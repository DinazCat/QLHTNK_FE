import { BsFillTrashFill, BsFillPencilFill, BsEye } from "react-icons/bs";
import { useState, useEffect, useContext } from "react";
import { FormLuongThuong } from "../components/FormLuongThuong";
import { AuthContext } from "../hook/AuthProvider";
import api from "../api/Api";
import CustomModal from '../components/MessageBox.js';

const LuongThuong = () => {
  const { user } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [bonuses, setBonuses] = useState([]);
  const [branches, setBranches] = useState(user?.chinhanh || []);
  const [showDialog, setShowDialog] = useState(false);
  const [signal, setSignal] = useState(null);
  const [staffs, setStaffs] = useState([]);
    const [ndshow, setNdshow] = useState('');
    const handleShowDialog = (body) => {
      setNdshow(body)
      setShowDialog(true);
    };
  
    const handleCloseDialog = () => {
      setShowDialog(false);
    };
  const [targetBranch, setTargetBranch] = useState("Tất cả");
  useEffect(() => {
    getStaffs();
    getBonuses();
    getBranches();
  }, [user]);
  const getStaffs = async () => {
    const staffs = await api.getAllStaff();
    if (user?.loaiNguoiDung !== "ChuHeThong") {
      const fil2 = staffs?.filter((item, idx) => item.maChiNhanh=== user?.maCN);
      setStaffs(fil2);
    } else {
      setStaffs(staffs);
    }
  };
  const getBranches = async () => {
    const branches = await api.getAllBranchs();
    setBranches([{ tenCn: 'Tất cả' , maCn:null}, ...branches]);
  };
  const getBonuses = async () => {
    const res = await api.getAllBonus()
    // console.log(res)
    // setBonuses(res)
    // const endpoint = "/StaffManagement/getAll/LuongThuong";
    // const bonuses = await Api.getDocs(endpoint);
    // console.log(res)
    const currentDate = new Date();
    if (user?.loaiNguoiDung !== "ChuHeThong") {
      const fil = res?.filter(
        (item, idx) =>
          item.maCN === user?.maCN
      );
      setBonuses(
        fil?.filter(
          (item) =>
            item.thang == currentDate.getMonth() + 1 &&
            item.nam == currentDate.getFullYear()
        )
      );
    } else {
      setBonuses( 
        res?.filter(
          (item) =>
            item.thang == currentDate.getMonth() + 1 &&
            item.nam == currentDate.getFullYear()
        )
      );
    }
  };

  const handleSubmit = async (newRow) => {
    let chiNhanh = "";
    if (user?.loaiNguoiDung === "ChuHeThong") {
      chiNhanh = newRow.MaChiNhanh;
    } else {
      chiNhanh = user?.maCN;
    }
    if (rowToEdit == null) {
      // const endpoint = "/StaffManagement/add/LuongThuong";
      // const id = await Api.addDoc(endpoint, { ...newRow, chiNhanh: chiNhanh });
      // newRow.Id = id;
      // setBonuses([...bonuses, newRow]);
      const res = await api.createBonus({...newRow,MaCN:chiNhanh});
      if(res?.message == undefined){
        setBonuses([...bonuses, res]);
      }
      else{
        handleShowDialog(`Error adding bonus! ${res?res?.message:""}`)
      }
    } else {
      const res = await api.updateBonus(bonuses[rowToEdit].maLT,{...newRow,MaLT:bonuses[rowToEdit].maLT,MaCN:chiNhanh})
      if(res?.message == undefined){
        let updatedBonuses = bonuses.map((currRow, idx) => {
          if (idx !== rowToEdit) return currRow;
          return res;
        })
        setBonuses(updatedBonuses);
      }
      else{
        handleShowDialog(`Error edit bonus! ${res?res?.message:""}`)
      }
    }
  };

  const handleDeleteRow = async (targetIndex) => {
    const shouldDelete = window.confirm(
      'Bạn có chắc chắn muốn xóa lương thưởng này không?'
    );
    if (shouldDelete) {
      const res = await api.deleteBonus(bonuses[targetIndex].maLT)
      if(res?.success){
        setBonuses(bonuses?.filter((_, idx) => idx !== targetIndex));
      }
      handleShowDialog(res?.message)
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  return (
    <div>
      <div className="row align-items-center">
        <div className="col-auto mb-3"><b>Áp dụng: </b></div>
        <div className="col-lg-5 col-md-7 me-3 mb-3">
          <select
            className="form-select pb-2 pt-2"
            id="type"
            name="chiNhanh"
            onChange={async (e) => {
              // const endpoint = "/StaffManagement/getAll/LuongThuong";
              // const bonuses = await Api.getDocs(endpoint);
              const currentDate = new Date();
              const res = await api.getAllBonus()
              let list = []
              if(res.message == undefined){ 
                list = res?.filter(
                  (item) =>
                    item.thang == currentDate.getMonth() + 1 &&
                    item.nam == currentDate.getFullYear()
                )
              }
              console.log(list)
              if (user?.loaiNguoiDung === "ChuHeThong") {
                const fil = list?.filter(
                  (item, idx) => item?.maCN == e.target.value ||e.target.value=="Tất cả"
                );
                setBonuses(fil);
              } else {
                const fil = list?.filter(
                  (item, idx) =>
                    item?.maCN === user?.maCN
                );
                setBonuses(fil);
              }
            }}
          >
            {user?.loaiNguoiDung === "ChuHeThong" ? (
              branches.map((item, index) => (
                <option key={index} value={item?.maCn}>
                  {item.tenCn}
                </option>
              ))
            ) : (
              <option value={user?.maCN}>{user?.maCN}</option>
            )}
          </select>
        </div>
        <div className="col-auto mb-3">
          <button
            type="submit"
            className="btn pb-2 pt-2"
            style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
            onClick={() => setModalOpen(true)}
          >
            Thêm
          </button>
        </div>
      </div>
      <table className="table">
        <thead style={{ verticalAlign: "middle" }}>
          <tr className="table-secondary">
            <th>STT</th>
            <th>Loại lương thưởng</th>
            <th>Tiền</th>
            <th>Ghi chú</th>
            <th>Tháng</th>
            <th>Năm</th>
            <th>Loại nhân viên</th>
            <th>Mã nhân viên</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {bonuses?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.loaiLT}</td>
              <td>{new Intl.NumberFormat("en-DE").format(item.tien)}</td>
              <td>{item.ghiChu}</td>
              <td>{item.thang}</td>
              <td>{item.nam}</td>
              <td>{item.loaiNV}</td>
              <td>{item.maNV}</td>
              <td className="fit">
                <span className="actions">
                  <BsFillPencilFill
                    className="edit-btn"
                    onClick={() => handleEditRow(index)}
                  />
                  <BsFillTrashFill
                    className="delete-btn"
                    onClick={() => handleDeleteRow(index)}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <FormLuongThuong
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          defaultValue={rowToEdit !== null && bonuses[rowToEdit]}
          onSubmit={handleSubmit}
          branches={branches}
          staffs0 = {staffs}
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
export default LuongThuong;
