import Layout from "../component/Layout/Layout";
import { Container, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const Home = () => {
  const cap = [
    { action: "Registration", description: "Can register a new account." },
    { action: "Login", description: "Can log into their account." },
    { action: "Forgot Password", description: "Can reset their password if forgotten." },
    { action: "Profile", description: "Can view profile admin or user." }
  ];

  return (
    <Layout title={"Test - 2"}>
      <Container maxWidth="lg" sx={{ padding: '16px', paddingY: '32px' }}>
        <Typography variant="h3" align="center" gutterBottom>
          Test - 2 Project
        </Typography>
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Admin role 1 --- User role 0
        </Typography>
        <Paper elevation={3} sx={{ padding: '16px', marginTop: '16px' }}>
          <Typography variant="h5" align="center" color="success.main" gutterBottom>
            Admin or User Role Capabilities
          </Typography>
          <List>
            {cap.map((capability, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={<strong>{capability.action}:</strong>}
                  secondary={capability.description}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Home;
