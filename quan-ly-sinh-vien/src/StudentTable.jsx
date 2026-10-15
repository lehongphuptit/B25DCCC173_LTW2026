import React from 'react';
import StudentItem from './StudentItem';

const StudentTable = ({ students, onDelete }) => {
  if (students.length === 0) {
    return <p style={{ textAlign: 'center', color: '#666' }}>Không có sinh viên nào phù hợp.</p>;
  }

  return (
    <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
      <thead>
        <tr style={{ backgroundColor: '#2c3e50', color: 'white' }}>
          <th>ID</th>
          <th>Họ và Tên</th>
          <th>Lớp</th>
          <th>Điểm số</th>
          <th>Xóa sinh viên</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentItem
            key={student.id}
            student={student}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;