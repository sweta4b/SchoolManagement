import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    console.log("fetching");
    const response = await axios.get(
      "https://school-management.sweta4b.repl.co/students"
    );
    // console.log(response.data);
    return response.data;
  }
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (studentId) => {
    console.log("deleting Student", studentId);
    try {
      const response = await axios.delete(
        `https://school-management.sweta4b.repl.co/students/${studentId}`
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editStudent = createAsyncThunk(
  "students/editStudent",
  async ({ studentId, studentData }) => {
    const response = await axios.post(
      `https://school-management.sweta4b.repl.co/students/${studentId}`,
      studentData
    );
    console.log(response.data);
    return response.data;
  }
);

export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (newStudent) => {
    const response = await axios.post(
      `https://school-management.sweta4b.repl.co/students`,
      newStudent
    );
    console.log(response.data);
    return response.data;
  }
);

const initialState = {
  students: [],
  status: "idle",
  error: null,
  filter: "all",
  sortBy: "name",
  classFilter: "all"
};

export const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setClassFilter: (state, action) => {
      state.classFilter = action.payload;
    }
  },
  extraReducers: {
    [fetchStudents.pending]: (state) => {
      state.status = "loading";
    },
    [fetchStudents.fulfilled]: (state, action) => {
      (state.status = "success"), (state.students = action.payload);
    },
    [fetchStudents.rejected]: (state, action) => {
      (state.status = "error"), console.log(action.error.message);
      state.error = action.error.message;
    },
    [deleteStudent.pending]: (state) => {
      state.status = "loading";
    },
    [deleteStudent.fulfilled]: (state, action) => {
      state.status = "success";
      state.students = state.students.filter(
        (student) => student._id !== action.payload.data._id
      );
    },
    [deleteStudent.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [editStudent.pending]: (state) => {
      state.status = "loading";
    },
    [editStudent.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedStudent = action.payload;
      const index = state.students.findIndex(
        (student) => student._id === updatedStudent._id
      );
      if (index !== -1) {
        state.students[index] = updatedStudent;
      }
    },
    [editStudent.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addStudent.pending]: (state) => {
      state.status = "loading";
    },
    [addStudent.fulfilled]: (state, action) => {
      state.status = "success";
      state.students.push(action.payload.data);
    },
    [addStudent.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});

export const { setFilter, setSortBy, setClassFilter } = studentsSlice.actions;

export default studentsSlice.reducer;
