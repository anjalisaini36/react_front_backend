import React, { useEffect, useState } from "react";

function Chat(props) {
  const { socket, userName, room, chatList } = props;
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState(true);
  // const [chatList, setChatList] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("clear input", message);
    // clearing the values
    setMessage("");

    if (message !== "") {
      const messageData = {
        room: room,
        author: userName,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      socket.emit("send_message", messageData);

      // socket.on("receive_message", (data) => {
      //   // setChatList((list) => [...list, messageData]);
      //   console.log("senddddddd", data);
      //   });
    }

    if (author === author) {
      console.log("sameeeeeeeeeeeee", author);
      setAuthor(false);
    }
  };
  // useEffect(()=>{
  //   if (author!==message.author) {
  //     console.log("ASDFGHJsameeeeeeeeeeeee", author)
  //     setAuthor(false)
  //   }
  //   else (
  //     setAuthor(true)
  //   )
  //   // setAuthor(false);
  // },[])

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     console.log("asasasas", data);
  //     // setChatList((list) => [...list, data]);
  //   });
  // }, [socket]);

  // socket.on("receive_message", (data) => {
  //   console.log("wewewewewe", data);
  //   // setChatList((list) => [...list, data]);
  // });

  // console.log("Socket Data :=>", socket);

  return (
    <div className="Chat">
      <h1>Welcome to the live ChatApp</h1>
      <div className="container">
        {chatList.map((listOfMessage) => {
          return (
            <>
              <div
                className={
                  userName === listOfMessage.author ? "leftbox" : "rightbox"
                }
              >
                <div
                  className={
                    userName === listOfMessage.author
                      ? "message msg_by"
                      : "message msg_to"
                  }
                >
                  <div className="message-content ">
                    {listOfMessage.message}
                  </div>
                  {/* <div className="message" >
            {listOfMessage.message}
          </div> */}
                  <div className="para">
                    {setAuthor ? (
                      <p className="author">{listOfMessage.author}</p>
                    ) : (
                      ""
                    )}
                    <p className="time">{listOfMessage.time}</p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <input
        className="input-msg "
        type="text"
        placeholder="typing here"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button className="send-btn" type="send" onClick={sendMessage}>
        send
      </button>
    </div>
  );
}

export default Chat;
