import { Outlet } from "react-router";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Container>
        <ToastContainer />

        <Outlet />
      </Container>
      <Footer />
    </>
  );
}
