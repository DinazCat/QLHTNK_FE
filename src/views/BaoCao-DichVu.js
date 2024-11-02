import React from 'react'
import './mistyles.css'
import { NavLink } from "react-router-dom";
import { browserHistory, Router, Route,Switch } from 'react-router';
import XemBaoCaoTheoDichVuTheoNam from './BaoCao-DichVu-Detail2';
import XemBaoCaoTheoDichVuTheoThang from './BaoCao-DichVu-Detail1';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const XemBaoCaoTheoDichVu= (props) => {
return (
    <div> 
          <ul className="nav">
            <li className="nav-item">
              <NavLink className="nav-link action" to="/manager/baocao/baocaotheodichvu/xemtheothang">Xem theo tháng</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="/manager/baocao/baocaotheodichvu/xemtheonam">Xem theo năm</NavLink>
            </li>
          </ul>
        <div className="container mt-3">
                <Switch>
                    <Route path="/manager/baocao/baocaotheodichvu/xemtheothang">
                        <XemBaoCaoTheoDichVuTheoThang/>
                    </Route>
                    <Route path="/manager/baocao/baocaotheodichvu/xemtheonam">
                        <XemBaoCaoTheoDichVuTheoNam/>
                    </Route>
                </Switch>
        </div>
    </div>
);
}

export default XemBaoCaoTheoDichVu;