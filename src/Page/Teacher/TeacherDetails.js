import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTeachers } from "../../Features/teachersSlice";
import { Button } from "@mui/material";

export default function TeacherDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teachers = useSelector((state) => state.teachers.teachers);
  const teacher = teachers.find(({ _id }) => _id === id);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  console.log(teacher);

  return (
    <div className="container">
      <div className="container-data">
        <h1>Teacher Details</h1>
        <p>
          <strong>Name:</strong> {teacher.name.toUpperCase()}
        </p>
        <p>
          <strong>Subject:</strong> {teacher.subject.toUpperCase()}
        </p>
        <p>
          <strong>Contact:</strong> {teacher.contact}
        </p>

        <Button
          variant="contained"
          sx={{ width: "50%", display: "block", margin: "1rem auto" }}
          onClick={() => {
            navigate(`/teacher/edit/${teacher._id}`);
          }}
        >
          Edit
        </Button>
      </div>
    </div>
  );
}
