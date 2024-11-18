import { useState } from "react"
const SignUpSchedule = () => {
    const [scheduleSignedUp, setScheduleSignUp] = useState([
        {
            Thu: "Thứ hai",
            Sang: false,
            Trua: false,
            Chieu: false
        },
        {
            Thu: "Thứ ba",
            Sang: false,
            Trua: false,
            Chieu: false
        },
        {
            Thu: "Thứ tư",
            Sang: false,
            Trua: false,
            Chieu: false
        },
        {
            Thu: "Thứ năm",
            Sang: false,
            Trua: false,
            Chieu: false
        },
        {
            Thu: "Thứ sáu",
            Sang: false,
            Trua: false,
            Chieu: false
        },
        {
            Thu: "Thứ bảy",
            Sang: false,
            Trua: false,
            Chieu: false
        },
        {
            Thu: "Chủ nhật",
            Sang: false,
            Trua: false,
            Chieu: false
        }
    ])
    const handleChange = (Thu, Buoi, GiaTri) => {
        setScheduleSignUp(
            scheduleSignedUp.map(item => item.Thu === Thu ? {
                ...item, [Buoi]: !GiaTri
            } : item)
        )
    }

    return (
        <div className="row g-0">
            {scheduleSignedUp.map((item, index) => (
                <div className="col-lg col-auto seven-color text-center" style={{ color: "#FFF" }}>
                    <div className="wrapcolor d-flex align-items-center justify-content-center" style={{ height: "65px" }}>
                        <b>{item.Thu}</b>
                    </div>
                    <div className="p-3">
                        <div
                            className="mb-3 p-2"
                            style={{ backgroundColor: item.Sang ? "#bfbfbf" : "#0096FF", borderRadius: "10px" }}
                            onClick={() => handleChange(item.Thu, "Sang", item.Sang)}>
                            Sáng
                        </div>
                        <div
                            className="mb-3 p-2"
                            style={{ backgroundColor: item.Chieu ? "#bfbfbf" : "#0096FF", borderRadius: "10px" }}
                            onClick={() => handleChange(item.Thu, "Chieu", item.Chieu)}>
                            Chiều
                        </div>
                        <div
                            className="mb-3 p-2"
                            style={{ backgroundColor: item.Toi ? "#bfbfbf" : "#0096FF", borderRadius: "10px" }}
                            onClick={() => handleChange(item.Thu, "Toi", item.Toi)}>
                            Tối
                        </div>
                    </div>
                </div>

            ))}
            <div className="text-end">
                <button type="button" className="btn pb-2 pt-2 ps-3 pe-3 mt-2 me-2" style={{ color: "#0096FF", border: "1px solid #0096FF" }}>
                    Mặc định
                </button>
                <button type="submit" className="btn pb-2 pt-2 mt-2" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}>
                    Lưu
                </button>
            </div>
        </div >
    )
}
export default SignUpSchedule