import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
} from "@mui/material";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
useEffect(()=>{
  if(loggedIn){
    navigate("/home");
  }
 },[loggedIn]);

  //register ctrl
  const handleSubmit = async (e) => {
    const loading = toast.loading("Logging in")
    e.preventDefault();
    try {

      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`, { email, password });
      toast.dismiss(loading);

      toast.success("Logged In Successfully");
      localStorage.setItem("authToken", true);
      navigate("/home");
    } catch (err) {
      toast.dismiss(loading);
      toast.error("Failed to log in",err);
      console.log(error);
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  const showP = () => {
    const passwordInput = document.getElementById("password");
    passwordInput.type = document.getElementById("cb").checked ? "text" : "password";
  };

  return (
  <>
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit} className="log shadow p-4 rounded">
        <div id="container" className="text-center">
          <h1 id="h" className="signup-heading  mb-3">Log In</h1>
        <TextField
          label="email"
          type="email"
          required
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          label="password"
          type="password"
          required
          id="password"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
          <div id="checkbox" className="form-check mb-">
            <input onClick={showP} id="cb" type="checkbox" className="form-check-input" />
            <label className="form-check-label" htmlFor="cb">Show password</label>
          </div>
          <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          Log In
        </Button>
        <div className="dfc">
          <p className="Ac have-account  mt-1">
            Don't have an account?
          </p>
          <Link className="fp btn btn-outline btn-success login-btn" to="/register">
            Sign Up
          </Link>
          </div>
        </div>
      </form>
    </Box>
  </>
  );
};

export default Login;