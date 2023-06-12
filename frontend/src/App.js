import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showchat, setShowchat] = useState(false);
  const [chatList, setChatList] = useState([]);

  const socket = io.connect(`https://chat-backend-psi.vercel.app/`);
  

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     console.log("asasasas", data);
  //     setChatList((list) => [...list, data]);
  //   });
  // }, [socket]);

  socket.on("receive_message", (data) => {
    console.log("I am working", data);
    setChatList((list) => [...list, data]);
  });

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room.toString());
      setShowchat(true);
    }
  };
  return ( 
    <div className="App">
      {!showchat ? (
        <>
          <h1>Join the Chat</h1>
          <div>
            <input
              className="input-msg  "
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              className="input-msg "
              type="text"
              placeholder="Room Id"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              className="join-btn"
              type="submit"
              onClick={(e) => joinRoom()}
            >
              Join
            </button>
          </div>
        </>
      ) : (
        <Chat
          chatList={chatList}
          socket={socket}
          userName={userName}
          room={room}
        />
      )}
    </div>
  );
}

export default App;
