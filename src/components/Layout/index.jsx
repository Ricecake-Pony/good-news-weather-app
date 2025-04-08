import { Outlet } from "react-router-dom";
import LeftSideBar from "../LeftSideBar";
import RightSidebar from "../RightSideBar";
import "./layout.css";

export default function Layout() {
	return (
		<div className="app-layout">
			<LeftSideBar />
			<main className="main-content">
				<Outlet />
			</main>
			<RightSidebar/>
		</div>
	);
}
