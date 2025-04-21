import useQuiz from "../../contexts/useQuiz";
import { Link } from "react-router-dom";

function ResultScreen() {
  const { points, totalPoints, highestScore } = useQuiz();
  const percentage = Math.ceil((points / totalPoints) * 100);
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {totalPoints} ({percentage}
        %)
      </p>
      <p className="highscore">(Highscore: {highestScore} points)</p>
      <Link to="/">
        <button className="btn btn-ui">Finish</button>
      </Link>
    </>
  );
}

export default ResultScreen;
