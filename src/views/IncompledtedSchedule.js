import React, { useState, useEffect } from "react";
import { FormHandleSchedule } from "../components/FormHandleSchedule";
import Api from "../api/Api";

const IncompletedSchedule = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sentSchedules, setSentSchedule] = useState([]);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    const bookings = await Api.getDocs("Appointment");
    if (bookings) {
      const list = bookings.filter(
        (item) =>
          item.trangThai == "Chưa xử lý" && item.loaiLichHen == "WebBooking"
      );
      setSentSchedule(list);
    }
  };

  const handleSubmit = async (newItem) => {
    await Api.updateDoc("Appointment", newItem.maLichHen, newItem);
    if (newItem.trangThai == "Đã xử lý") {
      setSentSchedule(
        sentSchedules.filter((item) => item.maLichHen !== newItem.maLichHen)
      );

      if (newItem.ngay && newItem.gio) {
        await Api.addDoc("Appointment", {
          maChiNhanh: newItem.maChiNhanh,
          hoTen: newItem.hoTen,
          soDienThoai: newItem.soDienThoai,
          ngay: newItem.ngay,
          gio: newItem.gio,
          lyDoKham: newItem.lyDoKham,
          loaiLichHen: "Khám lần đầu",
          trangThai: "Chờ xác nhận",
        });
      }
    } else {
      let updatedlist = sentSchedules.map((item, idx) => {
        if (item.maLichHen !== newItem.maLichHen) return item;
        return newItem;
      });
      setSentSchedule(updatedlist);
    }
  };

  const setItemToEdit = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  return (
    <div className="container">
      <div className="col-lg-4 col-md-6">
        <div>
          <div className="mb-2">
            <b>Thời gian</b>
          </div>
          <input
            type="date"
            className="form-control pb-2 pt-2"
            defaultValue={new Date().toISOString().split("T")[0]}
          />
          <div className="text-end">
            <button
              className="btn pb-2 pt-2 ps-3 pe-3 mt-3"
              style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
            >
              Xem
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {sentSchedules.map((item, index) => {
          return (
            <div
              className="col-sm-12 col-md-9 col-lg-6 mt-4"
              style={{ fontWeight: "500" }}
            >
              <div
                className="incompleted d-flex flex-row ps-3 pe-2 pt-1 pb-1"
                style={{ width: "fit-content" }}
              >
                <div style={{ color: "#FFF" }}>{item.trangThai}</div>
                <div className="ms-2 popUp">
                  <i
                    className="fa-solid fa-ellipsis"
                    style={{ color: "white" }}
                  ></i>
                  <div
                    className="popUpContent d-flex flex-column p-3"
                    style={{ fontSize: "14px" }}
                  >
                    <div className="mb-2" style={{ color: "#FFF" }}>
                      Mã nhân viên
                    </div>
                    <div
                      className="mb-2 p-2"
                      style={{
                        width: "160px",
                        backgroundColor: "#D9D9D9",
                        height: "40px",
                        overflow: "auto",
                      }}
                    >
                      {item.MaNV}
                    </div>
                    <div className="mb-2" style={{ color: "#FFF" }}>
                      Tên nhân viên xử lý
                    </div>
                    <div
                      className="mb-2 p-2"
                      style={{
                        width: "160px",
                        backgroundColor: "#D9D9D9",
                        height: "40px",
                        overflow: "auto",
                      }}
                    >
                      {item.TenNV}
                    </div>
                    <div className="mb-2" style={{ color: "#FFF" }}>
                      Ghi chú
                    </div>
                    <div
                      className="p-2"
                      style={{
                        width: "160px",
                        backgroundColor: "#D9D9D9",
                        height: "67px",
                        overflow: "auto",
                      }}
                    >
                      {item.ghiChu}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ backgroundColor: "#D9D9D9" }}>
                <div className="container">
                  <div className="mb-2 pt-2">Họ tên</div>
                  <div className="form-control pb-2 pt-2">{item.hoTen}</div>
                  <div className="mb-2 pt-2">Email</div>
                  <div
                    className="form-control pb-2 pt-2"
                    style={{ minHeight: "40px" }}
                  >
                    {item.email}
                  </div>

                  <div className="mb-2 pt-2">Số điện thoại</div>
                  <div className="form-control pb-2 pt-2">
                    {item.soDienThoai}
                  </div>

                  <div className="mb-2 pt-2">Lý do khám</div>
                  <div className="form-control pb-2 pt-2">{item.lyDoKham}</div>

                  <div className="text-end" style={{ minHeight: "60px" }}>
                    {item.trangThai === "Chưa xử lý" ? (
                      <button
                        className="btn pb-2 pt-2 ps-3 pe-3 mb-2 mt-2"
                        style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
                        onClick={() => setItemToEdit(item)}
                      >
                        Xử lý
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {modalOpen && (
        <FormHandleSchedule
          closeModal={() => {
            setModalOpen(false);
            setSelectedItem(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={selectedItem !== null && selectedItem}
          sentSchedules={sentSchedules}
        />
      )}
    </div>
  );
};
export default IncompletedSchedule;
