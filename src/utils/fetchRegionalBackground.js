// src/utils/fetchRegionBackground.js
import axios from "axios";

const unsplashKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export default async function fetchRegionalBackground({ conditionText, region }) {
	const randomNum = Math.floor(Math.random() * 10) + 1;

	const params = new URLSearchParams({
		query: `${conditionText} ${region}`,
		client_id: unsplashKey,
	});

	const endpoint = `https://api.unsplash.com/search/photos/?${params.toString()}`;

	try {
		const response = await axios.get(endpoint, {
			headers: {
				"Accept-Version": "v1",
			},
		});
		const results = response.data.results;
		const imageUrl = results[randomNum]?.urls?.regular;
		return imageUrl;
	} catch (error) {
		console.error("Error fetching region background:", error);
		return null;
	}
}
