import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import RiseLoader from 'react-spinners/RiseLoader';
import axios from 'axios';
import Layout from './../../component/Layout/Layout';
import AdminMenu from './../../component/Layout/AdminMenu';
import { Box, Container, TextField, Button, Typography, IconButton, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const CreateAdmin = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // password show hide
    const [passwordType, setPasswordType] = useState('password');
    const handleShowHide = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    };
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [country, setCountry] = useState("");
    const [countryError, setCountryError] = useState("");
    const handleCountryChange =(e)=>{
        setCountry(e.target.value);
    }

    // Email validation
    const [email, setEmail] = useState("");
   
    const [emailError, setEmailError] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setValidEmail(validateEmail(newEmail));
        setEmailError("");
    };
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Password validation
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [password2Error, setPassword2Error] = useState("");
    const [validLength, setValidLength] = useState(false);
    const [hasUppercase, setHasUppercase] = useState(false);
    const [hasLowercase, setHasLowercase] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setValidLength(newPassword.length >= 8);
        setHasUppercase(/[A-Z]/.test(newPassword));
        setHasLowercase(/[a-z]/.test(newPassword));
        setHasNumber(/\d/.test(newPassword));
        setHasSpecialChar(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword));
        setPasswordError("");
    };

    const handleRepeatPasswordChange = (e) => {
        setPassword2(e.target.value);
        setPassword2Error("");
    };

    // Name validation
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [validName, setValidName] = useState(false);
    const validateName = (name) => /^[A-Za-z -]+$/.test(name);
    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);
        setValidName(validateName(newName));
        setNameError("");
    };

    // Role
    const [role, setRole] = useState("");
    const [roleError, setRoleError] = useState("");
    const handleRoleChange = (e) => {
        setRole(e.target.value);
        setRoleError("");
    };

    // Dialog
    const [openDialog, setOpenDialog] = useState(false);

    const handleAcceptCondition = async () => {
        setLoading(true);
        try {
            const res = await axios.post(
                `${baseUrl}/api/v1/auth/register`,
                { name, email, password, role, country, phone}
            );
            if (res.data.success) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate("/dashboard/admin/create-admin");
                }, 2000);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Registration Failed");
        } finally {
            setLoading(false);
            setOpenDialog(false);
        }
    };

    const handleDialogClose = () => setOpenDialog(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setEmailError("Email is required");
        } else if (!validEmail) {
            setEmailError("Invalid Email");
        } else if (!password) {
            setPasswordError("Password is required");
        } else if (!validLength) {
            setPasswordError("Password must be at least 8 characters");
        } else if (!hasUppercase) {
            setPasswordError("Password must contain at least one uppercase letter");
        } else if (!hasLowercase) {
            setPasswordError("Password must contain at least one lowercase letter");
        } else if (!hasNumber) {
            setPasswordError("Password must contain at least one number");
        } else if (!hasSpecialChar) {
            setPasswordError("Password must contain at least one special character");
        } else if (!password2) {
            setPassword2Error("Password confirmation is required");
        } else if (password2 !== password) {
            setPassword2Error("Passwords do not match");
        } else if (!name) {
            setNameError("Name is required");
        } else if (!validName) {
            setNameError("Invalid Name");
        } else if (!country){
            setCountryError("Invalid country");
        }else if(!phone){
            setPhoneError("Invalid phone number");
        }else{
            setOpenDialog(true);
        }
    };

    return (
        <Layout title="Create Admin Account">
            <Container maxWidth="lg" sx={{ mt: 4, display: 'flex' }}>
                <Box sx={{ width: 240, mr: 2 }}>
                    <AdminMenu />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Create Admin Registration
                    </Typography>
                    <Paper sx={{ p: 4 }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <Typography variant="h6" component="h5" gutterBottom>
                                Sign-up to our platform
                            </Typography>

                            <TextField
                                label="Email"
                                value={email}
                                onChange={handleEmailChange}
                                variant="outlined"
                                fullWidth
                                error={Boolean(emailError)}
                                helperText={emailError}
                            />

                            <Box sx={{ position: 'relative' }}>
                                <TextField
                                    label="Password"
                                    type={passwordType}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(passwordError)}
                                    helperText={passwordError}
                                />
                                <IconButton
                                    sx={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)' }}
                                    onClick={handleShowHide}
                                >
                                    {passwordType === 'password' ? <FaEyeSlash /> : <FaEye />}
                                </IconButton>
                            </Box>

                            <Box sx={{ position: 'relative' }}>
                                <TextField
                                    label="Confirm Password"
                                    type={passwordType}
                                    value={password2}
                                    onChange={handleRepeatPasswordChange}
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(password2Error)}
                                    helperText={password2Error}
                                />
                                <IconButton
                                    sx={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)' }}
                                    onClick={handleShowHide}
                                >
                                    {passwordType === 'password' ? <FaEyeSlash /> : <FaEye />}
                                </IconButton>
                            </Box>

                            <TextField
                                label="Name"
                                value={name}
                                onChange={handleNameChange}
                                variant="outlined"
                                fullWidth
                                error={Boolean(nameError)}
                                helperText={nameError}
                            />

                            <TextField
                                label="Role"
                                type="number"
                                inputProps={{ min: 0, max: 1 }}
                                value={role}
                                onChange={handleRoleChange}
                                variant="outlined"
                                fullWidth
                                error={Boolean(roleError)}
                                helperText={roleError}
                            />
                             <TextField
                                label="country"
                                value={country}
                                onChange={handleCountryChange}
                                variant="outlined"
                                fullWidth
                                error={Boolean(countryError)}
                                helperText={countryError}
                            />
                            <TextField
                              fullWidth
                              margin="normal"
                              label="Phone Number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              error={!!phoneError}
                              helperText={phoneError}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                {loading ? <RiseLoader color="#36d7b7" /> : "Sign-up"}
                            </Button>
                        </form>
                    </Paper>
                </Box>
            </Container>

            {/* Dialog for Terms and Agreements */}
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Terms and Agreements</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" gutterBottom>
                        Commodo eget a et dignissim dignissim morbi vitae, mi. Mi aliquam sit ultrices enim cursus. Leo sapien, pretium duis est eu volutpat interdum eu non. Odio eget nullam elit laoreet. Libero at felis nam at orci venenatis rutrum nunc. Etiam mattis ornare pellentesque iaculis enim.
                    </Typography>
                    <Typography variant="body1">
                        Felis eu non in aliquam egestas placerat. Eget maecenas ornare venenatis lacus nunc, sit arcu. Nam pharetra faucibus eget facilisis pulvinar eu sapien turpis at. Nec aliquam aliquam blandit eu ipsum.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAcceptCondition} color="primary">
                        Accept
                    </Button>
                    <Button onClick={handleDialogClose} color="secondary">
                        Decline
                    </Button>
                </DialogActions>
            </Dialog>
        </Layout>
    );
};

export default CreateAdmin;
