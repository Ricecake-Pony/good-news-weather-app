import { WiHumidity, WiStrongWind, WiThermometer } from "react-icons/wi";
import { ClipLoader } from "react-spinners";

export default function TodaysSummary({ cityData }) {
  if (!cityData?.current || !cityData?.location) {
    return (
      <div className="flex justify-center items-center h-48">
        <ClipLoader color="#19a2f1" size={35} />
      </div>
    );
  }

  const { current } = cityData;

  return (
    <div className="w-full max-w-3xl mx-auto mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Feels Like */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white shadow-md flex flex-col items-center text-center gap-2">
        <WiThermometer className="text-3xl text-white/80" />
        <span className="text-sm opacity-80">Feels like</span>
        <span className="text-xl font-semibold">{current.feelslike_f}°F</span>
      </div>

      {/* Humidity */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white shadow-md flex flex-col items-center text-center gap-2">
        <WiHumidity className="text-3xl text-white/80" />
        <span className="text-sm opacity-80">Humidity</span>
        <span className="text-xl font-semibold">{current.humidity}%</span>
      </div>

      {/* Wind */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white shadow-md flex flex-col items-center text-center gap-2">
        <WiStrongWind className="text-3xl text-white/80" />
        <span className="text-sm opacity-80">Wind</span>
        <span className="text-xl font-semibold">{current.wind_mph} mph</span>
      </div>
    </div>
  );
}
