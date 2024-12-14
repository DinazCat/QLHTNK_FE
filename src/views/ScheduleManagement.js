import React, { useState, useEffect, useContext } from 'react';
import './mistyles.css'
import {
  NavLink, useLocation, Switch, Route, Redirect
} from "react-router-dom";
import HandleSchedule from './HandleSchedule';
import ScheduleDetail from './ScheduleDetail';
import ScheduleList from './ScheduleList';
import BookingSchedule from './BookingSchedule';
import SignUpSchedule from './SignUpSchedule';
import { AuthContext } from '../hook/AuthProvider'
const ScheduleManagement = (props) => {
  const { pathname } = useLocation();
  const { scopeQLLH } = useContext(AuthContext);
  return (
    <div>
      <div className="container mt-3">
        <ul className="nav nav-tabs maintab">
          {/* <li className="nav-item">
            <NavLink className="nav-link" to="/manager/schedule/handleSchedule">Xử lý lịch hẹn</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/manager/schedule/bookingSchedule">Đặt lịch</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/manager/schedule/scheduleList">Danh sách lịch hẹn</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/manager/schedule/detail">Xem lịch biểu</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/manager/schedule/signUpSchedule">Đăng ký lịch</NavLink>
          </li> */}
          {scopeQLLH?.map((val, idx) => {
            return (
              <li className="nav-item">
                <NavLink className="nav-link" to={val.path}>{val.name}</NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="container mt-3">
        <Route >
          <Switch>
            {/* <Route path="/manager/schedule/handleSchedule">
              <HandleSchedule />
            </Route>
            <Route path="/manager/schedule/detail">
              <ScheduleDetail />
            </Route>
            <Route path="/manager/schedule/scheduleList">
              <ScheduleList />
            </Route>
            <Route path="/manager/schedule/signUpSchedule">
              <SignUpSchedule />
            </Route>
            <Route path="/manager/schedule/bookingSchedule">
              <BookingSchedule />
            </Route> */}
            {scopeQLLH.map((val, idx) => {
              if (val.name === 'Xử lý lịch hẹn')
                return (
                  <Route path={val.path}>
                    <HandleSchedule />
                  </Route>
                );
              if (val.name === 'Đặt lịch')
                return (
                  <Route path={val.path}>
                    <BookingSchedule />
                  </Route>
                );
              if (val.name === 'Danh sách lịch hẹn')
                return (
                  <Route path={val.path}>
                    <ScheduleList />
                  </Route>
                );
              if (val.name === 'Xem lịch biểu')
                return (
                  <Route path={val.path}>
                    <ScheduleDetail />
                  </Route>
                );
              if (val.name === 'Đăng ký lịch')
                return (
                  <Route path={val.path}>
                    <SignUpSchedule />
                  </Route>
                );
            })}
            {pathname === "/manager/schedule" ? <Redirect to={scopeQLLH[0].path} /> : null}
            <Switch />
          </Switch>
        </Route>
      </div>
    </div>
  );
}

export default ScheduleManagement;