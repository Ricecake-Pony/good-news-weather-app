import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export async function fetchCityWeather({ cityName }) {
	const params = new URLSearchParams({
		key: `${apiKey}`,
		q: cityName,
		days: 7,
	});

	const url = `https://api.weatherapi.com/v1/forecast.json?${params.toString()}`;

	try {
		const res = await axios.get(url);
		const data = res.data;

		if (data?.error) {
			throw new Error(data.error.message);
		}

		return data;
	} catch (err) {
		console.error("the error is:", err);
		throw err;
	}
}
