import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast';
import Layout from './../../component/Layout/Layout';
import UserMenu from '../../component/Layout/UserMenu';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Container, Grid, TextField, Button, IconButton, InputAdornment, Typography, Box } from '@mui/material';

const Profile = () => {
    // Password show/hide logic
    const [passwordType, setPasswordType] = useState('password');
    const handleShowHide = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    };

    // Context
    const [auth, setAuth] = useAuth();
    // State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');

    const baseUrl = import.meta.env.VITE_BASE_URL;

    // Get user data
    useEffect(() => {
        const { email, name,country, phone } = auth?.user;
        setName(name);
        setEmail(email);
        setCountry(country);
        setPhone(phone);
    }, [auth?.user]);

    // Form submission function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${baseUrl}/api/v1/auth/profile`, {
                name,
                email,
                password,
                country,
                phone,
            });

            if (data?.error) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem('auth', JSON.stringify(ls));
                toast.success('Profile Updated Successfully');
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    return (
        <Layout title={'Profile User'}>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={3}>
                        <UserMenu />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Typography variant="h4" gutterBottom align="center">
                            Update Profile
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                        >
                            <TextField
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                variant="outlined"
                                fullWidth
                                required
                            />
                            <TextField
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                                fullWidth
                                required
                                disabled
                            />
                            <TextField
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={passwordType}
                                variant="outlined"
                                fullWidth
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleShowHide}>
                                                {passwordType === 'password' ? <FaEyeSlash /> : <FaEye />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                label="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                variant="outlined"
                                fullWidth
                                required
                            />
                            <TextField
                                label="Country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                variant="outlined"
                                fullWidth
                                required
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                            >
                                Update Profile
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default Profile;
