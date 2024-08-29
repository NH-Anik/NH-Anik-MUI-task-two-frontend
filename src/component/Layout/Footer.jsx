import { Container, Box, Typography, Divider, IconButton, Link } from '@mui/material';
import { Facebook, GitHub } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box bgcolor="white" color="text.primary" component="footer">
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box textAlign="center" mb={6}>
        <Link component={RouterLink} to="/" underline="none">
          <Typography variant="h6" component="div" sx={{ background: 'linear-gradient(to right, #36d7b7, #60c4fa, #f09dd1)', backgroundClip: 'text', color: 'transparent' }}>
            Test - 2
          </Typography>
        </Link>
      </Box>
      <Divider />
      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" mt={4}>
        <Typography variant="body2" color="textSecondary">
          <Link component={RouterLink} to="/" underline="none" color="inherit">
            Test - 2 © {currentYear} All Rights Reserved. Development by NH-Anik
          </Link>
        </Typography>
        <Box>
          <IconButton
            component="a"
            href="https://www.facebook.com/NHANIK11/"
            target="_blank"
            aria-label="Facebook"
            color="inherit"
            sx={{ color: 'text.secondary', mx: 1 }}
          >
            <Facebook />
          </IconButton>
          <IconButton
            component="a"
            href="https://github.com/NH-Anik"
            target="_blank"
            aria-label="GitHub"
            color="inherit"
            sx={{ color: 'text.secondary', mx: 1 }}
          >
            <GitHub />
          </IconButton>
        </Box>
      </Box>
    </Container>
  </Box>
  // <p>Made by NH-Anik G:niamulhasan515@gmail.com M:+8801877506611 Development by NH-Anik</p> 
  );
};

export default Footer;