import React from 'react'
import './mistyles.css'

const XemBaoCaoChiNhanhTheoThang = (props) => {
  const doanhthu = [
    {
      chiNhanh: 'Quận 8',
      soLuongCaThucHien: '66',
      soLuongBenhNhan: '23',
      tongDoanhThu: '4000000',
    },
    {
      chiNhanh: 'Quận 8',
      soLuongCaThucHien: '66',
      soLuongBenhNhan: '23',
      tongDoanhThu: '4000000',
    },
    {
      chiNhanh: 'Quận 8',
      soLuongCaThucHien: '66',
      soLuongBenhNhan: '23',
      tongDoanhThu: '4000000',
    },
  ];
  return (
    <div>
        <div class="mb-3 mt-3">
          <label for="month"><b>Chọn tháng, năm:</b></label> <br />
          <input class="customBox" type="month" id="month" placeholder="Chọn tháng năm" name="month" />
        </div>

        <button class="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Xem</button>

      <h1 class="noteVND"> **Tính theo đơn vị VNĐ</h1>
      <table class="table" >
        <thead>
          <tr class="table-secondary">
            <th>Chi nhánh</th>
            <th>Số lượng ca thực hiện</th>
            <th>Số lượng bệnh nhân</th>
            <th>Tổng doanh thu</th>
          </tr>
        </thead>
        <tbody>
          {doanhthu.map((item, index) => (
            <tr key={index}>
              <td>{item.chiNhanh}</td>
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

export default XemBaoCaoChiNhanhTheoThang;