const Footer = (props) => {
    const { style } = props
    return (
        <footer style={{ backgroundColor: "#0096FF", color: "white", marginTop: "80px", ...style }}>
            <div className="container pt-4 pb-5">
                <div className="row">
                    <div className="col-md-3">
                        <img alt="" src="/images/logo2.png" />
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
                                <li>Quận 8, thành phố Hồ Chí Minh</li>
                                <li>Bình Thạnh, thành phố Hồ Chí Minh</li>
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
    )
}
export default Footer