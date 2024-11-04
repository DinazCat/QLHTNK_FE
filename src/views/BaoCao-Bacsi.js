import React from 'react'
import './mistyles.css'
import { NavLink } from "react-router-dom";
import { browserHistory, Router, Route,Switch } from 'react-router';
import XemBaoCaoTheoBacSiTheoThang from './BaoCao-BacSi-Detail1';
import XemBaoCaoTheoBacSiTheoNam from './BaoCao-BacSi-Detail2'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const XemBaoCaoTheoBacSi= (props) => {
return (
    <div> 
          <ul className="nav">
            <li className="nav-item">
              <NavLink className="nav-link " to="/manager/baocao/baocaotheobacsi/xemtheothang">Xem theo tháng</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link action" to="/manager/baocao/baocaotheobacsi/xemtheonam">Xem theo năm</NavLink>
            </li>
          </ul>
        <div className="container mt-3">
                <Switch>
                    <Route path="/manager/baocao/baocaotheobacsi/xemtheothang">
                        <XemBaoCaoTheoBacSiTheoThang/>
                    </Route>
                    <Route path="/manager/baocao/baocaotheobacsi/xemtheonam">
                        <XemBaoCaoTheoBacSiTheoNam/>
                    </Route>
                </Switch>
        </div>
    </div>
);
}

export default XemBaoCaoTheoBacSi;