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
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });
  const timerRef = useRef({});
  const labelRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(
    function initializeTimer() {
      updateTimer(session.session);
    },
    [session]
  );

  useEffect(
    function handleTimer() {
      if (isRunning && (isSession || isBreak)) {
        const timerInterval = setInterval(() => runTimer(timerInterval), 1000);
        return () => clearInterval(timerInterval);
      }
    },
    [isRunning, isBreak, isSession]
  );

  function runTimer(timerInterval) {
    const { minutes: timerMin, seconds: timerSecs } = timerRef.current;
    const duration = timerMin * 60 + timerSecs; // timer(m) * (1m = 60s) + timer(s) = duration(s)
    const remaining = duration - 1; // duration(s) - (1s)
    const minutes = Math.floor(remaining / 60); // (m)
    const seconds = remaining % 60; // (s)
    updateTimer(minutes, seconds);

    if (minutes == 0 && seconds == 0) {
      clearInterval(timerInterval);
      audioRef.current.play();
      setTimeout(() => {
        if (isSession) toggleTimer(session.break);
        else if (isBreak) toggleTimer(session.session);
      }, 1000);
    }
  }

  function updateTimer(minutes = 0, seconds = 0) {
    const time = { minutes, seconds };
    setTimer(time);
    timerRef.current = time;
  }

  function toggleTimer(time) {
    labelRef.current.textContent = isSession ? "Break" : "Session";
    setIsSession((prev) => !prev);
    setIsBreak((prev) => !prev);
    updateTimer(time);
  }

  function resetTimer() {
    audioRef.current.pause();
    audioRef.current.fastSeek(0);
    labelRef.current.textContent = "Session";
    setIsRunning(false);
    updateTimer(session.session);
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
