import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editStudent, fetchStudent } from "../../Features/studentsSlice";
import { useNavigate, useParams } from "react-router";
import { editTeacher, fetchTeachers } from "../../Features/teachersSlice";
import { Button, TextField } from "@mui/material";

export default function TeacherEditForm() {
  const { teacherId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teachers = useSelector((state) => state.teachers.teachers);
  const teacher = teachers.find(({ _id }) => _id === teacherId);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const [updatedData, setUpdatedData] = useState({
    _id: teacher?._id || "",
    name: teacher?.name || "",
    subject: teacher?.subject || "",
    contact: teacher?.contact || ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTeacher({ teacherId: teacher._id, teacherData: updatedData }));
    navigate(`/teacher/${teacher._id}`);
  };

  return (
    <div className="container">
      <div className="outer-form">
        <h1>Edit Details</h1>
        <form onSubmit={handleSubmit} className="form">
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            type="text"
            value={updatedData.name}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, name: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="Subject"
            variant="standard"
            type="text"
            value={updatedData.subject}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, subject: e.target.value })
            }
          />

          <TextField
            id="standard-basic"
            label="Contact"
            variant="standard"
            type="number"
            value={updatedData.contact}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, contact: e.target.value })
            }
          />
          <Button
            sx={{ width: "50%", display: "block", margin: "1rem auto" }}
            color="secondary"
            variant="outlined"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
