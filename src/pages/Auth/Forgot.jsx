
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useState } from "react";
import axios from 'axios';
import Layout from "../../component/Layout/Layout";

import {Box,Button,Container,Grid,InputAdornment,TextField,Typography,Modal,Fade,Backdrop,CircularProgress,} from '@mui/material';
import { MailOutline } from '@mui/icons-material';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Forgot = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(false);

  const [email, setEmail] = useState("");
  const [emailerror, setEmailError] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [newPassworderror, setNewPasswordError] = useState("");

  const [newConfirmPassword, setConfirmNewPassword] = useState("");
  const [newConfirmPassworderror, setConfirmNewPasswordError] = useState("");

  const[otp, setotp] = useState("");
  const[securityQuestionerror, setSecurityQuestionError] = useState("");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handlemail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  }
  const handlNewPassword = (e) => {
    setNewPassword(e.target.value);
    setNewPasswordError("");
  }

  const handlConfirmNewPassword = (e) => {
    setConfirmNewPassword(e.target.value);
    setConfirmNewPasswordError("");
  }

  const handlSecurityOTP = (e) => {
    setotp(e.target.value);
    setSecurityQuestionError("");
  }

  const [mailMassage, setmailMassage] = useState("");

  // Submit Form  
  const handelforgot = async (e) => {
    e.preventDefault();
    if(email==""){
      setEmailError("Email is required");
    }else{
      setmailMassage("check your email");
      try {
        const res= await axios.post(
            `${baseUrl}/api/v1/auth/forgot-password`,
            {email}
        )
        if(res.data.success){
          toast.success(res.data.message);
          setOtpView(true);
          setLoading(false);
          setotp("");
        }else{
            toast.error(res.data.message);
            setLoading(false);
        } 
      } catch (error) {
          toast.error("Registration Failed");
          setLoading(false);
      }
    }
  }

  const handelSetPassword = async (e) => {
    e.preventDefault();
    try {
      if(newPassword==""){
        setNewPasswordError("New Password is required");
      }else if(newConfirmPassword==""){
        setConfirmNewPasswordError("Confirm Password is required");
      }else if(newPassword!=newConfirmPassword){
        setConfirmNewPasswordError("Password didn't match");
      }else if(newPassword.length<8){
        setConfirmNewPasswordError("Password must be at least 8 characters");
      }else{
        const response = await axios.post(`${baseUrl}/api/v1/auth/forgot-passwordOtp`, {
          email,
          otp,
          newPassword
        });
        if(response.data.success){
          toast.success(response.data.message);
          setTimeout(() => {
             navigate("/login"); 
          }, 2000);
          setLoading(false);
          setotp("");
          setNewPassword("");
          setConfirmNewPassword("");
          setEmail("");
        }else{
          toast.error(response.data.message);
          setLoading(false);
        } 
      }
    } catch (error) {
      toast.error("Change Password Failed");
      setLoading(false);
    }
  }
 
  const [viewpass, setViewPass] = useState(false);
  const [otpView, setOtpView] = useState(false);

  const handelCheckOtp = async(e) => {
    e.preventDefault();
    if(!otp){
      setSecurityQuestionError("OTP is required");
      return;
    }
    setOtpView(false);
    setViewPass(true);
  }

   // password show hide work start
   const [passwordType, setPasswordType] = useState("password");
   const handelShowHide = () => {
       if(passwordType==="password")
     {
      setPasswordType("text")
      return;
     }
     setPasswordType("password")
   }
   // password show hide work end
 
    return (
        <Layout title={"Forgot Password"}>
        <Box sx={{ bgcolor: 'background.paper', py: { xs: 6, lg: 8 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h2"
                  sx={{
                    background: 'linear-gradient(to right, #36D7B7, #30D5C8, #ADD8E6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold',
                  }}
                >
                  Welcome to Test - 2
                </Typography>
                <Typography variant="h4" color="textPrimary" mt={2}>
                  Forgot your account?
                </Typography>
              </Grid>
    
              <Grid item xs={12} md={6}>
                <Box component="form">
                  <TextField
                    onChange={handlemail}
                    type="email"
                    fullWidth
                    variant="outlined"
                    label="Email address"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutline />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                    error={!!emailerror}
                    helperText={emailerror}
                  />
                  <Button
                    onClick={handelforgot}
                    variant="contained"
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    Submit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
    
          <Modal open={viewpass} onClose={() => setViewPass(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
            <Fade in={viewpass}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 24,
                  p: 4,
                  maxWidth: 500,
                  mx: 'auto',
                  mt: 4,
                }}
              >
                <Typography variant="h6" textAlign="center">
                  Change Password
                </Typography>
                <TextField
                  onChange={handlNewPassword}
                  type={passwordType}
                  fullWidth
                  label="New password"
                  variant="outlined"
                  sx={{ mt: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button onClick={handelShowHide}>
                          {passwordType === 'password' ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  error={!!newPassworderror}
                  helperText={newPassworderror}
                />
                <TextField
                  onChange={handlConfirmNewPassword}
                  type={passwordType}
                  fullWidth
                  label="Confirm password"
                  variant="outlined"
                  sx={{ mt: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button onClick={handelShowHide}>
                          {passwordType === 'password' ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  error={!!newConfirmPassworderror}
                  helperText={newConfirmPassworderror}
                />
                <Box mt={4} display="flex" justifyContent="space-between">
                  <Button variant="contained" color="primary" onClick={handelSetPassword}>
                    Set Password
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => { setViewPass(false); setOtpView(true); }}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Modal>
    
          <Modal open={otpView} onClose={() => setOtpView(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
            <Fade in={otpView}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 24,
                  p: 4,
                  maxWidth: 500,
                  mx: 'auto',
                  mt: 4,
                }}
              >
                <Typography variant="h6" textAlign="center">
                  Check OTP
                </Typography>
                <Typography variant="body1" textAlign="center" color="success.main">
                  {mailMassage}
                </Typography>
                <TextField
                  onChange={handlSecurityOTP}
                  value={otp}
                  fullWidth
                  type="number"
                  inputProps={{ max: 4, min: 1 }}
                  label="4 Digit OTP"
                  variant="outlined"
                  sx={{ mt: 2 }}
                  error={!!securityQuestionerror}
                  helperText={securityQuestionerror}
                />
                <Box mt={4} display="flex" flexDirection="column" alignItems="center">
                  <Button
                    onClick={handelCheckOtp}
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={loading && <CircularProgress size={20} />}
                    sx={{ mb: 2 }}
                  >
                    {loading ? 'Checking OTP...' : 'Check OTP'}
                  </Button>
                  <Button onClick={handelforgot} variant="outlined" color="primary">
                    Resend OTP
                  </Button>
                  <Button onClick={() => { setOtpView(false); setotp(''); }} variant="outlined" color="secondary" sx={{ mt: 2 }}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Modal>
        </Box>
      </Layout>
    );
};

export default Forgot;