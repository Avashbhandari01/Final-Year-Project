import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Typography,
  Button,
  Stack,
  Card,
  TextField,
  Box,
} from "@mui/material";
import Iconify from "../components/iconify/Iconify";
import { Modal } from "antd";

export default function AssignmentPage() {
  const form = useRef();

  const [assignments, setAssignments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [group, setGroup] = useState();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };

  const handleGroupChange = (event) => {
    setGroup(event.target.value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = (e) => {
    setIsModalOpen(false);

    e.preventDefault();

    console.log(title, description, deadline);

    fetch("http://localhost:5000/api/assignment/create-assignment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        title,
        description,
        group,
        deadline,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "Assignment Created!");
        form.current.reset();
      });
  };

  const isAdminLoggedIn = localStorage.getItem("adminloggedIn") === "true";

  useEffect(() => {
    const studentId = JSON.parse(window.localStorage.getItem("token"))?.data
      ?.student_ID;
    const parentId = JSON.parse(window.localStorage.getItem("token"))?.data
      ?.parent_ID;
    if (isAdminLoggedIn) {
      fetch("http://localhost:5000/api/assignment/get-assignment", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setAssignments(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (studentId) {
      fetch("http://localhost:5000/api/assignment/get-groupassignment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          group: JSON.parse(window.localStorage.getItem("token"))?.data?.group,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setAssignments(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (parentId) {
      fetch("http://localhost:5000/api/assignment/get-parentassignment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          parent_ID: JSON.parse(window.localStorage.getItem("token"))?.data
            ?.parent_ID,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          setAssignments(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title> Assignment | Guardian Portal </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Assignment
          </Typography>
          {isAdminLoggedIn && (
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={showModal}
            >
              New Assignment
            </Button>
          )}

          <Modal
            title="New Assignment"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <form ref={form}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleOk}
              ></Box>

              <TextField
                id="outlined-basic"
                label="Assignment Title"
                variant="outlined"
                onChange={handleTitleChange}
                style={{ margin: "5px" }}
              />

              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                onChange={handleDescriptionChange}
                style={{ margin: "5px" }}
              />

              <TextField
                id="outlined-basic"
                label="Group"
                variant="outlined"
                onChange={handleGroupChange}
                style={{ margin: "5px" }}
              />

              <TextField
                id="outlined-basic"
                label="Deadline"
                variant="outlined"
                onChange={handleDeadlineChange}
                style={{ margin: "5px" }}
              />
            </form>
          </Modal>
        </Stack>
        <Card style={{ padding: "20px", marginBottom: "30px" }}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Assignment Title</th>
                <th>Assignment Description</th>
                <th>Group</th>
                <th>Deadline</th>
                {isAdminLoggedIn && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {assignments && assignments.length ? (
                <>
                  {assignments.map((assignment) => (
                    <tr key={assignment.assignment_ID}>
                      <td>{assignment.assignmentTitle}</td>
                      <td>{assignment.assignmentDescription}</td>
                      <td>{assignment.group}</td>
                      <td>{assignment.submissionDate}</td>
                      <td>
                        {isAdminLoggedIn && (
                          <Button
                            variant="contained"
                            color="secondary"
                            style={{ backgroundColor: "red" }}
                            onClick={() => {
                              fetch(
                                `http://localhost:5000/api/assignment/delete-assignment/${assignment.assignment_ID}`,
                                {
                                  method: "DELETE",
                                  headers: {
                                    "Content-Type": "application/json",
                                    Accept: "application/json",
                                    "Access-Control-Allow-Origin": "*",
                                  },
                                }
                              )
                                .then((res) => res.json())
                                .then((data) => {
                                  console.log(data, "Assignment Deleted!");
                                });
                            }}
                          >
                            Delete
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td>No Assignments!</td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </Container>
    </>
  );
}
