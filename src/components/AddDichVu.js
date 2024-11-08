import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function AddDichVu(props) {
    const [maDichVu, setmaDichVu] = useState('');
    const [tenDichVu, settenDichVu] = useState('');
    const [giaDichVu, setgiaDichVu] = useState('');
    const [baoHanh, setbaoHanh] = useState('');
    const [coTraGop, setcoTraGop] = useState('');
    
    const [show, setShow] = useState(props.show);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button
                onClick={props.toggleShow}
                className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
                Thêm
            </button>

            <Modal
                show={props.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm dịch vụ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setmaDichVu('');
                            settenDichVu('');
                            setgiaDichVu('');
                            setbaoHanh('');
                            setcoTraGop('');
                            props.newCustomer(maDichVu, tenDichVu, giaDichVu, baoHanh, coTraGop);
                        }}
                        id="editmodal"
                        className="w-full max-w-sm"
                    >
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    for="maDichVu"
                                >
                                    Mã dịch vụ
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="maDichVu"
                                    placeholder="mã dịch vụ"
                                    type="text"
                                    value={maDichVu}
                                    onChange={(e) => {
                                        setmaDichVu(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    for="tenDichVu"
                                >
                                    Tên dịch vụ
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="tenDichVu"
                                    placeholder="tên dịch vụ"
                                    type="text"
                                    value={tenDichVu}
                                    onChange={(e) => {
                                        settenDichVu(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    for="giaDichVu"
                                >
                                    Giá dịch vụ
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="giaDichVu"
                                    placeholder="giá dịch vụ"
                                    type="number"
                                    value={giaDichVu}
                                    onChange={(e) => {
                                        giaDichVu(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    for="baoHanh"
                                >
                                    Bảo hành
                                </label>
                            </div>
                            <div className="md:w-2/3">
                            <select 
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="baoHanh"
                                value={baoHanh}
                                onChange={(e) => {
                                    baoHanh(e.target.value);
                                }}
                            >
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    for="coTraGop"
                                >
                                    Trả góp
                                </label>
                            </div>
                            <div className="md:w-2/3">
                            <select 
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="coTraGop"
                                value={coTraGop}
                                onChange={(e) => {
                                    coTraGop(e.target.value);
                                }}
                            >
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="graycolor bg-gray hover:bg-gray text-black font-bold py-2 px-4 rounded"
                        onClick={props.toggleShow}
                    >
                        Hủy
                    </button>
                    <button
                        className="bluecolor hover:bg-blue text-white font-bold py-2 px-4 rounded"
                        form="editmodal"
                    >
                        Lưu
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
