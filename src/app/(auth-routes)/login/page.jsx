"use client";

import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { signIn } from "next-auth/react";
import Styles from "./login.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { loginAction } from "@/app/server/loginActions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
    const response = await loginAction(formData);
    console.log("Login response:", response);
    if (response.error) {
      setError(response.error);
      setMessage("");
    } else {
      setMessage("Login successful!");
      setError("");
      router.push("/");
      // Optionally, redirect the user or perform other actions here
    }
    setFormData({ email: "", password: "" });
    
   } catch (error) {
    console.error("Error during form submission:", error);
   }
  };

  const handleGithubLogin = async () => {
    // Redirect to GitHub OAuth
    signIn("github", { callbackUrl: "/" });
  };
  const handleGoogleLogin = async () => {
    // Redirect to Google OAuth
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <Box className={Styles.formBox} sx={{mt: 6}}>
      <Typography variant="h5" className={Styles.textCenter}>
        Login
      </Typography>

      {message && (
        <Typography color="success.main" className={Styles.textCenter}>
          {message}
        </Typography>
      )}
      {error && (
        <Typography color="error.main" className={Styles.textCenter}>
          {error}
        </Typography>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Box
          className={`${Styles.formSpace} ${Styles.formColumn} ${Styles.formGap16}`}
        >
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth disableRipple>
            Login
          </Button>
        </Box>
        <Box className={`${Styles.textCenter} ${Styles.marginTop16}`}>
        <Link href="/register" className={Styles.linkStyle}>
          Don't have an account? Register
        </Link>
        </Box>
      </Box>

      <Typography className={`${Styles.textCenter} ${Styles.marginTop16}`}>
        OR
      </Typography>

      <Button
        id={Styles.buttonColor}
        variant="outlined"
        fullWidth
        onClick={handleGithubLogin}
      >
        <GitHubIcon />
       <span className={Styles.marginLeft4}> Login with GitHub</span>
      </Button>
      <Button
        variant="outlined"
        fullWidth
        onClick={handleGoogleLogin}
        id={Styles.buttonColor}
      >
        <GoogleIcon />
       <span className={Styles.marginLeft4}> Login with Google</span>
      </Button>
    </Box>
  );
}
