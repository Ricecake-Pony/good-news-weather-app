import React, { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import getCountryCode from "../../utils/getCountryISOCode";

export default function CurrentLocationTile({ onClick }) {
	const { geoWeatherData } = useContext(WeatherContext);

	if (!geoWeatherData?.location || !geoWeatherData?.current) {
		return <div>Loading current weather...</div>;
	}

	const { location, current } = geoWeatherData;

	const country = location.country;
	const isoCode = getCountryCode(country)?.toLowerCase();
	const flagUrl = `https://flagcdn.com/48x36/${isoCode}.png`;

	return (
		<div className="current-location-tile" onClick={onClick}>
			<div className="flag-wrapper">
				<img
					src={flagUrl}
					alt={`Flag of ${country}`}
					width={24}
					height={18}
				/>
			</div>
			<div className="location-details">
				<div>Current Location for:</div>
				<span>
					{location.name}, {location.region}
				</span>
			</div>
		</div>
	);
}
