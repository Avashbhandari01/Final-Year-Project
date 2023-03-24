import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Typography,
  Card,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";

export default function AttendancePage() {
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);

  const yearStyle = {
    marginTop: "15px",
    marginBottom: "5px",
    marginRight: "20px",
    width: "40%",
  };

  const monthStyle = {
    marginTop: "15px",
    marginBottom: "5px",
    width: "40%",
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    if (value === undefined) {
      setYear("");
    } else {
      setYear(value);
      console.log(year);
    }
  };

  const handleMonthChange = (e) => {
    const value = e.target.value;
    if (value === undefined) {
      setMonth("");
    } else {
      setMonth(value);
      console.log(month);
    }
  };

  useEffect(() => {
    const studentId = JSON.parse(window.localStorage.getItem("token"))?.data
      ?.student_ID;
    const parentID = JSON.parse(window.localStorage.getItem("token"))?.data
      ?.parent_ID;
    if (studentId) {
      fetch("http://localhost:5000/api/attendance/get-attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          student_ID: studentId,
          year: year,
          month: month,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          if (Array.isArray(data.data)) {
            setAttendanceData(data.data);
            console.log(attendanceData);
          } else {
            setAttendanceData([]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (parentID) {
      fetch("http://localhost:5000/api/attendance/parent-attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          parent_ID: parentID,
          year: year,
          month: month,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          if (Array.isArray(data.data)) {
            setAttendanceData(data.data);
            console.log(attendanceData);
          } else {
            setAttendanceData([]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [month, year]);

  return (
    <>
      <Helmet>
        <title> Attendance | Guardian Portal </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Attendance
        </Typography>
        <Card style={{ padding: "20px", marginBottom: "30px" }}>
          <FormControl style={yearStyle}>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="year"
              value={year || ""} // check for undefined before setting value
              onChange={handleYearChange} // use handleRoleChange to set value
            >
              <MenuItem value={""}>-- Select Year --</MenuItem>
              <MenuItem value={"2023"}>2023</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={monthStyle}>
            <InputLabel id="demo-simple-select-label">Month</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="month"
              value={month || ""} // check for undefined before setting value
              onChange={handleMonthChange} // use handleRoleChange to set value
            >
              <MenuItem value={""}>-- Select Month --</MenuItem>
              <MenuItem value={"January"}>January</MenuItem>
              <MenuItem value={"February"}>February</MenuItem>
              <MenuItem value={"March"}>March</MenuItem>
              <MenuItem value={"April"}>April</MenuItem>
              <MenuItem value={"May"}>May</MenuItem>
              <MenuItem value={"June"}>June</MenuItem>
              <MenuItem value={"July"}>July</MenuItem>
              <MenuItem value={"August"}>August</MenuItem>
              <MenuItem value={"September"}>September</MenuItem>
              <MenuItem value={"October"}>October</MenuItem>
              <MenuItem value={"November"}>November</MenuItem>
              <MenuItem value={"December"}>December</MenuItem>
            </Select>
          </FormControl>
          <Card style={{ padding: "20px", marginTop: "30px" }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Month</th>
                  <th>Year</th>
                  <th>Total Days</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData && attendanceData.length ? (
                  <>
                    {attendanceData.map((attendance) => (
                      <tr key={attendance.attendance_ID}>
                        <td>{attendance.firstName}</td>
                        <td>{attendance.lastName}</td>
                        <td>{attendance.email}</td>
                        <td>{attendance.contact}</td>
                        <td>{attendance.month}</td>
                        <td>{attendance.year}</td>
                        <td>{attendance.totalDays}</td>
                        <td>{attendance.daysPresent}</td>
                        <td>{attendance.daysAbsent}</td>
                        <td>{attendance.attendancePercentage}</td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td>No Data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>
        </Card>
      </Container>
    </>
  );
}
