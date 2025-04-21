import { Card, Button } from "react-bootstrap";
import {
  BsQuestionCircleFill,
  BsTrophyFill,
  BsPencilFill,
  BsTrashFill,
} from "react-icons/bs";

export default function QuizCard({
  title,
  description,
  questionNum,
  highestScore,
  totalPoints,
  onEdit,
  onDelete,
  quizId,
}) {
  // Prevent clicks on buttons from triggering the card link
  const handleButtonClick = (e, callback) => {
    e.preventDefault();
    e.stopPropagation();
    callback(quizId);
  };

  return (
    <Card className="my-4 p-2 rounded">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <Card.Title className="fw-bold">{title}</Card.Title>
          <div>
            <Button
              variant="outline-primary rounded"
              size="sm"
              className="me-2"
              onClick={(e) => handleButtonClick(e, onEdit)}
            >
              <BsPencilFill size={14} />
            </Button>
            <Button
              variant="outline-danger rounded"
              size="sm"
              onClick={(e) => handleButtonClick(e, onDelete)}
            >
              <BsTrashFill size={14} />
            </Button>
          </div>
        </div>
        <Card.Text className="text-muted small mt-3">
          {description || "Quiz Description"}
        </Card.Text>
        <div className="d-flex mt-3">
          <div className="me-3">
            <span className="d-flex align-items-center">
              <BsQuestionCircleFill className="text-secondary me-2" size={12} />
              <small>{questionNum} questions</small>
            </span>
          </div>
          <div>
            <span className="d-flex align-items-center">
              <BsTrophyFill className="text-warning me-2" size={12} />
              <small>
                Highest Score: {highestScore || "-"}/{totalPoints}
              </small>
            </span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
