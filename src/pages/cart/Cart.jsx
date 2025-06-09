import React from "react";
import Carts from "../../components/carts/Carts";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { toast, Slide } from "react-toastify";

export default function Cart() {
  const ClearAll = async () => {
    const userToken = localStorage.getItem("userToken");
    //console.log("User Token:", userToken);
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BURL}/Carts/clearCart`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (res.status === 204) {
        toast.success("Clear All Successfully", {
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
      } else {
        console.error("Failed to delete product from cart");
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
      console.log("Error", error);
    }
  };
  return (
    <>
      <Box   sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <h1>Cart Page</h1>

        <Button size="small" onClick={() => ClearAll()}>
          All Carts
        </Button>
      </Box>
      <Carts />
    </>
  );
}
