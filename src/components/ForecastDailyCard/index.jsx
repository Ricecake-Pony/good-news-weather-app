export default function ForecastDailyCard({ day }) {
  const { date, day: dayData } = day;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white shadow-md flex flex-col items-center text-center gap-2">
      <span className="text-sm opacity-80">{formattedDate}</span>
      <img
        src={`https:${dayData.condition.icon}`}
        alt={dayData.condition.text}
        className="w-10 h-10"
      />
      <span className="text-xs opacity-70">{dayData.condition.text}</span>
      <div className="text-base font-semibold">
        {dayData.maxtemp_f}°F / {dayData.mintemp_f}°F
      </div>
    </div>
  );
}
