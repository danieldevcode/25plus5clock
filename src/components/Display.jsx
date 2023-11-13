import { useEffect, useState } from "react";
import "../styles/display.scss";

function Display({ session, isRunning }) {
  // function formatTime(timer) {
  //   const minutes = timer.getMinutes().toString().padStart(2, "0");
  //   const seconds = timer.getSeconds().toString().padStart(2, "0");
  //   return `${minutes}:${seconds}`;
  // }

  return (
    <div className="display">
      <div className="minute">{"2"}</div>
      <div className="minute">{"5"}</div>
      <div className="timer-info">
        <p id="timer-label">Session timer</p>
        <p id="time-left">{}</p>
      </div>
      <div className="seconds">{"00"}</div>
    </div>
  );
}

export default Display;
