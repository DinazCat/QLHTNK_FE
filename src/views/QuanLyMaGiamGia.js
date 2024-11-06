import React from 'react'
import './mistyles.css'
import { NavLink } from "react-router-dom";
import { browserHistory, Router, Route, Switch } from 'react-router';
import XemBaoCaoTheoDichVuTheoNam from './BaoCao-DichVu-Detail2';
import XemBaoCaoTheoDichVuTheoThang from './BaoCao-DichVu-Detail1';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const QuanLyMaGiamGia = (props) => {
    const magiamgia = [
        {
            idMa: 'NEWMEMBER',
            phanTram: '10',
            thoiGianBatDau: '23/10/2023',
            thoiGianKetThuc: '25/10/2023',
            dichVuApDung: 'Tất cả',
        },
        {
            idMa: 'MEMBER20/10',
            phanTram: '20',
            thoiGianBatDau: '20/10/2023',
            thoiGianKetThuc: '22/10/2023',
            dichVuApDung: 'Tất cả',
        },
        {
            idMa: 'NEWMEMBER',
            phanTram: '10',
            thoiGianBatDau: '23/10/2023',
            thoiGianKetThuc: '25/10/2023',
            dichVuApDung: 'Tất cả',
        },
    ];
    return (
        <div >
            <form name="xemMaGiamGia" action="">
                <div className="mb-3 mt-3">
                    <input className="customBox" type="text" id="idMaGiamGia" placeholder="Nhập id mã giảm giá" name="idMaGiamGia" />
                    <input className="customBox" type="text" id="noidungMaGiamGia" placeholder="Nhập nội dung mã giảm giá" name="noidungMaGiamGia" />
                </div>
                <button type="submit" className="btn btn-primary">Tìm kiếm</button>
                <button id="showFormBtn" className="btn btn-primary" onclick="showDiv();">Thêm</button>
            </form>
            <h1 className="noteVND">**Tính theo đơn vị VNĐ</h1>
            <table className="table" >
                <thead>
                    <tr className="table-secondary">
                        <th>ID mã giảm giá</th>
                        <th>Phần trăm giảm</th>
                        <th>Thời gian bắt đầu</th>
                        <th>Thười gian kết thúc</th>
                        <th>Dịch vụ áp dụng</th>
                    </tr>
                </thead>
                {magiamgia.map((item, index) => (
                    <tr key={index}>
                        <td>{item.idMa}</td>
                        <td>{item.phanTram}</td>
                        <td>{item.thoiGianBatDau}</td>
                        <td>{item.thoiGianKetThuc}</td>
                        <td>{item.dichVuApDung}</td>
                    </tr>
                ))}
                <tbody>

                </tbody>
            </table>
            <div id="boxMaGiamGia" styles="display: none;">
                <form className="themMaGiamGia" action="">
                    <table>
                        <tr>
                            <td>
                                <label className="textInRight" for="id"><b>ID mã giảm giá:</b></label>
                            </td>
                            <td>
                                <input className="customBox2" type="text" id="id" placeholder="Nhập mã id" name="id" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="textInRight" for="noidungmagiamgia"><b>Phần trăm giảm:</b></label>
                            </td>
                            <td>
                                <input className="customBox2" type="number" id="noidungmagiamgia" placeholder="Nhập phần trăm" name="noidungmagiamgia" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="textInRight" for="thoigianbatdau"><b>Thời gian bắt đầu:</b></label>
                            </td>
                            <td>
                                <input className="customBox2" type="date" id="thoigianbatdau" placeholder="" name="thoigianbatdau" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="textInRight" for="thoigianketthuc"><b>Thời gian kết thúc:</b></label>
                            </td>
                            <td>
                                <input className="customBox2" type="date" id="thoigianketthuc" placeholder="" name="thoigianketthuc" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="textInRight" for="dichvuapdung"><b>dịch vụ áp dụng:</b></label>
                            </td>
                            <td>
                                <input className="customBox2" type="text" id="dichvuapdung" placeholder="Nhập dịch vụ" name="dichvuapdung" />
                            </td>
                        </tr>
                    </table>
                    <div className="btnRight">
                        <button type="submit" className="btn">Hủy</button>
                        <button type="submit" className="btn btn-primary">Cập nhập</button>
                        <button type="submit" className="btn btn-primary">Thêm</button>
                    </div>

                </form>
            </div>
        </div>
    );
}
export default QuanLyMaGiamGia;