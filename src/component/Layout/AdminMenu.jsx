import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Typography, List, ListItem, ListItemIcon, ListItemText, Drawer, IconButton, SvgIcon, Box } from '@mui/material';
import { Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material';

const AdminMenu = () => {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const navigation = useMemo(() => [
        {
            to: '/dashboard/admin',
            name: 'Overview',
            icon: (
                <SvgIcon viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                </SvgIcon>
            ),
        },
        {
            to: '/dashboard/admin/admin-profile',
            name: 'Admin Profile Edit',
            icon: (
                <SvgIcon viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                </SvgIcon>
            ),
        },
        {
            to: '/dashboard/admin/users',
            name: 'Users',
            icon: (
                <SvgIcon viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                </SvgIcon>
            ),
        },
        {
            to: '/dashboard/admin/create-admin',
            name: 'Create Admin',
            icon: (
                <SvgIcon viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                </SvgIcon>
            ),
        },
    ], []);

    return (
        <Box sx={{ display: 'flex' }}>
            <IconButton 
                onClick={handleDrawerOpen} 
                sx={{ 
                    display: open ? 'none' : 'block', 
                    color: '#22b7c3', 
                    position: 'absolute', 
                    top: 50, 
                    left: 16 
                }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                variant="persistent"
                open={open}
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                        backgroundColor: '#333',
                        color: '#22b7c3',
                    },
                }}
            >
                <IconButton onClick={handleDrawerClose} sx={{ color: '#fff', position: 'absolute', top: 8, right: 8 }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" sx={{ p: 2, color: '#fff' }}>
                    Admin Panel
                </Typography>
                <List>
                    {navigation.map((item, idx) => (
                        <ListItem button component={Link} to={item.to} key={idx} sx={{ color: '#fff', '&:hover': { backgroundColor: '#444' } }}>
                            <ListItemIcon sx={{ color: '#fff' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
};

export default AdminMenu;
