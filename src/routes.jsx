
import { createBrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout";
const routes = createBrowserRouter([{
    path: "/",
    element: <MainLayout />,
}])