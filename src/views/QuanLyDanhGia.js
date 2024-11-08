import React from 'react'
import './mistyles.css'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const QuanLyDanhGia = (props) => {
    const danhgia = [
        {
            ngay: '2023-10-10',
            noidung: 'Chi nhanh quận 8 lmà ăn chưa có tốt, giá cao so với thị trường',
        },
        {
            ngay: '2023-10-11',
            noidung: 'Bác sĩ nguyễn văn A làm việc chưa tận tâm, trám răng nhưng rớt, phải đi khám lại, dịch vụ quá tệ',    
        },
        {
            ngay: '2023-10-13',
            noidung: 'Chưa thấy phòng khám nào như phòng khám này, quá là tận tâm',
        },
    ];
    return (
        <div >
            <div class="mb-3 mt-3">
                    <label for="year2"><b>Chọn phương thức lọc:</b></label> <br />
                    <select class="customBox" id="type" placeholder="chọn phương thức" name="year2">
                        <option value="doanhThu">Sắp xếp theo mới nhất</option>
                        <option value="doanhSo">Sắp xếp theo cũ nhất</option>
                    </select>
            </div>
                <button type="submit" className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Tìm kiếm</button>

            <table className="table" >
                <thead>
                    <tr className="table-secondary">
                        <th>Ngày</th>
                        <th>Nội dung</th>
                    </tr>
                </thead>
                {danhgia.map((item, index) => (
                    <tr key={index}>
                        <td>{item.ngay}</td>
                        <td>{item.noidung}</td>
                    </tr>
                ))}
                <tbody>

                </tbody>
            </table>
            
        </div>
    );
}
export default QuanLyDanhGia;