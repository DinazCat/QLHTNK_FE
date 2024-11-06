import React from 'react'
import './mistyles.css'
import { NavLink } from "react-router-dom";
import { browserHistory, Router, Route, Switch } from 'react-router';
import XemBaoCaoCPPKTheoThang from './BaoCao-ChiPhiPK-Detail1'
import XemBaoCaoCPPKTheoNam from './BaoCao-ChiPhiPK-Detail2';
const XemBaoCaoTheoCPPK = (props) => {
  return (
    <div>
      <ul className="nav">
        <li className="nav-item">
          <NavLink className="nav-link " to="/manager/baocao/baocaotheochiphiphongkham/xemtheothang">Xem theo tháng</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link action" to="/manager/baocao/baocaotheochiphiphongkham/xemtheonam">Xem theo năm</NavLink>
        </li>
      </ul>
      <div className="container mt-3">
        <Switch>
          <Route path="/manager/baocao/baocaotheochiphiphongkham/xemtheothang">
            <XemBaoCaoCPPKTheoThang />
          </Route>
          <Route path="/manager/baocao/baocaotheochiphiphongkham/xemtheonam">
            <XemBaoCaoCPPKTheoNam />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default XemBaoCaoTheoCPPK;