import React from 'react'
import './style.css'
import TopNav from '../components/TopNav.js'
import { NavLink } from "react-router-dom"
import Footer from '../components/Footer.js'
import CodeGetPass from '../components/CodeGetPass.js'
import { useState } from 'react'
const ForgetPassword = (props) => {
    const [codePopup, setCodePopup] = useState(false);
    return (
        <div>
            <TopNav />
            <section className="row g-0">
                <div class="col-1"></div>
                <div class="col-sm-6 col-md-5 col-lg-4">
                    <div style={{ border: "2px solid grey", borderRadius: "5px", boxShadow: "3px 3px #888888", marginTop: "70px" }} align="center">
                        <form>
                            <h4 align="center" class="mt-5 mb-4">Quên mật khẩu</h4>
                            <div class="mb-3 mt-3 col-10">
                                <input type="text" class="form-control pb-3 pt-3" id="username" name="username" placeholder="Email đăng ký" onInvalid={e => e.target.setCustomValidity('Mời bạn nhập email')} onInput={e => e.target.setCustomValidity('')} required />
                            </div>
                            
                            <NavLink to="/sign_in" class="text-decoration-none d-flex justify-content-end col-10" style={{ fontWeight: "600", color: "black" }}>Quay về trang đăng nhập</NavLink>
                            <br></br>
                            <button type="submit" class="btn col-10 pb-3 pt-3" onClick={()=>setCodePopup(true)} style={{ backgroundColor: "#0096FF", color: "#FFFFFF", marginBottom: "300px" }}>Nhận mã</button>
                            {codePopup &&(
                            <CodeGetPass trigger="true">
                            <div class="mb-3 mt-3 col-10">
                                <input type="text" class="form-control pb-3 pt-3" id="code" name="code" placeholder="Mã xác nhận" onInvalid={e => e.target.setCustomValidity('Mời bạn nhập mã xác nhận')} onInput={e => e.target.setCustomValidity('')} required />
                                
                            </div>  
                            </CodeGetPass>
                            )}
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
export default ForgetPassword;