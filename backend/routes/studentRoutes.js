const express = require('express');
const {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

const router = express.Router();

// Routes
router.get('/', getAllStudents);        // Get all students
router.post('/', addStudent);           // Add a new student
router.put('/:id', updateStudent);      // Update a student by ID
router.delete('/:id', deleteStudent);   // Delete a student by ID

module.exports = router;
