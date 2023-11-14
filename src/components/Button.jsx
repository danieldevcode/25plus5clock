import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/button.scss";

function Button({ id, icon, iconSize = "2x", onClick, className }) {
  return (
    <button
      id={id}
      className={className ? `button ${className}` : "button"}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} size={iconSize} />
    </button>
  );
}

export default Button;
