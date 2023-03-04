import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function AssignmentPage() {

  return (
    <>
      <Helmet>
        <title> Assignment | Guardian Portal </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Assignment
        </Typography>
        <h1>This is a assignments page.</h1>
      </Container>
    </>
  );
}