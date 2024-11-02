import React from 'react'
import './style.css'
import { NavLink } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    BrowserRouter as Router,
    Switch,
    Route
  
  } from "react-router-dom";
import BaoCao  from './BaoCao';
import QuanLyLichHen from './QuanLyLichHen';
import QuanLyNhanVien from './QuanLyNhanVien';
import QuanLyMaGiamGia from './QuanLyMaGiamGia';
import QuanLyDichVu from './QuanLyDichVu';
import QuanLyChiNhanh from './QuanLyChiNhanh';
const Manager = (props) => {

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
                            <li className="nav-item me-4">
                                <NavLink className="nav-link" to="/manager">Quản Lý</NavLink>
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
            <h2 className='headLine'>Quản Lý</h2>
            <div class="row flex-nowrap"> 
                <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0' id="collapsibleFlex">
                    <div class="d-flex flex-column align-items-center align-items-sm-start text-white min-vh-100">
                       
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start navflex">
                            <li className="nav-item ">
                            <a className="nav-link navTextFlex px-3" href="#">
                                <img src="images/ava.png" className="rounded-circle" alt=""  />
                                .  nhanvienabc <br/>
                                <a href="#">chỉnh sửa hồ sơ</a>
                            </a>
                            </li>
                            <li className="nav-item ">
                            <NavLink className="nav-link navTextFlex" to ="/manager/quanlylichhen">
                                <img className='imgIconNav' src="images/qlylichhen_48px.png" />
                                Quản lý lịch hẹn
                            </NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link navTextFlex" to="/manager/quanlynhanvien">
                                <img className='imgIconNav' src="images/qlynhanvien_48px.png" />
                                Quản lý nhân viên</NavLink>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link navTextFlex" to="/manager/quanlybenhnhan">
                                <img className='imgIconNav' src="images/quanlybenhnhan_48px.png" />
                                Quản lý bệnh nhân</a>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link navTextFlex" to="/manager/baocao">
                                <img className='imgIconNav' src="images/xembaocao_48px.png" />
                                Báo cáo, thống kê</NavLink>
                            </li>
                            <li className="nav-item"> 
                            <NavLink className="nav-link navTextFlex" to="/manager/quanlykho">
                                <img className='imgIconNav' src="images/qlykho_48px.png" />
                                Quản lý kho
                            </NavLink>
                            </li>
                            <li className="nav-item"> 
                            <NavLink className="nav-link navTextFlex" to="/manager/themtoathuoc">
                                <img className='imgIconNav' src="images/themtoathuoc_48px.png" />
                                Thêm toa thuốc
                            </NavLink>
                            </li>
                            <li className="nav-item"> 
                            <NavLink className="nav-link navTextFlex" to="/manager/quanlyhoadon">
                                <img className='imgIconNav' src="images/qlyhoadon_48px.png" />
                                Quản lý hóa đơn
                            </NavLink>
                            </li>
                            <li className="nav-item"> 
                            <NavLink className="nav-link navTextFlex" to="/manager/quanlydichvu">
                                <img className='imgIconNav' src="images/qlydichvu_48px.png" />
                                Quản lý dịch vụ
                            </NavLink>
                            </li>
                            <li className="nav-item"> 
                            <NavLink className="nav-link navTextFlex" to="/manager/quanlychinhanh">
                                <img className='imgIconNav' src="images/qlychinhanh_48px.png" />
                                Quản lý chi nhánh
                            </NavLink>
                            </li>
                            <li className="nav-item"> 
                            <NavLink className="nav-link navTextFlex" to="/manager/quanlymagiamgia">
                                <img className='imgIconNav' src="images/giamgia_48px.png" />
                                Quản lý mã giảm giá
                            </NavLink>
                            </li>
                            <li className="nav-item"> 
                            <NavLink className="nav-link navTextFlex" to="/manager/quanlydanhgia">
                                <img className='imgIconNav' src="images/tiepnhandanhgia_48px.png" />
                                Quản lý đánh giá
                            </NavLink>
                            </li>
                            
                        </ul>
                    </div>
                </div>
                <div className="col py-3">
                    <Route>
                    <Switch>
                    <Route path="/manager/quanlylichhen">
                        <QuanLyLichHen/>
                    </Route>
                    <Route path="/manager/quanlynhanvien">
                        <QuanLyNhanVien/>
                    </Route>
                    <Route path="/manager/baocao">
                        <BaoCao/>
                    </Route>
                    <Route path="/manager/quanlykho">
                    <QuanLyLichHen/>
                    </Route>
                    <Route path="/manager/themtoathuoc">
                    <QuanLyLichHen/>
                    </Route>
                    <Route path="/manager/quanlyhoadon">
                    <QuanLyLichHen/>
                    </Route>
                    <Route path="/manager/quanlydichvu">
                    <QuanLyDichVu/>
                    </Route>
                    <Route path="/manager/quanlychinhanh">
                    <QuanLyChiNhanh/>
                    </Route>
                    <Route path="/manager/quanlymagiamgia">
                    <QuanLyMaGiamGia/>
                    </Route>
                    <Route path="/manager/quanlydanhgia">
                    <QuanLyMaGiamGia/>
                    </Route>
                    </Switch>
                    </Route>
                </div>
            </div>
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
export default Manager;