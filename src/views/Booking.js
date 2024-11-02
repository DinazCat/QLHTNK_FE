import React from 'react'
import './style.css'
import { NavLink } from "react-router-dom"
const TopNav = (props) => {
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-light navbar-light">
                <div className="container">
                    <div>

                        <img src="images/logo1.png" alt="Avatar Logo" style={{ width: "100%" }} />
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        Menu
                        <i class="fa-solid fa-caret-down"></i>
                    </button>

                    <div className="mx-3"></div>

                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item me-4">
                                <NavLink className="nav-link" to="/" exact>Giới thiệu</NavLink>
                            </li>
                            <li className="nav-item me-4" >
                                <NavLink className="nav-link" to="/doctors">Bác sĩ</NavLink>
                            </li>
                            <li className="nav-item me-4">
                                <NavLink className="nav-link" to="/services">Dịch vụ</NavLink>
                            </li>
                            <li className="nav-item me-4">
                                <NavLink className="nav-link" to="/contacts">Liên lạc</NavLink>
                            </li>
                            <li className="nav-item me-4">
                                <NavLink className="nav-link" to="/booking">Đặt lịch</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="nav-item mt-2 mb-2">
                        <NavLink className="nav-link" to="/sign_in">Đăng nhập</NavLink>
                    </div>
                    <div className="nav-item d-none d-lg-block ms-5">
                        <NavLink className="nav-link" to="/sign_up">Đăng ký</NavLink>
                    </div>

                </div>

            </nav >
            <section class="row g-0">
                <div class="col-1"></div>
                <div class="col-sm-6 col-md-5 col-lg-4">
                    <div style={{ border: "2px solid grey", borderRadius: "5px", boxShadow: "3px 3px #888888", marginTop: "70px" }} align="center">
                        <form>
                            < h4 align="center" class="mt-5 mb-4">Đặt lịch hẹn</h4>
                            <div class="mb-3 mt-3 col-10">
                                <select class="form-select pb-3 pt-3" aria-label="Chọn chi nhánh">
                                    <option selected value="0">Chi nhánh 1</option>
                                    <option value="1">Chi nhánh 2</option>
                                    <option value="2">Chi nhánh 3</option>
                                </select>
                            </div>
                            <div class="mb-3 mt-3 col-10">
                                <input type="text" class="form-control pb-3 pt-3" id="fullName" name="fullName" placeholder="Họ và tên" required />

                            </div>
                            <div class="mb-3 mt-3 col-10">
                                <input type="date" class="form-control pb-3 pt-3" id="birthday" name="birthday" placeholder="Ngày sinh: " required />
                            </div>
                            <div class="mb-3 mt-3 col-10">
                                <input type="tel" class="form-control pb-3 pt-3" id="phone" name="phone" placeholder="Số điện thoại" required />
                            </div>
                            <div class="mb-3 mt-3 col-10">
                                <input type="text" class="form-control pb-3 pt-3" id="address" name="address" placeholder="Địa chỉ" required />
                            </div>
                            <div class="mb-3 mt-3 col-10">
                                <input type="email" class="form-control pb-3 pt-3" id="email" name="email" placeholder="Email" required />
                            </div>
                            <div class="mb-3 mt-3 col-10 send-area" style={{ borderRadius: "5px", borderColor: "#D9D9D9" }}>
                                <textarea rows="4" placeholder="Lời nhắn"></textarea>
                            </div>
                            <button type="submit" class="btn col-10 pb-3 pt-3 mb-5" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}>Gửi lịch hẹn</button>


                        </form>
                    </div>
                </div >
                <div class="col-sm-5 col-md-6 col-lg-7 d-none d-sm-block"><img alt="" src="images/kham5.png" style={{ width: "90%" }} align="right" /></div>
            </section >
            <section class="mt-5" style={{ backgroundColor: "#F0F6FB" }}>
                <div class="container">
                    <div class="row g-0">
                        <div class="col-md-6 pt-5 pb-5">
                            <p style={{ fontSize: "36px" }}>Phòng khám ABC</p>
                            <p>Phòng khám nha khoa của chúng tôi đã được thành lập từ năm 2015 và đã phục vụ hàng trăm bệnh nhân trong suốt thời gian này. Chúng tôi tự hào mang lại cho khách hàng sự chăm sóc nha khoa chất lượng và đáng tin cậy</p>
                            <p>Với đội ngũ bác sĩ nha khoa giàu kinh nghiệm và chuyên môn, phòng khám của chúng tôi có thể đáp ứng mọi nhu cầu nha khoa của khách hàng. Chúng tôi cung cấp các dịch vụ từ những khám và tư vấn sức khỏe răng miệng đến điều trị và phục hình nha khoa.</p>


                        </div>
                        <div class="col-1"></div>
                        <div class="col-md-5">
                            <img alt="" src="images/kham4.png" style={{ width: "100%", marginBottom: "-5%", marginTop: "-5%" }} />
                        </div>
                    </div>
                </div>

            </section>
            <footer style={{ backgroundColor: "#0096FF", color: "white", marginTop: "80px" }}>
                <div className="container pt-4 pb-5">
                    <div className="row">
                        <div className="col-md-3">
                            <img alt="" src="images/logo2.png" />
                            <p className="mt-3" style={{ fontSize: "20px" }}>Giới thiệu</p>
                            <p>Phòng khám ABC đã được thành lập hơn 7 năm. Với kinh nghiệm và đội ngũ nha sĩ chuyện nghiệp chúng tôi tự tin sẽ đem đến nhưng dịch vụ tốt nhất.</p>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-md-3">
                            <p className="mt-3">
                                <span style={{ fontSize: "19px" }}>Giờ mở cửa toàn chi nhánh</span>
                                <br />
                                Từ thứ 2 đến thứ 7: từ 7g30 đến 16g30
                            </p>
                            <p className="mt-3">
                                <span style={{ fontSize: "19px" }}>Địa chỉ</span>
                                <ul>
                                    <li>Quận 7, thành phố Hồ Chí Minh</li>
                                    <li>Quận 8, thành phố Hồ Chí </li>
                                    <li>Bình Thạnh, thành phố Hồ Chí </li>
                                </ul>
                            </p>
                            <p className="mt-3" style={{ fontSize: "19px" }}>
                                Email: abc@gmail.com
                                <br />
                                Phone: 0843593598
                            </p>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-md-4">
                            <p className="mt-3" style={{ fontSize: "19px" }}>Phản hồi của bạn</p>
                            <p>Vui lòng viết phản hồi của bạn phía dưới</p>
                            <div className="send-area col-10">
                                <form>
                                    <textarea rows="4" className="mb-4" required></textarea>

                                    <button className="btn btn-primary">Gửi</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div >
    );
}
export default TopNav;