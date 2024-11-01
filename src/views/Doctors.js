import React, { useEffect, useState, useRef } from 'react'
import './style.css'
import { NavLink } from "react-router-dom";
import ReactPaginate from 'react-paginate';
const TopNav = (props) => {
    //dữ liệu list bác sĩ giả
    const pageToRef = useRef(null);//set lên lại top danh sách bác sĩ

    const doctorList = [
        {
            image: "images/doctor1.jpg",//có thể để height nhưng ko đẹp
            fullName: "Nguyễn Văn A",
            brach: "Quận 7, HCM",
        },
        {
            image: "images/doctor1.jpg",
            fullName: "Nguyễn Thị Bé",
            brach: "Quận 8, HCM",
        },
        {
            image: "images/doctor1.jpg",
            fullName: "Nguyễn Văn A",
            brach: "Quận 7, HCM",
        },
        {
            image: "images/doctor1.jpg",
            fullName: "Nguyễn Thị Bé",
            brach: "Quận 8, HCM",
        },
        {
            image: "images/doctor1.jpg",
            fullName: "Nguyễn Văn A",
            brach: "Quận 7, HCM",
        },
        {
            image: "images/doctor1.jpg",
            fullName: "Nguyễn Thị Bé",
            brach: "Quận 8, HCM",
        }
        ,
        {
            image: "images/doctor1.jpg",
            fullName: "Nguyễn Thị Bé",
            brach: "Quận 8, HCM",
        },
        {
            image: "images/doctor1.jpg",
            fullName: "Nguyễn Văn A",
            brach: "Quận 7, HCM",
        },
        {
            image: "images/doctor1.jpg",
            fullName: "Nguyễn Thị Bé",
            brach: "Quận 8, HCM",
        },
        {
            image: "images/doctor1.jpg",
            fullName: "Nguyễn Thị Bé",
            brach: "Quận 8, HCM",
        },
        {
            image: "images/doctor1.jpg",
            fullName: "Nguyễn Thị Bé",
            brach: "Quận 8, HCM",
        }
    ]
    const doctorPerPage = 4; //số bác sĩ mỗi page
    const [startOffset, setStartOffset] = useState(0);
    const endOffset = startOffset + doctorPerPage;
    const currentDoctorList = doctorList.slice(startOffset, endOffset);//dữ liệu hiển thị mỗi page
    const totalPages = Math.ceil(doctorList.length / doctorPerPage);//tổng page
    useEffect(() => {

    })

    const handlePageClick = (event) => {
        //event là số chỉ trang đang đứng: mặc định trang 1(đầu tiên thì số chỉ là 0)
        setStartOffset((event.selected * doctorPerPage) % doctorList.length)
        pageToRef.current.scrollIntoView();;
    }

    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-light navbar-light">


                <div className="container">
                    <div>

                        <img src="images/logo1.png" alt="Avatar Logo" style={{ width: "100%" }} />
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        Menu
                        <i class="fa-solid fa-caret-down"></i>
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
                        </ul>
                    </div>
                    <div className="nav-item mt-2 mb-2">
                        <NavLink className="nav-link" to="/sign_in">Đăng nhập</NavLink>
                    </div>
                    <div className="nav-item d-none d-lg-block ms-5">
                        <NavLink className="nav-link" to="/sign_up">Đăng ký</NavLink>
                    </div>

                </div>

            </nav >
            <header className="pt-4 pb-4" style={{ backgroundColor: "#0096FF", color: "#FFF" }}><h3 align="center">Bác sĩ của chúng tôi</h3></header>
            <section className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-5 text-center">
                        <img alt="" src="images/kham3.jpg" style={{ width: "90%" }} />
                    </div>
                    <div className="col-md-7 align-self-center mt-2">
                        <p><h4>Đội ngũ bác sĩ</h4></p>
                        <p>Bác sĩ trong phòng khám nha khoa chuyên về chăm sóc và điều trị về vấn đề về răng và miệng. Họ là những chuyên gia có kiến thức vững chắc về cấu trúc và chức năng của răng, nướu và miệng. Đội ngũ bác sĩ nha khoa thường được đào tạo chuyên sâu và có kinh nghiệm trong các phương pháp điều trị như tẩy trắng răng, cạo vôi, chỉnh hình răng, nhổ răng, và nhiều phương pháp khác để giải quyết các vấn đề về răng và miệng của các bệnh nhân. Mục tiêu chính của bác sĩ nha khoa là đảm bảo sức khỏe và vẻ đẹp của răng và miệng cho bệnh nhân.</p>
                    </div>
                </div>
            </section>

            <section class="container mt-5 mb-5">
                <div class="row" ref={pageToRef}>
                    {currentDoctorList.map((item, index) => {
                        return (
                            <div class="col-sm-6 col-md-3 p-4">
                                <img src={item.image} alt="" style={{ width: "100%" }} />
                                <p class="mt-3">
                                    {item.fullName}<br />
                                    Chuyên khoa:<br />
                                    Chi nhánh:  {item.brach}
                                </p>

                            </div>
                        )
                    })}
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}//thay đổi khi sang trang
                        pageRangeDisplayed={2}//số lượng trang hiện của range đang được trỏ tới
                        marginPagesDisplayed={1} //ghim 1 cho left và right mỗi range
                        pageCount={totalPages}//số lượng trang
                        previousLabel="<"

                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link next-and-previous-button"
                        nextClassName="page-item"
                        nextLinkClassName="page-link next-and-previous-button"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination justify-content-center"
                        activeClassName="active"

                    />
                </div>

            </section>
            <footer style={{ backgroundColor: "#0096FF", color: "white" }}>
                <div className="container pt-4 pb-5">
                    <div className="row">
                        <div className="col-md-3">
                            <img alt="" src="images/logo2.png" />
                            <p className="mt-3" style={{ fontSize: "20px" }}>Giới thiệu</p>
                            <p>Phòng khám ABC đã được thành lập hơn 7 năm. Với kinh nghiệm và đội ngũ nha sĩ chuyện nghiệp chúng tôi tự tin sẽ đem đến nhưng dịch vụ tốt nhất.</p>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-md-3">
                            <p className="mt-3">
                                <span style={{ fontSize: "19px" }}>Giờ mở cửa toàn chi nhánh</span>
                                <br />
                                Từ thứ 2 đến thứ 7: từ 7g30 đến 16g30
                            </p>
                            <p className="mt-3">
                                <span style={{ fontSize: "19px" }}>Địa chỉ</span>
                                <ul>
                                    <li>Quận 7, thành phố Hồ Chí Minh</li>
                                    <li>Quận 8, thành phố Hồ Chí </li>
                                    <li>Bình Thạnh, thành phố Hồ Chí </li>
                                </ul>
                            </p>
                            <p className="mt-3" style={{ fontSize: "19px" }}>
                                Email: abc@gmail.com
                                <br />
                                Phone: 0843593598
                            </p>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-md-4">
                            <p className="mt-3" style={{ fontSize: "19px" }}>Phản hồi của bạn</p>
                            <p>Vui lòng viết phản hồi của bạn phía dưới</p>
                            <div className="send-area col-10">
                                <form>
                                    <textarea rows="4" className="mb-4" required></textarea>

                                    <button className="btn btn-primary">Gửi</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div >
    );
}
export default TopNav;