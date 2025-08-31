 import React, { useState } from "react";

import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import StudentDetails from "./components/StudentDetails";
import Login from "./components/Login";
 

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout=()=>{
    setLoggedIn(false);
  }
  return (
    <BrowserRouter>
      <div className="container">
        <header>
          <h1>Student Management System</h1>
          {loggedIn && (
            <nav>
              <Link to="/">Home</Link>
              <Link to="/add">Add Student</Link>
              <Link style={{ marginLeft: "1rem" }} onClick={handleLogout}>
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
               
              </>
            )}
          </Routes>
        </main>
        <footer>
          <p>Built with React + Vite</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
