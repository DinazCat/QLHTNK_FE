import React from 'react'
import './style.css'
import { NavLink, useHistory } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const TopNav = (props) => {
    //chuyển tới trang đăng ký
    const history = useHistory();
    const moveToBookingPage = () => {
        history.push("/booking")
    }

    //dữ liệu list đánh giá giả
    const reviewList = [
        {
            fullname: "Trần Thị C",
            image: "images/ava.png",
            brach: "Chi nhánh quận 1",
            review: "Đặt lịch rất dễ dàng, luôn tạo điều kiện tốt cho khách hàng nhất có thể"
        },
        {
            fullname: "Trần Văn Yến",
            image: "images/ava.png",
            brach: "Chi nhánh quận 2",
            review: "Đặt lịch rất dễ dàng, luôn tạo điều kiện tốt cho khách hàng"
        },
        {
            fullname: "Trần Thị C",
            image: "images/ava.png",
            brach: "Chi nhánh quận 1",
            review: "Đặt lịch rất dễ dàng, luôn tạo điều kiện tốt cho khách hàng"
        },
        {
            fullname: "Trần Văn Yến",
            image: "images/ava.png",
            brach: "Chi nhánh quận 2",
            review: "Đặt lịch rất dễ dàng, luôn tạo điều kiện tốt cho khách hàng"
        },
        {
            fullname: "Trần Thị C",
            image: "images/ava.png",
            brach: "Chi nhánh quận 1",
            review: "Đặt lịch rất dễ dàng, luôn tạo điều kiện tốt cho khách hàng"
        },
        {
            fullname: "Trần Văn Y",
            image: "images/ava.png",
            brach: "Chi nhánh quận 2",
            review: "Đặt lịch rất dễ dàng, luôn tạo điều kiện tốt cho khách hàng"
        },
        {
            fullname: "Trần Thị C",
            image: "images/ava.png",
            brach: "Chi nhánh quận 1",
            review: "Đặt lịch rất dễ dàng, luôn tạo điều kiện tốt cho khách hàng"
        }
        ,
        {
            fullname: "Trần Thị C",
            image: "images/ava.png",
            brach: "Chi nhánh quận 1",
            review: "Đặt lịch rất dễ dàng, luôn tạo điều kiện tốt cho khách hàng"
        }
        ,
        {
            fullname: "Trần Thị C",
            image: "images/ava.png",
            brach: "Chi nhánh quận 1",
            review: "Đặt lịch rất dễ dàng, luôn tạo điều kiện tốt cho khách hàng"
        }
    ]
    //custom setting for slider
    var settings = {
        dots: true,
        infinite: true,
        swipeToSlide: true,
        speed: 500,

        slidesToShow: 3,//số phần tử show một lần
        slidesToScroll: 3,//số phần tử nextinitialSlide: 0
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false
                }
            }

        ]
    };


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
                            <li className="nav-item me-4">
                                <NavLink className="nav-link" to="/manager">Quản Lý</NavLink>
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
            <section className="row g-0">
                <div className="col-1"></div>
                <div className="col-md-5 mt-5 p-3">
                    <p className="mt-5" style={{ fontSize: "25px", color: "#0096FF" }}>Chào mừng đến với chúng tôi</p>
                    <p><h3>Với kinh nghiệm hơn 7 năm, chúng tôi sẽ đem đến cho bạn nhưng trải nghiệm tốt nhất</h3></p>
                    <div className="col-12">
                        <button type="submit" className="btn pb-2 pt-2 px-5 pe-5 mt-4" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }} onClick={() => moveToBookingPage()}>Đặt lịch ngay</button>
                    </div>
                </div>
                <div className="col-md-6 d-none d-md-block"><img alt="" src="images/kham5.png" style={{ width: "90%" }} align="right" /></div>

            </section >
            <section className="mt-5 container-fluid" style={{ backgroundImage: "url(images/kham6.png)", backgroundRepeat: "no-repeat", backgroundPosition: "center left 35%" }}>
                <div className="row">
                    <div className="col-6"></div>
                    <div className="col-md-5">
                        <p><h5>CÁC CHUYÊN GIA LUÔN KHUYẾN CÁO</h5></p>
                        <p>
                            <span style={{ fontSize: "20px", color: "#0096FF" }}>Đừng bao giờ quên vệ sinh răng miệng</span><br />
                            <span style={{ color: "black" }}>Hãy luôn vệ sinh sạch sẽ răng miệng của chính bản thân bằng cách thường xuyên súc miệng và đánh răng ít nhất 2 lần/ngày.</span>
                        </p>
                        <p className="mt-4">
                            <span style={{ fontSize: "20px", color: "#0096FF" }}>Đừng quá mạnh tay khi chải răng</span><br />
                            <span style={{ color: "black" }}>Không nên đánh răng quá mạnh, nên đánh răng nhẹ nhàng theo vòng tròn bao gồm cả mặt trong, mặt ngoài của răng và lưỡi.</span>
                        </p>
                        <p className="mt-4">
                            <span style={{ fontSize: "20px", color: "#0096FF" }}>Thăm khám răng miệng thường xuyên</span><br />
                            <span style={{ color: "black" }}>Nên khám răng theo khuyến nghị của nha sĩ, khoảng 6 tháng/lần. Khi có các dấu hiệu sau đề nghị đi khám ngay: Đau răng, sưng hoặc xuất huyết lưỡi, sưng lợi và vùng xương hàm, có vết loét niêm mạc miệng.</span>
                        </p>
                    </div>
                </div>
            </section>
            <section className="mt-5 container">
                <h3 align="center">Các dịch vụ</h3>
                <div className="row">
                    <div className="col-md-4 pe-5 px-5 pt-2 pb-4">
                        <p>
                            <h5>Làm trắng răng</h5>
                            <span className="truncation-text">Tẩy trắng răng là phương pháp dùng các hợp chất kết hợp với năng lượng ánh sáng sẽ tạo ra phản ứng oxy hóa cắt đứt các chuỗi phân tử màu các chuỗi phân tử màu trong ngà răng. Từ đó giúp răng trắng sáng hơn so với màu răng ban đầu mà không làm tổn hại bề mặt răng hay bất kỳ yếu tố nào trong răng.</span>
                        </p>
                        <NavLink to="/" className="text-decoration-none">Xem thêm &rarr;</NavLink>
                    </div>
                    <div className="col-md-4 pe-5 px-5 pt-2 pb-4">
                        <p>
                            <h5>Vệ sinh răng miệng</h5>
                            <span className="truncation-text">Vệ sinh răng miệng là quá trình loại bỏ cao răng hoặc mảng bám cứng trên bề mặt răng và dưới nướu. Cao răng được hình thành từ vi khuẩn ăn các mảnh....</span>
                        </p>
                        <NavLink to="/" className="text-decoration-none">Xem thêm &rarr;</NavLink>
                    </div>
                    <div className="col-md-4 pe-5 px-5 pt-2 pb-4">
                        <p>
                            <h5>Nhổ răng khôn</h5>
                            <span className="truncation-text">Nhổ răng khôn là kỹ thuật tương đối phức tạp đòi hỏi bác sĩ thực hiện phải có kỹ thuật và nhiều kinh nghiệm.</span>

                        </p>
                        <NavLink to="/" className="text-decoration-none">Xem thêm &rarr;</NavLink>

                    </div>
                    <div className="col-md-4 pe-5 px-5 pt-2 pb-4">
                        <p>
                            <h5>Niềng răng thẩm mỹ</h5>
                            <span className="truncation-text">Niềng răng là phương pháp sử dụng khí cụ chuyên dụng được gắn cố định hoặc tháo lắp trên răng để giúp dịch chuyển và sắp xếp răng về đúng vị trí....</span>
                        </p>
                        <NavLink to="/" className="text-decoration-none">Xem thêm &rarr;</NavLink>
                    </div>
                    <div class="col-md-4 pe-5 px-5 pt-2 pb-4">
                        <p>
                            <h5>Cấy ghép implant</h5>
                            <span className="truncation-text">Cấy ghép Implant là giải pháp phục hồi răng bị mất hiệu quả nhất bởi không chỉ giúp khôi phục thẩm mỹ hàm răng, đảm bảo khả năng ăn nhai bình thường, ....</span>
                        </p>
                        <NavLink to="/" className="text-decoration-none">Xem thêm &rarr;</NavLink>
                    </div>
                    <div className="col-md-4 pe-5 px-5 pt-2 pb-4">
                        <p>
                            <h5 >Điều trị tủy</h5>
                            <span className="truncation-text">Trong cấu trúc răng, tủy răng đóng vai trò rất quan trọng là cung cấp dinh dưỡng nuôi sống và giúp răng luôn vững chắc, và khi tủy răng bị viêm....</span>
                        </p>
                        <NavLink to="/" className="text-decoration-none">Xem thêm &rarr;</NavLink>
                    </div>
                </div>
                <h5 className="mt-3" align="center"><NavLink to="/" style={{ color: "black" }} className="text-decoration-none">Xem thêm &rarr;</NavLink></h5>
            </section>
            <section class="container mt-5 mb-5">
                <h4 align="center">Đội ngũ các chuyên gia nha sĩ</h4>
                <div class="row">
                    <div class="col-sm-6 col-md-3 p-4">
                        <img alt="" src="./images/doctor1.jpg" style={{ width: "100%" }} />
                        <p class="mt-3">
                            Nguyễn Văn A<br />
                            Chuyên khoa:<br />
                            Chi nhánh:  Lâm Văn Bền, Quận 7, HCM
                        </p>

                    </div>
                    <div class="col-sm-6 col-md-3 p-4">
                        <img alt="" src="./images/doctor1.jpg" style={{ width: "100%" }} />
                        <p class="mt-3">
                            Nguyễn Văn A<br />
                            Chuyên khoa:<br />
                            Chi nhánh:  Lâm Văn Bền, Quận 7, HCM
                        </p>
                    </div>
                    <div class="col-sm-6 col-md-3 p-4">
                        <img alt="" src="./images/doctor1.jpg" style={{ width: "100%" }} />
                        <p class="mt-3">
                            Nguyễn Văn A<br />
                            Chuyên khoa:<br />
                            Chi nhánh:  Lâm Văn Bền, Quận 7, HCM
                        </p>
                    </div>
                    <div class="col-sm-6 col-md-3 p-4">
                        <img alt="" src="./images/doctor1.jpg" style={{ width: "100%" }} />
                        <p class="mt-3">
                            Nguyễn Văn A<br />
                            Chuyên khoa:<br />
                            Chi nhánh:  Lâm Văn Bền, Quận 7, HCM
                        </p>
                    </div>
                </div>
                <h5 className="mt-2" align="center"><NavLink to="/doctors" className="text-decoration-none nav-link">Xem thêm &rarr;</NavLink></h5>
            </section>
            <section className='container'>
                <h3 align="center">Phản hồi của khách hàng</h3>
                <p className='text-center'>Cảm ơn bạn đã tin tưởng chúng tôi</p>
                <div class="container-fluid mt-4" align="center">
                    <Slider {...settings}>
                        {reviewList.map((item, index) => {
                            return (
                                <div className="container mb-2" >
                                    <div className="p-4">
                                        <div className="custom-slider-item pt-5 pb-5 pe-3 px-3 mb-4" >
                                            <p className="truncation-text">{item.review}</p>
                                        </div>
                                        <img alt="" className="img-thumbnail" src="images/ava.png" style={{ borderRadius: "50%", width: "40%" }} />
                                        <h5 className='mt-2'>{item.fullname}</h5>
                                        <p>{item.brach}</p>
                                    </div>
                                </div>
                            )
                        })}

                    </Slider>
                </div>

            </section >
            <footer style={{ backgroundColor: "#0096FF", color: "white", marginTop: "80px" }}>
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