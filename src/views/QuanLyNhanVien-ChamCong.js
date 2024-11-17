import moment from "moment"
import { useState } from "react"
const ChamCong = () => {
    const [BANGCHAMCONG, setBANGCHAMCONG] = useState([
        {
            maNhanVien: "NV021",
            tenNhanVien: "Hoàng Ngọc Mai",
            Ngay: "2023-12-11",
            SoGioLam: "5"
        },
        {
            maNhanVien: "NV121",
            tenNhanVien: "Lê Ngọc Bảo Ngân",
            Ngay: "2023-12-11",
            SoGioLam: "10"
        }

    ])
    const handleChange = (e, row) => {
        setBANGCHAMCONG(
            BANGCHAMCONG.map((itm) =>
                (itm.Ngay === row.Ngay && itm.SoGioLam === row.SoGioLam) ? {
                    ...itm, SoGioLam: e.target.value
                }
                    : itm
            ))
    }
    return (
        <div>
            <div className="col-lg-4 col-md-6 mt-2">
                <input type="date" className="form-control pb-2 pt-2" id="Ngay" name="Ngay" max={moment().format('YYYY-MM-DD')} />
                <div className="text-end">
                    <button type="submit" className="btn pb-2 pt-2 mt-2" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}>Xem</button>
                </div>
            </div>
            <table className="table" >
                <thead>
                    <tr className="table-secondary">
                        <th>Mã nhân viên</th>
                        <th>Họ và tên</th>
                        <th>Số giờ làm</th>
                    </tr>
                </thead>
                {BANGCHAMCONG.map((row, idx) => {
                    return (
                        <tr>
                            <td>{row.maNhanVien}</td>
                            <td>{row.tenNhanVien}</td>
                            <td>
                                <input className="signature" type="text" value={row.SoGioLam} onChange={(e) => handleChange(e, row)} />
                            </td>
                        </tr>
                    );
                })}
                <tbody>

                </tbody>
            </table>
            <div className="text-end">
                <button type="submit" className="btn pb-2 pt-2 mt-2" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}>
                    Lưu
                </button>
            </div>
        </div>

    )
}
export default ChamCong