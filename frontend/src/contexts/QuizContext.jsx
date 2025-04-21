import { createContext, useCallback, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import useLocalStorageState from "../hooks/useLocalStorageState.js";

const QuizContext = createContext();

const initialState = {
  quizName: "",
  quizDescription: "",
  questionNum: 0,
  totalPoints: 0,
  questions: [],
  highestScore: null,
  hasTimer: false,
  secondsRemaining: 0,
  status: "loading", // status: loading, error, ready, active, finished
  index: 0, // index of current question in questions
  answer: null, // user's answer to current question (questions[index])
  points: 0, // points earned so far
};

function QuizProvider({ children }) {
  const [highestScores, setHighestScores] = useLocalStorageState(
    {},
    "highestScores",
  );
  const { id: quizId } = useParams();

  const reducer = useCallback(
    (state, action) => {
      switch (action.type) {
        case "dataDownloaded": {
          return {
            ...state,
            quizName: action.payload.name,
            quizDescription: action.payload.description,
            questionNum: action.payload.questionNum,
            questions: action.payload.questions,
            totalPoints: action.payload.totalPoints,
            highestScore: action.payload.highestScore,
            hasTimer: Boolean(action.payload.timeLimit),
            secondsRemaining: action.payload.timeLimit || 0,
            status: "ready",
          };
        }
        case "dataFailed": {
          return { ...state, status: "error" };
        }
        case "start": {
          return { ...state, status: "active" };
        }
        case "newAnswer": {
          const question = state.questions[state.index];

          return {
            ...state,
            answer: action.payload,
            points:
              state.points +
              (question.correctOption === action.payload ? question.points : 0),
          };
        }
        case "nextQuestion": {
          // Case when user has answered all questions
          if (state.index === state.questionNum - 1) {
            // update highest score in localStorage
            if (!state.highestScore || state.points > state.highestScore) {
              setHighestScores((prev) => ({ ...prev, [quizId]: state.points }));
            }
            // set status to finished and return updated highestScore
            return {
              ...state,
              status: "finished",
              highestScore:
                state.points > state.highestScore
                  ? state.points
                  : state.highestScore,
            };
          }

          // Otherwise, increment index and reset answer
          return {
            ...state,
            index: state.index + 1,
            answer: null,
          };
        }
        case "tick": {
          if (!state.hasTimer) return state;

          // Case when time up
          if (state.secondsRemaining === 0) {
            // update highest score in localStorage
            if (!state.highestScore || state.points > state.highestScore) {
              setHighestScores((prev) => ({ ...prev, [quizId]: state.points }));
            }
            // set status to finished and return updated highestScore
            return {
              ...state,
              status: "finished",
              highestScore:
                state.points > state.highestScore
                  ? state.points
                  : state.highestScore,
            };
          }
          // Otherwise decrement secondsRemaining
          return { ...state, secondsRemaining: state.secondsRemaining - 1 };
        }
        default:
          throw new Error("Unknown action in reducer of QuizContext");
      }
    },
    [quizId, setHighestScores],
  );

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    quizName,
    quizDescription,
    questionNum,
    questions,
    totalPoints,
    highestScore,
    hasTimer,
    secondsRemaining,
    status,
    index,
    answer,
    points,
  } = state;

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await fetch(`/api/quiz/${quizId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        dispatch({
          type: "dataDownloaded",
          payload: { ...data, highestScore: highestScores[data._id] || null },
        });
      } catch (error) {
        dispatch({ type: "dataFailed", payload: error });
      }
    }

    if (quizId) fetchQuiz();
  }, [quizId, highestScores]);

  return (
    <QuizContext.Provider
      value={{
        quizName,
        quizDescription,
        questionNum,
        questions,
        totalPoints,
        highestScore,
        hasTimer,
        secondsRemaining,
        status,
        index,
        answer,
        points,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizProvider, QuizContext };
