
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Layout from "../../component/Layout/Layout";
import { useAuth } from "../../context/auth";
import { Container, Box, Typography, TextField, Button, Link, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

const Login = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  // password show hide work start
  const [passwordType, setPasswordType] = useState("password");

  const handleShowHide = () => {
      if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }

  // password show hide work end
  const [email, setEmail] = useState("");
  const [emailerror, setEmailError] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  }

  const [password, setPassword] = useState("");
  const [passworderror, setPasswordError] = useState("");

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  }
 
  const navigate = useNavigate(false);
  const [loading, setLoading] = useState(false);
  const [auth,setAuth] = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(email==""){
      setEmailError("Email is required");
    }else if(password==""){
      setPasswordError("Password is required");
    }else {
      setLoading(true);
      try {
        const res= await axios.post(
          `${baseUrl}/api/v1/auth/login`,
          {email,password}
        )
        if(res.data.success){
          toast.success(res.data.message);
          setAuth({
              ...auth,
              user:res.data.user,
              token:res.data.token
          })
          
          localStorage.setItem("auth", JSON.stringify(res.data));
          setTimeout(() => {
            navigate(location.state || "/log-home"); 
          }, 2000);

          setLoading(false);

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

  return (
    <Layout title={"Login"}>
       <Container maxWidth="sm">
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Box bgcolor="white" color="text.primary" sx={{ py: 8, px: 4, borderRadius: 2, boxShadow: 3, mt: 4 }}>
          <Box textAlign="center">
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Test - 2
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Sign in to access your account
            </Typography>
          </Box>
          <Box mt={4}>
            <form onSubmit={handleSubmit}>
              <Box mb={2}>
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  onChange={handleEmail}
                  placeholder="Enter your email"
                  variant="outlined"
                  required
                  autoComplete="email"
                  InputLabelProps={{
                    style: { color: 'gray' },
                  }}
                  InputProps={{
                    style: { color: 'gray' },
                  }}
                />
                <Typography color="error" variant="caption">
                  {emailerror}
                </Typography>
              </Box>
              <Box mb={2}>
                <TextField
                  label="Password"
                  type={passwordType}
                  fullWidth
                  onChange={handlePassword}
                  placeholder="Enter your password"
                  variant="outlined"
                  required
                  InputLabelProps={{
                    style: { color: 'gray' },
                  }}
                  InputProps={{
                    style: { color: 'gray' },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowHide}>
                          {passwordType === "password" ? <FaEyeSlash /> : <FaEye />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography color="error" variant="caption">
                  {passworderror}
                </Typography>
              </Box>

              <Box mt={2}> 
                <Box display="flex" justifyContent="flex-end" mb={2}>
                  <Link href="/forgot" underline="hover" color="textSecondary">
                    Forgot password?
                  </Link>
                </Box>


                <Button type="submit" fullWidth variant="contained" color="primary">
                  Sign in
                </Button>

               
              </Box>

            </form>
            <Box mt={2} textAlign="center">
              <Typography variant="body2" color="textSecondary">
                Don't have an account yet?{' '}
                <Link href="/registration" underline="hover" color="primary">
                  Sign up
                </Link>
                .
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  </Layout>
  );
};

export default Login;