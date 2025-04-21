import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import { useEffect, useState, useCallback } from "react";
import Loader from "../components/Loader.jsx";
import { toast } from "react-toastify";
import useLocalStorageState from "../hooks/useLocalStorageState.js";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [highestScores] = useLocalStorageState({}, "highestScores");
  const { keyword } = useParams();

  // for edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editQuizId, setEditQuizId] = useState(null);
  const [editQuizName, setEditQuizName] = useState("");
  // for delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteQuizId, setDeleteQuizId] = useState(null);

  const fetchQuizzes = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/quiz${keyword ? `?keyword=${keyword}` : ""}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch quizzes");
      }
      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      console.error("[HomeScreen] Error fetching quizzes: ", error);
      toast.error("An error occurred while fetching quizzes: " + error.message);
      setError(error.message || "An error occurred while fetching quizzes");
    } finally {
      setIsLoading(false);
    }
  }, [keyword]);

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  const handleClickEditButton = (quizId) => {
    const quiz = quizzes.find((quiz) => quiz._id === quizId);
    if (quiz) {
      setEditQuizId(quiz._id);
      setEditQuizName(quiz.name);
      setShowEditModal(true);
    }
  };

  const handleClickDeleteButton = (quizId) => {
    const quiz = quizzes.find((quiz) => quiz._id === quizId);
    if (quiz) {
      setDeleteQuizId(quiz._id);
      setShowDeleteModal(true);
    }
  };

  const confirmEdit = async () => {
    try {
      const response = await fetch(`/api/quiz/${editQuizId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editQuizName }),
      });
      if (!response.ok) {
        throw new Error("Failed to update quiz");
      }
      toast.success("Quiz updated successfully");
      setShowEditModal(false);
      fetchQuizzes();
    } catch (error) {
      console.error("[HomeScreen] Error updating quiz: ", error);
      toast.error(
        "An error occurred while updating the quiz: " + error.message,
      );
    }
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/quiz/${deleteQuizId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete quiz");
      }
      toast.success("Quiz deleted successfully");
      setShowDeleteModal(false);
      fetchQuizzes();
    } catch (error) {
      console.error("[HomeScreen] Error deleting quiz: ", error);
      toast.error(
        "An error occurred while deleting the quiz: " + error.message,
      );
    }
  };

  return (
    <Container className="py-4">
      {isLoading ? (
        <Loader />
      ) : (
        !error && (
          <Row>
            {quizzes.map((quiz) => (
              <Col key={quiz._id} sm={12} md={6} lg={4} xl={4}>
                <Link
                  to={`/quiz/${quiz._id}`}
                  className="text-decoration-none text-dark"
                >
                  <QuizCard
                    title={quiz.name}
                    description={quiz.description}
                    questionNum={quiz.questionNum}
                    highestScore={highestScores[quiz._id] || undefined}
                    totalPoints={quiz.totalPoints}
                    quizId={quiz._id}
                    onEdit={handleClickEditButton}
                    onDelete={handleClickDeleteButton}
                  />
                </Link>
              </Col>
            ))}
          </Row>
        )
      )}

      {/* Edit Quiz Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Quiz Name</Form.Label>
              <Form.Control
                type="text"
                value={editQuizName}
                onChange={(e) => setEditQuizName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this quiz? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete Quiz
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
