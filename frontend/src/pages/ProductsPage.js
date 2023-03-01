import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function ProductsPage() {

  return (
    <>
      <Helmet>
        <title> Dashboard: Chat | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Chat
        </Typography>
        <h1>This is a chat page.</h1>
      </Container>
    </>
  );
}
