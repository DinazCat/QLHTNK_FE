import React from 'react'
import './mistyles.css'
import {
  NavLink, useLocation, Switch, Route, Redirect
} from "react-router-dom";
import XemBaoCaoTheoThoiGian from './BaoCao-ThoiGian';
import ScheduleDetail from './ScheduleDetail';
const ScheduleManagement = (props) => {
  const { pathname } = useLocation();
  return (
    <div>
      <div className="container mt-3">
        <ul className="nav nav-tabs" id="schedule_tab">
          <li className="nav-item">
            <NavLink className="nav-link" to="/manager/schedule/signin">Xem lịch</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/manager/schedule/detail">Xem đăng ký</NavLink>
          </li>
        </ul>
      </div>
      <div className="container mt-3">
        <Route >
          <Switch>
            <Route path="/manager/schedule/signin">
              <XemBaoCaoTheoThoiGian />
            </Route>
            <Route path="/manager/schedule/detail">
              <ScheduleDetail />
            </Route>
            {pathname === "/manager/schedule" ? <Redirect to="/manager/schedule/signin" /> : null}
            <Switch />
          </Switch>
        </Route>
      </div>
    </div>
  );
}

export default ScheduleManagement;