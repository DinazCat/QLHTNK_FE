import React, { useEffect } from 'react'
import './style.css'
import { NavLink, useLocation } from "react-router-dom";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import BaoCao from './BaoCao';
import QuanLyLichHen from './QuanLyLichHen';
import QuanLyNhanVien from './QuanLyNhanVien';
import QuanLyMaGiamGia from './QuanLyMaGiamGia';
import QuanLyDichVu from './QuanLyDichVu';
import QuanLyChiNhanh from './QuanLyChiNhanh';
import QuanLyKho from './QuanLyKho';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';
import QuanLyDanhGia from './QuanLyDanhGia';
const Manager = (props) => {
    const { pathname } = useLocation();
    return (
        <div >
            <TopNav />
            <nav className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto bg-primary" id="slide-menu">
                        <div className="d-flex flex-column sticky-top">
                            <ul className="nav nav-pills d-flex flex-column" id="menu">
                                <li className="nav-item mb-2">
                                    <NavLink to="/manager/quanlylichhen" className="nav-link">
                                        <img src="/images/qlylichhen_48px.png" alt="" /> <span className="ms-1 d-none d-sm-inline">Quản lý lịch hẹn</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to="/manager/quanlynhanvien" className="nav-link">
                                        <img src="/images/qlynhanvien_48px.png" alt="" /> <span className="ms-1 d-none d-sm-inline">Quản lý nhân viên</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to="/manager/quanlybenhnhan" className="nav-link">
                                        <img src="/images/quanlybenhnhan_48px.png" alt="" /> <span className="ms-1 d-none d-sm-inline">Quản lý bệnh nhân</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to="/manager/baocao" className="nav-link">
                                        <img src="/images/xembaocao_48px.png" alt="" /> <span className="ms-1 d-none d-sm-inline">Báo cáo, thống kê</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to="/manager/quanlykho" className="nav-link">
                                        <img src="/images/qlykho_48px.png" alt="" /> <span className="ms-1 d-none d-sm-inline">Quản lý kho</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to="/manager/themtoathuoc" className="nav-link">
                                        <img src="/images/themtoathuoc_48px.png" alt="" /> <span className="ms-1 d-none d-sm-inline">Thêm toa thuốc</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to="/manager/quanlyhoadon" className="nav-link">
                                        <img src="/images/qlyhoadon_48px.png" alt="" /> <span className="ms-1 d-none d-sm-inline">Quản lý hoá đơn</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to="/manager/quanlydichvu" className="nav-link">
                                        <img src="/images/qlydichvu_48px.png" alt="" /> <span className="ms-1 d-none d-sm-inline">Quản lý dịch vụ</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to="/manager/quanlychinhanh" className="nav-link">
                                        <img src="/images/qlychinhanh_48px.png" alt="" /> <span className="ms-1 d-none d-sm-inline">Quản lý chi nhánh</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to="/manager/quanlymagiamgia" className="nav-link">
                                        <img src="/images/giamgia_48px.png" alt="" /> <span className="ms-1 d-none d-sm-inline">Quản lý mã giảm giá</span>
                                    </NavLink>

                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to="/manager/quanlydanhgia" className="nav-link">
                                        <img src="/images/tiepnhandanhgia_48px.png" alt="" /> <span className="ms-1 d-none d-sm-inline">Quản lý đánh giá</span>
                                    </NavLink>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="col py-3">
                        <Route >
                            <Switch />

                            <Route path="/manager/quanlylichhen">
                                <QuanLyLichHen />
                            </Route>
                            <Route path="/manager/quanlybenhnhan">
                                <QuanLyLichHen />
                            </Route>
                            <Route path="/manager/quanlynhanvien">
                                <QuanLyNhanVien />
                            </Route>
                            <Route path="/manager/baocao">
                                <BaoCao />
                            </Route>
                            <Route path="/manager/quanlykho">
                                <QuanLyKho />
                            </Route>
                            <Route path="/manager/themtoathuoc">
                                <QuanLyLichHen />
                            </Route>
                            <Route path="/manager/quanlyhoadon">
                                <QuanLyLichHen />
                            </Route>
                            <Route path="/manager/quanlydichvu">
                                <QuanLyDichVu />
                            </Route>
                            <Route path="/manager/quanlychinhanh">
                                <QuanLyChiNhanh />
                            </Route>
                            <Route path="/manager/quanlymagiamgia">
                                <QuanLyMaGiamGia />
                            </Route>
                            <Route path="/manager/quanlydanhgia" >
                                <QuanLyDanhGia />
                            </Route>

                            {pathname === "/manager" ? <Redirect to="/manager/quanlylichhen" /> : null}
                            <Switch />
                        </Route>
                    </div>
                </div>
            </nav>
            <Footer style={{ marginTop: 0 }} />
        </div >
    );
}
export default Manager;