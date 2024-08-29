import { useState } from "react";
import { Container, Box, Typography, Button, Avatar, IconButton, CircularProgress, Paper } from "@mui/material";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../component/Layout/AdminMenu";
import Layout from "../../component/Layout/Layout";
import { Upload } from "@mui/icons-material";

const AdminDashboard = () => {
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
        <Layout title={"Admin Dashboard"}>
            <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'row', mt: 4, color: 'white' }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Box sx={{ width: 240, mr: 2 }}>
                            <AdminMenu />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h4" component="h1" gutterBottom>
                                Welcome to your {auth?.user?.name} Dashboard
                            </Typography>
                            <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Avatar src={auth?.user?.image} sx={{ width: 100, height: 100, mb: 2 }} alt={auth?.user?.name[0]} />
                                <form onSubmit={handleImageChange} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <label htmlFor="file">
                                        <Button
                                            variant="contained"
                                            component="span"
                                            color="success"
                                            startIcon={<Upload />}
                                        >
                                            Upload Profile
                                        </Button>
                                        <input
                                            type="file"
                                            id="file"
                                            hidden
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />
                                    </label>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="success"
                                    >
                                        Save
                                    </Button>
                                </form>
                                {ima && (
                                    <Box sx={{ mt: 2, width: 300 }}>
                                        <img src={URL.createObjectURL(ima)} alt="Preview" style={{ width: '100%', height: 'auto' }} />
                                    </Box>
                                )}
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="body1" fontWeight="bold">
                                        Name: {auth?.user?.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        Email: {auth?.user?.email}
                                    </Typography>
                                    <Typography variant="body1"><strong>Role:</strong> {auth?.user?.role === 1 ? 'Admin' : 'User'}</Typography>
                                </Box>
                            </Paper>
                        </Box>
                    </>
                )}
            </Container>
        </Layout>
    );
};

export default AdminDashboard;
