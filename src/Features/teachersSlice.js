import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeachers = createAsyncThunk(
  "students/fetchTeachers",
  async () => {
    console.log("fetching");
    const response = await axios.get(
      "https://school-management.sweta4b.repl.co/teachers"
    );
    // console.log(response.data);
    return response.data;
  }
);

export const deleteTeacher = createAsyncThunk(
  "students/deleteTeacher",
  async (teacherId) => {
    console.log("deleting Student", teacherId);
    try {
      const response = await axios.delete(
        `https://school-management.sweta4b.repl.co/teachers/${teacherId}`
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editTeacher = createAsyncThunk(
  "students/editTeacher",
  async ({ teacherId, teacherData }) => {
    const response = await axios.post(
      `https://school-management.sweta4b.repl.co/teachers/${teacherId}`,
      teacherData
    );
    console.log(response.data);
    return response.data;
  }
);

export const addTeacher = createAsyncThunk(
  "students/addTeacher",
  async (newTeacher) => {
    const response = await axios.post(
      `https://school-management.sweta4b.repl.co/teachers`,
      newTeacher
    );
    console.log(response.data);
    return response.data;
  }
);

const initialState = {
  teachers: [],
  status: "idle",
  error: null
};

export const teachersSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTeachers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchTeachers.fulfilled]: (state, action) => {
      (state.status = "success"), (state.teachers = action.payload);
    },
    [fetchTeachers.rejected]: (state, action) => {
      (state.status = "error"), console.log(action.error.message);
      state.error = action.error.message;
    },
    [deleteTeacher.pending]: (state) => {
      state.status = "loading";
    },
    [deleteTeacher.fulfilled]: (state, action) => {
      state.status = "success";
      state.teachers = state.teachers.filter(
        (teacher) => teacher._id !== action.payload.data._id
      );
    },
    [deleteTeacher.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [editTeacher.pending]: (state) => {
      state.status = "loading";
    },
    [editTeacher.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedTeacher = action.payload;
      const index = state.teachers.findIndex(
        (teacher) => teacher._id === updatedTeacher._id
      );
      if (index !== -1) {
        state.teachers[index] = updatedTeacher;
      }
    },
    [editTeacher.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addTeacher.pending]: (state) => {
      state.status = "loading";
    },
    [addTeacher.fulfilled]: (state, action) => {
      state.status = "success";
      state.teachers.push(action.payload.data);
    },
    [addTeacher.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});
