import React from 'react'
import './mistyles.css'
import QuanLyThuoc from './QuanLyKho-QuanLyThuoc';
import QuanLyTrangThietBi from './QuanLyKho-QuanLyTrangThietBi';
import { Route, Router, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { NavLink } from 'react-router-dom';
const QuanLyKho = (props) => {
  return (
    <div>
      <div className="container mt-3">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink className="nav-link" to="/manager/quanlykho/trangthietbi">Quản lý trang thiết bị</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/manager/quanlykho/thuoc">Quản lý thuốc</NavLink>
          </li>
        </ul>
      </div>
      <div className="container mt-3">
        <Switch>
          <Route path="/manager/quanlykho/trangthietbi">
            <QuanLyTrangThietBi/>
          </Route>
          <Route path="/manager/quanlykho/thuoc">
            <QuanLyThuoc/>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default QuanLyKho;