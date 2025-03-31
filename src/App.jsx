import React from "react";
import { Routes, Route } from "react-router-dom";
import CurrentLocationTile from "./components/CurrentLocationTile";
import CityPage from "./pages/CityPage";
import HomePage from "./pages/HomePage";
import Sidebar from "./components/SideBar";

export default function App() {
	return (
		<>
			<CurrentLocationTile />
      <Sidebar />
			<Routes>
				<Route
					path="/"
					element={<HomePage />}
				/>
				<Route
					path="/city/:cityName"
					element={<CityPage />}
				/>
			</Routes>
		</>
	);
}
