import React from 'react'
import './mistyles.css'
import {
  NavLink, useLocation, Switch, Route, Redirect
} from "react-router-dom";
import HandleSchedule from './HandleSchedule';
import ScheduleDetail from './ScheduleDetail';
const ScheduleManagement = (props) => {
  const { pathname } = useLocation();
  return (
    <div>
      <div className="container mt-3">
        <ul className="nav nav-tabs" id="schedule_tab">
          <li className="nav-item">
            <NavLink className="nav-link" to="/manager/schedule/handleSchedule">Xử lý lịch hẹn</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/manager/schedule/detail">Xem lịch</NavLink>
          </li>
        </ul>
      </div>
      <div className="container mt-3">
        <Route >
          <Switch>
            <Route path="/manager/schedule/handleSchedule">
              <HandleSchedule />
            </Route>
            <Route path="/manager/schedule/detail">
              <ScheduleDetail />
            </Route>
            <Route path="/manager/schedule/meetingSchedule">

            </Route>
            {pathname === "/manager/schedule" ? <Redirect to="/manager/schedule/handleSchedule" /> : null}
            <Switch />
          </Switch>
        </Route>
      </div>
    </div>
  );
}

export default ScheduleManagement;