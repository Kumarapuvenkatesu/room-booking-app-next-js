"use client";

import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { signIn } from "next-auth/react";
import Styles from "../login/login.module.css";
import registerAction from "@/app/server/registerAction";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

const router=useRouter()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("register details", formData)
    const response=await registerAction(formData)
    // console.log("response",response)
    if(response.message="User registered successfully"){
      alert(response.message)
      router.push("/login")
    }
    setFormData({
      username: "",
      email: "",
      password: "",
    })
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
        Register
      </Typography>



      <Box component="form" onSubmit={handleSubmit}>
        <Box
          className={`${Styles.formSpace} ${Styles.formColumn} ${Styles.formGap16}`}
        >
            <TextField
            label="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            fullWidth
            />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
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
            Register
          </Button>
        </Box>
        <Box className={`${Styles.textCenter} ${Styles.marginTop16}`}>
        <Link href="/login" className={Styles.linkStyle}>
          Already have an account? Login
        </Link>
        </Box>
      </Box>

    </Box>
  );
}
