import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { useEffect, useState, useContext } from "react";
import api from '../api/Api';
import Select from 'react-select';
import { FormMaterialUsed } from "../components/FormMaterialUsed";
import { AuthContext } from '../hook/AuthProvider'
import moment from "moment";
import materialUsedApi from "../api/materialUsedApi";
import CustomModal from '../components/MessageBox.js';
const MaterialUsed = () => {
    const materialsDB = [
        {
            maVt: 1000,
            tenVt: "Mắc cài loại 1",
            maChiNhanh:1000,
            ngayNhap:'2024-11-1',
            soLuongNhap: 24,
            soLuongTonKho:24,
            donGiaNhap: "150000"
        },
        {
            maVt: 1001,
            tenVt: "Mắc cài loại 2",
            maChiNhanh:1000,
            ngayNhap:'2024-11-15',
            soLuongNhap: 30,
            soLuongTonKho:30,
            donGiaNhap: "190000"
        }
    ]
    const [showDialog, setShowDialog] = useState(false);
      const [ndshow, setNdshow] = useState('');
      const handleShowDialog = (body) => {
        setNdshow(body)
        setShowDialog(true);
      };
    
      const handleCloseDialog = () => {
        setShowDialog(false);
      };
    const [modalOpen, setModalOpen] = useState(false);
    const [materials, setMaterials] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [materialsUsed, setMaterialUsed] = useState(null)
    const [khoiphucSL, setKhoiPhucSL] = useState(null)
    const { user } = useContext(AuthContext);
    useEffect(async () => {
        await getMaterials();
        getMatierialUsed()
    }, []);
    const getMaterials = async () => {
        // const materials = await api.getAllMaterials()
        // const fil = materials.filter((item, idx) => item.chiNhanh === user?.chinhanh)
        // setMaterials(fil);
        setMaterials(materialsDB)
    }
    const getMatierialUsed = async () => {
        const res = await materialUsedApi.getAllItem()
        const fil = res?.filter((item, idx) => item.maChiNhanh === user?.maCN)
        setMaterialUsed(fil)

    }
    const convert = (item)=>{
        if(materials){
            const vattu = materials.find(x=> x.maVt === item.maVatTu)
            const obj = {
                maVatTu:item.maVatTu,
                tenVatTu: vattu.tenVt,
                SL: item.soLuong,
                NgaySuDung: item.ngaySuDung,
                donGiaNhap: vattu.donGiaNhap,
                soLuongTonKho: "",
            }
            return obj
        }
        return null
    }
    const handleDeleteRow = async (item, id) => {
        const inputDate = new Date(item.ngaySuDung);
        const currentDate = new Date();

        // Reset thời gian về 00:00:00
        inputDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        if (inputDate < currentDate) {
            window.confirm('Vật tư đã sử dụng này đã hết thời hạn có thể điều chỉnh');
            return;
        }

        const shouldDelete = window.confirm('Bạn có chắc muốn xóa không?');
        if (shouldDelete) {
            const res = await materialUsedApi.deleteItem(item.maVTDSD)
            if(res?.success){
              setMaterialUsed(materialsUsed?.filter((_, idx) => idx !== id));
            }
            handleShowDialog(res?.message)
            // await api.deleteMaterialUsed(item.Id)
            // setMaterialUsed(materialsUsed.filter((_, idx) => idx !== id));
            // const result = materials.filter((item1, idx) => item1.maVatTu === item.maVatTu)
            // let x = parseInt(result[0].soLuongTonKho) + parseInt(item.SL)
            // console.log('1:' + result[0].soLuongTonKho + '2:' + item.SL + 'll' + x)
            // let updated2 = materials.map((item1, idx) => {
            //     if (item1.maVatTu !== item.maVatTu) return item1;
            //     return { ...item1, soLuongTonKho: x };
            // })
            // setMaterials(updated2)
            // await api.updateMaterial({ soLuongTonKho: x.toString() }, result[0].Id)
        }
    }
    const handleEditRow = (index) => {
        const inputDate = new Date(materialsUsed[index].ngaySuDung);
        const currentDate = new Date();

        // Reset thời gian về 00:00:00
        inputDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        if (inputDate < currentDate) {
            window.confirm('Vật tư đã sử dụng này đã hết thời hạn có thể điều chỉnh');
            return;
        }
        setRowToEdit(index);
        const result = materials?.filter((item1, idx) => item1.maVt === materialsUsed[index].maVatTu)
        let lamlai = parseInt(result[0].soLuongTonKho) + parseInt(materialsUsed[index].soLuong)
        console.log('1:' + result[0].soLuongTonKho + '2:' + materialsUsed[index].SL + 'll' + lamlai)
        setKhoiPhucSL(lamlai)
        setModalOpen(true);
    }
    const handleSubmit = async (newRow) => {
        const obj = {
            MaVatTu: newRow.maVatTu,
            MaChiNhanh:user.maCN,
            NgaySuDung:newRow.NgaySuDung,
            SoLuong:newRow.SL
        }
        if (rowToEdit == null) {
            // const id = await api.addMaterialUsed({ ...newRow, chiNhanh: user.chinhanh });
            // newRow.Id = id.docId;
            // setMaterialUsed([newRow, ...materialsUsed]);
            // const result = materials.filter((item1, idx) => item1.maVatTu === newRow.maVatTu)
            // let x = parseInt(result[0].soLuongTonKho) - parseInt(newRow.SL)
            // let updated2 = materials.map((item, idx) => {
            //     if (item.maVatTu !== newRow.maVatTu) return item;
            //     return { ...item, soLuongTonKho: x };
            // })
            // setMaterials(updated2)
            // await api.updateMaterial({ soLuongTonKho: x.toString() }, result[0].Id)
            const res = await materialUsedApi.createItem(obj)
      if(res?.message == undefined){
        setMaterialUsed([...materialsUsed, res]);
      }
      else{
        handleShowDialog(`Error adding material used! ${res?res?.message:""}`)
      }
        }
        else {
            const res = await materialUsedApi.updateItem(materialsUsed[rowToEdit].maVTDSD,{...obj,MaVTDSD:materialsUsed[rowToEdit].maVTDSD})
            if(res?.message == undefined){
              let updated= materialsUsed.map((currRow, idx) => {
                if (idx !== rowToEdit) return currRow;
                return res;
              })
              setMaterialUsed(updated);
            }
            else{
              handleShowDialog(`Error edit bonus! ${res?res?.message:""}`)
            }
            // await api.updateMaterialUsed(newRow, newRow.Id);
            // let updated = materialsUsed.map((currRow, idx) => {
            //     if (idx !== rowToEdit) return currRow;
            //     return newRow;
            // })
            // const result = materials.filter((item1, idx) => item1.maVatTu === newRow.maVatTu)
            // let x = parseInt(khoiphucSL) - parseInt(newRow.SL)
            // console.log('x' + x)
            // let updated2 = materials.map((item, idx) => {
            //     if (item.maVatTu !== newRow.maVatTu) return item;
            //     return { ...item, soLuongTonKho: x };
            // })
            // setMaterials(updated2)
            // await api.updateMaterial({ soLuongTonKho: x.toString() }, result[0].Id)
            // setMaterialUsed(updated)
        }
    }
    const [searchCriteria, setSearchCriteria] = useState({
        maVatTu: "",
        tenVatTu: "",
        NgaySuDung: ""
    })
    const onSearch = async () => {

        // const searchResults = await api.getMaterialUsedBySearch(searchCriteria);
        // console.log(searchResults);
        // const fil = searchResults.filter((item, idx) => item.chiNhanh === user.chinhanh)
        // console.log(fil)
        // setMaterialUsed(fil);
        const res = await materialUsedApi.searchItem(searchCriteria);
        if(res?.message == undefined){
            const fil = res?.filter((item, idx) => item.maChiNhanh === user?.maCN)
          setMaterialUsed(fil);
        }
        else{
          handleShowDialog(`Error search used item! ${res?res?.message:""}`)
        }
    }
    return (
        <div>
            <div className="row">
                <div className="col-lg-4 col-md-6">
                    <div className="mb-2"><b>Mã vật tư</b></div>
                    <Select className="mb-2"
                        value={materials.find(item => item.maVt === searchCriteria.maVatTu) || ''}
                        onChange={(value) => value !== null ? setSearchCriteria({ ...searchCriteria, maVatTu: value.maVt, tenVatTu: value.tenVt }) : setSearchCriteria({ ...searchCriteria, maVatTu: "", tenVatTu: "" })}
                        options={materials}
                        isClearable
                        getOptionLabel={(item) => item.maVt}
                        getOptionValue={(item) => item}
                        placeholder=""
                    />
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="mb-2"><b>Tên vật tư</b></div>
                    <Select className="mb-2"
                        value={materials.find(item => item.maVt === searchCriteria.maVatTu) || ''}
                        onChange={(value) => value !== null ? setSearchCriteria({ ...searchCriteria, maVatTu: value.maVt, tenVatTu: value.tenVt }) : setSearchCriteria({ ...searchCriteria, maVatTu: "", tenVatTu: "" })}
                        options={materials}
                        isClearable
                        placeholder=""
                        getOptionLabel={(item) => item.tenVt}
                        getOptionValue={(item) => item}
                    />
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="mb-2"><b>Ngày sử dụng</b></div>
                    <input type="date" className="form-control pb-2 pt-2" id="NgaySuDung" name="NgaySuDung" value={searchCriteria.NgaySuDung} onChange={(e) => { setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value }) }} />
                </div>
                <div className="text-end">
                    <button type="submit" className="btn pb-2 pt-2 mt-3 me-2" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }} onClick={onSearch}>
                        Tìm kiếm
                    </button>
                    <button type="submit" className="btn pb-2 pt-2 mt-3" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }} onClick={() => setModalOpen(true)}>
                        Thêm
                    </button>
                </div>
            </div>
            <table className="table" >
                <thead style={{ verticalAlign: "middle" }}>
                    <tr className="table-secondary">
                        <th>Mã vật tư thiết bị</th>
                        <th>Tên vật tư thiết bị</th>
                        <th>Số lượng</th>
                        <th>Đơn giá nhập</th>
                        <th>Ngày sử dụng</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {materialsUsed?.map((item, index) => {
    const convertedItem = convert(item); // Gọi hàm một lần
    return (
        <tr key={index}>
            <td>{convertedItem?.maVatTu}</td>
            <td>{convertedItem?.tenVatTu}</td>
            <td>{convertedItem?.SL}</td>
            <td>{new Intl.NumberFormat("en-DE").format(convertedItem?.donGiaNhap)}</td>
            <td>{moment(new Date(convertedItem?.NgaySuDung)).format("DD/MM/YYYY")}</td>
            <td className="fit">
                <span className="actions">
                    <BsFillTrashFill
                        className="delete-btn"
                        onClick={() => handleDeleteRow(item, index)}
                    />
                    <BsFillPencilFill
                        className="edit-btn"
                        onClick={() => handleEditRow(index)}
                    />
                </span>
            </td>
        </tr>
    );
})}
                </tbody>
            </table>
            {modalOpen && (
                <FormMaterialUsed
                    closeModal={() => {
                        setModalOpen(false);
                        setRowToEdit(null);
                    }}
                    onSubmit={handleSubmit}
                    defaultValue={rowToEdit !== null && convert(materialsUsed[rowToEdit])}
                    materials={materials}
                    cover = {rowToEdit !== null&&{key:materialsUsed[rowToEdit].maVatTu, value:khoiphucSL }}
                />
            )}
              <CustomModal
        show={showDialog}
        handleClose={handleCloseDialog}
        body={ndshow}
      />
        </div>
    )
}
export default MaterialUsed;