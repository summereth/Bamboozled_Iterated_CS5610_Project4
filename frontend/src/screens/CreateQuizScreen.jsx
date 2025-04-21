import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { parseCSVFile, parseExcelFile } from "../utils/quizFileParser.js";
import { toast } from "react-toastify";

export default function CreateQuizScreen() {
  const [quizName, setQuizName] = useState("");
  const [quizDesc, setQuizDesc] = useState("");
  const [quizTime, setQuizTime] = useState("");
  const [hasTimer, setHasTimer] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  function handleFileChange(e) {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Check file extension
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

    try {
      // Parse file and retrieve questions
      let questions = {};
      if (fileExtension === "csv") {
        questions = await parseCSVFile(selectedFile);
      } else if (fileExtension === "xlsx" || fileExtension === "xls") {
        questions = await parseExcelFile(selectedFile);
      } else {
        toast.error("Please upload csv or xlsx file");
      }

      // Construct quizData and send req to server
      const quizData = {
        name: quizName,
        description: quizDesc,
        timeLimit: hasTimer ? quizTime : null,
        questions,
      };
      console.log("Creating quiz: ", quizData);

      const res = await fetch("/api/quiz/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
      });
      if (res.ok) toast.success("Quiz created successfully");
      else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error processing file:", error);
      toast.error(
        "Error processing file. Please check the format and try again.",
      );
    }

    navigate("/");
  }

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <h2 className="mb-4">Create New Quiz</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>Quiz Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your quiz name"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Quiz Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description of the quiz"
                value={quizDesc}
                onChange={(e) => setQuizDesc(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4 d-flex justify-content-between align-items-center">
              <Form.Check
                type="switch"
                id="timer-switch"
                label="Add a Timer"
                checked={hasTimer}
                onChange={() => setHasTimer(!hasTimer)}
                className="mb-0"
              />
            </Form.Group>

            {hasTimer && (
              <Form.Group className="mb-4">
                <Form.Label>Quiz Time (in seconds)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the quiz time"
                  value={quizTime}
                  onChange={(e) => setQuizTime(e.target.value)}
                />
              </Form.Group>
            )}

            <Form.Group className="mb-4">
              <Form.Label>Upload Questions</Form.Label>
              <div className="small text-muted mb-2">
                Download the quiz{" "}
                <a
                  href="/template.csv"
                  download
                  className="text-decoration-none"
                >
                  template
                </a>
                .
                <br />
                Please upload the file once you complete all contents.
              </div>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                accept=".csv,.xlsx"
                required
              />
            </Form.Group>

            <Row>
              <Col>
                <Button as={Link} to="/" variant="outline-secondary">
                  Back
                </Button>
              </Col>
              <Col className="text-end">
                <Button type="submit" variant="primary">
                  Create
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
