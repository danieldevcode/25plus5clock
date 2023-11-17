import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "../styles/stepper.scss";

function Stepper({ label, value, min, max, incrementValue, decrementValue, disable, }) {
  const newLabel = label.toLowerCase();

  function handleStepper({ increment }) {
    if (disable) return;
    else if (increment && value < max) incrementValue();
    else if (!increment && value > min) decrementValue();
  }

  return (
    <div className="stepper">
      <p id={`${newLabel}-label`} className="label">
        {label}
      </p>
      <div className="control">
        <button
          id={`${newLabel}-decrement`}
          className="icon"
          onClick={() => handleStepper({ increment: false })}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <p id={`${newLabel}-length`} className="value">
          {value}
        </p>
        <button
          id={`${newLabel}-increment`}
          className="icon"
          onClick={() => handleStepper({ increment: true })}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <p className="units">min</p>
    </div>
  );
}

export default Stepper;
