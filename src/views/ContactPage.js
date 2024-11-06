import React from 'react'
import './style.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import TopNav from '../components/TopNav'
import Footer from '../components/Footer';
const ContactPage = (props) => {
    //fake review list
    const reviewList = [
        {
            fullname: "Trần Thị C",
            image: "/images/ava.png",
            brach: "Chi nhánh quận 1",
            review: "Đặt lịch rất dễ dàng, luôn tạo điều kiện tốt cho khách hàng nhất có thể"
        },
        {
            fullname: "Trần Văn Yến",
            image: "/images/ava.png",
            brach: "Chi nhánh quận 2",
            review: "Đặt lịch rất dễ dàng, luôn tạo điều kiện tốt cho khách hàng"
        },
        {
            fullname: "Trần Thị C",
            image: "/images/ava.png",
            brach: "Chi nhánh quận 1",
            review: "Đặt lịch rất dễ dàng, luôn tạo điều kiện tốt cho khách hàng"
        },
        {
            fullname: "Trần Văn Yến",
            image: "/images/ava.png",
            brach: "Chi nhánh quận 2",
            review: "Đặt lịch rất dễ dàng, luôn tạo điều kiện tốt cho khách hàng"
        },
        {
            fullname: "Trần Thị C",
            image: "/images/ava.png",
            brach: "Chi nhánh quận 1",
            review: "Đặt lịch rất dễ dàng, luôn tạo điều kiện tốt cho khách hàng"
        },
        {
            fullname: "Trần Văn Y",
            image: "/images/ava.png",
            brach: "Chi nhánh quận 2",
            review: "Đặt lịch rất dễ dàng, luôn tạo điều kiện tốt cho khách hàng"
        },
        {
            fullname: "Trần Thị C",
            image: "/images/ava.png",
            brach: "Chi nhánh quận 1",
            review: "Đặt lịch rất dễ dàng, luôn tạo điều kiện tốt cho khách hàng"
        }
        ,
        {
            fullname: "Trần Thị C",
            image: "/images/ava.png",
            brach: "Chi nhánh quận 1",
            review: "Đặt lịch rất dễ dàng, luôn tạo điều kiện tốt cho khách hàng"
        }
        ,
        {
            fullname: "Trần Thị C",
            image: "/images/ava.png",
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

        slidesToShow: 3,//number show each slide
        slidesToScroll: 3,//number item next 
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
            <TopNav />
            <header className="pt-4 pb-4" style={{ backgroundColor: "#0096FF", color: "#FFF" }}><h3 align="center">Liên lạc</h3></header>
            <section className="container mt-5">
                <div className="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-6">
                        <img alt="" src="images/phongkham.png" style={{ width: "100%" }} />
                    </div>
                    <div class="col-md-3"></div>
                </div>
            </section>
            <section className="container mb-5">
                <div className="mt-4">
                    <h3 align="center">Chi nhánh 1</h3>
                    <div className="row">
                        <div className="col-md-4 text-center mt-2">
                            <i className="fa-solid fa-location-dot" style={{ color: "#0096FF", fontSize: "25px" }}></i>
                            <p><h4>Địa chỉ</h4></p>
                            ABC, Quận 7, Hồ Chi Minh
                        </div>
                        <div class="col-md-4 text-center mt-2">
                            <i className="fa-solid fa-phone-volume" style={{ color: "#0096FF", fontSize: "25px" }}></i>
                            <p><h4>Liên lạc</h4></p>
                            Email : abc@gmail.com<br />
                            Phone : +6435346436
                        </div>
                        <div class="col-md-4 text-center mt-2">
                            <i className="fa-regular fa-clock" style={{ color: "#0096FF", fontSize: "25px" }}></i>
                            <p><h4>Giờ mở cửa</h4></p>
                            Thứ 2 - Thứ 7: 09:00 – 20:00<br />
                            Chủ nhật: 10:30 – 22:00
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <h3 align="center">Chi nhánh 2</h3>
                    <div className="row">
                        <div className="col-md-4 text-center mt-2">
                            <i className="fa-solid fa-location-dot" style={{ color: "#0096FF", fontSize: "25px" }}></i>
                            <p><h4>Địa chỉ</h4></p>
                            ABC, Quận 7, Hồ Chi Minh
                        </div>
                        <div class="col-md-4 text-center mt-2">
                            <i className="fa-solid fa-phone-volume" style={{ color: "#0096FF", fontSize: "25px" }}></i>
                            <p><h4>Liên lạc</h4></p>
                            Email : abc@gmail.com<br />
                            Phone : +6435346436
                        </div>
                        <div class="col-md-4 text-center mt-2">
                            <i className="fa-regular fa-clock" style={{ color: "#0096FF", fontSize: "25px" }}></i>
                            <p><h4>Giờ mở cửa</h4></p>
                            Thứ 2 - Thứ 7: 09:00 – 20:00<br />
                            Chủ nhật: 10:30 – 22:00
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <h3 align="center">Chi nhánh 3</h3>
                    <div className="row">
                        <div className="col-md-4 text-center mt-2">
                            <i className="fa-solid fa-location-dot" style={{ color: "#0096FF", fontSize: "25px" }}></i>
                            <p><h4>Địa chỉ</h4></p>
                            ABC, Quận 7, Hồ Chi Minh
                        </div>
                        <div class="col-md-4 text-center mt-2">
                            <i className="fa-solid fa-phone-volume" style={{ color: "#0096FF", fontSize: "25px" }}></i>
                            <p><h4>Liên lạc</h4></p>
                            Email : abc@gmail.com<br />
                            Phone : +6435346436
                        </div>
                        <div class="col-md-4 text-center mt-2">
                            <i className="fa-regular fa-clock" style={{ color: "#0096FF", fontSize: "25px" }}></i>
                            <p><h4>Giờ mở cửa</h4></p>
                            Thứ 2 - Thứ 7: 09:00 – 20:00<br />
                            Chủ nhật: 10:30 – 22:00
                        </div>
                    </div>
                </div>
            </section >
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
                                        <img alt="" className="img-thumbnail" src="/images/ava.png" style={{ borderRadius: "50%", width: "40%" }} />
                                        <h5 className='mt-2'>{item.fullname}</h5>
                                        <p>{item.brach}</p>
                                    </div>
                                </div>
                            )
                        })}

                    </Slider>
                </div>

            </section >
            <Footer />
        </div >
    );
}
export default ContactPage;