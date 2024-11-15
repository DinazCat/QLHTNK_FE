import React from 'react'
import './style.css'
import { NavLink } from "react-router-dom"
import TopNav from '../components/TopNav'
import Footer from '../components/Footer'
import moment from 'moment'
const SignUpPage = (props) => {
    return (
        <div>
            <TopNav />
            <section class="row g-0">
                <div class="col-1"></div>
                <div class="col-sm-6 col-md-5 col-lg-4">
                    <div style={{ border: "2px solid grey", borderRadius: "5px", boxShadow: "3px 3px #888888", marginTop: "70px" }} align="center">
                        <form>
                            <h4 align="center" class="mt-5 mb-4">Đăng ký</h4>
                            <div class="mb-3 mt-3 col-10">
                                <input type="text" class="form-control pb-3 pt-3" id="fullName" name="fullName" placeholder="Họ và tên" required />

                            </div>
                            <div class="mb-3 mt-3 col-10">
                                <input type="date" class="form-control pb-3 pt-3" id="birthday" name="birthday" placeholder="Ngày sinh: " max={moment().add(-4, "years").format('YYYY-MM-DD')} required onInvalid={e => e.target.setCustomValidity('Mời bạn nhập ngày sinh')} onInput={e => e.target.setCustomValidity('')} />
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
                            <div class="mb-3 mt-3 col-10">
                                <input type="text" class="form-control pb-3 pt-3" id="CCCD" name="CCCD" placeholder="Căn cước công dân" required />
                            </div>
                            <div class="mb-3 mt-3 col-10">
                                <input type="text" class="form-control pb-3 pt-3" id="username" name="username" placeholder="Tên đăng nhập" required />
                            </div>
                            <div class="col-10 mb-3 mt-3">
                                <input type="password" class="form-control pb-3 pt-3" id="password" name="password" placeholder="Mật khẩu" required />
                            </div>


                            <div class="col-10 mb-3 mt-3">
                                <input type="password" class="form-control pb-3 pt-3" id="re-enter_password" name="re-enter_password" placeholder="Nhập lại mật khẩu" required />
                            </div>

                            <NavLink to="/sign_in" class="btn d-flex justify-content-center col-10 mb-2 mt-2" style={{ color: "#0096FF" }}>Đăng nhập nếu bạn đã có tài khoản</NavLink>

                            <button type="submit" class="btn col-10 pb-3 pt-3 mb-5" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}>Đăng ký</button>


                        </form>
                    </div>
                </div>
                <div class="col-sm-5 col-md-6 col-lg-7 d-none d-sm-block"><img alt="" src="/images/kham5.png" style={{ width: "90%" }} align="right" /></div>
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
                            <img alt="" src="/images/kham4.png" style={{ width: "100%", marginBottom: "-5%", marginTop: "-5%" }} />
                        </div>
                    </div>
                </div>

            </section>
            <Footer />
        </div >
    );
}
export default SignUpPage;