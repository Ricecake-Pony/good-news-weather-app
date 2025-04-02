import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import CurrentLocationTile from "../CurrentLocationTile";
import CityTile from "../CityTile";
import SearchBar from "../SearchBar";
import { WeatherContext } from "../../context/WeatherContext";
import { fetchCityWeather } from "../../utils/fetchCityWeather";
import "./sidebar.css";

export default function Sidebar() {
    const { cityWeatherData, setCityWeatherData } = useContext(WeatherContext)
    const { setActiveCity } = useContext(WeatherContext); // we’ll add this soon

    console.log("weather data from context in SIDEBAR:", cityWeatherData)

	async function handleSearch(cityName) {
        console.log("handleSearch", cityName)
        const cityExists = cityWeatherData.some(
            city => city.name === cityName
        );
        if (cityExists) return;
        try {
            const data = await fetchCityWeather( {cityName} ); 
            setCityWeatherData([...cityWeatherData, data]); 
        } catch (err) {
            console.error("Error fetching weather:", err);
        }
    }
    

	return (
		<div className="sidebar">
			<CurrentLocationTile />
			<h2>WeatherNav</h2>
			<SearchBar
				onSearch={handleSearch}
			/>
			<CityTile
				temp="55 F"
				city="Tokyo"
			/>
			<nav>
				<ul>
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
					<li>
						<NavLink to="/city/London">London</NavLink>
					</li>
					<li>
						<NavLink to="/city/New York">New York</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	);
}
