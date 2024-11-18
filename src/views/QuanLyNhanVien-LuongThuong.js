import { BsFillTrashFill, BsFillPencilFill, BsEye } from "react-icons/bs";
import { useState } from "react";
import { FormLuongThuong } from "../components/FormLuongThuong";
const LuongThuong = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const bonuses = [
        {
            LoaiLuongThuong: "Thưởng tết",
            Tien: "1000000",
            Thang: "01",
            Nam: "2024",
            LoaiNhanVien: "Cá nhân",
            MaNV: "NV001",
            GhiChu: ""
        },
        {
            LoaiLuongThuong: "Thưởng bác sĩ",
            Tien: "1000000",
            Thang: "12",
            Nam: "2023",
            LoaiNhanVien: "Bác sĩ",
            MaNV: "",
            GhiChu: "Doanh thu tăng gấp ba lần so với tháng trước"
        }
    ]
    const setItemToEdit = (id) => {
        setSelectedItem(id);
        setModalOpen(true);
    }
    return (
        <div>
            <div className="text-end">
                <button type="submit" className="btn pb-2 pt-2 mt-2 ms-3" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
                    onClick={() => setModalOpen(true)}>
                    Thêm
                </button>
            </div>
            <table className="table" >
                <thead>
                    <tr className="table-secondary">
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
                    {bonuses.map((item, index) => (
                        <tr key={index}>
                            <td>{item.LoaiLuongThuong}</td>
                            <td>{item.Tien}</td>
                            <td>{item.GhiChu}</td>
                            <td>{item.Thang}</td>
                            <td>{item.Nam}</td>
                            <td>{item.LoaiNhanVien}</td>
                            <td>{item.MaNV}</td>
                            <td className="fit">
                                <span className="actions">
                                    <BsFillPencilFill
                                        className="edit-btn"
                                        onClick={() => setItemToEdit(index)}
                                    />
                                    <BsFillTrashFill
                                        className="delete-btn"
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
                        setSelectedItem(null);
                    }}

                    defaultValue={selectedItem !== null && bonuses[selectedItem]}
                    bonuses={bonuses}
                />
            )}

        </div>
    )
}
export default LuongThuong