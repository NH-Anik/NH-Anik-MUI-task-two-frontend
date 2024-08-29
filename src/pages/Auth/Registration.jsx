import  { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Layout from './../../component/Layout/Layout';
import {Button,TextField,Typography,Container,FormControl,InputAdornment,IconButton,CircularProgress,Box,Dialog,DialogTitle,DialogContent,DialogActions} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Registration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Password show/hide state
  const [passwordType, setPasswordType] = useState("password");
  const handleShowHide = () => {
    setPasswordType(prevType => (prevType === "password" ? "text" : "password"));
  };

  // Email validation state
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

  // Password validation state
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

  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
    setPassword2Error("");
  };

  // Other state
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [condition, setCondition] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "") {
      setNameError("Name is required");
    } else if (!validateName(name)) {
      setNameError("Invalid Name");
    } else if (country === "") {
      setCountryError("Country is required");
    } else if (phone === "") {
      setPhoneError("Phone is required");
    } else if (password === "") {
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
    } else if (password2 === "") {
      setPassword2Error("Confirm password is required");
    } else if (password2 !== password) {
      setPassword2Error("Passwords do not match");
    } else if (email === "") {
      setEmailError("Email is required");
    } else if (!validEmail) {
      setEmailError("Invalid Email");
    } else {
      setCondition(true);
    }
  };

  const handleAcceptCondition = async () => {
    setCondition(false);
    setLoading(true);
    try {
      const res = await axios.post(
        `${baseUrl}/api/v1/auth/register`,
        { name, email, password, country, phone }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptConditionCancel = () => {
    setCondition(false);
  };

  const validateName = (name) => /^[A-Za-z -]+$/.test(name);

  return (
    <Layout title={"Registration"}>
      {loading && <div className="flex justify-center items-center h-screen"><CircularProgress /></div>}
      <Container component="main" maxWidth="sm">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
          <Typography variant="h5" align="center">
            Get your free account now.
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary" sx={{ mt: 2 }}>
            Let’s get you all set up so you can verify your personal account and begin setting up your profile.
          </Typography>
          <form onSubmit={handleSubmit} noValidate >
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!nameError}
              helperText={nameError}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Country Name"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              error={!!countryError}
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
            <TextField
              fullWidth
              margin="normal"
              label="Email Address"
              type="email"
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
            />
            <FormControl fullWidth margin="normal" variant="outlined">
              <TextField
                type={passwordType}
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowHide} edge="end">
                        {passwordType === "password" ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal" variant="outlined">
              <TextField
                type={passwordType}
                label="Confirm Password"
                value={password2}
                onChange={handlePassword2Change}
                error={!!password2Error}
                helperText={password2Error}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowHide} edge="end">
                        {passwordType === "password" ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </form>
        </Box>
      </Container>

      <Dialog open={condition} onClose={handleAcceptConditionCancel}>
        <DialogTitle>Terms and Agreements</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {/* Add the terms and agreements text here */}
            1. Parties Involved:
            This agreement is between [Company/Organization Name], hereinafter referred to as the "Employer" or "Hiring Party," and [Worker Name], hereinafter referred to as the "Worker" or "Contractor."
            <br />
            2. Scope of Work:
            The Worker agrees to perform the following duties or services as specified by the Employer [Provide detailed description of the tasks or services to be performed].
            <br />
            3. Term of Agreement:
            This agreement shall commence on [Start Date] and shall continue until the completion of the assigned tasks or services unless terminated earlier as provided herein.
            <br />
            4. Compensation:
            The Employer agrees to pay the Worker the agreed-upon compensation of [Amount] for the services rendered. Payment terms and schedule should be specified here [e.g., hourly, weekly, monthly, etc.].
            <br />
            5. Confidentiality:
            Both parties agree to maintain the confidentiality of any proprietary information, trade secrets, or sensitive data disclosed during the course of this agreement.
            <br />
            6. Independent Contractor Status:
            The Worker acknowledges and agrees that they are an independent contractor and not an employee of the Employer. As such, the Worker shall be responsible for their own taxes, insurance, and other liabilities.
            <br />
            7. Governing Law:
            This agreement shall be governed by and construed in accordance with the laws of [Jurisdiction].
            <br />
            8. Entire Agreement:
            This agreement constitutes the entire understanding between the parties and supersedes all prior agreements and understandings, whether written or oral, relating to the subject matter herein.
            <br />
            9. Severability:
            If any provision of this agreement is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
            <br />
            10. Signatures:
            Both parties acknowledge that they have read and understand this agreement and voluntarily agree to be bound by its terms.
            <br />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAcceptCondition} color="primary">Accept</Button>
          <Button onClick={handleAcceptConditionCancel} color="secondary">Decline</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Registration;
