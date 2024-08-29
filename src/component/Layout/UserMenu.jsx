import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EditIcon from '@mui/icons-material/Edit';

const UserMenu = () => {
  const navigation = [
    {
      to: '/dashboard/user',
      name: 'Profile',
      icon: <AccountBoxIcon />,
    },
    {
      to: '/dashboard/user/profile',
      name: 'Edit Profile',
      icon: <EditIcon />,
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <nav style={{ width: '100%' }}>
        <Box sx={{ padding: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            User Menu
          </Typography>
          <List>
            {navigation.map((item, idx) => (
              <ListItem
                button
                key={idx}
                component={Link}
                to={item.to}
                sx={{
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: 'grey.100',
                    color: 'black',
                  },
                  '&:active': {
                    backgroundColor: 'grey.200',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: '40px' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </nav>
    </Box>
  );
};

export default UserMenu;
