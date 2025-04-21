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
            // Ensure keyboard accessibility
            tabIndex="0"
            onKeyDown={(e) => {
              // Trigger click on Enter or Space key
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (!hasAnswer) {
                  dispatch({ type: "newAnswer", payload: i });
                }
              }
            }}
            aria-pressed={i === answer}
            aria-disabled={hasAnswer}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
