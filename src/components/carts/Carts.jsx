import { Add, Delete, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast, Slide } from "react-toastify";

export default function Carts() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const getCarts = async () => {
    const userToken = localStorage.getItem("userToken");
    //console.log("User Token:", userToken);
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BURL}/Carts`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (res.status === 200) {
        setCarts(res.data.cartResponse);
        //console.log("Carts data:", res.data);
        setTotalPrice(res.data.totalPrice);
        //console.log("Total Price:", res.data.totalPrice);
        let totalAllItems = 0;
        res.data.cartResponse.forEach((item) => {
          {
            totalAllItems = totalAllItems + item.count;
            setTotalItems(totalAllItems);
          }
        });
      } else {
        console.error("Failed to fetch carts");
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  const increaseCart = async (cartId) => {
    const userToken = localStorage.getItem("userToken");
    // console.log("User Token:", userToken);
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BURL}/Carts/increaseCount/${cartId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (res.status === 200) {
        const updateCount = carts.map((cart) => {
          if (cart.id == cartId) {
            return { ...cart, count: cart.count + 1 };
          } else {
            return cart;
          }
        });
        setCarts(updateCount);
        toast.success("Add Successfully", {
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
        console.error("Failed to increase cart");
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
    } finally {
      setLoading(false);
    }
  };

  const decreaseCart = async (cartId) => {
    const userToken = localStorage.getItem("userToken");
    //console.log("User Token:", userToken);
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BURL}/Carts/decreaseCount/${cartId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (res.status === 200) {
        const updateCount = carts.map((cart) => {
          if (cart.id == cartId) {
            return { ...cart, count: cart.count - 1 };
          } else {
            return cart;
          }
        });
        setCarts(updateCount);
        toast.success("Remove Successfully", {
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
        console.error("Failed to increase cart");
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
    } finally {
      setLoading(false);
    }
  };

  const deleteProductFromCart = async (cartId) => {
    const userToken = localStorage.getItem("userToken");
    //console.log("User Token:", userToken);
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BURL}/Carts/${cartId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (res.status === 204) {
        toast.success("Delete Successfully", {
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
        const updatedCarts = carts.filter((cart) => cart.id !== cartId);
        setCarts(updatedCarts);
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
    } finally {
      setLoading(false);
    }
  };

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
        setCarts([]);
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

  useEffect(() => {
    getCarts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (carts.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>No Carts Available</p>
      </div>
    );
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          sx={{ marginTop: "50px" }}
          size="small"
          onClick={() => ClearAll()}
        >
          All Carts
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6, xl: 6 }}>
          {carts.map((cart) => (
            <Grid size={{ xs: 12, md: 12, xl: 12 }} key={cart.id}>
              <Card sx={{ minWidth: 275, mt: 2 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={cart.mainImg}
                  title={cart.name}
                  component="img"
                  alt={cart.name}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    {cart.name}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {cart.price} $
                  </Typography>
                </CardContent>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CardActions>
                    <IconButton
                      size="small"
                      onClick={() => increaseCart(cart.id)}
                    >
                      <Add />
                    </IconButton>
                  </CardActions>
                  <Typography>{cart.count}</Typography>
                  <CardActions>
                    <IconButton
                      size="small"
                      onClick={() => decreaseCart(cart.id)}
                    >
                      <Remove />
                    </IconButton>
                  </CardActions>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    p: 2,
                  }}
                >
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => deleteProductFromCart(cart.id)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid item sx={{ mt: 2 }}>
          <h2>Cart Summary</h2>
          <Typography variant="h6" color="text.secondary">
            Total Items: {totalItems}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Total Price: {totalPrice} $
          </Typography>
          <Button variant="contained" fullWidth color="primary" sx={{ mt: 2 }}
          component={Link} to="/checkout">
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
