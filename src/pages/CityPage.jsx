import { useParams } from "react-router-dom";

export default function CityPage() {
	const { cityName } = useParams();
	return <h1>🌆 Weather for {cityName}</h1>;
}
