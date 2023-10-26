import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudent,
  deleteStudent,
  fetchStudents
} from "../../Features/studentsSlice";
import { Link } from "react-router-dom";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

export default function Student() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const students = useSelector((state) => state.students);
  const status = useSelector((state) => state.students.status);
  const error = useSelector((state) => state.students.error);
  const [newStudent, setNewStudent] = useState({
    name: "",
    className: "",
    attendence: "",
    grade: "",
    marks: "",
    age: "",
    gender: ""
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);

  const handleDelete = (studentId) => {
    dispatch(deleteStudent(studentId));
  };

  const handleAddStudent = () => {
    console.log(newStudent);
    handleClose();
    dispatch(addStudent(newStudent));
  };

  console.log(students);

  return (
    <div className="container">
      <div className="container-data">
        <h1>Students List</h1>
        {status === "loading" && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {students.students.map((student) => (
          <div key={student._id}>
            <p>
              <strong>Name:</strong> {student.name.toUpperCase()},{" "}
              <strong>Class:</strong> {student.className}
            </p>
            <div className="link-btn">
              <button onClick={() => handleDelete(student._id)}>Delete</button>
              <Link to={`/student/${student._id}`}>View Details</Link>
            </div>
          </div>
        ))}
        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{ width: "50%", display: "block", margin: "1rem auto" }}
        >
          Add Student
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Student Form
            </Typography>
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              type="text"
              onChange={(e) =>
                setNewStudent({ ...newStudent, name: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="Age"
              variant="standard"
              type="number"
              onChange={(e) =>
                setNewStudent({ ...newStudent, age: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="Gender"
              variant="standard"
              type="text"
              onChange={(e) =>
                setNewStudent({ ...newStudent, gender: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="Class"
              variant="standard"
              type="text"
              onChange={(e) =>
                setNewStudent({ ...newStudent, className: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="Attendence"
              variant="standard"
              type="attendence"
              onChange={(e) =>
                setNewStudent({ ...newStudent, attendence: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="Marks"
              variant="standard"
              type="number"
              onChange={(e) =>
                setNewStudent({ ...newStudent, marks: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="Grade"
              variant="standard"
              type="text"
              onChange={(e) =>
                setNewStudent({ ...newStudent, grade: e.target.value })
              }
            />
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleAddStudent}
            >
              Add
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
