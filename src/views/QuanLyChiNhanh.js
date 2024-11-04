import React from 'react'
import './mistyles.css'
import { NavLink } from "react-router-dom";
import { browserHistory, Router, Route,Switch } from 'react-router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const QuanLyChiNhanh= (props) => {
    const magiamgia = [
        {
            maChiNhanh: '001',
            tenChiNhanh: 'Chi nhánh Thủ Đức',
            diaChi: 'khu phố 6, Linh Trung, Thủ Đức,HCM',
            soLuongPhong: 'Có',
        },
        {
            maChiNhanh: '002',
            tenChiNhanh: 'Chi nhánh Quận 8',
            diaChi: 'Huỳnh Tấn Phát, Quận 8, HCM',
            soLuongPhong: 'Có',
        },
        {
            maChiNhanh: '003',
            tenChiNhanh: 'Chi nhánh Quận 7',
            diaChi: 'Lâm Văn Bền, Quận 7, HCM',
            soLuongPhong: 'Có',
        },
        ];
return (
    <div>
        <form name="xemChiNhanh" action="">
            <div className="mb-3 mt-3">
            <input className="customBox" type="text" id="maChiNhanh" placeholder="Nhập mã chi nhánh" name="maChiNhanh"/>
            <input className="customBox" type="text" id="tenChiNhanh" placeholder="Nhập tên chi nhánh" name="tenChiNhanh"/>
            </div>
            <button type="submit" className="btn btn-primary">Tìm kiếm</button>
            <button id="showFormBtn" className="btn btn-primary" onclick="">Thêm</button>
        </form>
        <h1 className="noteVND">**Tính theo đơn vị VNĐ</h1>
        <table className="table" >
            <thead>
                <tr className="table-secondary">
                <th>Mã chi nhánh</th>
                <th>Tên chi nhánh</th>
                <th>Địa chỉ</th>
                <th>Số lượng phòng</th>
                </tr>
            </thead>
                    {magiamgia.map((item, index) => (
                <tr key={index}>
                    <td>{item.maChiNhanh}</td>
                    <td>{item.tenChiNhanh}</td>
                    <td>{item.diaChi}</td>
                    <td>{item.soLuongPhong}</td>
                </tr>
        ))}
            <tbody>    
            </tbody>
        </table>
        <div id="boxChiNhanh" styles="display: none;">
        <form className="themChiNhanh" action="">
            <table>
            <tr>
                <td>
                <label className="textInRight" for="machinhanh"><b>Mã dịch vụ:</b></label> 
                </td>
                <td>
                <input className="customBox2" type="text" id="machinhanh" placeholder="Nhập mã chi nhánh" name="machinhanh"/>
                </td>
            </tr>
            <tr>
                <td>
                <label className="textInRight" for="tenchinhanh"><b>Tên chi nhánh:</b></label> 
                </td>
                <td>
                <input className="customBox2" type="text" id="tenchinhanh" placeholder="Nhập tên chi nhánh" name="tenchinhanh"/>
                </td>
            </tr>
            <tr>
                <td>
                <label className="textInRight" for="diachi"><b>Địa chỉ:</b></label> 
                </td>
                <td>
                <input className="customBox2" type="text" id="diachi" placeholder="" name="diachi"/>
                </td>
            </tr>
            <tr>
                <td>
                <label className="textInRight" for="soluongphong"><b>Số lượng phòng:</b></label> 
                </td>
                <td>
                <input className="customBox2" type="number" id="soluongphong" placeholder="" name="soluongphong"/>
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
export default QuanLyChiNhanh;