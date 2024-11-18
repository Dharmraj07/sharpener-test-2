import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API Base URL
const API_URL = 'http://localhost:5000/students'; // Adjust as per your backend

// Async Thunks
export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addStudent = createAsyncThunk('students/addStudent', async (student) => {
  const response = await axios.post(API_URL, student);
  return response.data;
});

export const updateStudent = createAsyncThunk('students/updateStudent', async ({ id, data }) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
});

export const deleteStudent = createAsyncThunk('students/deleteStudent', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Slice
const studentSlice = createSlice({
  name: 'students',
  initialState: {
    students: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Students
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add Student
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      // Update Student
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) state.students[index] = action.payload;
      })
      // Delete Student
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter((s) => s._id !== action.payload);
      });
  },
});

export default studentSlice.reducer;
