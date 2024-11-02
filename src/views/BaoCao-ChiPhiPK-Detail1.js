import React from 'react'
import './mistyles.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const XemBaoCaoCPPKTheoThang= (props) => {
  const doanhthu = [
    {
      tenChiPhi: '2015',
      soLuongCaThucHien: '66',
      soLuongBenhNhan: '23',
      tongDoanhThu: '4000000',
    },
    {
      tenChiPhi: '2016',
      soLuongCaThucHien: '66',
      soLuongBenhNhan: '23',
      tongDoanhThu: '4000000',
    },
    {
      tenChiPhi: '2017',
      soLuongCaThucHien: '66',
      soLuongBenhNhan: '23',
      tongDoanhThu: '4000000',
    },
    ];
return (
    <div> 
      <form name="xemTheoThang" action="/action_page.php">
          <div class="mb-3 mt-3">
          <label for="month"><b>Chọn tháng, năm:</b></label> <br/>
          <input class="customBox" type="month" id="month" placeholder="Chọn tháng năm" name="month"/>
          </div>
          
          <button type="submit" class="btn btn-primary">Xem</button>
      </form>
    <h1 class="noteVND">**Tính theo đơn vị VNĐ</h1>
    <table class="table" >
        <thead>
            <tr class="table-secondary">
              <th>Tên chi phí</th>
              <th>Số lượng ca thực hiện</th>
              <th>Số lượng bệnh nhân</th>
              <th>Tổng doanh thu</th>
            </tr>
          </thead>
          <tbody>
          {doanhthu.map((item, index) => (
          <tr key={index}>
            <td>{item.tenChiPhi}</td>
            <td>{item.soLuongCaThucHien}</td>
            <td>{item.soLuongBenhNhan}</td>
            <td>{item.tongDoanhThu}</td>
          </tr>
        ))}
          </tbody>
    </table>
    </div>
);
}

export default XemBaoCaoCPPKTheoThang;