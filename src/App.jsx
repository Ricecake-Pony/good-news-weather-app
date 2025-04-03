import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CityPage from "./pages/CityPage";
import HomePage from "./pages/HomePage";
import { WeatherContext } from "./context/WeatherContext";
import fetchRegionalBackground from "./utils/fetchRegionalBackground";

export default function App() {
	const { activeCity } = useContext(WeatherContext);

	useEffect(() => {
		if (activeCity?.current?.condition?.text && activeCity?.location?.region) {
			const fetchBackground = async () => {
				const bgUrl = await fetchRegionalBackground({
					conditionText: activeCity.current.condition.text,
					region: activeCity.location.region,
				});
				if (bgUrl) {
					document.body.style.backgroundImage = `url(${bgUrl})`;
					document.body.style.backgroundSize = "cover";
					document.body.style.backgroundPosition = "center";
				}
			};
			fetchBackground();
		}
	}, [activeCity]);

	return (
		<>
			<Routes>
				<Route
					path="/"
					element={<Layout />}
				>
					<Route
						index
						element={<HomePage />}
					/>
					<Route
						path="city/:cityName"
						element={<CityPage />}
					/>
				</Route>
			</Routes>
		</>
	);
}
