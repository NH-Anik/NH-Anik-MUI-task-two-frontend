import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Button, Typography, Container } from "@mui/material";

const VerifyEmail = () => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const baseUrl = import.meta.env.VITE_BASE_URL;
  
    useEffect(() => {
        const verifyEmail = async () => {
            try {
              const urlParams = new URLSearchParams(window.location.search);
              const token = urlParams.get("token");
              const response = await axios.post(`${baseUrl}/api/v1/auth/verify-email`, { token });
      
              if (response.data.ok) {
                setMessage(response.data.message);
              } else {
                setError(response.data.message);
              }
            } catch (error) {
              setError("Token not found or something went wrong, please try again");
            }
        };
        verifyEmail();
    }, [baseUrl]);
  
    return (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Box textAlign="center">
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(to right, #1e90ff, #32cd32, #4b0082)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Task - 2
            </Typography>
    
            {message && (
              <Typography variant="h5" color="success.main" my={3}>
                {message}
              </Typography>
            )}
            {error && (
              <Typography variant="h6" color="error.main" my={3}>
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              component={Link}
              to="/login"
              sx={{ borderRadius: 1, paddingX: 2, paddingY: 1 }}
            >
              Back to Home
            </Button>
          </Box>
        </Container>
    );
};

export default VerifyEmail;
