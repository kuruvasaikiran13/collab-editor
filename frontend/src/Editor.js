import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Editor() {

  const [text,setText] = useState("");

  useEffect(()=>{
    socket.on("receive-changes",(data)=>{
      setText(data);
    });
  },[])

  function handleChange(e){
    setText(e.target.value);
    socket.emit("send-changes",e.target.value);
  }

  return(
    <textarea
      value={text}
      onChange={handleChange}
      style={{width:"100%",height:"400px"}}
    />
  )
}

export default Editor;