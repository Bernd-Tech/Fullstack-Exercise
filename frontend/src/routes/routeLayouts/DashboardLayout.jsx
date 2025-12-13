import { NavBar } from "../../components/sections/navBar";
import  Sidebar from "../../components/sections/Sidebar";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
    return (
        <>
        <div className="fixed top-0 md:left-[290px] md:w-[calc(100vw-290px)]">
            <NavBar showLogo={false}/>
        </div>
        <div className="h-screen fixed left-0 top-0 md:w-[290px]">
            <Sidebar />
        </div>
        {/* <Outlet /> tells React Router where the child page should be inserted. */}
            <Outlet />
        </>
    )
}