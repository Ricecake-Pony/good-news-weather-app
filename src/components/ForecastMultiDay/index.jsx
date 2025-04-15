import Slider from "react-slick";
import { ClipLoader } from "react-spinners";
import ForecastDailyCard from "../ForecastDailyCard";

export default function ForecastMultiDay({ cityData }) {
  if (!cityData?.current || !cityData?.location) {
    return (
      <div className="flex overflow-x-auto gap-4 snap-x scroll-smooth px-4 pb-2">
        <ClipLoader color="#19a2f1" size={35} />
      </div>
    );
  }

  const { forecast, location } = cityData;
  const localToday = location.localtime.split(" ")[0];
  const localTime = location.localtime.split(" ")[1];

  const validForecast = forecast.forecastday.filter(
    (day) => day.date >= localToday
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const hottestTemp = Math.max(
    ...validForecast.map((day) => day.day.maxtemp_f)
  );

  return (
    <div className="w-full px-4">
      <div
        aria-label="Daily Weather Forecast"
        className="bg-black/10 backdrop-blur-md p-4 rounded-xl shadow-md ring-1 ring-white/20"
      >
        <Slider {...settings}>
          {validForecast.map((day) => {
            const isCurrentDay = day.date === localToday;
            return (
              <div key={day.date} className="px-2">
                <ForecastDailyCard
                  day={day}
                  location={location}
                  isToday={isCurrentDay}
                  isHottest={day.day.maxtemp_f === hottestTemp}
                  localTime={isCurrentDay ? localTime : null}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
