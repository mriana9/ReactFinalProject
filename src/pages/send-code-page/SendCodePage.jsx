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
import NumbersIcon from "@mui/icons-material/Numbers";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SendCodePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitVerifyCode = async (data) => {
    // console.log("Data", data);

    try {
      setLoading(true);
      const res = await axios.patch(
        `${import.meta.env.VITE_BURL}/Account/SendCode`,
        data
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
      console.log("Network error", error);
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
        {...register("code", {required:"Code is required"})}
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <NumbersIcon />
            </InputAdornment>
          ),
        }}
        error={errors.code}
        helperText={errors.code ? errors.code.message : ""}
      />

      {/* Email Input */}
      <TextField
        label="Email"
        {...register("email", {required:"Email is required", pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "Invalid email address",
        }})}
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailOutlineIcon />
            </InputAdornment>
          ),
        }}
        error={errors.email}
        helperText={errors.email ? errors.email.message : ""}
      />

      {/* Password Input */}
      <TextField
        label="Password"
        type="password"
        {...register("password", {required:"Password is required"})}
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PasswordIcon />
            </InputAdornment>
          ),
        }}
        error={errors.password}
        helperText={errors.password ? errors.password.message : ""}
      />

      {/* Confirm Password Input */}
      <TextField
        label="Confirm Password"
        type="password"
        {...register("ConfirmPassword", {required:"Confirm Password is required"})}
        fullWidth
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PasswordIcon />
            </InputAdornment>
          ),
        }}
        error={errors.ConfirmPassword}
        helperText={errors.ConfirmPassword ? errors.ConfirmPassword.message : ""}
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
