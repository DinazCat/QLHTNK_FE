import React, { useState, useRef } from 'react'
import './style.css'
import ReactPaginate from 'react-paginate';
import TopNav from '../components/TopNav'
import Footer from '../components/Footer';
const ServicesPage = (props) => {
    //fake list doctor
    const pageToRef = useRef(null);

    const serviceList = [
        {
            image: "/images/kham7.png",
            name: "Vệ sinh răng miệng",
            price: "200000-500000 đồng",
            description: "Phòng khám nha khoa chuyên cung cấp dịch vụ vệ sinh răng miệng chuyên nghiệp và chất lượng cao. Chúng tôi nhận thức rõ rằng vệ sinh răng miệng đóng vai trò quan trọng trong việc duy trì sức khỏe và sự tự tin của bạn. Dịch vụ vệ sinh răng miệng của chúng tôi được tiến hành bởi các bác sĩ nha khoa có kinh nghiệm và được đào tạo chuyên sâu về phương pháp vệ sinh răng miệng tiên tiến. Chúng tôi sử dụng công nghệ và thiết bị hiện đại nhằm đảm bảo vệ sinh sạch sẽ và hiệu quả cho răng miệng của bạn. Khi bạn đến phòng khám nha khoa, chúng tôi sẽ tiến hành một cuộc khám răng miệng holistically toàn diện, kiểm tra tình trạng răng, nướu và môi trường miệng của bạn. Qua đó, chúng tôi sẽ đưa ra đánh giá chi tiết về tình trạng sức khỏe răng miệng của bạn và tư vấn các biện pháp phòng ngừa và điều trị phù hợp. Quá trình vệ sinh răng miệng bao gồm loại bỏ mảng bám, nhồi thạch và chà răng. Chúng tôi sử dụng các công cụ và kỹ thuật chuyên sắc có thẩm quyền để loại bỏ mảng bám, giữ cho răng của bạn sạch sẽ và giảm nguy cơ bị sâu răng và viêm nướu.Quá trình vệ sinh răng miệng bao gồm loại bỏ mảng bám, nhồi thạch và chà răng. Chúng tôi sử dụng các công cụ và kỹ thuật chuyên sắc có thẩm quyền để loại bỏ mảng bám, giữ cho răng của bạn sạch sẽ và giảm nguy cơ bị sâu răng và viêm nướu."
        },
        {
            image: "/images/kham7.png",
            name: "Vệ sinh răng miệng",
            price: "200000-500000 đồng",
            description: "Phòng khám nha khoa chuyên cung cấp dịch vụ vệ sinh răng miệng chuyên nghiệp và chất lượng cao. Chúng tôi nhận thức rõ rằng vệ sinh răng miệng đóng vai trò quan trọng trong việc duy trì sức khỏe và sự tự tin của bạn. Dịch vụ vệ sinh răng miệng của chúng tôi được tiến hành bởi các bác sĩ nha khoa có kinh nghiệm và được đào tạo chuyên sâu về phương pháp vệ sinh răng miệng tiên tiến. Chúng tôi sử dụng công nghệ và thiết bị hiện đại nhằm đảm bảo vệ sinh sạch sẽ và hiệu quả cho răng miệng của bạn. Khi bạn đến phòng khám nha khoa, chúng tôi sẽ tiến hành một cuộc khám răng miệng holistically toàn diện, kiểm tra tình trạng răng, nướu và môi trường miệng của bạn. Qua đó, chúng tôi sẽ đưa ra đánh giá chi tiết về tình trạng sức khỏe răng miệng của bạn và tư vấn các biện pháp phòng ngừa và điều trị phù hợp. Quá trình vệ sinh răng miệng bao gồm loại bỏ mảng bám, nhồi thạch và chà răng. Chúng tôi sử dụng các công cụ và kỹ thuật chuyên sắc có thẩm quyền để loại bỏ mảng bám, giữ cho răng của bạn sạch sẽ và giảm nguy cơ bị sâu răng và viêm nướu.Quá trình vệ sinh răng miệng bao gồm loại bỏ mảng bám, nhồi thạch và chà răng. Chúng tôi sử dụng các công cụ và kỹ thuật chuyên sắc có thẩm quyền để loại bỏ mảng bám, giữ cho răng của bạn sạch sẽ và giảm nguy cơ bị sâu răng và viêm nướu."
        },
        {
            image: "/images/kham7.png",
            name: "Vệ sinh răng miệng",
            price: "200000-500000 đồng",
            description: "Phòng khám nha khoa chuyên cung cấp dịch vụ vệ sinh răng miệng chuyên nghiệp và chất lượng cao. Chúng tôi nhận thức rõ rằng vệ sinh răng miệng đóng vai trò quan trọng trong việc duy trì sức khỏe và sự tự tin của bạn. Dịch vụ vệ sinh răng miệng của chúng tôi được tiến hành bởi các bác sĩ nha khoa có kinh nghiệm và được đào tạo chuyên sâu về phương pháp vệ sinh răng miệng tiên tiến. Chúng tôi sử dụng công nghệ và thiết bị hiện đại nhằm đảm bảo vệ sinh sạch sẽ và hiệu quả cho răng miệng của bạn. Khi bạn đến phòng khám nha khoa, chúng tôi sẽ tiến hành một cuộc khám răng miệng holistically toàn diện, kiểm tra tình trạng răng, nướu và môi trường miệng của bạn. Qua đó, chúng tôi sẽ đưa ra đánh giá chi tiết về tình trạng sức khỏe răng miệng của bạn và tư vấn các biện pháp phòng ngừa và điều trị phù hợp. Quá trình vệ sinh răng miệng bao gồm loại bỏ mảng bám, nhồi thạch và chà răng. Chúng tôi sử dụng các công cụ và kỹ thuật chuyên sắc có thẩm quyền để loại bỏ mảng bám, giữ cho răng của bạn sạch sẽ và giảm nguy cơ bị sâu răng và viêm nướu.Quá trình vệ sinh răng miệng bao gồm loại bỏ mảng bám, nhồi thạch và chà răng. Chúng tôi sử dụng các công cụ và kỹ thuật chuyên sắc có thẩm quyền để loại bỏ mảng bám, giữ cho răng của bạn sạch sẽ và giảm nguy cơ bị sâu răng và viêm nướu."
        },
        {
            image: "/images/kham7.png",
            name: "Vệ sinh răng miệng",
            price: "200000-500000 đồng",
            description: "Phòng khám nha khoa chuyên cung cấp dịch vụ vệ sinh răng miệng chuyên nghiệp và chất lượng cao. Chúng tôi nhận thức rõ rằng vệ sinh răng miệng đóng vai trò quan trọng trong việc duy trì sức khỏe và sự tự tin của bạn. Dịch vụ vệ sinh răng miệng của chúng tôi được tiến hành bởi các bác sĩ nha khoa có kinh nghiệm và được đào tạo chuyên sâu về phương pháp vệ sinh răng miệng tiên tiến. Chúng tôi sử dụng công nghệ và thiết bị hiện đại nhằm đảm bảo vệ sinh sạch sẽ và hiệu quả cho răng miệng của bạn. Khi bạn đến phòng khám nha khoa, chúng tôi sẽ tiến hành một cuộc khám răng miệng holistically toàn diện, kiểm tra tình trạng răng, nướu và môi trường miệng của bạn. Qua đó, chúng tôi sẽ đưa ra đánh giá chi tiết về tình trạng sức khỏe răng miệng của bạn và tư vấn các biện pháp phòng ngừa và điều trị phù hợp. Quá trình vệ sinh răng miệng bao gồm loại bỏ mảng bám, nhồi thạch và chà răng. Chúng tôi sử dụng các công cụ và kỹ thuật chuyên sắc có thẩm quyền để loại bỏ mảng bám, giữ cho răng của bạn sạch sẽ và giảm nguy cơ bị sâu răng và viêm nướu.Quá trình vệ sinh răng miệng bao gồm loại bỏ mảng bám, nhồi thạch và chà răng. Chúng tôi sử dụng các công cụ và kỹ thuật chuyên sắc có thẩm quyền để loại bỏ mảng bám, giữ cho răng của bạn sạch sẽ và giảm nguy cơ bị sâu răng và viêm nướu."
        }
    ]
    const doctorPerPage = 3;
    const [startOffset, setStartOffset] = useState(0);
    const endOffset = startOffset + doctorPerPage;
    const currentDoctorList = serviceList.slice(startOffset, endOffset);
    const totalPages = Math.ceil(serviceList.length / doctorPerPage);

    const handlePageClick = (event) => {

        setStartOffset((event.selected * doctorPerPage) % serviceList.length)
        pageToRef.current.scrollIntoView();;
    }

    return (
        <div>
            <TopNav />
            <header className="pt-4 pb-4" style={{ backgroundColor: "#0096FF", color: "#FFF" }}><h3 align="center">Dịch vụ</h3></header>

            <section class="container mt-5 mb-5">
                <div class="row" ref={pageToRef}>
                    {currentDoctorList.map((item, index) => {
                        return (
                            <div class="row">
                                <div className="col-md-4 mt-2">
                                    <img alt="" src={item.image} style={{ width: "100%" }} />
                                </div>
                                <div className="col-md-8 align-self-center px-3">
                                    <p style={{ fontSize: "26px" }}>{item.name}</p>
                                    <p><h6>{item.price}</h6></p>
                                    <p style={{ color: "#666" }} className='mb-5'>{item.description}</p>
                                </div>
                            </div>
                        )
                    })}
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}//change when click new page
                        pageRangeDisplayed={2}//number page show in range 
                        marginPagesDisplayed={1} //1 left neighbor and 1 right neighbor
                        pageCount={totalPages}//totalPage
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

            </section >
            <Footer style={{ marginTop: 0 }} />
        </div >
    );
}
export default ServicesPage;