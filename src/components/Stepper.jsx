import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "../styles/stepper.scss";

function Stepper({ value, label, setValue, disable }) {
  const newLabel = label.toLowerCase();

  return (
    <div className="stepper">
      <div className="control">
        <button
          id={`${newLabel}-decrement`}
          className="icon"
          onClick={
            disable ? null : () => setValue({ key: newLabel, increment: false })
          }
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <p id={`${newLabel}-length`} className="value">
          {value}
        </p>
        <button
          id={`${newLabel}-increment`}
          className="icon"
          onClick={
            disable ? null : () => setValue({ key: newLabel, increment: true })
          }
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <p id={`${newLabel}-label`} className="label">
        {label}
      </p>
    </div>
  );
}

export default Stepper;
