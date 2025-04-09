import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CurrentLocationTile from "../CurrentLocationTile";
import CityTile from "../CityTile";
import SearchBar from "../SearchBar";
import { WeatherContext } from "../../context/WeatherContext";
import { UserContext } from "../../context/UserContext";
import { fetchCityWeather } from "../../utils/fetchCityWeather";
import "./left-sidebar.css";

export default function LeftSideBar({ loadingBarRef }) {
	const { cityWeatherData, setCityWeatherData, setActiveCity, geoWeatherData } =
		useContext(WeatherContext);
	const { user, setUser } = useContext(UserContext);
	const [searchError, setSearchError] = useState(null);
	const navigate = useNavigate();

	async function handleSearch(cityName) {
		try {
			const cityExists = cityWeatherData.some(
				(city) => city.location.name.toLowerCase() === cityName.toLowerCase()
			);
			if (cityExists) {
				const matchedCity = cityWeatherData.find(
					(city) => city.location.name.toLowerCase() === cityName.toLowerCase()
				);
				setActiveCity(matchedCity);
				navigate(`/city/${cityName.toLowerCase()}`);
				return;
			}
			loadingBarRef.current?.continuousStart();
			const data = await fetchCityWeather({ cityName });

			const updated = [...user.recentCities];
			const index = updated.findIndex(
				(c) =>
					c.location.name.toLowerCase() === data.location.name.toLowerCase()
			);
			if (index > -1) updated.splice(index, 1);
			updated.push(data);
			if (updated.length > 5) updated.shift();

			setUser({ ...user, recentCities: updated });

			setActiveCity(data);
			navigate(`/city/${cityName.toLowerCase()}`);
		} catch (err) {
			setSearchError(`❌ City not found. Please try again. Error: ${err}`);
			setTimeout(() => setSearchError(null), 4000);
		} finally {
			loadingBarRef.current?.complete();
		}
	}

	function handleDeleteCity(cityName) {
		if (!cityName) return;
	
		const filtered = user.recentCities.filter(
			(c) => c.location.name.toLowerCase() !== cityName.toLowerCase()
		);
	
		setUser({ ...user, recentCities: filtered });
	}

	return (
		<div className="LeftSideBar">
			<CurrentLocationTile
				onClick={() => {
					if (geoWeatherData) {
						setActiveCity(geoWeatherData);
						navigate("/");
					}
				}}
			/>
			<SearchBar onSearch={handleSearch} />
			<ul>
				<li>
					<NavLink to="/">Home</NavLink>
				</li>
				{user.recentCities.length > 0 &&
					user.recentCities
						.filter((city) => city?.location?.name)
						.map((city, i) => (
							<li key={i}>
								<NavLink to={`/city/${city.location.name.toLowerCase()}`}>
									<CityTile
										cityWeatherData={city}
										onDelete={handleDeleteCity}
										onClick={() => {
											setActiveCity(city);
										}}
									/>
								</NavLink>
							</li>
						))}
			</ul>
		</div>
	);
}
