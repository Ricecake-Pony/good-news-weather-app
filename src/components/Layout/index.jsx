import { Outlet } from "react-router-dom";
import LeftSideBar from "../LeftSideBar";
import RightSidebar from "../RightSideBar";

export default function Layout({ loadingBarRef }) {
	return (
		<div className="flex min-h-screen w-full">
			<LeftSideBar loadingBarRef={loadingBarRef} />
			<main className="flex-1 p-4 overflow-y-auto">
				<Outlet />
			</main>
			<RightSidebar />
		</div>
	);
}
