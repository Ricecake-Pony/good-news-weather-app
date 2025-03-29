import React, { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import getCountryCode from "../../utils/getCountryISOCode";

export default function CurrentLocationTile() {
	const { weatherData } = useContext(WeatherContext);

	if (!weatherData?.location || !weatherData?.current) {
		return <div>Loading current weather...</div>;
	}
	
	const { location, current, forecast } = weatherData;

	const country = location.country;
	const isoCode = getCountryCode(country)?.toLowerCase();
	const flagUrl = `https://flagcdn.com/48x36/${isoCode}.png`;

	return (
		<div className="current-location-tile">
			<div>
				<img
					src={flagUrl}
					alt={`Flag of ${country}`}
					width={24}
					height={18}
				/>
			</div>
			<div>
				<div>Current Location for:</div>
				<span>
					{location.name}, {location.region}
				</span>
			</div>
		</div>
	);
}
