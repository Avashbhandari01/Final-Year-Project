import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack, Typography } from '@mui/material';
import Iconify from '../components/iconify'

export default function AttendancePage() {
  return (
    <>
      <Helmet>
        <title> Attendance | Guardian Portal </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Attendance
          </Typography>
        </Stack>
        <h1>This is a attendance page.</h1>
      </Container>
    </>
  );
}
