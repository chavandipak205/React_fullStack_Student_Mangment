 import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import StudentDetails from "./components/StudentDetails";
import Login from "./components/Login";
import About from "./components/About";
import Contact from "./components/Contact";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate(); // ✅ useNavigate instead of useHistory

  const handleLogin = () => {
    setLoggedIn(true);
    navigate("/"); // ✅ Always go to Home after login
  };

  const handleLogout = () => {
    setLoggedIn(false);
    navigate("/login"); // ✅ Send to login page on logout
  };

  return (
    <div className="container">
      <header>
        <h1>Student Management System</h1>
        {loggedIn && (
          <nav>
            <Link to="/">Home</Link>
            <Link to="/add">Add Student</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link style={{ marginLeft: "1rem" }} onClick={handleLogout} >
              Logout
            </Link>
          </nav>
        )}
      </header>

      <main>
        <Routes>
          {!loggedIn && (
            <Route path="/*" element={<Login onLogin={handleLogin} />} />
          )}

          {loggedIn && (
            <>
              <Route path="/" element={<StudentList />} />
              <Route path="/add" element={<StudentForm />} />
              <Route path="/edit/:id" element={<StudentForm />} />
              <Route path="/students/:id" element={<StudentDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}
