import React, { useState, useContext, useEffect } from "react";
// {path:'/booking',name:'Đặt lịch'},
//Khách hàng
const nav0 = [
  { path: "/", name: "Giới thiệu" },
  { path: "/doctors", name: "Bác sĩ" },
  { path: "/services", name: "Dịch vụ" },
  { path: "/contacts", name: "Liên lạc" },
];
const nav1 = [
  { path: "/", name: "Giới thiệu" },
  { path: "/doctors", name: "Bác sĩ" },
  { path: "/services", name: "Dịch vụ" },
  { path: "/contacts", name: "Liên lạc" },
  { path: "/mytreatmentrecord", name: "Hồ sơ điều trị" },
];
//NhanVien
const nav2 = [
  { path: "/", name: "Giới thiệu" },
  { path: "/doctors", name: "Bác sĩ" },
  { path: "/services", name: "Dịch vụ" },
  { path: "/contacts", name: "Liên lạc" },
  { path: "/manager", name: "Quản lý" },
];
//NhanVienQuanLy Xem báo cáo và thống kê, quản lý kho, quản lý nhân viên, tiếp nhận đánh giá, thu hút khách hàng, quản lý hóa đơn.
const nav2_1 = [
  {
    path: "/manager/quanlykho",
    srcImg: "/images/qlykho_48px.png",
    name: "Quản lý kho",
  },
  {
    path: "/manager/quanlynhanvien",
    srcImg: "/images/qlynhanvien_48px.png",
    name: "Quản lý nhân viên",
  },
  {
    path: "/manager/quanlymagiamgia",
    srcImg: "/images/giamgia_48px.png",
    name: "Quản lý mã giảm giá",
  },
  {
    path: "/manager/quanlydichvu",
    srcImg: "/images/qlydichvu_48px.png",
    name: "Quản lý dịch vụ",
  },
  {
    path: "/manager/bill",
    srcImg: "/images/qlyhoadon_48px.png",
    name: "Quản lý hoá đơn",
  },
  {
    path: "/manager/quanlydanhgia",
    srcImg: "/images/tiepnhandanhgia_48px.png",
    name: "Quản lý đánh giá",
  },
  {
    path: "/manager/baocao",
    srcImg: "/images/xembaocao_48px.png",
    name: "Báo cáo, thống kê",
  },
];
//Nhan viên tiếp tân Quản lý lịch hẹn, quản lý hóa đơn.
const nav2_2 = [
  {
    path: "/manager/schedule",
    srcImg: "/images/qlylichhen_48px.png",
    name: "Quản lý lịch hẹn",
  },
  {
    path: "/manager/bill",
    srcImg: "/images/qlyhoadon_48px.png",
    name: "Quản lý hoá đơn",
  },
];
//Chủ hệ thống phòng mạch Ngoài có quyền như một nhân viên quản lý thì còn thực hiện quản lý chi nhánh, quản lý dịch vụ, quản lý hóa đơn.
const nav2_3 = [
  {
    path: "/manager/baocao",
    srcImg: "/images/xembaocao_48px.png",
    name: "Báo cáo, thống kê",
  },
  {
    path: "/manager/quanlykho",
    srcImg: "/images/qlykho_48px.png",
    name: "Quản lý kho",
  },
  {
    path: "/manager/quanlynhanvien",
    srcImg: "/images/qlynhanvien_48px.png",
    name: "Quản lý nhân viên",
  },
  {
    path: "/manager/quanlymagiamgia",
    srcImg: "/images/giamgia_48px.png",
    name: "Quản lý mã giảm giá",
  },
  {
    path: "/manager/quanlychinhanh",
    srcImg: "/images/qlychinhanh_48px.png",
    name: "Quản lý chi nhánh",
  },
  {
    path: "/manager/quanlydichvu",
    srcImg: "/images/qlydichvu_48px.png",
    name: "Quản lý dịch vụ",
  },
  {
    path: "/manager/quanlydanhgia",
    srcImg: "/images/tiepnhandanhgia_48px.png",
    name: "Quản lý đánh giá",
  },
];
//Phụ tá: Quản lý thông tin bệnh nhân, ghi lại vật tư thiết bị đã sử dụng, xem lịch hẹn.
const nav2_4 = [
  {
    path: "/manager/schedule",
    srcImg: "/images/qlylichhen_48px.png",
    name: "Quản lý lịch hẹn",
  },
  {
    path: "/manager/patient",
    srcImg: "/images/quanlybenhnhan_48px.png",
    name: "Quản lý bệnh nhân",
  },
  {
    path: "/manager/deviceUsed",
    srcImg: "/images/ghilaivattuthietbi_48px.png",
    name: "Thiết bị sử dụng",
  },
];
//Nha sĩ: Quản lý thông tin bệnh nhân, thêm toa thuốc, xem lịch hẹn.
const nav2_5 = [
  {
    path: "/manager/schedule",
    srcImg: "/images/qlylichhen_48px.png",
    name: "Quản lý lịch hẹn",
  },
  {
    path: "/manager/patient",
    srcImg: "/images/quanlybenhnhan_48px.png",
    name: "Quản lý bệnh nhân",
  },
  {
    path: "/manager/deviceUsed",
    srcImg: "/images/ghilaivattuthietbi_48px.png",
    name: "Thiết bị sử dụng",
  },
];
//lịch hẹn
//Tiếp tân 4 tab đầu
const nav2_2_1 = [
  { path: "/manager/schedule/handleSchedule", name: "Xử lý lịch hẹn" },
  { path: "/manager/schedule/bookingSchedule", name: "Đặt lịch" },
  { path: "/manager/schedule/scheduleList", name: "Danh sách lịch hẹn" },
  { path: "/manager/schedule/detail", name: "Xem lịch biểu" },
];
//Nha sĩ
const nav2_5_1 = [
  { path: "/manager/schedule/detail", name: "Xem lịch biểu" },
  { path: "/manager/schedule/signUpSchedule", name: "Đăng ký lịch" },
];
//Phụ tá
const nav2_4_1 = [{ path: "/manager/schedule/detail", name: "Xem lịch biểu" }];

export default {
  nav1,
  nav2,
  nav2_1,
  nav2_2,
  nav2_3,
  nav2_4,
  nav2_5,
  nav2_2_1,
  nav2_5_1,
  nav0,
  nav2_4_1,
};
