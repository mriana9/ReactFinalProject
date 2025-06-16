import { Box, Button, InputAdornment, TextField } from "@mui/material";
import Styles from "./forgotPassword.module.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import { useState } from "react";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const registerUser = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BURL}/Account/ForgotPassword`,
        data
      );
      if (res.status === 200) {
        setLoading(true);
        toast.success("Send Email Successfully", {
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
        navigate("/send-code");
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
            {loading ? "Send..." : "Send"}
          </Button>
        </Box>
      </Box>
    </>
  );
}
