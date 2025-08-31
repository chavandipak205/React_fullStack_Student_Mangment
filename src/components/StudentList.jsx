import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this student?")) return;
    try {
      await api.delete(`/students/${id}`);
      setStudents((s) => s.filter((x) => x._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  }

  if (loading) return <div className="center">Loading students...</div>;
  if (error) return <div className="center error">{error}</div>;

  return (
    <div>
      <h2>Students</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 && (
              <tr>
                <td colSpan="5">
                  No students found. <Link to="/add">Add one</Link>.
                </td>
              </tr>
            )}
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email || "-"}</td>
                <td>{s.course || "-"}</td>
                <td>{s.age ?? "-"}</td>
                <td className="actions">
                  <Link className="Editcss" to={`/students/${s.id}`}>View</Link>
                  <Link className="Editcss" to={`/edit/${s.id}`}>Edit</Link>
                  <button onClick={() => handleDelete(s.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
