import React, { useState } from 'react';
import StudentTable from './StudentTable';

const initialStudents = [
  { id: 1, name: 'Nguyễn Văn An', score: 8.5, class: 'CNTT01' },
  { id: 2, name: 'Trần Thị Bình', score: 4.5, class: 'CNTT02' },
  { id: 3, name: 'Lê Hoàng Cường', score: 9.0, class: 'KTPM01' },
];

const App = () => {
  const [students, setStudents] = useState(initialStudents);
  const [filter, setFilter] = useState('ALL');

  const [formData, setFormData] = useState({
    name: '',
    score: '',
    studentClass: '',
  });
  const [error, setError] = useState('');

  const { name, score, studentClass } = formData;

  const handleChange = (e) => {
    const { name: inputName, value } = e.target;
    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();

    if (!name.trim() || score === '' || !studentClass.trim()) {
      setError('Vui lòng nhập đầy đủ Họ tên, Điểm số và Lớp!');
      return;
    }

    const numScore = Number(score);

    if (isNaN(numScore) || numScore < 0 || numScore > 10) {
      setError(`Điểm số "${score}" không hợp lệ! Vui lòng nhập điểm từ 0 đến 10.`);
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      score: numScore,
      class: studentClass.trim(),
    };

    setStudents([...students, newStudent]);
    setFormData({ name: '', score: '', studentClass: '' });
    setError('');
  };

  const handleDeleteStudent = (idToDelete) => {
    const updatedStudents = students.filter((student) => student.id !== idToDelete);
    setStudents(updatedStudents);
  };

  const filteredStudents = students.filter((student) => {
    if (filter === 'GOOD') return student.score >= 8;
    if (filter === 'FAIL') return student.score < 5;
    return true;
  });

  const totalStudents = students.length;
  const totalScore = students.reduce((sum, student) => sum + student.score, 0);
  const averageScore = totalStudents > 0 ? (totalScore / totalStudents).toFixed(2) : 0;

  return (
    <div style={{ maxWidth: '750px', margin: '30px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Ứng dụng Quản lý Điểm Sinh viên</h1>

      <div style={{ backgroundColor: '#f5f6fa', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3 style={{ marginTop: 0 }}>Thêm sinh viên mới</h3>

        {error && (
          <p style={{ color: 'red', fontWeight: 'bold', margin: '0 0 10px 0' }}>
            {error}
          </p>
        )}

        <form onSubmit={handleAddStudent} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            name="name"
            placeholder="Họ tên..."
            value={name}
            onChange={handleChange}
            style={{ padding: '8px', flex: 1 }}
          />
          <input
            type="number"
            step="0.1"
            name="score"
            placeholder="Điểm số (0 - 10)..."
            value={score}
            onChange={handleChange}
            style={{ padding: '8px', width: '140px' }}
          />
          <input
            type="text"
            name="studentClass"
            placeholder="Lớp..."
            value={studentClass}
            onChange={handleChange}
            style={{ padding: '8px', width: '120px' }}
          />
          <button
            type="submit"
            style={{ padding: '8px 20px', backgroundColor: '#27ae60', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Thêm
          </button>
        </form>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#dff9fb',
          padding: '12px 15px',
          borderRadius: '8px',
          marginBottom: '15px',
        }}
      >
        <div style={{ fontWeight: 'bold' }}>
          {`Tổng số SV: ${totalStudents} | Điểm trung bình lớp: ${averageScore}`}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setFilter('ALL')}
            style={{
              padding: '6px 10px',
              cursor: 'pointer',
              backgroundColor: filter === 'ALL' ? '#2980b9' : 'white',
              color: filter === 'ALL' ? 'white' : 'black',
              border: '1px solid #2980b9',
            }}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilter('GOOD')}
            style={{
              padding: '6px 10px',
              cursor: 'pointer',
              backgroundColor: filter === 'GOOD' ? '#2980b9' : 'white',
              color: filter === 'GOOD' ? 'white' : 'black',
              border: '1px solid #2980b9',
            }}
          >
            Loại Giỏi (&gt;= 8)
          </button>
          <button
            onClick={() => setFilter('FAIL')}
            style={{
              padding: '6px 10px',
              cursor: 'pointer',
              backgroundColor: filter === 'FAIL' ? '#2980b9' : 'white',
              color: filter === 'FAIL' ? 'white' : 'black',
              border: '1px solid #2980b9',
            }}
          >
            Trượt môn (&lt; 5)
          </button>
        </div>
      </div>

      <StudentTable students={filteredStudents} onDelete={handleDeleteStudent} />
    </div>
  );
};

export default App;