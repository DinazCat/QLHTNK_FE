import React from 'react'
import TopNav from '../components/TopNav'
import Footer from '../components/Footer';
const BookingPage = (props) => {
    return (
        <div>
            <TopNav />
            <section className="row g-0">
                <div className="col-1"></div>
                <div className="col-sm-6 col-md-5 col-lg-4">
                    <div style={{ border: "2px solid grey", borderRadius: "5px", boxShadow: "3px 3px #888888", marginTop: "70px" }} align="center">
                        <form>
                            < h4 align="center" className="mt-5 mb-4">Đặt lịch hẹn</h4>
                            <div className="mb-3 mt-3 col-10">
                                <select className="form-select pb-3 pt-3" aria-label="Chọn chi nhánh">
                                    <option selected value="0">Chi nhánh 1</option>
                                    <option value="1">Chi nhánh 2</option>
                                    <option value="2">Chi nhánh 3</option>
                                </select>
                            </div>
                            <div className="mb-3 mt-3 col-10">
                                <input type="text" className="form-control pb-3 pt-3" id="fullName" name="fullName" placeholder="Họ và tên" required />

                            </div>
                            <div className="mb-3 mt-3 col-10">
                                <input type="date" className="form-control pb-3 pt-3" id="birthday" name="birthday" placeholder="Ngày sinh: " required />
                            </div>
                            <div className="mb-3 mt-3 col-10">
                                <input type="tel" className="form-control pb-3 pt-3" id="phone" name="phone" placeholder="Số điện thoại" required />
                            </div>
                            <div className="mb-3 mt-3 col-10">
                                <input type="text" className="form-control pb-3 pt-3" id="address" name="address" placeholder="Địa chỉ" required />
                            </div>
                            <div className="mb-3 mt-3 col-10">
                                <input type="email" className="form-control pb-3 pt-3" id="email" name="email" placeholder="Email" required />
                            </div>
                            <div className="mb-3 mt-3 col-10 send-area" style={{ borderRadius: "5px", borderColor: "#D9D9D9" }}>
                                <textarea rows="4" placeholder="Lời nhắn"></textarea>
                            </div>
                            <button type="submit" className="btn col-10 pb-3 pt-3 mb-5" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}>Gửi lịch hẹn</button>


                        </form>
                    </div>
                </div >
                <div className="col-sm-5 col-md-6 col-lg-7 d-none d-sm-block"><img alt="" src="/images/kham5.png" style={{ width: "90%" }} align="right" /></div>
            </section >
            <section className="mt-5" style={{ backgroundColor: "#F0F6FB" }}>
                <div className="container">
                    <div className="row g-0">
                        <div className="col-md-6 pt-5 pb-5">
                            <p style={{ fontSize: "36px" }}>Phòng khám ABC</p>
                            <p>Phòng khám nha khoa của chúng tôi đã được thành lập từ năm 2015 và đã phục vụ hàng trăm bệnh nhân trong suốt thời gian này. Chúng tôi tự hào mang lại cho khách hàng sự chăm sóc nha khoa chất lượng và đáng tin cậy</p>
                            <p>Với đội ngũ bác sĩ nha khoa giàu kinh nghiệm và chuyên môn, phòng khám của chúng tôi có thể đáp ứng mọi nhu cầu nha khoa của khách hàng. Chúng tôi cung cấp các dịch vụ từ những khám và tư vấn sức khỏe răng miệng đến điều trị và phục hình nha khoa.</p>


                        </div>
                        <div className="col-1"></div>
                        <div className="col-md-5">
                            <img alt="" src="/images/kham4.png" style={{ width: "100%", marginBottom: "-5%", marginTop: "-5%" }} />
                        </div>
                    </div>
                </div>

            </section>
            <Footer />
        </div >
    );
}
export default BookingPage;