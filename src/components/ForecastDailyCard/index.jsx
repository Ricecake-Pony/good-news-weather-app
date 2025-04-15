export default function ForecastDailyCard({
  day,
  isToday,
  isHottest,
  localTime,
}) {
  const { date, day: dayData } = day;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className={`relative min-w-[140px] min-h-[225px] snap-start rounded-xl p-4 flex flex-col items-center gap-2 transition-all duration-300
    ${isToday ? "bg-sky-500/20 ring-2 ring-sky-300 shadow-lg" : ""}
    ${
      isHottest
        ? "bg-yellow-500/20 ring-2 ring-yellow-300 shadow-lg"
        : "bg-gray-800/50"
    }
    backdrop-blur-md text-white
    before:absolute before:inset-0 before:rounded-xl before:bg-white/5 before:blur-xl before:z-[-1]`}
    >
      <div className="flex flex-col items-center">
        <span className="text-sm opacity-70">
          {isToday ? "Today" : formattedDate}
        </span>
        {isToday && localTime && (
          <span className="text-xs opacity-50">{localTime}</span>
        )}
      </div>

      <div className="relative w-14 h-14 flex items-center justify-center">
        <div className="absolute inset-0 bg-white/5 rounded-full -z-10 blur-sm"></div>
        <img
          src={`https:${dayData.condition.icon}`}
          alt={dayData.condition.text}
          className="w-full h-full object-contain"
        />
        {isHottest && (
          <div className="absolute top-0 right-0 w-5 h-5 rounded-full bg-yellow-400 text-yellow-900 text-xs flex items-center justify-center animate-pulse">
            🔥
          </div>
        )}
      </div>

      <span className="text-xs opacity-60 text-center">
        {dayData.condition.text}
      </span>

      <div className="text-base font-semibold flex items-center gap-1">
        <span className="text-orange-400 font-bold">{dayData.maxtemp_f}°F</span>
        <span className="text-white/50">|</span>
        <span className="text-blue-400 font-bold">{dayData.mintemp_f}°F</span>
      </div>
      <div className="w-full h-1 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full opacity-60 mt-1"></div>
    </div>
  );
}
