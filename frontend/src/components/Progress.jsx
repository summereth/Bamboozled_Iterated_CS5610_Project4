import useQuiz from "../contexts/useQuiz";
import { ProgressBar, Container } from "react-bootstrap";

function Progress() {
  const { index, questionNum, totalPoints, points, answer } = useQuiz();

  const progressValue = ((index + Number(answer !== null)) / questionNum) * 100;

  return (
    <Container className="mb-4">
      <ProgressBar
        now={progressValue}
        variant="info"
        style={{
          height: "12px",
          backgroundColor: "var(--color-medium)",
          borderRadius: "100px",
        }}
      />
      <div className="d-flex justify-content-between mt-3">
        <p className="mb-0">
          Question <strong>{index + 1}</strong> / {questionNum}
        </p>
        <p className="mb-0">
          Score <strong>{points}</strong> / {totalPoints}
        </p>
      </div>
    </Container>
  );
}

export default Progress;
