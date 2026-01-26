import { NavBar } from "../../components/sections/navBar";
import Sidebar from "../../components/sections/Sidebar";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <>
      <div className="h-screen flex">
        <div className="h-screen fixed left-0 top-0 md:w-[290px]">
          <Sidebar />
        </div>
        <div className="flex-1 ml-[290px] radial-gradient">
          <div className="sticky top-0 md:left-[290px] md:w-[calc(100vw-290px)] z-99 glass-effect shadow-lg shadow-amber-50/10">
            <NavBar showLogo={false} />
          </div>

          {/* <Outlet /> tells React Router where the child page should be inserted. */}
          <Outlet />
        </div>
      </div>
    </>
  );
};
