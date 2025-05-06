import React from "react";
import { Box, Button, Container, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "80vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        py: { xs: 8, sm: 12 },
      }}
    >
      <Container maxWidth="md">
        <Box textAlign="center">
          <Typography
            variant="h2"
            component="h1"
            sx={{ mt: 2, fontWeight: 600 }}
          >
            Page not found
          </Typography>

          <Typography
            variant="body1"
            sx={{ mt: 3, mb: 5, color: "text.secondary" }}
          >
            Sorry, we couldn’t find the page you’re looking for.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/")}
            >
              Go back home
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
