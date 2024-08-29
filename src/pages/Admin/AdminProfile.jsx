import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../component/Layout/Layout";
import AdminMenu from "../../component/Layout/AdminMenu";
import { Container, Box, Typography, TextField, Button, Paper } from "@mui/material";

const AdminProfile = () => {
    //context
    const [auth, setAuth] = useAuth();
    //state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone]=useState("");
    const [country, setCountry]=useState("");

    const baseUrl = import.meta.env.VITE_BASE_URL;

    //get user data
    useEffect(() => {
        const { email, name, phone, country } = auth?.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setCountry(country);
    }, [auth?.user]);

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${baseUrl}/api/v1/auth/profile`, {
                name,
                email,
                password,
                phone, 
                country
            });
            if (data?.error) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile Updated Successfully");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Profile User"}>
            <Container maxWidth="lg" sx={{ mt: 4, display: 'flex' }}>
                <Box sx={{ width: 240, mr: 2 }}>
                    <AdminMenu />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Update your Profile
                    </Typography>
                    <Paper sx={{ p: 4 }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                variant="outlined"
                                fullWidth
                                required
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
                        </form>
                    </Paper>
                </Box>
            </Container>
        </Layout>
    );
};

export default AdminProfile;
