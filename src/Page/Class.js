import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  setClassFilter,
  setFilter,
  setSortBy
} from "../Features/studentsSlice";

export default function Class() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const filter = useSelector((state) => state.students.filter);
  const sortBy = useSelector((state) => state.students.sortBy);
  const classFilter = useSelector((state) => state.students.classFilter);

  const uniqueClasses = students.reduce((classes, student) => {
    if (!classes.includes(student.className)) {
      classes.push(student.className);
    }
    return classes;
  }, []);

  console.log(uniqueClasses);
  console.log(students);

  const filteredClassStudents = students.filter((student) =>
    classFilter === "all" ? true : student.className === classFilter
  );

  const filteredStudents = filteredClassStudents.filter((student) =>
    filter === "all" ? true : student.gender.toLowerCase() === filter
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "marks") {
      return b.marks - a.marks;
    }
    if (sortBy === "attendence") {
      return b.attendence - a.attendence;
    }
    if (sortBy === "age") {
      return b.age - a.age;
    }
    return 0;
  });

  const handleClassChange = (e) => {
    dispatch(setClassFilter(e.target.value));
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div className="page">
      <div className="filter-container">
        <fieldset className="filters">
          <legend>
            <strong>Filters</strong>
          </legend>
          <div>
            <label htmlFor="filter">
              <strong>Filter by Gender: </strong>
            </label>
            <select id="filter" onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="sort">
              <strong>Sort by: </strong>
            </label>
            <select id="sort" onChange={handleSortChange}>
              <option value="name">Name</option>
              <option value="marks">Marks</option>
              <option value="attendence">Attendance</option>
              <option value="age">Age</option>
            </select>
          </div>
          <div>
            <label>
              <strong>Class: </strong>
            </label>
            <select id="category-select" onChange={handleClassChange}>
              <option value="all">All Classes</option>
              {uniqueClasses.map((classes) => (
                <option value={classes}>{classes}</option>
              ))}
            </select>
          </div>
        </fieldset>
      </div>

      <div className="container">
        <h1>Class List</h1>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Marks</th>
              <th>Attendance</th>
            </tr>
            {sortedStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.name.toUpperCase()}</td>
                <td>{student.gender.toUpperCase()}</td>
                <td>{student.age}</td>
                <td>{student.marks}</td>
                <td>{student.attendence}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
