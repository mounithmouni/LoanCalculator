import React from "react";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";

const AboutPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "80vh",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" gutterBottom>
          About Us
        </Typography>

        <Typography variant="body1" paragraph>
          Welcome to <strong>LoanCalculator</strong>, your reliable tool for
          smart financial planning. Whether you're exploring home loans, car
          loans, or personal loans, our application helps you calculate your{" "}
          <strong>EMIs</strong> (Equated Monthly Installments) with ease and
          accuracy.
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
          🎯 What We Offer
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="EMI Calculator"
              secondary="Instantly calculate monthly payments based on amount, interest rate, and tenure."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Live Currency Conversion"
              secondary="Get real-time exchange rates for international financial planning."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Responsive Design"
              secondary="Optimized for desktops, tablets, and mobile devices."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Theme Support"
              secondary="Toggle between light and dark modes for better accessibility."
            />
          </ListItem>
        </List>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
          🚀 Why Use LoanCalculator?
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Fast & Accurate Calculations" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Up-to-Date Exchange Rates" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Simple, User-Friendly Interface" />
          </ListItem>
          <ListItem>
            <ListItemText primary="No Sign-Up Required" />
          </ListItem>
        </List>
      </Container>
    </Box>
  );
};

export default AboutPage;
