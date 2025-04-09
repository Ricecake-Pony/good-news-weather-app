import React from "react";

import { ClipLoader } from "react-spinners";

export default function ForecastMultiDay({ cityData }) {
	
	if (!cityData?.current || !cityData?.location) {
		return (
			<div className="loading-spinner">
		<ClipLoader color="#432185" size={30} />
	</div>
	);
}
	const { forecast, location } = cityData;
	
    const localToday = location.localtime.split(" ")[0];

	const validForecast = forecast.forecastday.filter((day) => {
		return day.date >= localToday;
	});

	return (
		<div className="forecast-multi-day">
			{validForecast.map((day) => {
				const { date, day: dayData } = day;
				const formattedDate = new Date(date).toLocaleDateString("en-US", {
					weekday: "short",
					month: "short",
					day: "numeric",
				});

				return (
					<div key={date} className="forecast-day">
						<span>{formattedDate}</span> —{" "}
						<span>{dayData.maxtemp_f}°F / {dayData.mintemp_f}°F</span> —{" "}
						<span>{dayData.condition.text}</span>
					</div>
				);
			})}
		</div>
	);
}
