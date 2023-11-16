import "./styles/app.scss";
import Display from "./components/Display";
import Controls from "./components/Controls";
import { useState, useEffect, useRef } from "react";

function App() {
  const defaultSession = { break: 5, session: 25 };
  const [session, setSession] = useState(defaultSession);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [isBreak, setIsBreak] = useState(false);
  const [timer, setTimer] = useState(newTimer(session.session));
  const labelRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(
    function initializeTimer() {
      setTimer(newTimer(session.session));
    },
    [session]
  );

  useEffect(
    function handleTimer() {
      if (isRunning && (isSession || isBreak)) {
        const time = new Date();
        time.setMinutes(time.getMinutes() + timer.getMinutes());
        time.setSeconds(time.getSeconds() + timer.getSeconds() + 1);
        time.setMilliseconds(time.getMilliseconds() + timer.getMilliseconds());

        const timerInterval = setInterval(() => runTimer(time.getTime()), 1000);
        return () => clearInterval(timerInterval);
      }
    },
    [isRunning, isBreak]
  );

  function runTimer(durationTime) {
    const currentTime = new Date().getTime();
    const difference = durationTime - currentTime;
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    console.log(minutes, seconds);

    if (minutes == 0 && seconds == 0) {
      audioRef.current.play()
      if (isSession) {
        console.log("Toggle to Break");
        setIsSession(false);
        setIsBreak(true);
        setTimer(() => newTimer(session.break));
        labelRef.current.textContent = "Break";
      } else if (isBreak) {
        console.log("Toggle to Session");
        setIsSession(true);
        setIsBreak(false);
        setTimer(() => newTimer(session.session));
        labelRef.current.textContent = "Session";
      }
    } else setTimer(() => newTimer(minutes, seconds));
  }

  function newTimer(minutes = 0, seconds = 0, milliseconds = 0) {
    const newTimer = new Date();
    newTimer.setMinutes(minutes, seconds, milliseconds);
    return newTimer;
  }

  function resetTimer() {
    audioRef.current.pause()
    audioRef.current.fastSeek(0)
    labelRef.current.textContent= "Session"
    setIsRunning(false);
    setTimer(newTimer(session.session));
    setSession(defaultSession);
  }

  function toggleIsRunning() {
    setIsRunning((prev) => !prev);
  }

  return (
    <div className="app">
      <Display timer={timer} labelRef={labelRef} />
      <Controls
        session={session}
        setSession={setSession}
        isRunning={isRunning}
        toggleIsRunning={toggleIsRunning}
        resetTimer={resetTimer}
      />
      <audio id="beep" ref={audioRef} src="/beep.wav"></audio>
    </div>
  );
}

export default App;
