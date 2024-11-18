import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents, addStudent, updateStudent, deleteStudent } from '../redux/studentSlice';
import StudentModal from './StudentModal';
import { Table, Button } from 'react-bootstrap';

const StudentList = () => {
  const { students, loading } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleAdd = () => {
    setCurrentStudent(null);
    setModalOpen(true);
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  const handleSave = (student) => {
    if (currentStudent) {
      dispatch(updateStudent({ id: currentStudent._id, data: student }));
    } else {
      dispatch(addStudent(student));
    }
    setModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <Button variant="primary" onClick={handleAdd}>
        Add Student
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.mobile}</td>
              <td>{student.address}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(student._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        student={currentStudent}
      />
    </div>
  );
};

export default StudentList;
