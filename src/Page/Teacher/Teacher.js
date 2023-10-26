import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import {
  addTeacher,
  deleteTeacher,
  fetchTeachers
} from "../../Features/teachersSlice";

export default function Teacher() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const teachers = useSelector((state) => state.teachers);
  const status = useSelector((state) => state.teachers.status);
  const error = useSelector((state) => state.teachers.error);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    contact: "",
    subject: ""
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
      dispatch(fetchTeachers());
    }
  }, [status, dispatch]);

  const handleDelete = (teacherId) => {
    dispatch(deleteTeacher(teacherId));
  };

  const handleAddTeacher = () => {
    console.log(newTeacher);
    handleClose();
    dispatch(addTeacher(newTeacher));
  };

  console.log(teachers);

  return (
    <div className="container">
      <div className="container-data">
        <h1>Teachers List</h1>
        {status === "loading" && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {teachers.teachers.map((teacher) => (
          <div key={teacher._id}>
            <p>{teacher.name.toUpperCase()}</p>
            <div className="link-btn">
              <button onClick={() => handleDelete(teacher._id)}>Delete</button>
              <Link to={`/teacher/${teacher._id}`}>View Details</Link>
            </div>
          </div>
        ))}
        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{ width: "50%", display: "block", margin: "1rem auto" }}
        >
          Add Teacher
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Teacher Form
            </Typography>
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              type="text"
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, name: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="Subject"
              variant="standard"
              type="text"
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, subject: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="Contact"
              variant="standard"
              type="number"
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, contact: e.target.value })
              }
            />

            <Button
              color="secondary"
              variant="outlined"
              onClick={handleAddTeacher}
            >
              Add
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
