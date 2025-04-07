export default function TodaysSummary({ cityData }) {
	const { current } = cityData;
	return (
		<div>
			<p>Feels like: {current.feelslike_f}°F</p>
			<p>Humidity: {current.humidity}%</p>
			<p>Wind: {current.wind_mph} mph</p>
		</div>
	);
}
