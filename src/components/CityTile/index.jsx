import React from "react";
import getCountryCode from "../../utils/getCountryISOCode";

export default function CityTile ({cityWeatherData}){
    console.log("We in the cityTile with cityWeatherData:", cityWeatherData)


    if (!cityWeatherData?.location || !cityWeatherData?.current) {
        return <div>Loading current weather...</div>;
    }
    
    const { location, current} = cityWeatherData;

    const country = location.country;
    const isoCode = getCountryCode(country)?.toLowerCase();
    const flagUrl = `https://flagcdn.com/48x36/${isoCode}.png`;

    return (
        <div className="current-location-tile">
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
                    {location.name}
                </span>
            </div>
            <div>
                {current.temp_f}
            </div>
            arrow icon
        </div>
    );
}
