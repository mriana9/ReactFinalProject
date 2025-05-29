import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Link,
  InputAdornment,
} from "@mui/material";
import Styles from "./sendCode.module.css";
import { useForm } from "react-hook-form";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PasswordIcon from "@mui/icons-material/Password";
import NumbersIcon from '@mui/icons-material/Numbers';
import axios from "axios";
import { toast, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SendCodePage = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const submitVerifyCode = async (data) => {

    console.log("Data", data); //Mariana@1

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BURL}/Account/SendCode`,
      );
      if (res.status === 200) {
        toast.success("Account verified successfully!", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
          transition: Slide,
        });
        navigate("/login");
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
          transition: Slide,
        });
      }
    } catch (error) {
      console.log("Network error", error)
      toast.error("Network error. Please try again later.", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
        transition: Slide,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      className={Styles.formContainer}
      onSubmit={handleSubmit(submitVerifyCode)}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Verify Your Code
      </Typography>
      <Typography variant="body1" align="center" mb={3}>
        We sent a 4-digit code to your email. Please enter it below.
      </Typography>

      {/* OTP Input */}
      <TextField
        label="Code"
        {...register("code")}
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <NumbersIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Email Input */}
      <TextField
        label="Email"
        {...register("email")}
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailOutlineIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Password Input */}
      <TextField
        label="Password"
        type="password"
        {...register("password")}
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PasswordIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Confirm Password Input */}
      <TextField
        label="Confirm Password"
        type="password"
        {...register("ConfirmPassword")}
        fullWidth
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PasswordIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{ mb: 2 }}
      >
        {loading ? "Verifying..." : "Verify"}
      </Button>
    </Box>
  );
};

export default SendCodePage;
