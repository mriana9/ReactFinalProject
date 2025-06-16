import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Styles from "./register.module.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PasswordIcon from "@mui/icons-material/Password";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import { useState } from "react";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const registerUser = async (data) => {
    //console.log("Registration:", data);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BURL}/Account/register`,
        data
      );
      if (res.status === 200) {
        setLoading(true);
        toast.success("Create Account Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
        navigate("/login");
      } else {
        toast.error("Please Check Your Network and Try Again!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      }
    } catch (error) {
      toast.error("Please Check Your Network and Try Again!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        component={"form"}
        className={Styles.formContainer}
        onSubmit={handleSubmit(registerUser)}
      >
        {/* First Name Input Field */}
        <TextField
          label="First Name"
          {...register("firstName", { required: "First name is required" })}
          fullWidth
          sx={{ m: 1 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            },
          }}
          helperText={errors.firstName ? errors.firstName.message : ""}
          error={errors.firstName}
        />

        {/* Last Name Input Field */}
        <TextField
          label="Last Name"
          {...register("lastName", { required: "Last name is required" })}
          fullWidth
          sx={{ m: 1 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            },
          }}
          helperText={errors.lastName ? errors.lastName.message : ""}
          error={errors.lastName}
        />

        {/* User Name Input Field */}
        <TextField
          label="User Name"
          {...register("userName", { required: "User name is required" })}
          fullWidth
          sx={{ m: 1 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            },
          }}
          helperText={errors.userName ? errors.userName.message : ""}
          error={errors.userName}
        />

        {/* Email Input Field */}
        <TextField
          label="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          })}
          fullWidth
          sx={{ m: 1 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon />
                </InputAdornment>
              ),
            },
          }}
          error={errors.email}
          helperText={errors.email ? errors.email.message : ""}
        />

        {/* Password Input Field */}
        <TextField
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          fullWidth
          sx={{ m: 1 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>
              ),
            },
          }}
          error={errors.password}
          helperText={errors.password ? errors.password.message : ""}
        />

        {/* Confirm Password Input Field */}
        <TextField
          label="confirm Password"
          {...register("confirmPassword", {
            required: "Confirm password is required",
          })}
          type="password"
          fullWidth
          sx={{ m: 1 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>
              ),
            },
          }}
          error={errors.confirmPassword}
          helperText={errors.confirmPassword ? errors.confirmPassword.message : ""}
        />

        {/* DateOfBirth Input Field */}
        <TextField
          label="Date of Birth"
          {...register("birthOfDate", {
            required: "Date of birth is required",
          })}
          type="date"
          fullWidth
          sx={{ m: 1 }}
          InputLabelProps={{
            shrink: true,
          }}
          error ={errors.birthOfDate}
          helperText={errors.birthOfDate ? errors.birthOfDate.message : ""}
        />

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Button
            variant="outlined"
            type="submit"
            className={Styles.submitButton}
          >
            {loading ? "Register..." : "Register"}
          </Button>

          <Typography variant="body2">
            Already have an account?{" "}
            <Link
              component={Link} // if using react-router
              to="/login"
              underline="hover"
              sx={{ cursor: "pointer" }}
            >
              Please Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
