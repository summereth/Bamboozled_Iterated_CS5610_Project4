import useQuiz from "../contexts/useQuiz";
import "./Question.css";

function Question() {
  const { questions, index, answer, dispatch } = useQuiz();
  const hasAnswer = answer !== null;
  const question = questions[index];

  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, i) => (
          <button
            className={`btn btn-option ${i === answer ? "answer" : ""} ${
              hasAnswer && i === question.correctOption
                ? "correct"
                : hasAnswer
                  ? "wrong"
                  : ""
            }`}
            key={option}
            disabled={hasAnswer}
            onClick={() => dispatch({ type: "newAnswer", payload: i })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
