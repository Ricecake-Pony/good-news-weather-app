import ForecastHourlyTile from "../ForecastHourlyTile"

export default function ForecastHourly ({cityData}){
    const { forecast } = cityData
    const hours = forecast.forecastday[0].hour
    return(
        <>
		{hours.map( hour => {
            <ForecastHourlyTile hourlyData={hour}/>
		})}
        </>
    )
    
}