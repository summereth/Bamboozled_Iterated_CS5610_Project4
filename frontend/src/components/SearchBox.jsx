import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const path = location.pathname;
    let urlKeyword = "";
    if (path.startsWith("/search/")) {
      urlKeyword = path.split("/search/")[1];
    }
    setKeyword(urlKeyword);
  }, [location]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        placeholder="Search quiz..."
        value={keyword}
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5"
      />
      <Button type="submit" variant="outline-dark" className="mx-2 p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
