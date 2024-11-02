import React from 'react'
import './mistyles.css'
import { NavLink } from "react-router-dom";
import { browserHistory, Router, Route,Switch } from 'react-router';
import XemBaoCaoTheoThang from './BaoCao-ThoiGian-Detail1'
import XemBaoCaoTheoNam from './BaoCao-ThoiGian-Detail2'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const XemBaoCaoTheoDichVuTheoNam= (props) => {
return (
    <div> 
        <form name="xemTheoNam" action="/action_page.php">
            <div class="mb-3 mt-3">
            <label for="year1"><b>Chọn năm:</b></label> <br/>
            <input type="number" class="customBox" min="2010" max="2023" step="1" value="2015" id="year" placeholder="Chọn năm" name="year1"/>
            </div>
            
            <div class="mb-3 mt-3">
            <label for="year2"><b>Chọn phương thức lọc:</b></label> <br/>
            <select class="customBox" id="type" placeholder="chọn phương thức" name="year2">
                <option value="doanhThu">Doanh thu</option>
                <option value="doanhSo">Doanh số</option>
            </select>
            </div>
            <button type="submit" class="btn btn-primary">Xem</button>
        </form>
        <h1 class="noteVND">**Tính theo đơn vị VNĐ</h1>
        <table class="table" >
            <thead>
                <tr class="table-secondary">
                <th>Tên dịch vụ</th>
                <th>Số lượng ca thực hiện</th>
                <th>Số lượng bệnh nhân</th>
                <th>Tổng doanh thu</th>
                </tr>
            </thead>
            <tbody>
                <tr class="table-secondary">
                <td>Niềng răng</td>
                <td>44</td>
                <td>44</td>
                <td>4400000</td>
                </tr>
                <tr class="table-secondary">
                    <td>Nhổ răng khôn</td>
                    <td>44</td>
                    <td>44</td>
                    <td>4400000</td>
                </tr>
                <tr class="table-secondary">
                    <td>Lấy cao răng</td>
                    <td>44</td>
                    <td>44</td>
                    <td>4400000</td>
                </tr>
            </tbody>
        </table>
    </div>
);
}
export default XemBaoCaoTheoDichVuTheoNam;