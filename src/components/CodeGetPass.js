import React from "react";
import ResetPassword from "./ResetPassword";
import { useState, useContext } from "react";
import { AuthContext } from '../hook/AuthProvider.js'
import Api from "../api/Api.js";
import CustomModal from '../components/MessageBox.js';

function CodeGetPass(props) {
    const {user} = useContext(AuthContext);
    const [showDialog, setShowDialog] = useState(false);
    const [ndshow, setNdshow] = useState('');
    const handleShowDialog = (body) => {
      setNdshow(body)
      setShowDialog(true);
    };
  
    const handleCloseDialog = () => {
      setShowDialog(false);
    };
    const [reset, setReset] = useState(false);
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const updatePass = async()=>{
        if(pass1 != pass2){
            handleShowDialog("Mật khẩu nhắc lại không đúng, vui lòng kiểm tra lại!")
            return;
        }
        const res = await Api.updatePass({Email:props.email,MatKhau:pass1})
        if(res.message != undefined){
            handleShowDialog(res?.message)
            return;
        }
        else{
            props.setTrigger(false); 
            props.alert("Chúc mừng bạn đã cập nhật mật khẩu thành công")
            
        }
    }
    return (props.trigger) ? (
        <div className="modal-container">
            <div className="popup-inner">

                {props.children}
                <button className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" onClick={() => { 
    const res = props.verify();
    if (res) {
      setReset(true); 
    }
  }}>
                    Xác nhận
                </button>
                {reset && (
                    <ResetPassword trigger={props.trigger} 
                    setTrigger={props.setTrigger}  updatePass={()=>updatePass()}>
                        <div className="mb-3 mt-3 col-10">
                            <input type="text" className="form-control pb-3 pt-3" id="newpassword" name="newpassword" placeholder="Mật khẩu mới" onInvalid={e => e.target.setCustomValidity('Mời bạn nhập mật khẩu mỡi')} onInput={e => e.target.setCustomValidity('')} required onChange={(e) => setPass1(e.target.value)}/>
                            <br></br>
                            <input type="text" className="form-control pb-3 pt-3" id="comfirmpassword" name="comfirmpassword" placeholder="Xác thực mật khẩu mới" onInvalid={e => e.target.setCustomValidity('Mời bạn nhập xác thực mật khẩu')} onInput={e => e.target.setCustomValidity('')} required onChange={(e) => setPass2(e.target.value)} />
                        </div>
                    </ResetPassword>
                )}
            </div>
            <CustomModal
        show={showDialog}
        handleClose={handleCloseDialog}
        body={ndshow}
      />
        </div>
        
    ) : ""
}
export default CodeGetPass;