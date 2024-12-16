import React, { useState, useEffect } from "react";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import Api from "../api/Api";

const BookingPage = (props) => {
  const [branches, setBranches] = useState([]);
  const [formState, setFormState] = useState({
    MaChiNhanh: "",
    HoTen: "",
    SoDienThoai: "",
    DiaChi: "",
    Email: "",
    LyDoKham: "",
  });
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getBranches();
  }, []);

  const getBranches = async () => {
    const branches = await Api.getAllBranchs();
    formState.MaChiNhanh = branches[0].maCn || "";
    setBranches(branches);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^(?:\+84|0)(\d{9,10})$/;
    return phoneRegex.test(phoneNumber);
  }

  const validateForm = () => {
    console.log(formState);
    setSuccessMessage("");
    if (
      formState.MaChiNhanh != "" &&
      formState.HoTen != "" &&
      formState.SoDienThoai != ""
    ) {
      if (!isValidPhoneNumber(formState.soDienThoai)) {
        setErrors("Số điện thoại không hợp lệ!");
        return false;
      }
      setErrors("");
      return true;
    } else {
      setErrors(
        "Bạn vui lòng nhập đầy đủ Họ tên và Số điện thoại để được nhân viên hỗ trợ tư vấn và đặt lịch nhé!"
      );
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    const currentDate = new Date();
    formState.TrangThai = "Chưa xử lý";
    formState.LoaiLichHen = "WebBooking";

    const formattedDate = currentDate.toISOString().split("T")[0];
    const formattedTime = currentDate.toTimeString().split(" ")[0].slice(0, 5);

    const res = await Api.addDoc("Appointment", formState);
    if (res) {
      setFormState({
        MaChiNhanh: branches[0].maCn || "",
        HoTen: "",
        SoDienThoai: "",
        DiaChi: "",
        Email: "",
        LyDoKham: "",
        Ngay: formattedDate,
        Gio: formattedTime,
      });
      setSuccessMessage(
        "Bạn đã gửi lịch hẹn thành công. Vui lòng chú ý điện thoại để nhân viên của chúng tôi liên hệ nhé!"
      );
    }
  };
  return (
    <div>
      <TopNav />
      <section className="row g-0">
        <div className="col-1"></div>
        <div className="col-sm-6 col-md-5 col-lg-4">
          <div
            style={{
              border: "2px solid grey",
              borderRadius: "5px",
              boxShadow: "3px 3px #888888",
              marginTop: "70px",
            }}
            align="center"
          >
            <form>
              <h4 align="center" className="mt-5 mb-4">
                Đặt lịch hẹn
              </h4>
              <div className="mb-3 mt-3 col-10">
                <select
                  className="form-select pb-3 pt-3"
                  aria-label="Chọn chi nhánh"
                  name="MaChiNhanh"
                  onChange={handleChange}
                >
                  {branches.map((item, index) => (
                    <option key={index} value={item.maCn}>
                      {item.tenCn}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 mt-3 col-10">
                <input
                  type="text"
                  className="form-control pb-3 pt-3"
                  id="HoTen"
                  name="HoTen"
                  value={formState.HoTen}
                  placeholder="Họ và tên"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 mt-3 col-10">
                <input
                  type="tel"
                  className="form-control pb-3 pt-3"
                  id="SoDienThoai"
                  name="SoDienThoai"
                  value={formState.SoDienThoai}
                  placeholder="Số điện thoại"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 mt-3 col-10">
                <input
                  type="text"
                  className="form-control pb-3 pt-3"
                  id="DiaChi"
                  name="DiaChi"
                  value={formState.DiaChi}
                  placeholder="Địa chỉ"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 mt-3 col-10">
                <input
                  type="Email"
                  className="form-control pb-3 pt-3"
                  id="Email"
                  name="Email"
                  value={formState.Email}
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>
              <div
                className="mb-3 mt-3 col-10 send-area"
                style={{ borderRadius: "5px", borderColor: "#D9D9D9" }}
              >
                <textarea
                  rows="4"
                  placeholder="Lý do khám"
                  name="LyDoKham"
                  value={formState.LyDoKham}
                  onChange={handleChange}
                ></textarea>
              </div>
              {errors && <div className="error">{errors}</div>}
              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}
              <button
                type="submit"
                className="btn col-10 pb-3 pt-3 mb-5"
                style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
                onClick={handleSubmit}
              >
                Gửi lịch hẹn
              </button>
            </form>
          </div>
        </div>
        <div className="col-sm-5 col-md-6 col-lg-7 d-none d-sm-block">
          <img
            alt=""
            src="/images/kham5.png"
            style={{ width: "90%" }}
            align="right"
          />
        </div>
      </section>
      <section className="mt-5" style={{ backgroundColor: "#F0F6FB" }}>
        <div className="container">
          <div className="row g-0">
            <div className="col-md-6 pt-5 pb-5">
              <p style={{ fontSize: "36px" }}>Phòng khám ABC</p>
              <p>
                Phòng khám nha khoa của chúng tôi đã được thành lập từ năm 2015
                và đã phục vụ hàng trăm bệnh nhân trong suốt thời gian này.
                Chúng tôi tự hào mang lại cho khách hàng sự chăm sóc nha khoa
                chất lượng và đáng tin cậy
              </p>
              <p>
                Với đội ngũ bác sĩ nha khoa giàu kinh nghiệm và chuyên môn,
                phòng khám của chúng tôi có thể đáp ứng mọi nhu cầu nha khoa của
                khách hàng. Chúng tôi cung cấp các dịch vụ từ những khám và tư
                vấn sức khỏe răng miệng đến điều trị và phục hình nha khoa.
              </p>
            </div>
            <div className="col-1"></div>
            <div className="col-md-5">
              <img
                alt=""
                src="/images/kham4.png"
                style={{ width: "100%", marginBottom: "-5%", marginTop: "-5%" }}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default BookingPage;
