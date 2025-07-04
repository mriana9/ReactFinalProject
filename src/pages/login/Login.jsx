import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Styles from "./login.module.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PasswordIcon from "@mui/icons-material/Password";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import { useState } from "react";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loginUser = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BURL}/Account/Login`,
        data
      );
      if (res.status === 200) {
        setLoading(true);
        toast.success("Login Successfully", {
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
        localStorage.setItem("userToken", res.data.token);
        navigate("/");
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
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        component={"form"}
        className={Styles.formContainer}
        onSubmit={handleSubmit(loginUser)}
      >
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
          helperText={errors.email ? errors.email.message : ""}
          error={errors.email}
        />
        {/* {errors.email && (
          <Typography color="error" variant="caption" sx={{ ml: 1 }}>
            {errors.email.message}
          </Typography>
        )} */}

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
          helperText={errors.password ? errors.password.message : ""}
          error={errors.password}
        />
        {/* {errors.password && (
          <Typography color="error" variant="caption" sx={{ ml: 1 }}>
            {errors.password.message}
          </Typography>
        )} */}

        {/* Submit Button and Links */}

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Box>
            <Typography variant="body2">
              <Link
                component={Link}
                to="/forgot-password"
                underline="hover"
                sx={{ cursor: "pointer" }}
              >
                Forgot Password?
              </Link>
            </Typography>

            <Button
              variant="outlined"
              mt={3}
              type="submit"
              className={Styles.submitButton}
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </Box>

          <Typography variant="body2">
            Don't have an account?
            <Link
              component={Link} // if using react-router
              to="/register"
              underline="hover"
              sx={{ cursor: "pointer" }}
            >
              Please Register
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
