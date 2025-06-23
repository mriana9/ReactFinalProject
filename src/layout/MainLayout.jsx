import { Outlet } from "react-router";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { Container } from "@mui/material";
import CartContextProvider from "../context/CartContext";

export default function MainLayout() {
  return (
    <>
      <CartContextProvider>
        <Navbar />
        <Container>
          <Outlet />
        </Container>
        <Footer />
      </CartContextProvider>
    </>
  );
}
