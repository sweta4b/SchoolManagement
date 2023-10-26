import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSchoolStats, setTopStudent } from "../Features/schoolSlice";
import { fetchStudents } from "../Features/studentsSlice";

export default function School() {
  const dispatch = useDispatch();
  const {
    school,
    students: { students }
  } = useSelector(({ school, students }) => ({
    school,
    students
  }));

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  useEffect(() => {
    const totalStudents = students.length;
    const totalAttendance = students.reduce(
      (sum, { attendence }) => sum + parseFloat(attendence ?? 0),
      0
    );
    const averageAttendance = totalAttendance / totalStudents;
    const totalMarks = students.reduce(
      (sum, { marks }) => sum + parseFloat(marks ?? 0),
      0
    );
    const averageMarks = totalMarks / totalStudents;
    const topStudent = students.reduce(
      (top, student) => (student.marks > (top.marks ?? 0) ? student : top),
      ""
    );

    dispatch(
      updateSchoolStats({
        totalStudents,
        averageAttendance,
        averageMarks,
        topStudent
      })
    );
    dispatch(setTopStudent(topStudent));
  }, [students, dispatch]);

  return (
    <div className="container">
      <div className="container-data">
        <div>
          <h1>School Data</h1>
          <p>
            <strong>Total Students: </strong>
            {school.totalStudents}
          </p>
          <p>
            <strong>Average Attendance: </strong>
            {school.averageAttendance.toFixed()}
          </p>
          <p>
            <strong>Average Marks: </strong>
            {school.averageMarks.toFixed()}
          </p>
          <p>
            <strong>Top Student: </strong>
            {school.topStudent ? school.topStudent.name : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
