import { ClipLoader } from "react-spinners";

export default function TodaysSummary({ cityData }) {
	if (!cityData?.current || !cityData?.location) {
		return (
			<div className="loading-spinner">
				<ClipLoader
					color="#432185"
					size={30}
					/>
			</div>
		);
	}

	const { current } = cityData;

	return (
		<div>
			<p>Feels like: {current.feelslike_f}°F</p>
			<p>Humidity: {current.humidity}%</p>
			<p>Wind: {current.wind_mph} mph</p>
		</div>
	);
}
