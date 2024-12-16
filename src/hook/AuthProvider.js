import React, { createContext, useState, useEffect } from "react";
import nav from './PhanQuyen'
// import Api from "../api/Api";
import api from "../api/Api";
import { Alert } from "react-bootstrap";
export const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
  const [scope, setScope] = useState(nav.nav0);
  const [scopeQL, setScopeQL] = useState(nav.nav2_2);
  const [scopeQLLH, setScopeQLLH] = useState(nav.nav2_5_1);
  const [user, setUser] = useState(null);
  const Signin = async () => {
    const accessToken = localStorage?.getItem('accessToken');
    console.log("13"+accessToken);
    if (accessToken != undefined) {
      const id = localStorage.getItem('id');
      const userData = await api.getUserData(id);
      if (userData!=null && userData?.message === undefined) {
        setUser({...userData,maCN:userData?.maNhaSiNavigation?.maChiNhanh});
        console.log(userData);

        if (userData?.loaiNguoiDung === 'Customer') {
          if (userData.maNguoiDung !== '') {
            const res = await api.getPatientData(userData.maNguoiDung)
          if(res?.message === undefined){
            console.log("hihi",res)
            setScope(nav.nav1);
          }
           else  setScope(nav.nav0);
          } else {
            setScope(nav.nav0);
          }
        } else {
          // const res = await staffApi.getStaffData(userData.maNV)
          // console.log(res)
          // if(res?.message === undefined){
          //   setUser({...userData,maCN:res.maChiNhanh})
          // }
  
          setScope(nav.nav2);

          switch (userData?.loaiNguoiDung) {
            case 'Quản lý':
              setScopeQL(nav.nav2_1);
              break;
            case 'Tiếp tân':
              setScopeQL(nav.nav2_2);
              setScopeQLLH(nav.nav2_2_1);
              break;
            case 'ChuHeThong':
              setScopeQL(nav.nav2_3);
              break;
            case 'Phụ tá':
              setScopeQL(nav.nav2_4);
              setScopeQLLH(nav.nav2_4_1);
              break;
            case 'Nha sĩ':
              setScopeQL(nav.nav2_5);
              setScopeQLLH(nav.nav2_5_1);
              break;
            default:
              break;
          }
        }
      }
      else{

        alert("Your account may have been deleted!");
        localStorage.removeItem('accessToken');
        localStorage.removeItem('id');
        localStorage.removeItem('role');
      }
    } else {

      setUser(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Signin();
    };
    fetchData();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        scopeQLLH,
        scopeQL,
        scope,
        user,
        setUser,
        Signin,
        Logout:async (history) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('id');
            localStorage.removeItem('role');
            setUser(null)
            setScope(nav.nav0)
            setScopeQL([])
            setScopeQLLH([])
            history.push("/");
          }
      }}>
        {children}
    </AuthContext.Provider>
  );
};
