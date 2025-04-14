import { Outlet } from "react-router-dom";
import LeftSideBar from "../LeftSideBar";
import RightSidebar from "../RightSideBar";

export default function Layout({ loadingBarRef }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <LeftSideBar
        className="w-full md:w-[300px]"
        loadingBarRef={loadingBarRef}
      />
      <main className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </main>
      <RightSidebar className="w-full md:w-[300px]" />
    </div>
  );
}
