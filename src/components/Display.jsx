import "../styles/display.scss";

function Display({ timer, labelRef }) {
  function formatTime(timer) {
    const minutes = timer.getMinutes().toString().padStart(2, "0");
    const seconds = timer.getSeconds().toString().padStart(2, "0");
    return {
      timer: `${minutes}:${seconds}`,
      minutes,
      seconds,
    };
  }

  return (
    <div className="display">
      <div className="minute">{formatTime(timer).minutes[0]}</div>
      <div className="minute">{formatTime(timer).minutes[1]}</div>
      <div className="timer-info">
        <p ref={labelRef} id="timer-label">
          Session
        </p>
        <p id="time-left">{formatTime(timer).timer}</p>
      </div>
      <div className="seconds">{formatTime(timer).seconds}</div>
    </div>
  );
}

export default Display;
