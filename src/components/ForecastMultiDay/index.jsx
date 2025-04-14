import Slider from "react-slick";
import { ClipLoader } from "react-spinners";
import ForecastDailyCard from "../ForecastDailyCard";

export default function ForecastMultiDay({ cityData }) {
  if (!cityData?.current || !cityData?.location) {
    return (
      <div className="flex justify-center items-center h-48">
        <ClipLoader color="#19a2f1" size={35} />
      </div>
    );
  }

  const { forecast, location } = cityData;
  const localToday = location.localtime.split(" ")[0];

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
    <div className="w-full max-w-6xl mx-auto mt-6 px-4">
      <Slider {...settings}>
        {validForecast.map((day) => (
          <div key={day.date} className="px-2">
            <ForecastDailyCard
              key={day.date}
              day={day}
              location={location}
              isToday={day.date === localToday}
              isHottest={day.day.maxtemp_f === hottestTemp}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
