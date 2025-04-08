import React from "react";

export default function ForecastMultiDay({ cityData }) {
	const { forecast, location } = cityData;

	if (!forecast || !forecast.forecastday) {
		return <div>No forecast data available.</div>;
	}
    const localToday = location.localtime.split(" ")[0]; // "2025-04-07"

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
