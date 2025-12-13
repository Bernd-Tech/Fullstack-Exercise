import { NavBar } from "../../components/sections/navBar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
    return (
        <>
        <div className="fixed top-0 z-10 w-screen">
            <NavBar />
            </div>
            <Outlet />
        </>
    )
}