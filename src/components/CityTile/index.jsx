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
      className="bg-white/10 backdrop-blur-md rounded-lg p-3 shadow-sm flex items-center justify-between text-white hover:bg-white/15 hover:ring-1 hover:ring-white/30 transition-colors duration-200 cursor-pointer"
      onClick={onClick}
      title="View this city’s weather"
    >
      <div className="flex items-center gap-2">
        <img
          src={flagUrl}
          alt={`Flag of ${country}`}
          width={24}
          height={18}
          className="rounded-sm"
        />
        <span className="text-sm font-medium">{location.name}</span>
      </div>
      <div className="flex items-center gap-2 text-sm opacity-80">
        <span>{current.temp_f}°F</span>
        <span className="text-white/70">➔</span>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(location.name);
          }}
          title="Remove this city"
          className="ml-1 text-white/70 hover:text-white bg-white/0 hover:bg-white/20 rounded-full p-1 transition-all duration-200 cursor-pointer"
        >
          ❌
        </button>
      </div>
    </div>
  );
}
