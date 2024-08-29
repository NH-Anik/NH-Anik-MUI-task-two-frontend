import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);

    if (count === 0) {
      navigate(`/${path}`, {
        state: { from: location.pathname }
      });
    }

    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        bgcolor: 'rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          p: 6,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: 'background.paper',
          color: 'text.primary',
        }}
      >
        <Typography variant="h6" color="text.primary" gutterBottom>
          Redirecting you in {count} seconds
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
            p: 2,
            boxShadow: 2,
          }}
        >
          <CircularProgress sx={{ color: 'primary.main', size: 64 }} />
        </Box>
      </Paper>
    </Box>
  );
};

export default Spinner;
