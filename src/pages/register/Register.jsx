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
  const { register, handleSubmit } = useForm();
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
          {...register("firstName")}
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
        />

        {/* Last Name Input Field */}
        <TextField
          label="Last Name"
          {...register("lastName")}
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
        />

        {/* User Name Input Field */}
        <TextField
          label="User Name"
          {...register("userName")}
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
        />

        {/* Email Input Field */}
        <TextField
          label="Email"
          {...register("email")}
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
        />

        {/* Password Input Field */}
        <TextField
          label="Password"
          type="password"
          {...register("password")}
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
        />

        {/* Confirm Password Input Field */}
        <TextField
          label="confirm Password"
          {...register("confirmPassword")}
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
        />

        {/* DateOfBirth Input Field */}
        <TextField
          label="Date of Birth"
          {...register("birthOfDate")}
          type="date"
          fullWidth
          sx={{ m: 1 }}
          InputLabelProps={{
            shrink: true,
          }}
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
