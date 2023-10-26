import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchStudents } from "../../Features/studentsSlice";
import { Button } from "@mui/material";

export default function StudentDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector((state) => state.students.students);
  const student = students.find(({ _id }) => _id === id);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="container-data">
        <h1>Student Details</h1>
        <p>
          <strong>Name:</strong> {student.name.toUpperCase()}
        </p>
        <p>
          <strong>Class:</strong> {student.className.toUpperCase()}
        </p>
        <p>
          <strong>Attendence:</strong> {student.attendence}%
        </p>
        <p>
          <strong>Grade:</strong> {student.grade.toUpperCase()}
        </p>
        <p>
          <strong>Marks:</strong> {student.marks}
        </p>
        <p>
          <strong>Age:</strong> {student.age}
        </p>
        <p>
          <strong>Gender:</strong> {student.gender.toUpperCase()}
        </p>
        <Button
          variant="contained"
          sx={{ width: "50%", display: "block", margin: "1rem auto" }}
          onClick={() => {
            navigate(`/edit/${student._id}`);
          }}
        >
          Edit
        </Button>
      </div>
    </div>
  );
}
