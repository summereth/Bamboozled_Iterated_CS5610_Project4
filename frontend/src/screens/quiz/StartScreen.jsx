import useQuiz from "../../contexts/useQuiz";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function StartScreen() {
  const { quizName, quizDescription, questionNum, dispatch } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to {quizName}</h2>
      <h3>{quizDescription}</h3>
      <h3>{questionNum} questions to test your mastery!</h3>
      <div className="d-flex justify-content-between">
        <Button as={Link} to="/" className="btn btn-ui">
          Back
        </Button>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "start" })}
        >
          Let's start!
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
