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
      // Increment
      if (increment && prevSession[key] + 1 <= 60)
        return {
          ...prevSession,
          [key]: prevSession[key] + 1,
        };
      // Decrement
      else if (!increment && prevSession[key] - 1 > 0)
        return {
          ...prevSession,
          [key]: prevSession[key] - 1,
        };
      // Can't change
      else return prevSession;
    });
  }

  return (
    <div className="controls">
      <Stepper
        label="Break"
        value={session.break}
        setValue={setValue}
        disable={isRunning}
      />
      <Stepper
        label="Session"
        value={session.session}
        setValue={setValue}
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
