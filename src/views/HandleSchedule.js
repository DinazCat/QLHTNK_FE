import React, { useState } from "react";
import { FormHandleSchedule } from "../components/FormHandleSchedule"
const HandleSchedule = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [sentSchedules, setSentSchedule] = useState([
        {
            MaLHDG: "LHDG001",
            MaBN: "BN001",
            TenBN: "Đan Thảo",
            email: "21522425@gm.uit.edu.vn",
            SDT: "0914067233",
            NgaySinh: "14/11/2003",
            TinhTrang: "Đã sắp lịch",
            TenNV: "Lê Bảo Ngọc",
            MaNV: "NV001",
            LoiNhan: "",
            GhiChu: ""
        },
        {
            MaLHDG: "LHDG002",
            MaBN: "BN003",
            TenBN: "Lan Nhi",
            email: "lethilannhitigerbmt@gmail.com",
            SDT: "0843593598",
            NgaySinh: "14/11/2003",
            TinhTrang: "Chưa sắp lịch",
            TenNV: "",
            MaNV: "",
            LoiNhan: "Liên lạc với tôi ngoài giờ hành chính",
            GhiChu: "Mai xử lý"
        },
        {
            MaLHDG: "LHDG003",
            MaBN: "",
            TenBN: "Lan Nhi",
            email: "lethilannhitigerbmt@gmail.com",
            SDT: "0843593598",
            NgaySinh: "14/11/2003",
            TinhTrang: "Khác",
            MaNV: "NV003",
            TenNV: "Anh Tâm",
            LoiNhan: "",
            GhiChu: "Đã liên hệ nhưng khách chưa chọn được lịch"
        }
    ])
    const handleSubmit = () => {

    }
    const setItemToEdit = (id) => {
        setSelectedItem(id);
        setModalOpen(true);
    }

    return (
        <div className="container">
            <div className="row col-md-10 col-lg-8">
                <div className="col-md-6 mb-3">
                    <div className="mb-2"><b>Thời gian</b></div>
                    <input type="date" class="form-control pb-2 pt-2" id="birthday" name="birthday" />
                </div>
                <div className="col-md-6">
                    <div className="mb-2"><b>Chọn trạng thái</b></div>
                    <select class="form-select pb-2 pt-2 mb-3" aria-label="Chọn trạng thái">
                        <option selected value="all">Tất cả</option>
                        <option value="completed">Đã sắp lịch</option>
                        <option value="incompleted">Chưa sắp lịch</option>
                        <option value="other">Khác</option>
                    </select>
                </div>
                <div className="text-end">
                    <button class="btn pb-2 pt-2 ps-3 pe-3" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}>Xem</button>
                </div>
            </div>
            <div class="row">
                {sentSchedules.map((item, index) => {
                    return (

                        <div className="col-sm-12 col-md-9 col-lg-6 mt-4" style={{ fontWeight: "500" }}>

                            <div className={`${item.TinhTrang === "Đã sắp lịch" ? "completed" : item.TinhTrang === "Chưa sắp lịch" ? "incompleted" : "other"} d-flex flex-row ps-3 pe-2 pt-1 pb-1`} style={{ width: "fit-content" }}>
                                <div style={{ color: "#FFF" }}>{item.TinhTrang}</div>
                                <div className="ms-2 dropdown">
                                    <i class="fa-solid fa-ellipsis" style={{ color: "white" }}></i>
                                    <div className="dropdownContent d-flex flex-column p-3" style={{ fontSize: "14px" }}>
                                        <div className="mb-2" style={{ color: "#FFF" }}>Mã nhân viên</div>
                                        <div className="mb-2 p-2" style={{ width: "160px", backgroundColor: "#D9D9D9", height: "40px", overflow: "auto" }}>{item.MaNV}</div>
                                        <div className="mb-2" style={{ color: "#FFF" }}>Tên nhân viên xử lý</div>
                                        <div className="mb-2 p-2" style={{ width: "160px", backgroundColor: "#D9D9D9", height: "40px", overflow: "auto" }}>{item.TenNV}</div>
                                        <div className="mb-2" style={{ color: "#FFF" }}>Ghi chú</div>
                                        <div className="p-2" style={{ width: "160px", backgroundColor: "#D9D9D9", height: "67px", overflow: "auto" }}>{item.GhiChu}</div>

                                    </div>
                                </div>
                            </div>
                            <div style={{ backgroundColor: "#D9D9D9" }}>
                                <div className="container">
                                    <div class="mb-2 pt-2">Họ tên</div>
                                    <div class="form-control pb-2 pt-2">{item.TenBN}
                                    </div>
                                    <div class="mb-2 pt-2">Email</div>
                                    <div class="form-control pb-2 pt-2">{item.email}
                                    </div>


                                    <div class="mb-2 pt-2">Số điện thoại</div>
                                    <div class="form-control pb-2 pt-2">{item.SDT}</div>


                                    <div class="mb-2 pt-2">Ngày sinh</div>
                                    <div class="form-control pb-2 pt-2">{item.NgaySinh}</div>


                                    <div class="mb-2 pt-2">Lời nhắn</div>
                                    <div className="send-area" style={{ borderRadius: "5px", borderColor: "#D9D9D9" }}>
                                        <textarea rows="3" readOnly>{item.LoiNhan}</textarea>
                                    </div>

                                    <div className="text-end">
                                        <button class="btn pb-2 pt-2 ps-3 pe-3 mb-2 mt-2" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }} onClick={() => setItemToEdit(index)}>
                                            {item.TinhTrang === "Đã sắp lịch" ? "Sửa" : "Xử lý"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })}
            </div>
            {modalOpen && (
                <FormHandleSchedule
                    closeModal={() => {
                        setModalOpen(false);
                        setSelectedItem(null);
                    }}
                    onSubmit={handleSubmit}
                    defaultValue={selectedItem !== null && sentSchedules[selectedItem]}
                    sentSchedules={sentSchedules}
                />
            )}

        </div >
    )
}
export default HandleSchedule