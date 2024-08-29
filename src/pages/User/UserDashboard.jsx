import { useState } from 'react';
import { Container, Grid, Typography, Button, Avatar, Paper, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import UserMenu from './../../component/Layout/UserMenu';
import Layout from './../../component/Layout/Layout';
import Loading from '../../component/Loading';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';
import UploadIcon from '@mui/icons-material/Upload';

const UserDashboard = () => {
    const [auth, setAuth] = useAuth();
    const id = auth?.user?._id;
    const [ima, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const handleImageChange = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('image', ima);
            const response = await axios.put(`${baseUrl}/api/v1/auth/profile-pic/${id}`, formData);
            if (response.data.success) {
                toast.success(response.data.message);
                setAuth({ ...auth, user: { ...auth.user, image: response.data.user.image } });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong: " + error.message);
        } finally {
            setLoading(false);
            setImage(null);
        }
    };

    return (
        <Layout title={"User Dashboard"}>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                {loading && <Loading />}
                <Grid container spacing={4}>
                    <Grid item xs={12} md={3}>
                        <UserMenu />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Typography variant="h4" gutterBottom>
                            Welcome to your Profile
                        </Typography>
                        <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar src={auth?.user?.image} sx={{ width: 100, height: 100 }} />
                            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <form onSubmit={handleImageChange} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <label htmlFor="file">
                                        <input
                                            accept="image/*"
                                            id="file"
                                            type="file"
                                            onChange={(e) => setImage(e.target.files[0])}
                                            style={{ display: 'none' }}
                                        />
                                        <Button
                                            component="span"
                                            variant="contained"
                                            color="success"
                                            startIcon={<UploadIcon />}
                                        >
                                            Upload Profile Pic
                                        </Button>
                                    </label>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Save
                                    </Button>
                                </form>
                                {ima && (
                                    <Box sx={{ mt: 2 }}>
                                        <img src={URL.createObjectURL(ima)} alt="Preview" height="200px" />
                                    </Box>
                                )}
                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="body1"><strong>Name:</strong> {auth?.user?.name}</Typography>
                                    <Typography variant="body1"><strong>Email:</strong> {auth?.user?.email}</Typography>
                                    <Typography variant="body1"><strong>Role:</strong> {auth?.user?.role === 1 ? 'Admin' : 'User'}</Typography>
                                    <Link to={'/dashboard/user/profile'} style={{ textDecoration: 'none' }}>
                                        <Button variant="contained" color="primary" sx={{ mt: 4 }}>
                                            Edit Profile
                                        </Button>
                                    </Link>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default UserDashboard;
