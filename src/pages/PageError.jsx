import Layout from './../component/Layout/Layout';
import { Container, Typography, Button, Box, Paper } from '@mui/material';

const PageError = () => {
  return (
    <Layout title="Page Not Found">
      <section>
        <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingY: '12px' }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="body2" color="primary">
              404 error
            </Typography>
            <Typography variant="h2" sx={{ mt: 3, fontWeight: 'bold' }}>
              Page not found
            </Typography>
            <Typography variant="body1" sx={{ mt: 4, color: 'text.secondary' }}>
              Sorry, the page you are looking for doesn't exist. Here are some helpful links:
            </Typography>
            <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="outlined"
                sx={{
                  flex: 1,
                  textAlign: 'center',
                  backgroundColor: 'white',
                  color: 'text.primary',
                  borderColor: 'divider',
                  '&:hover': {
                    backgroundColor: 'action.hover'
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: 20, height: 20, marginRight: 8 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>
                <span>Go back</span>
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ flex: 1 }}
              >
                Take me home
              </Button>
            </Box>
          </Box>
        </Container>
      </section>
    </Layout>
  );
};

export default PageError;
