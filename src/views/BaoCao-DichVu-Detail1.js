import React from 'react'
import './mistyles.css'
import { NavLink } from "react-router-dom";
import { browserHistory, Router, Route,Switch } from 'react-router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const XemBaoCaoTheoDichVuTheoThang= (props) => {
return (
    <div>
         <form name="xemTheoThang" action="/action_page.php">
            <div class="mb-3 mt-3">
            <label for="month"><b>Chọn tháng, năm:</b></label> <br/>
            <input class="customBox" type="month" id="month" placeholder="Chọn tháng năm" name="month"/>
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
                    <td>Khám tư vấn</td>
                    <td>44</td>
                    <td>44</td>
                    <td>4400000</td>
                </tr>
                <tr class="table-secondary">
                    <td>Nhổ răng</td>
                    <td>44</td>
                    <td>44</td>
                    <td>4400000</td>
                </tr>
            </tbody>
        </table>
    </div>
);
}
export default XemBaoCaoTheoDichVuTheoThang;