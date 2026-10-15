import React from 'react';

const StudentItem = ({ student, onDelete }) => {
  const { id, name, score, class: studentClass } = student;

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      {}
      <td>{`Lớp ${studentClass}`}</td>
      <td>{`${score} điểm`}</td>
      <td>
        <button
          onClick={() => onDelete(id)}
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '5px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default StudentItem;