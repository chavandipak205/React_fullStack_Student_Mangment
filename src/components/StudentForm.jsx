 import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const empty = { name: "", email: "", age: "", course: "", rollNumber: "" };

export default function StudentForm() {
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const editing = Boolean(id);

  useEffect(() => {
    if (editing) {
      api
        .get(`/students/${id}`)
        .then((res) => {
          const data = res.data;
          setForm({
            name: data.name || "",
            email: data.email || "",
            age: data.age ?? "",
            course: data.course || "",
            rollNumber: data.rollNumber || "",
          });
        })
        .catch((err) => {
          console.error("Error loading student:", err.response?.data || err.message);
          setError("Failed to load student");
        });
    }
  }, [id, editing]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload = {
        ...form,
        age: form.age ? Number(form.age) : null, // ensure number for backend
      };

      if (editing) {
        await api.put(`/students/${id}`, payload);
      } else {
        await api.post("/students", payload);
      }

      navigate("/");
    } catch (err) {
      console.error("Save error:", err.response?.data || err.message);
      setError(err.response?.data?.msg || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h2>{editing ? "Edit" : "Add"} Student</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="form">
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
          />
        </label>

        <label>
          Course
          <input
            name="course"
            value={form.course}
            onChange={handleChange}
          />
        </label>

        <label>
          Age
          <input
            name="age"
            value={form.age}
            onChange={handleChange}
            type="number"
            min="0"
          />
        </label>

        <label>
          Roll Number
          <input
            name="rollNumber"
            value={form.rollNumber}
            onChange={handleChange}
          />
        </label>

        <div className="form-actions">
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : editing ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
