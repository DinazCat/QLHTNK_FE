import moment from "moment"
import TopNav from "../components/TopNav"
import Footer from "../components/Footer"

const Profile = () => {
    return (
        <div>
            <TopNav />
            <div className="container mt-5 pb-5" style={{
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                backgroundColor: "var(--white2)",
                borderRadius: "10px",
            }}>
                <div className="row ms-md-3 me-md-3 ms-1 me-1">
                    <h2 className="mt-3 mb-3" align="center" style={{ color: "#0096FF", borderRadius: "5px" }}>HỒ SƠ CÁ NHÂN</h2>
                    <div className="col-sm-auto p-lg-5 p-4 mb-3 sticky-top" style={{ backgroundColor: "#F0F6FB", height: "fit-content" }}>
                        <div className="upload">
                            <img src="/images/ava.png" style={{ width: "120px", height: "120px" }} alt="" />
                            <div className="round">
                                <input type="file" accept="image/*" />
                                <i className="fa fa-camera" style={{ color: "#fff" }}></i>
                            </div>
                        </div>
                        <div style={{ textAlign: "center", fontSize: "18px" }}>
                            <div className="mt-2 pe-sm-3 ps-sm-3"><b>Ngô Thị Bảo Linh</b></div>
                            <div className="mt-2 pe-sm-3 ps-sm-3" style={{ color: "#0096FF" }}><b>NS001</b></div>
                            <div className="mt-5 d-none d-sm-block" style={{ fontSize: "16px", color: "#858585" }}>
                                <hr />
                                <div>Vào làm việc từ</div>
                                <div>12/10/2020</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm ms-md-4">
                        <form className="row ms-0 me-0" style={{ fontWeight: "500" }}>
                            <div className="col-md-6">
                                <div className="mb-2">Họ tên</div>
                                <input type="text" className="form-control pb-2 pt-2 mb-2" id="fullName" name="fullName" />
                            </div>
                            <div className="col-md-6">
                                <div className="mb-2 col-md-6">Chức vụ</div>
                                <div className="form-control pb-2 pt-2 mb-2 col-md-6">Nha sĩ</div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-2 col-md-6">Ngày sinh</div>
                                <input type="date" className="form-control pb-2 pt-2 mb-2" id="birthday" name="birthday" max={moment().add(-24, "years").format('YYYY-MM-DD')} />
                            </div>
                            <div className="col-md-6">
                                <div className="mb-2 col-md-6">Giới tính</div>
                                <select className="form-select pb-2 pt-2 col-md-6 mb-2" aria-label="Chọn chi nhánh">
                                    <option selected value="0">Nam</option>
                                    <option value="1">Nữ</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-2">Số điện thoại</div>
                                <input type="tel" className="form-control pb-2 pt-2 mb-2" id="phone" name="phone" />
                            </div>
                            <div className="col-md-6">
                                <div className="mb-2">Email</div>
                                <input type="email" className="form-control pb-2 pt-2 mb-2" id="email" name="email" />
                            </div>
                            <div className="col-md-6">
                                <div className="mb-2">Căn cước công dân</div>
                                <input type="text" className="form-control pb-2 pt-2 mb-2" id="CCCD" name="CCCD" />
                            </div>
                            <div className="col-md-6">
                                <div className="mb-2 col-md-6">Chi nhánh</div>
                                <select className="form-select pb-2 pt-2 col-md-6 mb-2" aria-label="Chọn chi nhánh">
                                    <option selected value="0">Chi nhánh 1</option>
                                    <option value="1">Chi nhánh 2</option>
                                    <option value="2">Chi nhánh 3</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-2">Tên đăng nhập</div>
                                <input type="text" className="form-control pb-2 pt-2 mb-2" id="username" name="username" />
                            </div>
                            <div className="col-md-6">
                                <div className="mb-2">Mật khẩu</div>
                                <input type="password" className="form-control pb-2 pt-2 mb-2" id="re-enter_password" name="re-enter_password" />
                            </div>
                            <div className="mt-3 text-end">
                                <button type="submit" className="btn pb-2 pt-2" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}>Lưu</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div >
            <Footer />
        </div >
    )
}
export default Profile