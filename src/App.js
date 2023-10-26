import { NavLink, Routes, Route } from "react-router-dom";
import "./styles.css";
import School from "./Page/School";
import Class from "./Page/Class";
import Student from "./Page/Student/Student";
import Teacher from "./Page/Teacher/Teacher";
import StudentDetails from "./Page/Student/StudentDetails";
import EditForm from "./Page/Student/EditForm";
import TeacherDetails from "./Page/Teacher/TeacherDetails";
import TeacherEditForm from "./Page/Teacher/TeacherEditForm";
import Header from "./Components/Header";

export default function App() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<School />} />
        <Route path="/class" element={<Class />} />
        <Route path="/student" element={<Student />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/student/:id" element={<StudentDetails />} />
        <Route path="/edit/:studentId" element={<EditForm />} />
        <Route path="/teacher/:id" element={<TeacherDetails />} />
        <Route path="/teacher/edit/:teacherId" element={<TeacherEditForm />} />
      </Routes>
    </div>
  );
}
