import axios from "axios";

const unsplashKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export default async function fetchRegionalBackground({
  location,
  conditionText,
}) {
  if (!location?.name || !conditionText) return null;

  const localSceneTags = ["", "architecture", "local", "landmark", "sights"];

  function getRandomTag(tags) {
    return tags[Math.floor(Math.random() * tags.length)];
  }

  function getRegionalQuery() {
    // const tag = getRandomTag(localSceneTags);
    const cityName = location.name;
    const regionName = location.region;

    return `${cityName} ${regionName}`;
  }

  const regionalQuery = getRegionalQuery();
  const fallbackQuery = `${location.name} skyline OR cityscape OR downtown`;

  async function getImage(queryString) {
    const params = new URLSearchParams({
      query: queryString,
      client_id: unsplashKey,
      content_filter: "high",
    });

    const endpoint = `https://api.unsplash.com/search/photos?${params.toString()}`;

    try {
      const response = await axios.get(endpoint, {
        headers: { "Accept-Version": "v1" },
      });

      const results = response.data.results;

      if (results && results.length > 0) {
        const imageUrl =
          results.length > 1
            ? results[Math.floor(Math.random() * results.length)]?.urls?.regular
            : results[0]?.urls?.regular;
        return imageUrl || null;
      }
    } catch (error) {
      console.error("❌ Error fetching Unsplash background:", error);
    }

    return null;
  }

  const image =
    (await getImage(regionalQuery)) || (await getImage(fallbackQuery));
  return image;
}
