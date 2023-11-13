import "../styles/controls.scss";
import Stepper from "./Stepper";
import Button from "./Button";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

function Controls({ session, setSession, isRunning, setIsRunning }) {
  function setValue({ key, increment }) {
    setSession((prevSession) => {
      return {
        ...prevSession,
        [key]: increment ? prevSession[key] + 1 : prevSession[key] - 1,
      };
    });
  }

  function toggleIsRunning() {
    setIsRunning((prev) => !prev);
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
      <Button
        id="start_stop"
        icon={isRunning ? faPause : faPlay}
        onClick={toggleIsRunning}
      />
    </div>
  );
}

export default Controls;
