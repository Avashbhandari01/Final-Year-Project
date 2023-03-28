import { Helmet } from "react-helmet-async";
import { Container, Typography, Stack, Card } from "@mui/material";
import { PrettyChatWindow } from "react-chat-engine-pretty";

export default function ChatPage() {
  const tokenValue = localStorage.getItem("token");
  const tokenObject = JSON.parse(tokenValue);
  const firstName = tokenObject.data.firstName;

  return (
    <>
      <Helmet>
        <title> Chat | Guardian Portal </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Chat
          </Typography>
        </Stack>
        <Card>
          <div style={{ height: "100vh" }}>
            <PrettyChatWindow
              projectId="f4209c23-197a-47bc-af87-9f85de62de2e"
              username={firstName}
              secret={firstName}
              style={{ height: "100%" }}
            />
          </div>
        </Card>
      </Container>
    </>
  );
}
