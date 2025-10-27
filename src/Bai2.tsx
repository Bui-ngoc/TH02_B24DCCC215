import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Routes, Route, useParams } from 'react-router-dom';

// Kiểu dữ liệu cho một sinh viên (user) từ jsonplaceholder
type Student = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  username?: string;
  address?: any;
  company?: any;
};

/**
 * Component hiển thị danh sách sinh viên.
 * Khi click vào 1 sinh viên sẽ chuyển sang route chi tiết.
 */
function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => setStudents(response.data))
      .catch((error) => setErrorMessage(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div style={{ padding: 12 }}>
      <h3>Danh sách sinh viên</h3>
      {isLoading && <div>Đang tải...</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <Link to={`/bai2/${student.id}`}>{student.name}</Link> — {student.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Component hiển thị chi tiết một sinh viên (theo id từ params).
 */
function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => setStudent(response.data))
      .catch((error) => setErrorMessage(error.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <div style={{ padding: 12 }}>
      <h3>Chi tiết sinh viên</h3>
      {isLoading && <div>Đang tải...</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {student && (
        <div>
          <div><strong>{student.name}</strong></div>
          <div>Email: {student.email}</div>
          <div>Phone: {student.phone}</div>
          <div>Website: {student.website}</div>
          <div>Username: {student.username}</div>
          <div style={{ marginTop: 8 }}>
            <Link to="/bai2">Quay lại danh sách</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Bai2() {
  // Chứa route con cho danh sách và chi tiết
  return (
    <div>
      <h2 style={{ paddingLeft: 12 }}>Bài 2 — Danh sách sinh viên</h2>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path=":id" element={<StudentDetail />} />
      </Routes>
    </div>
  );
}
