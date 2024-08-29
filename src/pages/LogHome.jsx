import { Box, Button, Typography, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import Layout from '../component/Layout/Layout';
import { useState } from 'react';

const LogHome = () => {
    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return (
        <Layout title={"Home"}>
            <Box
              sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                color: '#fff',
              }}
            >
              <Container maxWidth="lg">
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    component="h1"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    Welcome to Our Platform
                  </Typography>
                  <Typography
                    variant="h5"
                    component="p"
                    sx={{
                      mb: 4,
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    Discover a world of possibilities with our services.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      paddingX: 4,
                      paddingY: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                    }}
                    onClick={handleClickOpen}
                  >
                    Get Started
                  </Button>
                </Box>
              </Container>
        
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>This Page is a Demo</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    This is a demonstration page. You can explore the following features:
                  </DialogContentText>
                  <ul>
                    <li>Login</li>
                    <li>Registration</li>
                    <li>Forgot Password</li>
                    <li>Email Verification</li>
                    <li>Email Verification and Sent otp</li>
                    <li>Thank you for visiting!</li>
                  </ul>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
        </Layout>
    );
};

export default LogHome;