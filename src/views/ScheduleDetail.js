const ScheduleDetail = () => {
    const scheduleList = [
        {
            fullname: "Lan Nhi",
            Email: "lethilannhitigerbmt@gmail.com",
            phone: "0843593598",
            birthday: "14/11/2003",
            status: "Completed"
        },
        {
            fullname: "Lan Nhi",
            Email: "lethilannhitigerbmt@gmail.com",
            phone: "0843593598",
            birthday: "14/11/2003",
            status: "Incompleted"
        },
        {
            fullname: "Lan Nhi",
            Email: "lethilannhitigerbmt@gmail.com",
            phone: "0843593598",
            birthday: "14/11/2003",
            status: "Other"
        }
    ]
    return (
        <div className="ms-3">
            <div className="row col-md-10 col-lg-8">
                <div className="col-md-6 mb-3">
                    <div className="mb-2"><b>Thời gian</b></div>
                    <input type="date" class="form-control pb-3 pt-3" id="birthday" name="birthday" />
                </div>
                <div className="col-md-6">
                    <div className="mb-2"><b>Chọn trạng thái</b></div>
                    <select class="form-select pb-3 pt-3" aria-label="Chọn trạng thái">
                        <option selected value="0">Tất cả</option>
                        <option value="1">Đã sắp lịch</option>
                        <option value="2">Chưa sắp lịch</option>
                        <option value="2">Khác</option>
                    </select>
                </div>
                <div className="text-end mt-3">
                    <button class="btn pb-2 pt-2 ps-3 pe-3" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}>Xem</button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div>Đã sắp lịch</div>
                </div>
            </div>
        </div >
    )
}
export default ScheduleDetail