import React, { useState } from "react";
import '../views/mistyles.css'
// import bot from '/images/bot.png';

const Chatbot = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible); // Thay đổi trạng thái hiển thị
  };
  // State to store messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Timona Siera",
      time: "23 Jan 2:00 pm",
      text: "For what reason would it be advisable for me to think about business content?",
      align: "left",
      img: "https://img.icons8.com/color/36/000000/administrator-male.png",
    },
    {
      id: 2,
      name: "Sarah Bullock",
      time: "23 Jan 2:05 pm",
      text: "Thank you for your believe in our supports",
      align: "right",
      img: "https://img.icons8.com/office/36/000000/person-female.png",
    },
  ]);

  // State to handle input
  const [newMessage, setNewMessage] = useState("");

  // Function to handle sending new messages
  const handleSend = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: messages.length + 1,
      name: "You",
      time: new Date().toLocaleTimeString(),
      text: newMessage,
      align: "right",
      img: "https://img.icons8.com/color/36/000000/user.png",
    };

    setMessages([...messages, newMsg]); // Add new message to the state
    setNewMessage(""); // Clear the input
  };

  return (
    <div style={{ position: "fixed", bottom: "100px", right: "30px" }}>
       {isChatbotVisible && <div className="chat-container">
      <div className="chat-box">
        <div className="chat-header">
          <h3>Chat Messages</h3>
          <div className="chat-tools">
            <span className="badge bg-yellow">20</span>
            <button className="btn btn-tool" onClick={toggleChatbot} >
              <i className="fa fa-times"></i>
            </button>
          </div>
        </div>
        <div className="chat-body">
          <div className="chat-messages">
            {messages.map((message, id) => (
              <div
                key={id}
                className={`chat-message ${
                  message.align === "right" ? "right" : ""
                }`}
              >
                {message.align==="right"?
                 <div className="chat-text">{message.text}</div>:
                 <div style={{display:'flex'}}>
                 <img
                    className="chat-img"
                    src={"/images/bot.png"}
                    alt="message user"
                  />
                  <div className="chat-text">{message.text}</div>
                 </div>
                }
              </div>
            ))}
          </div>
        </div>
        <div className="chat-footer">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type Message ..."
            />
            <button className="btn btn-warning" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>}
     <button
          className="circle-button"
          style={{
            backgroundImage: `url("/images/bot.png")`,
          }}
          onClick={toggleChatbot} 
        ></button>
    </div>
  );
};

export default Chatbot;
