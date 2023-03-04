import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function FeedbackPage() {

  return (
    <>
      <Helmet>
        <title> Feedback | Guardian Portal </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Feedback
        </Typography>
        <h1>This is a feedback.</h1>
      </Container>
    </>
  );
}