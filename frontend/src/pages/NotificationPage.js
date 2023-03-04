import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function NotificationPage() {

  return (
    <>
      <Helmet>
        <title> Notification | Guardian Portal </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Notification
        </Typography>
        <h1>This is a notification page.</h1>
      </Container>
    </>
  );
}