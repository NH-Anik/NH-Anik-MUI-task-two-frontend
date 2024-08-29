
import React from 'react';
import { Box, CircularProgress, Paper, Typography } from '@mui/material';

const Loading = () => {
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
        <Typography variant="body2" color="text.secondary">
          Loading...
        </Typography>
      </Paper>
    </Box>
  );
};

export default Loading;
