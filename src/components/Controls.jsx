import "../styles/controls.scss";
import Stepper from "./Stepper";
import Button from "./Button";
import { faRotate, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

function Controls({
  session,
  setSession,
  isRunning,
  toggleIsRunning,
  resetTimer,
}) {
  function setValue({ key, increment }) {
    setSession((prevSession) => {
      return {
        ...prevSession,
        [key]: increment ? prevSession[key] + 1 : prevSession[key] - 1,
      };
    });
  }

  return (
    <div className="controls">
      <Stepper
        label="Break"
        value={session.break}
        min={1}
        max={60}
        incrementValue={() => setValue({ key: "break", increment: true })}
        decrementValue={() => setValue({ key: "break", increment: false })}
        disable={isRunning}
      />
      <Stepper
        label="Session"
        value={session.session}
        min={1}
        max={60}
        incrementValue={() => setValue({ key: "session", increment: true })}
        decrementValue={() => setValue({ key: "session", increment: false })}
        disable={isRunning}
      />
      <div className="buttons">
        <Button
          id="reset"
          className="reset"
          icon={faRotate}
          iconSize="lg"
          onClick={resetTimer}
        />
        <Button
          id="start_stop"
          icon={isRunning ? faPause : faPlay}
          onClick={toggleIsRunning}
        />
      </div>
    </div>
  );
}

export default Controls;
