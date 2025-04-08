export default function getWeatherFactCategory(conditionText) {
	const condition = conditionText.toLowerCase();

	if (condition.includes("sun")) return "sunny";
	if (condition.includes("clear")) return "clear";
	if (condition.includes("partly")) return "partly_cloudy";
	if (condition.includes("cloud")) return "cloudy";
	if (condition.includes("rain")) return "rain";
	if (condition.includes("drizzle")) return "drizzle";
	if (condition.includes("thunder")) return "thunder";
	if (condition.includes("storm")) return "storm";
	if (condition.includes("snow")) return "snow";
	if (condition.includes("sleet")) return "sleet";
	if (condition.includes("fog")) return "fog";
	if (condition.includes("mist")) return "mist";
	if (condition.includes("wind")) return "windy";
	if (condition.includes("calm")) return "calm";
	if (condition.includes("hot")) return "hot";
	if (condition.includes("cold")) return "cold";

	return null;
}