import React from 'react'
import './style.css'
import TopNav from '../components/TopNav.js'
import { NavLink } from "react-router-dom"
import Footer from '../components/Footer.js'
import CodeGetPass from '../components/CodeGetPass.js'
import { useState, useContext } from 'react'
import { AuthContext } from '../hook/AuthProvider'
import Api from '../api/Api.js'
import CustomModal from '../components/MessageBox.js';
const ForgetPassword = (props) => {
    const [showDialog, setShowDialog] = useState(false);
      const [ndshow, setNdshow] = useState('');
      const handleShowDialog = (body) => {
        setNdshow(body)
        setShowDialog(true);
      };
    
      const handleCloseDialog = () => {
        setShowDialog(false);
      };
    const [codePopup, setCodePopup] = useState(false);
    const [email, setEmail] = useState('');
    const [email2, setEmail2] = useState('');
    const [code, setCode] = useState('');
    const [code2, setCode2] = useState('');
    const handleForgot = async (e) => {
        e.preventDefault();
        // await api.sendEmail()
       const res =  await Api.getCode(email);
       if(res.message == undefined){
        console.log("code",res.code)
        setCode(res.code)
        setEmail2(res.email)
        setCodePopup(true)
       }
       else {
        handleShowDialog(res.message||"Unable to connect to the server")
       }
    }
    const verify = ()=>{
        if(code == code2 && email == email2){
            return true
        }
        else {
            console.log(code)
            handleShowDialog("Code bạn nhập không đúng")
            return false
           }
    }
    return (
        <div>
            <TopNav />
            <section className="row g-0">
                <div className="col-1"></div>
                <div className="col-sm-6 col-md-5 col-lg-4">
                    <div style={{ border: "2px solid grey", borderRadius: "5px", boxShadow: "3px 3px #888888", marginTop: "70px" }} align="center">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <h4 align="center" className="mt-5 mb-4">Quên mật khẩu</h4>
                            <div className="mb-3 mt-3 col-10">
                                <input type="text" className="form-control pb-3 pt-3" id="username" name="username" placeholder="Email đăng ký" onInvalid={e => e.target.setCustomValidity('Mời bạn nhập email đã đăng ký')} onInput={e => e.target.setCustomValidity('')} required onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <NavLink to="/sign_in" className="text-decoration-none d-flex justify-content-end col-10" style={{ fontWeight: "600", color: "black" }}>Quay về trang đăng nhập</NavLink>
                            <br></br>
                            <button type="submit" className="btn col-10 pb-3 pt-3" onClick={(e) => { handleForgot(e) }} style={{ backgroundColor: "#0096FF", color: "#FFFFFF", marginBottom: "300px" }} >Gửi</button>
                            {codePopup && (
                                <CodeGetPass  trigger={codePopup} 
                                setTrigger={setCodePopup} 
                                email = {email}
                                alert = {(x)=>handleShowDialog(x)}
                                verify={() => verify()}>
                                    <div className="mb-3 mt-3 col-10">
                                        <input type="text" className="form-control pb-3 pt-3" id="code" name="code" placeholder="Mã xác nhận" onInvalid={e => e.target.setCustomValidity('Mời bạn nhập mã xác nhận')} onInput={e => e.target.setCustomValidity('')} required onChange={(e) => setCode2(e.target.value)}/>

                                    </div>
                                </CodeGetPass>
                            )}
                        </form>
                    </div>
                </div>

                <div className="col-sm-5 col-md-6 col-lg-7 d-none d-sm-block"><img alt="" src="/images/kham5.png" style={{ width: "90%" }} align="right" /></div>
            </section >
            <section className="mt-5" style={{ backgroundColor: "#F0F6FB" }}>
                <div className="container">
                    <div className="row g-0">
                        <div className="col-md-6 pt-5 pb-5">
                            <p style={{ fontSize: "36px" }}>Phòng khám LOGOIPSUM</p>
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
            <CustomModal
        show={showDialog}
        handleClose={handleCloseDialog}
        body={ndshow}
      />
            <Footer />
        </div >
    );
}
export default ForgetPassword;