import { NavBar } from "../../components/sections/navBar";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
    return (
        <>
        {/* <Outlet /> tells React Router where the child page should be inserted. */}
            <Outlet />
        </>
    )
}