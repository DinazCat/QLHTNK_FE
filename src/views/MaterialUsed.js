import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import api from '../api/Api';
import Select from 'react-select';
import { FormMaterialUsed } from "../components/FormMaterialUsed";
const MaterialUsed = () => {
    const materialsUsed = [
        {
            MaVT: "VT001",
            TenVT: "Mắc cài",
            NgaySuDung: '2023-11-12',
            SL: "3",
            DonGia: "150000"
        },
        {
            MaVT: "VT001",
            TenVT: "Mắc cài",
            NgaySuDung: '2023-11-26',
            SL: "3",
            DonGia: "150000"
        }
    ]
    const [modalOpen, setModalOpen] = useState(false);
    const [materials, setMaterials] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);
    useEffect(() => {
        getMaterials();
    }, []);
    const getMaterials = async () => {
        const materials = await api.getAllMaterials()
        setMaterials(materials);
    }
    const handleDeleteRow = (id) => {

    }
    const handleEditRow = (index) => {
        setRowToEdit(index);
        setModalOpen(true);
    }
    const handleSubmit = () => {

    }
    const [searchCriteria, setSearchCriteria] = useState({
        maVatTu: "",
        tenVatTu: "",
        NgaySuDung: "",
        SL: ""
    })
    return (
        <div>
            <div className="row">
                <div className="col-lg-4 col-md-6">
                    <div className="mb-2"><b>Mã bệnh nhân</b></div>
                    <Select className="mb-2"
                        value={materials.find(item => item.maVatTu === searchCriteria.maVatTu) || ''}
                        onChange={(value) => value !== null ? setSearchCriteria({ ...searchCriteria, maVatTu: value.maVatTu, tenVatTu: value.tenVatTu }) : setSearchCriteria({ ...searchCriteria, maVatTu: "", tenVatTu: "" })}
                        options={materials}
                        isClearable
                        getOptionLabel={(item) => item.maVatTu}
                        getOptionValue={(item) => item}
                        placeholder=""
                    />
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="mb-2"><b>Tên bệnh nhân</b></div>
                    <Select className="mb-2"
                        value={materials.find(item => item.maVatTu === searchCriteria.maVatTu) || ''}
                        onChange={(value) => value !== null ? setSearchCriteria({ ...searchCriteria, maVatTu: value.maVatTu, TenVT: value.tenVatTu }) : setSearchCriteria({ ...searchCriteria, maVatTu: "", tenVatTu: "" })}
                        options={materials}
                        isClearable
                        placeholder=""
                        getOptionLabel={(item) => item.tenVatTu}
                        getOptionValue={(item) => item}
                    />
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="mb-2"><b>Ngày sử dụng</b></div>
                    <input type="date" className="form-control pb-2 pt-2" id="NgaySuDung" name="NgaySuDung" value={searchCriteria.NgaySuDung} onChange={(e) => { setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value }) }} />
                </div>
                <div className="text-end">
                    <button type="submit" className="btn pb-2 pt-2 mt-3 me-2" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }} >
                        Tìm kiếm
                    </button>
                    <button type="submit" className="btn pb-2 pt-2 mt-3" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }} onClick={() => setModalOpen(true)}>
                        Thêm
                    </button>
                </div>
            </div>
            <table className="table" >
                <thead>
                    <tr className="table-secondary">
                        <th>Mã vật tư thiết bị</th>
                        <th>Tên vật tư thiết bị</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Ngày sử dụng</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {materialsUsed.map((item, index) => (
                        <tr key={index}>
                            <td>{item.MaVT}</td>
                            <td>{item.TenVT}</td>
                            <td>{item.SL}</td>
                            <td>{item.DonGia}</td>
                            <td>{item.NgaySuDung}</td>
                            <td className="fit">
                                <span className="actions">
                                    <BsFillTrashFill
                                        className="delete-btn"
                                        onClick={() => handleDeleteRow(index)}
                                    />
                                    <BsFillPencilFill
                                        className="edit-btn"
                                        onClick={() => handleEditRow(index)}
                                    />
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalOpen && (
                <FormMaterialUsed
                    closeModal={() => {
                        setModalOpen(false);
                        setRowToEdit(null);
                    }}
                    onSubmit={handleSubmit}
                    defaultValue={rowToEdit !== null && materialsUsed[rowToEdit]}
                    materials={materials}
                />
            )}
        </div>
    )
}
export default MaterialUsed;