import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Button, Stack, Card, TextField, Box } from '@mui/material';
import Iconify from '../components/iconify/Iconify';
import { Modal } from 'antd';

export default function AssignmentPage() {

  const [assignments, setAssignments] = useState([]);
  const [open, setOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
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
        deadline
      })
    }).then((res) => res.json())
      .then((data) => {
        console.log(data, "Assignment Created!");
        // window.location.reload()

      });

  };

  useEffect(() => {
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
  }, [handleOk]);

  return (
    <>
      <Helmet>
        <title> Assignment | Guardian Portal </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Assignment
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={showModal}>
            New Assignment
          </Button>

          <Modal title="New Assignment" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleOk}
            ></Box>

            <TextField
              id="outlined-basic"
              label="Assignment Title"
              variant="outlined"
              onChange={(e) => setTitle(e.target.value)}
              style={{ margin: '5px' }}
            />

            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              onChange={(e) => setDescription(e.target.value)}
              style={{ margin: '5px' }}
            />

            <TextField
              id="outlined-basic"
              label="Deadline"
              variant="outlined"
              onChange={(e) => setDeadline(e.target.value)}
              style={{ margin: '5px' }}
            />


          </Modal>
        </Stack>
        <Card style={{ padding: '20px', marginBottom: '30px' }}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Assignment Title</th>
                <th>Assignment Description</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assignments && assignments.length ? (
                <>
                  {assignments.map((assignment) => (
                    <tr key={assignment.assignment_ID}>
                      <td>{assignment.assignmentTitle}</td>
                      <td>{assignment.assignmentDescription}</td>
                      <td>{assignment.submissionDate}</td>
                      <td>
                        <Button variant="contained" style={{ marginRight: '5px' }}>Edit</Button>
                        <Button variant="contained" color="secondary" style={{ backgroundColor: 'red' }}>Delete</Button>
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