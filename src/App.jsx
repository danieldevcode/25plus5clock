import "./styles/app.scss";
import Display from "./components/Display";
import Controls from "./components/Controls";
import { useState, useEffect } from "react";

function App() {
  const defaultSession = { break: 5, session: 25 };
  const [session, setSession] = useState(defaultSession);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [isBreak, setIsBreak] = useState(false);
  const [timer, setTimer] = useState(newTimer(session.session));

  useEffect(
    function initializeTimer() {
      setTimer(newTimer(session.session));
      // setTimer(newTimer(0, 3));
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
      if (isSession) {
        console.log("Toggle to Break");
        setIsSession(false);
        setIsBreak(true);
        setTimer(() => newTimer(session.break));
      } else if (isBreak) {
        console.log("Toggle to Session");
        setIsSession(true);
        setIsBreak(false);
        setTimer(() => newTimer(session.session));
      }
    } else setTimer(() => newTimer(minutes, seconds));
  }

  function newTimer(minutes = 0, seconds = 0, milliseconds = 0) {
    const newTimer = new Date();
    newTimer.setMinutes(minutes, seconds, milliseconds);
    return newTimer;
  }

  function resetTimer() {
    setIsRunning(false);
    setTimer(newTimer(session.session));
    setSession(defaultSession);
  }

  function toggleIsRunning() {
    setIsRunning((prev) => !prev);
  }

  return (
    <div className="app">
      <Display timer={timer} />
      <Controls
        session={session}
        setSession={setSession}
        isRunning={isRunning}
        toggleIsRunning={toggleIsRunning}
        resetTimer={resetTimer}
      />
    </div>
  );
}

export default App;
