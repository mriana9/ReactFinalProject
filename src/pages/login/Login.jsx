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
  const { register, handleSubmit } = useForm();
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
        onSubmit={handleSubmit(loginUser)}
      >
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
              type="submit"
              className={Styles.submitButton}
            >
              {loading ? "Login..." : "Login"}
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
