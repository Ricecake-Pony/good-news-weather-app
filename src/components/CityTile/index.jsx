import getCountryCode from "../../utils/getCountryISOCode";

export default function CityTile({ cityData, onClick, onDelete }) {
	if (!cityData?.location || !cityData?.current) {
		return <div>Loading current weather...</div>;
	}

	const { location, current } = cityData;
	const country = location.country;
	const isoCode = getCountryCode(country)?.toLowerCase();
	const flagUrl = `https://flagcdn.com/48x36/${isoCode}.png`;

	return (
		<div
			className="city-tile"
			onClick={onClick}
			style={{ cursor: "pointer" }}
		>
			<div>
				<img
					src={flagUrl}
					alt={`Flag of ${country}`}
					width={24}
					height={18}
				/>
			</div>
			<div>
				<span>
					{isoCode} {location.name}
				</span>
				<span>{current.temp_f}</span>
			</div>
			arrow icon
			<button
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					onDelete(cityData.location.name);
				}}
			>
				❌
			</button>
		</div>
	);
}
