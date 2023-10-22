import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div>
      <Button type="back" onClick={handleClick}>
        &larr; Back
      </Button>
    </div>
  );
}

export default BackButton;
