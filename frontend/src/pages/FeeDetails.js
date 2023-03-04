import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function FeeDetailsPage() {

  return (
    <>
      <Helmet>
        <title> Fee Details | Guardian Portal </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Fee Details
        </Typography>
        <h1>This is a fee details.</h1>
      </Container>
    </>
  );
}