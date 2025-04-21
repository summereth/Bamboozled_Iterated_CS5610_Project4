import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import CreateQuizScreen from "./screens/CreateQuizScreen.jsx";
import QuizScreen from "./screens/QuizScreen.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QuizProvider } from "./contexts/QuizContext.jsx";
import "./index.css";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/search/:keyword" element={<HomeScreen />} />
          <Route path="/create" element={<CreateQuizScreen />} />
          <Route
            path="/quiz/:id"
            element={
              <QuizProvider>
                <QuizScreen />
              </QuizProvider>
            }
          />
        </Routes>
      </main>
      <ToastContainer />
    </Router>
  );
}

export default App;
