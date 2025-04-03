// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../SideBar";
import "./layout.css";

export default function Layout() {
	return (
		<div className="app-layout">
			<Sidebar />
			<main className="main-content">
				<Outlet />
			</main>
		</div>
	);
}
