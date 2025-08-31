import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'

export default function StudentDetails(){
  const { id } = useParams()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    api.get(`/students/${id}`).then(res=> setStudent(res.data)).catch(err=>{ console.error(err); setError('Failed to load') }).finally(()=>setLoading(false))
  }, [id])

  if(loading) return <div className="center">Loading...</div>
  if(error) return <div className="error">{error}</div>
  if(!student) return <div className="center">Student not found</div>

  return (
    <div>
      <h2>{student.name}</h2>
      <div className="details">
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Course:</strong> {student.course || '-'}</p>
        <p><strong>Age:</strong> {student.age ?? '-'}</p>
        <p><strong>Roll No:</strong> {student.rollNumber || '-'}</p>         
      </div>
      <Link className='Editcss' to="/">Back</Link>
    </div>
  )
}