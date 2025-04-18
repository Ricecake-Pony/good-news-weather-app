import Slider from "react-slick";
import { ClipLoader } from "react-spinners";
import ForecastDailyCard from "../ForecastDailyCard";

export default function ForecastMultiDay({ cityData }) {
  if (!cityData?.current || !cityData?.location) {
    return (
      <div className="flex justify-center w-full py-4">
        <ClipLoader color="#19a2f1" size={35} />
      </div>
    );
  }

  const { forecast, location } = cityData;
  const cityLocalDate = new Date(cityData.location.localtime)
    .toISOString()
    .split("T")[0];

  const localTime = location.localtime.split(" ")[1];

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
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
    ...forecast.forecastday.map((day) => day.day.maxtemp_f)
  );

  return (
    <div className="w-full max-w-[740px] mx-auto px-4 mt-2 md:mt-4">
      <div
        aria-label="Daily Weather Forecast"
        className="bg-black/10 backdrop-blur-md p-4 rounded-xl shadow-md ring-1 ring-white/20"
      >
        <Slider {...settings}>
          {forecast.forecastday.map((day) => {
            const isCurrentDay = day.date === cityLocalDate;
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
