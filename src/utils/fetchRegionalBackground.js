import axios from "axios";

const unsplashKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export default async function fetchRegionalBackground({ location, conditionText }) {
	console.log("Fetching regional background for:", location?.name, conditionText);

	if (!location?.name || !conditionText) return null;

	const randomNum = Math.floor(Math.random() * 10); 

	const query = `${conditionText} ${location.name} ${location.country} landmark`;
	const fallbackQuery = `${location.name} ${location.country} landmark`;

	async function getImage(queryString) {
		const params = new URLSearchParams({
			query: queryString,
			client_id: unsplashKey,
			orientation: "landscape",
			content_filter: "high",
		});

		const endpoint = `https://api.unsplash.com/search/photos?${params.toString()}`;

		try {
			const response = await axios.get(endpoint, {
				headers: { "Accept-Version": "v1" },
			});

			const results = response.data.results;

			if (results && results.length > 0) {
				const imageUrl = results[randomNum % results.length]?.urls?.regular;
				return imageUrl || null;
			}
		} catch (error) {
			console.error("❌ Error fetching Unsplash background:", error);
		}
		return null;
	}

	// Try main query, then fallback if needed
	const image = await getImage(query) || await getImage(fallbackQuery);

	return image;
}
