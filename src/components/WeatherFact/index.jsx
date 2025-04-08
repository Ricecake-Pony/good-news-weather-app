import React, {useContext} from "react";
import { WeatherContext } from "../../context/WeatherContext";
import getWeatherFactCategory from "../../utils/getWeatherFactCategory";

const weatherFacts = {
	sunny: [
		"Sunlight takes about 8 minutes and 20 seconds to travel from the Sun to Earth.",
		"The Sun is actually a white star, but it appears yellow due to Earth's atmosphere scattering blue light.",
		"On a clear sunny day, about 80% of the sunlight reaches the Earth's surface.",
		"The ancient Egyptians worshipped the Sun god Ra.",
		"Photosynthesis, the process that allows plants to grow, relies on sunlight.",
		"Wearing light-colored clothes reflects more sunlight and helps you stay cooler.",
		"Sunspots are cooler, darker areas on the Sun's surface.",
		"The UV index tells you the strength of the sun's ultraviolet radiation.",
		"Solar flares are sudden releases of energy from the Sun's surface.",
		"Sunglasses protect your eyes from harmful UV rays.",
	],
	clear: [
		"Clear skies at night allow you to see the stars and other celestial bodies more easily.",
		"The absence of clouds means that the Earth's surface can cool down more quickly at night.",
		"Clear air has less water vapor, which can affect humidity levels.",
		"Astronomers prefer clear nights for optimal telescope viewing.",
		"Clear days often have higher UV radiation levels, so sun protection is still important.",
		"You can often see the Milky Way galaxy on a very clear, dark night.",
		"The twinkling of stars is caused by the refraction of light through Earth's turbulent atmosphere.",
		"Clear skies are ideal for observing meteor showers.",
		"The color of the sky on a clear day is due to Rayleigh scattering.",
		"Without clouds, you can often see the horizon more distinctly.",
	],
	partly_cloudy: [
		"Partly cloudy skies mean that between 3/8ths and 5/8ths of the sky is covered by clouds.",
		"The mix of sun and clouds can create interesting patterns and shadows on the ground.",
		"Temperatures on partly cloudy days can fluctuate as clouds block and then allow sunlight through.",
		"Many beautiful sunsets and sunrises occur on partly cloudy days.",
		"Clouds can reflect some sunlight back into space, helping to regulate Earth's temperature.",
		"The appearance of clouds can change rapidly on a partly cloudy day.",
		"You might see different types of clouds, like cumulus and cirrus, at the same time.",
		"Partly cloudy conditions are often associated with fair weather.",
		"Pilots rely on visual flight rules (VFR) which are often possible in partly cloudy conditions.",
		"The contrast between bright sunlit areas and shaded clouds can be visually striking.",
	],
	cloudy: [
		"Cloudy skies mean that more than 7/8ths of the sky is covered by clouds.",
		"Clouds are made up of tiny water droplets or ice crystals.",
		"Different types of clouds form at different altitudes and have different compositions.",
		"Cloud cover can significantly reduce the amount of sunlight reaching the surface.",
		"Cloudy days can sometimes feel warmer at night because the clouds trap some of the Earth's heat.",
		"Stratus clouds are often associated with overcast and gray skies.",
		"Nimbus clouds are rain-bearing clouds.",
		"The thickness of clouds determines how much sunlight they block.",
		"Cloudy days can still have varying levels of brightness.",
		"Some cloudy days can be quite beautiful with dramatic cloud formations.",
	],
	rain: [
		"Raindrops aren't teardrop-shaped; they are more like flattened spheres.",
		"The smell after rain is caused by a chemical called geosmin, produced by soil bacteria.",
		"Acid rain is caused by pollution in the atmosphere.",
		"The wettest place on Earth, on average, is Mawsynram, India.",
		"Rain is essential for most forms of life on Earth.",
		"The size of raindrops varies depending on the type of rain and atmospheric conditions.",
		"Too much rain can lead to flooding.",
		"Some cultures have rain dances to pray for precipitation.",
		"The sound of rain can be very relaxing for many people.",
		"Rainbows are formed by the refraction and reflection of light in water droplets.",
	],
	drizzle: [
		"Drizzle consists of very small water droplets, typically less than 0.5 millimeters in diameter.",
		"Drizzle often falls from low-lying stratus clouds.",
		"While light, drizzle can still reduce visibility.",
		"It can sometimes be hard to tell if it's drizzling or if there's a very light fog.",
		"Drizzle can make surfaces slippery.",
		"Drizzle can accumulate over time and lead to significant wetness.",
		"It's often described as a misty rain.",
		"Drizzle can sometimes feel like a persistent dampness in the air.",
		"You might not always need an umbrella for light drizzle.",
		"Drizzle can affect driving conditions, especially visibility.",
	],
	thunder: [
		"Thunder is the sound caused by the rapid heating of air around a lightning strike, which causes it to expand explosively.",
		"You can estimate how far away lightning is by counting the seconds between the flash and the thunder (about 5 seconds per mile).",
		"Thunder can travel for many miles.",
		"Not all lightning produces audible thunder, especially if it's far away.",
		"The sound of thunder can vary depending on the shape and path of the lightning channel.",
		"The rumbling sound of thunder is due to the sound waves bouncing off different air masses.",
		"Heat lightning is lightning that is too far away for the thunder to be heard.",
		"You are safest indoors during a thunderstorm.",
		"Lightning can strike the same place multiple times.",
		"The temperature of a lightning channel can reach 50,000 degrees Fahrenheit.",
	],
	storm: [
		"A storm is a disturbance of the normal condition of the atmosphere, often involving strong winds, heavy rain, snow, or other severe weather.",
		"Storms play a crucial role in the Earth's climate system by redistributing heat and moisture.",
		"Different types of storms include thunderstorms, hurricanes, blizzards, and dust storms.",
		"Forecasting the intensity and path of storms is a complex scientific process.",
		"Taking precautions during severe storms is essential for safety.",
		"Storm surges are a dangerous hazard associated with coastal storms.",
		"Hail is a form of precipitation consisting of balls or irregular lumps of ice.",
		" derechos are widespread, long-lived straight-line windstorms.",
		"Storm chasers are people who pursue severe weather events for scientific or personal reasons.",
		"Climate change is expected to influence the frequency and intensity of some types of storms.",
	],
	snow: [
		"No two snowflakes are exactly alike.",
		"Snowflakes form when water vapor freezes onto tiny dust particles in the atmosphere.",
		"The shape of a snowflake depends on the temperature and humidity of the air it passes through.",
		"Snow can insulate the ground, protecting plants and hibernating animals from extreme cold.",
		"Blizzards are severe snowstorms with strong winds and reduced visibility.",
		"The study of snow and ice is called glaciology.",
		"Avalanches are rapid flows of snow down a slope.",
		"Snow can reflect a large percentage of sunlight.",
		"The sound of falling snow can be very quiet.",
		"Different types of snow include powder, crust, and wet snow.",
	],
	sleet: [
		"Sleet consists of small, translucent balls of ice that form when rain freezes as it falls through a layer of freezing air.",
		"Sleet can bounce when it hits the ground.",
		"It often occurs when there's a shallow layer of freezing air near the surface.",
		"Sleet can make roads and sidewalks very slippery.",
		"The sound of sleet hitting a window is often described as a tapping or clicking.",
		"Sleet is different from hail, which forms in thunderstorms.",
		"Freezing rain occurs when rain freezes upon contact with a sub-freezing surface, unlike sleet which freezes in the air.",
		"Sleet can accumulate and make travel dangerous.",
		"It's often associated with winter storms.",
		"The density of sleet can vary.",
	],
	fog: [
		"Fog is essentially a cloud that is in contact with the ground.",
		"Fog forms when the air near the surface cools to its dew point, causing water vapor to condense.",
		"Visibility can be severely reduced in dense fog.",
		"Coastal fog forms when warm, moist air moves over cooler ocean water.",
		"Fog can sometimes lift or dissipate with the warmth of the sun.",
		"Radiation fog forms on clear, calm nights when the ground cools rapidly.",
		"Advection fog occurs when warm, moist air moves horizontally over a cooler surface.",
		"Fog can create beautiful but sometimes hazardous conditions.",
		"Airports often have low visibility procedures for foggy conditions.",
		"The term 'pea soup fog' refers to very thick, yellow-brown fog.",
	],
	mist: [
		"Mist is similar to fog but is less dense, with visibility greater than 1 kilometer (0.62 miles).",
		"Mist often occurs in the early morning or after rain.",
		"The small water droplets in mist can make surfaces feel damp.",
		"Mist can create a hazy or ethereal appearance in the landscape.",
		"It's often said that 'mist kisses while fog smothers'.",
		"Mist can dissipate quickly as the sun rises.",
		"It can add a sense of depth and atmosphere to photographs.",
		"Mist can be common in valleys and near bodies of water.",
		"Driving in mist requires caution due to reduced visibility.",
		"The formation of mist involves condensation of water vapor in the air.",
	],
	windy: [
		"Wind is caused by differences in air pressure.",
		"The speed of wind is measured with an anemometer.",
		"Strong winds can transport dust and sand over long distances.",
		"Wind power is a renewable source of energy.",
		"The Beaufort scale is used to describe wind speed based on observed conditions.",
		"Wind direction is usually reported as the direction from which the wind is blowing.",
		"Chinook winds are warm, dry winds that descend the eastern slope of the Rocky Mountains.",
		"Hurricanes and tornadoes have extremely high wind speeds.",
		"Wind can play a crucial role in pollination for some plants.",
		"Wind chill is the apparent temperature felt on exposed skin due to the combination of air temperature and wind speed.",
	],
	calm: [
		"Calm conditions mean there is little to no wind.",
		"On a calm day, smoke rises vertically.",
		"Still air can sometimes feel warmer or colder because there is no wind to aid in heat transfer.",
		"Calm waters often reflect the sky like a mirror.",
		"Early mornings are often the calmest part of the day.",
		"A perfectly calm day is rare in many locations.",
		"Sailing can be challenging in calm conditions.",
		"Calm weather is often preferred for outdoor activities like fishing or kayaking.",
		"The absence of wind can sometimes lead to stagnant air and increased pollution in urban areas.",
		"Wildlife often behaves differently in calm versus windy conditions.",
	],
	hot: [
		"The hottest temperature ever recorded on Earth was 134°F (56.7°C) in Death Valley, California.",
		"Extreme heat can lead to heatstroke and other health issues.",
		"Hot air can hold more moisture than cold air.",
		"Deserts are characterized by their high temperatures and low precipitation.",
		"Many animals have adaptations to survive in hot climates.",
		"The urban heat island effect can make cities significantly hotter than surrounding rural areas.",
		"Sweating is the body's natural mechanism for cooling down in hot weather.",
		"Heat waves are prolonged periods of excessively hot weather.",
		"Certain materials can feel hotter to the touch because they absorb more heat.",
		"Drinking plenty of water is crucial for staying safe in hot weather.",
	],
	cold: [
		"The coldest temperature ever recorded on Earth was -128.6°F (-89.2°C) at Vostok Station in Antarctica.",
		"Extreme cold can lead to hypothermia and frostbite.",
		"Cold air is denser than warm air.",
		"The Arctic and Antarctic regions experience extremely cold temperatures.",
		"Many animals have adaptations to survive in cold climates, such as thick fur or blubber.",
		"Wind chill can make cold temperatures feel even colder.",
		"Snow and ice can create beautiful but also hazardous conditions in cold weather.",
		"Proper insulation is essential for staying warm in cold environments.",
		"Antifreeze is used in vehicles to prevent fluids from freezing in cold temperatures.",
		"Some plants can survive freezing temperatures by going dormant.",
	],
};

export default function WeatherFact() {
    const {activeCity} = useContext(WeatherContext)
	const condition = activeCity?.current?.condition?.text?.toLowerCase();
    const conditionText = activeCity?.current?.condition?.text || "";
	const category = getWeatherFactCategory(conditionText);

	const factList = weatherFacts[category] || [];

	let fact = "The weather is full of surprises!";
	if (factList.length > 0) {
		fact = factList[Math.floor(Math.random() * factList.length)];
	}

	return (
		<div className="weather-fact">
			<h3>Did You Know?</h3>
			<p>{fact}</p>
		</div>
	);
}
