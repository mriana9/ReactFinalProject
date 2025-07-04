import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router";
import { Slide, toast } from "react-toastify";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { ThemeContext } from "../../context/ThemeContext";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import SunnyIcon from "@mui/icons-material/Sunny";
import axiosAuth from "../../api/axiosAuthInstance";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const pagesGuest = ["Home", "Register", "Login"];
  const pagesAuth = ["Cart"];
  const isLoggedIn = localStorage.getItem("userToken") ? true : false;
  const navigate = useNavigate();
  const queryClient =  useQueryClient();

  //const { cartItems } = useContext(CartContext);
  const { mode, toggleTheme } = useContext(ThemeContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
    toast.success("Logout Successfully", {
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
  };

  const fetchCartItem = async () => {
    const { data } = await axiosAuth.get("/Carts");
    return data.cartResponse;
  };

  useQuery({
    queryKey: ["cartItems"],
    queryFn: fetchCartItem,
    staleTime: 0,
  });

  const data = queryClient.getQueryData(["cartItems"]);
  const cartItems = data?.length;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {(isLoggedIn ? pagesAuth : pagesGuest).map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    <Link
                      to={`/${page.toLowerCase()}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {page === "Cart" ? `Cart (${cartItems})` : page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
              {isLoggedIn ? (
                <Button onClick={handleLogout} sx={{ my: 2 }}>
                  Logout
                </Button>
              ) : null}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {(isLoggedIn ? pagesAuth : pagesGuest).map((page) => (
              <Link
                key={page}
                to={`/${page.toLowerCase()}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  margin: "20px",
                }}
              >
                {page === "Cart" ? `Cart (${cartItems})` : page}
              </Link>
            ))}
            {isLoggedIn ? (
              <Button onClick={handleLogout} sx={{ my: 2, color: "white" }}>
                Logout
              </Button>
            ) : null}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Box
              onClick={toggleTheme}
              variant="button"
              sx={{
                my: 2,
                color: "white",
                display: "block",
                cursor: "pointer",
              }}
            >
              {mode === "light" ? <ModeNightIcon /> : <SunnyIcon />}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
