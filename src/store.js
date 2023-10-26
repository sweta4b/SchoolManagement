import { configureStore } from "@reduxjs/toolkit";
import { studentsSlice } from "./Features/studentsSlice";
import { teachersSlice } from "./Features/teachersSlice";
import { schoolSlice } from "./Features/schoolSlice";

export default configureStore({
  reducer: {
    students: studentsSlice.reducer,
    teachers: teachersSlice.reducer,
    school: schoolSlice.reducer
  }
});
