import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import SearchBox from "./SearchBox";

export default function Header() {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/" || pathname.startsWith("/search");

  return (
    <Navbar bg="light" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          <span className="d-flex align-items-center">
            <img
              className="me-2"
              src="/icon.png"
              alt="Icon of Bamboozled"
              style={{ width: "30px", height: "30px" }}
            />
            Bamboozled
          </span>
        </Navbar.Brand>
        <div className="d-flex align-items-center">
          {isHomePage && <SearchBox />}
          {isHomePage && (
            <Button
              aria-label="Create a quiz"
              as={Link}
              to="/create"
              className="ms-3 rounded-pill"
              style={{
                color: "var(--color-darkest)",
                border: "var(--color-theme) solid 2px",
                backgroundColor: "var(--color-theme)",
              }}
            >
              Create a Quiz
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
}
