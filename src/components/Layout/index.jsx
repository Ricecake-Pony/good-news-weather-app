import { Outlet } from "react-router-dom";
import LeftSideBar from "../LeftSideBar";
import RightSidebar from "../RightSideBar";
import "./layout.css";

export default function Layout({ loadingBarRef }) {
	return (
		<div className="app-layout">
			<LeftSideBar loadingBarRef={loadingBarRef}  />
			<main className="main-content">
				<Outlet />
			</main>
			<RightSidebar/>
		</div>
	);
}
