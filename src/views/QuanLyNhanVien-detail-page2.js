import React from 'react'
import './style.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
const XemThongTinNhanVien = (props) => {
  const peopleData = [
    {
      name: 'John Doe',
      phone: '123456789',
      position: 'Nha sĩ',
      email: 'john@example.com',
      basicSalary: '40000000',
      branch: 'Quận 8'
    },
    {
      name: 'Jane Smith',
      phone: '987654321',
      position: 'Tiếp tân',
      email: 'jane@example.com',
      basicSalary: '21000000',
      branch: 'Thủ Đức'
    },
  ];

  return (
    <div>
      <div>
        <form name="timKiemTheoTen">
          <div className="mb-3 mt-3">
            <label for="nameNhanVien"><b>Tìm kiếm theo tên nhân viên</b></label> <br />
            <input type="nameNhanVien" className="customBox" placeholder="nhập tên nhân viên" name="nameNhanVien" />
          </div>
          <div id="output">

          </div>
          <div id="output1">

          </div>
          <button type="submit" className="btn btn-primary" >Xem</button>
        </form>


      </div>
      <section id="boxNvien" >
        <scroll>
          {peopleData.map((item, index) => {
            return (
              <div class="person">
                <img src="" class="rounded-circle" alt="" width="81" height="81"></img>
                <p class=""><b>Họ và tên:</b> {item.name}</p>
                <p class=""><b>Số điện thoại:</b> {item.phone}</p>
                <p class=""><b>Chức vụ:</b> {item.position}</p>
                <p class=""><b>Email:</b> {item.email}</p>
                <p class=""><b>Lương cơ bản:</b> {item.basicSalary}</p>
                <p class=""><b>Chi nhánh làm việc:</b> {item.branch}</p>
              </div>
            )
          }
          )}
        </scroll>
        <img src="" class="rounded-circle" alt="" width="81" height="81" />

      </section>
    </div>
  );
}

export default XemThongTinNhanVien;