import { NavBar } from "../../components/sections/navBar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}