import { NavLink, Link } from "react-router-dom"
const TopNav = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-light navbar-light" >
            <div className="container" id="topNav">
                <div>
                    <img src="/images/logo1.png" alt="Avatar Logo" style={{ width: "100%" }} />
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    Menu
                    <i className="fa-solid fa-caret-down"></i>
                </button>

                <div className="mx-3"></div>

                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item me-4">
                            <NavLink className="nav-link" to="/" exact>Giới thiệu</NavLink>
                        </li>
                        <li className="nav-item me-4" >
                            <NavLink className="nav-link" to="/doctors">Bác sĩ</NavLink>
                        </li>
                        <li className="nav-item me-4">
                            <NavLink className="nav-link" to="/services">Dịch vụ</NavLink>
                        </li>
                        <li className="nav-item me-4">
                            <NavLink className="nav-link" to="/contacts">Liên lạc</NavLink>
                        </li>
                        <li className="nav-item me-4">
                            <NavLink className="nav-link" to="/booking">Đặt lịch</NavLink>
                        </li>
                        <li className="nav-item me-4">
                            <NavLink className="nav-link" to="/manager">Quản lý</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="nav-item" align="right">
                    <NavLink className="nav-link" to="/sign_in">Đăng nhập</NavLink>
                </div>
                <div className="dropdown">
                    <button className="d-flex align-items-center justify-content-center link-dark text-decoration-none dropdown-toggle" style={{ border: "none", backgroundColor: "transparent" }} id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="/images/ava.png" alt="hugenerd" width="40" height="40" style={{ borderRadius: "50%" }} />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" style={{ backgroundColor: "#007cd4" }} aria-labelledby="dropdownUser1">
                        <li><Link className="dropdown-item" to="/profile">Hồ sơ</Link></li>
                        <hr className="dropdown-divider" />
                        <li><button className="dropdown-item">Đăng xuất</button></li>
                    </ul>
                </div>
                <div className="nav-item d-none d-lg-block ms-5">
                    <NavLink className="nav-link" to="/sign_up">Đăng ký</NavLink>
                </div>

            </div>

        </nav >
    )
}
export default TopNav;