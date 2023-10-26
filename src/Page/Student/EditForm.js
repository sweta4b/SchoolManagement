import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editStudent, fetchStudents } from "../../Features/studentsSlice";
import { useNavigate, useParams } from "react-router";
import { Button, TextField } from "@mui/material";

export default function EditForm() {
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector((state) => state.students.students);
  const student = students.find(({ _id }) => _id === studentId);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const [updatedData, setUpdatedData] = useState({
    _id: student?._id || "",
    name: student?.name || "",
    className: student?.className || "",
    attendence: student?.attendence || "",
    grade: student?.grade || "",
    marks: student?.marks || "",
    age: student?.age || "",
    gender: student?.gender || ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editStudent({ studentId: student._id, studentData: updatedData }));
    navigate(`/student/${student._id}`);
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
            label="Class"
            variant="standard"
            type="text"
            value={updatedData.className}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, className: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="Attendence"
            variant="standard"
            type="number"
            value={updatedData.attendence}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, attendence: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="Grade"
            variant="standard"
            type="text"
            value={updatedData.grade}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, grade: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="Marks"
            variant="standard"
            type="text"
            value={updatedData.marks}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, marks: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="Age"
            variant="standard"
            type="number"
            value={updatedData.age}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, age: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="Gender"
            variant="standard"
            type="text"
            value={updatedData.gender}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, gender: e.target.value })
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
