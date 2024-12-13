import React, { useState, useEffect } from "react";
import "./mistyles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../api/Api";
const QuanLyDanhGia = (props) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    getFeedbacks();
  }, []);

  const normalizeDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const getFeedbacks = async () => {
    const feedbacks = await api.getDocs("Feedback");
    if (feedbacks) {
      const list = feedbacks.sort((a, b) => {
        const dateTimeA = new Date(`${normalizeDate(a.ngay)}T${a.gio}`);
        const dateTimeB = new Date(`${normalizeDate(b.ngay)}T${b.gio}`);
        return dateTimeB - dateTimeA;
      });

      setFeedbacks(list);
    }
  };
  const handleSelectChange = async (e) => {
    setSortOrder(e.target.value);
    setFeedbacks(feedbacks.reverse());
  };

  return (
    <div>
      <div className="mb-3 mt-3">
        <label for="year2">
          <b>Sắp xếp:</b>
        </label>{" "}
        <br />
        <select
          className="customBox"
          id="type"
          placeholder="chọn phương thức"
          name="year2"
          value={sortOrder}
          onChange={handleSelectChange}
        >
          <option value="desc">Sắp xếp theo mới nhất</option>
          <option value="asc">Sắp xếp theo cũ nhất</option>
        </select>
      </div>

      <button
        type="submit"
        className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Tìm kiếm
      </button>

      <table className="table">
        <thead>
          <tr className="table-secondary">
            <th>Ngày</th>
            <th>Giờ</th>
            <th>Nội dung</th>
          </tr>
        </thead>
        {feedbacks.map((item, index) => (
          <tr key={item.index}>
            <td>{item.ngay}</td>
            <td>{item.gio}</td>
            <td>{item.noiDung}</td>
          </tr>
        ))}
        <tbody></tbody>
      </table>
    </div>
  );
};
export default QuanLyDanhGia;
