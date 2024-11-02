import React from 'react'
import './mistyles.css'
import { NavLink } from "react-router-dom";
import { browserHistory, Router, Route,Switch } from 'react-router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const QuanLyDichVu= (props) => {
    const magiamgia = [
        {
            maDichVu: '001',
            tenDichVu: 'Niềng răng',
            giaDichVu: '35000000',
            baoHanh: 'Có',
            coTraGop: 'Có',
        },
        {
            maDichVu: '002',
            tenDichVu: 'Nhổ răng',
            giaDichVu: '1000000',
            baoHanh: 'Có',
            coTraGop: 'Không',
        },
        {
            maDichVu: '003',
            tenDichVu: 'Trám răng',
            giaDichVu: '350000',
            baoHanh: 'Có',
            coTraGop: 'Không',
        },
        ];
return (
    <div>
        <form name="xemDichVu" action="">
            <div className="mb-3 mt-3">
            <input className="customBox" type="text" id="maDichVu" placeholder="Nhập mã dịch vụ" name="maDichVu"/>
            <input className="customBox" type="text" id="tenDichVu" placeholder="Nhập tên dịch vụ" name="tenDichVu"/>
            </div>
            <button type="submit" className="btn btn-primary">Tìm kiếm</button>
            <button id="showFormBtn" className="btn btn-primary" onclick="">Thêm</button>
        </form>
        <h1 className="noteVND">**Tính theo đơn vị VNĐ</h1>
        <table className="table" >
            <thead>
                <tr className="table-secondary">
                <th>Mã dịch vụ</th>
                <th>Tên dịch vụ</th>
                <th>Giá thành</th>
                <th>Bảo hành</th>
                <th>Có trả góp hay không</th>
                </tr>
            </thead>
                    {magiamgia.map((item, index) => (
                <tr key={index}>
                    <td>{item.maDichVu}</td>
                    <td>{item.tenDichVu}</td>
                    <td>{item.giaDichVu}</td>
                    <td>{item.baoHanh}</td>
                    <td>{item.coTraGop}</td>
                </tr>
        ))}
            <tbody>    
            </tbody>
        </table>
        <div id="boxDichVu" styles="display: none;">
        <form className="themDichVu" action="">
            <table>
            <tr>
                <td>
                <label className="textInRight" for="madichvu"><b>Mã dịch vụ:</b></label> 
                </td>
                <td>
                <input className="customBox2" type="text" id="madichvu" placeholder="Nhập mã dịch vụ" name="madichvu"/>
                </td>
            </tr>
            <tr>
                <td>
                <label className="textInRight" for="tendichvu"><b>Tên dịch vụ:</b></label> 
                </td>
                <td>
                <input className="customBox2" type="text" id="tendichvu" placeholder="Nhập tên dịch vụ" name="tendichvu"/>
                </td>
            </tr>
            <tr>
                <td>
                <label className="textInRight" for="maloaidichvu"><b>Mã loại dịch vụ:</b></label> 
                </td>
                <td>
                <input className="customBox2" type="text" id="maloaidichvu" placeholder="Nhập mã loại dịch vụ" name="maloaidichvu"/>
                </td>
            </tr>
            <tr>
                <td>
                <label className="textInRight" for="giathanh"><b>Giá thành:</b></label> 
                </td>
                <td>
                <input className="customBox2" type="number" id="giathanh" placeholder="" name="giathanh"/>
                </td>
            </tr>
            <tr>
                <td>
                <label className="textInRight" for="baohanh"><b>Bảo hành:</b></label> 
                </td>
                <td>
                <select name="yesno" id="yesno">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                </td>
            </tr>
            <tr>
                <td>
                <label className="textInRight" for="tragop"><b>Trả góp:</b></label>
                </td>
                <td>
                <select name="yesno" id="yesno">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
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
export default QuanLyDichVu;