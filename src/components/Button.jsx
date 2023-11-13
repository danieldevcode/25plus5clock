import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/button.scss";

function Button({ id, icon, onClick }) {
  return (
    <button id={id} className="button" onClick={onClick}>
      <FontAwesomeIcon icon={icon} size="2x" />
    </button>
  );
}

export default Button;
