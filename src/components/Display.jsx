import "../styles/display.scss";

function Display({ timer, labelRef }) {
  function formatTime(timer) {
    const minutes = timer.minutes.toString().padStart(2, "0");
    const seconds = timer.seconds.toString().padStart(2, "0");
    return {
      timer: `${minutes}:${seconds}`,
      minutes,
      seconds,
    };
  }

  return (
    <div className="display">
      <div className="timer-info">
        <p ref={labelRef} id="timer-label">
          Session
        </p>
        <p id="time-left">{formatTime(timer).timer}</p>
      </div>
      <div className="card">
        <p className="number">{formatTime(timer).minutes[0]}</p>
      </div>
      <div className="card">
        <p className="number">{formatTime(timer).minutes[1]}</p>
      </div>
      <div className="colon">:</div>
      <div className="card">
        <p className="number">{formatTime(timer).seconds[0]}</p>
      </div>
      <div className="card">
        <p className="number">{formatTime(timer).seconds[1]}</p>
      </div>
    </div>
  );
}

export default Display;
