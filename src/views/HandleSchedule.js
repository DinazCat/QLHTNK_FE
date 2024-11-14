import React, { useState } from "react";
const HandleSchedule = () => {
    const [scheduleList, setScheduleList] = useState([
        {
            fullname: "Đan Thảo",
            email: "21522425@gm.uit.edu.vn",
            phone: "0914067233",
            birthday: "14/11/2003",
            status: "completed",
            staff: "Lê Bảo Ngọc",
            message: "",
            note: ""
        },
        {
            fullname: "Lan Nhi",
            email: "lethilannhitigerbmt@gmail.com",
            phone: "0843593598",
            birthday: "14/11/2003",
            status: "incompleted",
            staff: "Huỳnh Ngọc Ý Nhi",
            message: "Liên lạc với tôi ngoài giờ hành chính",
            note: ""
        },
        {
            fullname: "Lan Nhi",
            email: "lethilannhitigerbmt@gmail.com",
            phone: "0843593598",
            birthday: "14/11/2003",
            status: "other",
            staff: "abc",
            message: "",
            note: "Đã liên hệ nhưng khách chưa chọn được lịchjjjjjjjjjjjjjjjjjjjjjjjjjj kfjsd jsdkfdsj sdfh"
        }
    ])

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
                {scheduleList.map((item, index) => {
                    return (

                        <div className="col-sm-12 col-md-9 col-lg-6 mt-4" style={{ fontWeight: "500" }}>

                            <div className={`${item.status} d-flex flex-row ps-3 pe-2 pt-1 pb-1`} style={{ width: "fit-content" }}>
                                <div style={{ color: "#FFF" }}>{item.status === "completed" ? "Đã sắp lịch" : item.status === "incompleted" ? "Chưa sắp lịch" : "Khác"}</div>
                                <div className="ms-2 dropdown">
                                    {item.status === "incompleted" ? null : <i class="fa-solid fa-ellipsis" style={{ color: "white" }}></i>}
                                    <div className="dropdownContent d-flex flex-column p-3" style={{ fontSize: "14px" }}>

                                        <div className="mb-2" style={{ color: "#FFF" }}>Nhân viên xử lý</div>
                                        <div className="mb-2 p-2" style={{ width: "160px", backgroundColor: "#D9D9D9", height: "40px", overflow: "auto" }}>{item.staff}</div>


                                        <div className="mb-2" style={{ color: "#FFF" }}>Ghi chú</div>
                                        <div className="p-2" style={{ width: "160px", backgroundColor: "#D9D9D9", height: "67px", overflow: "auto" }}>{item.note}</div>

                                    </div>
                                </div>
                            </div>
                            <div style={{ backgroundColor: "#D9D9D9" }}>
                                <div className="container">
                                    <div class="mb-2 pt-2">Họ tên</div>
                                    <div class="form-control pb-2 pt-2">{item.fullname}
                                    </div>


                                    <div class="mb-2 pt-2">Email</div>
                                    <div class="form-control pb-2 pt-2">{item.email}
                                    </div>


                                    <div class="mb-2 pt-2">Số điện thoại</div>
                                    <div class="form-control pb-2 pt-2">{item.phone}</div>


                                    <div class="mb-2 pt-2">Ngày sinh</div>
                                    <div class="form-control pb-2 pt-2">{item.birthday}</div>


                                    <div class="mb-2 pt-2">Lời nhắn</div>
                                    <div className="send-area" style={{ borderRadius: "5px", borderColor: "#D9D9D9" }}>
                                        <textarea rows="3" readOnly>{item.message}</textarea>
                                    </div>

                                    <div className="text-end">
                                        <button class="btn pb-2 pt-2 ps-3 pe-3 mb-2 mt-2" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}>
                                            {item.status === "completed" ? "Sửa" : "Xử lý"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })}
            </div>



        </div >
    )
}
export default HandleSchedule