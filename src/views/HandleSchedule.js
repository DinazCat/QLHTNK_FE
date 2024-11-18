import { Route, Switch } from 'react-router';
import './mistyles.css'
import { NavLink, useLocation, Redirect } from "react-router-dom";
import CompletedSchedule from './CompletedSchedule';
import IncompletedSchedule from './IncompledtedSchedule';
const HandleSchedule = () => {
    const { pathname } = useLocation();
    return (
        <div>
            <ul className="nav" id="typeschedule_tabs">
                <li className="nav-item">
                    <NavLink className="nav-link " to="/manager/schedule/handleSchedule/incompleted">Chưa sắp lịch</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link action" to="/manager/schedule/handleSchedule/completed">Đã sắp lịch</NavLink>
                </li>
            </ul>
            <div className="container mt-3">
                <Switch>
                    <Route path="/manager/schedule/handleSchedule/completed">
                        <CompletedSchedule />
                    </Route>
                    <Route path="/manager/schedule/handleSchedule/incompleted">
                        <IncompletedSchedule />
                    </Route>
                    {pathname === "/manager/schedule/handleSchedule" ? <Redirect to="/manager/schedule/handleSchedule/incompleted" /> : null}
                </Switch>
            </div>
        </div>
    )
}
export default HandleSchedule