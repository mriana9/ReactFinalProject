import { Outlet, useLocation } from "react-router";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { Container } from "@mui/material";
//import CartContextProvider from "../context/CartContext";

export default function MainLayout() {
  const location = useLocation();
  const hiddenRoutes = ["/login", "/register"];
  const hiddenLayout = hiddenRoutes.includes(location.pathname);
  //console.log(hiddenLayout);
  return (
    <>
      {/* <CartContextProvider>
        {!hiddenLayout && <Navbar />}
        <Container>
          <Outlet />
        </Container>
        <Footer />
      </CartContextProvider> */}

        {!hiddenLayout && <Navbar />}
        <Container>
          <Outlet />
        </Container>
        <Footer />
    </>
  );
}
