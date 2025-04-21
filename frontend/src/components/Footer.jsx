import { useEffect } from "react";
import useQuiz from "../contexts/useQuiz";
import { Container } from "react-bootstrap";
import "./Footer.css";

function Footer() {
  const { answer, index, questionNum, hasTimer, secondsRemaining, dispatch } =
    useQuiz();

  const hours = Math.floor(secondsRemaining / 3600);
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining - mins * 60;

  useEffect(() => {
    if (hasTimer) {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    }
  }, [dispatch, hasTimer]);

  return (
    <Container className="d-flex justify-content-between mt-3">
      {hasTimer && (
        <div className="timer">
          {hours < 10 ? `0${hours}` : hours}:{mins < 10 ? `0${mins}` : mins}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </div>
      )}
      {answer !== null && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          {index < questionNum - 1 ? "Next" : "Submit"}
        </button>
      )}
    </Container>
  );
}

export default Footer;
