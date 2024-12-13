const AppointmentToolTip = (props) => {
  const { targetedAppointmentData } = props.data;
  return (
    <div className="d-flex p-3">
      <div
        className="col-auto"
        style={{
          backgroundColor: `${targetedAppointmentData.color}`,
          height: "28px",
          width: "28px",
          borderRadius: "50%",
        }}
      ></div>
      <div style={{ textAlign: "left" }} className="ms-3">
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>
          {targetedAppointmentData.DichVu}
        </div>
        <div style={{ fontSize: "13px", color: "#8A8A8A" }}>
          {targetedAppointmentData.Gio}
        </div>
        <div className="mt-2">
          <span style={{ fontWeight: "500" }}>Nha sĩ:</span>{" "}
          {targetedAppointmentData.TenNS}
        </div>
        <div className="mt-1">
          <span style={{ fontWeight: "500" }}>Bệnh nhân:</span>{" "}
          {targetedAppointmentData.TenBN}
        </div>
        <div className="mt-1 wordWrap">
          <span style={{ fontWeight: "500" }}>Ghi chú:</span>{" "}
          {targetedAppointmentData.GhiChu}
        </div>
      </div>
    </div>
  );
};
export default AppointmentToolTip;
