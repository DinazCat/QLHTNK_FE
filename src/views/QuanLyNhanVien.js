import React from 'react'
import './style.css'
import { NavLink } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import QuanLyLichHen from './QuanLyLichHen';
const QuanLyNhanVien= (props) => {
return (
    <div style={{height: "1000px", backgroundColor: "#d9d9d9" }}>
        <h1>Quản Lý Nhân viên</h1>
    </div>
);
}

export default QuanLyNhanVien;