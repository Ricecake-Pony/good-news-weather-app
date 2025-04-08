export default function getOutdoorActivity(conditionText, tempF) {
    const condition = conditionText.toLowerCase();
    const isWarm = tempF > 75;
    const isCool = tempF < 55; 

    if (condition.includes("sun") || condition.includes("clear")) {
        const sunnyOptions = [
            isWarm ? "☀️ Perfect day for a hike and a refreshing lemonade!" : "☀️ Enjoy a leisurely bike ride around town.",
            isWarm ? "😎 Hit the park with a frisbee and some shades." : "🌤️ Perfect for a picnic with a good book.",
            isWarm ? "🍦 Grab an ice cream and stroll through a local market." : "🚶‍♀️ Explore a new walking trail in the area.",
            "🌻 Find a sunny spot and do some people-watching.",
            "🪁 Go fly a kite in an open field!",
            "🧺 Pack a brunch and enjoy it outdoors.",
            "🚴 Discover hidden gems on a sunny bike tour.",
            isWarm ? "💦 Head to a local splash pad or pool!" : "😊 Enjoy a relaxing walk in a sunny park.",
        ];
        return sunnyOptions[Math.floor(Math.random() * sunnyOptions.length)];
    }

    if (condition.includes("cloud")) {
        const cloudyOptions = [
            "🌥️ A perfect day for a contemplative walk in nature.",
            "☕ Enjoy a warm beverage on a patio.",
            "🚶‍♀️ Explore a local neighborhood on foot.",
            "🎨 Find inspiration in the muted light and try some outdoor art.",
            "📸 Capture the soft beauty of the cloudy sky.",
            "📖 Read a book on a park bench.",
            "🧘‍♀️ Practice some mindful breathing outdoors.",
            isCool ? "🧥 A light jacket might be nice for a cloudy stroll." : "😌 Enjoy the comfortably diffused sunlight.",
        ];
        return cloudyOptions[Math.floor(Math.random() * cloudyOptions.length)];
    }

    if (condition.includes("rain") || condition.includes("drizzle")) {
        const rainyOptions = [
            "🌧️ Embrace the cozy vibes with a good book indoors!",
            "☔️ Put on your boots and splash in some puddles (you're allowed!).",
            "💧 Visit a local museum or art gallery.",
            "☕️ Enjoy a warm drink and watch the rain from a cafe window.",
            "🪴 Water your plants – they'll thank you!",
            "🎲 Have a board game marathon indoors.",
            "✍️ Time for some creative writing or journaling.",
            isCool ? "🧤 A warm drink and cozy socks are highly recommended!" : "😌 Enjoy the calming sound of the rain from indoors.",
        ];
        return rainyOptions[Math.floor(Math.random() * rainyOptions.length)];
    }

    if (condition.includes("snow") || condition.includes("sleet")) {
        const snowyOptions = [
            "❄️ Time for a snowball fight (followed by hot cocoa!).",
            "☃️ Build a majestic snowman (or snow creature!).",
            "🛷 Find a gentle slope and go sledding!",
            "🚶‍♀️ Enjoy the quiet beauty of a snow-covered landscape.",
            "☕️ Warm up with a delicious bowl of ramen or soup.",
            "🧶 Cozy up by the window with a warm blanket.",
            "📖 Read a winter-themed story.",
            isCool ? "🧤 Don't forget your gloves and a warm hat!" : "😊 Enjoy the magical stillness of a snowy day.",
        ];
        return snowyOptions[Math.floor(Math.random() * snowyOptions.length)];
    }

    if (condition.includes("fog") || condition.includes("mist")) {
        const foggyOptions = [
            "🌫️ Embrace the mysterious atmosphere with a mindful walk.",
            "📸 Capture the eerie beauty of the fog.",
            "☕ Enjoy a warm drink and watch the world disappear into the mist.",
            "🚶‍♀️ Explore a familiar path in a new, foggy light.",
            "🎧 Listen to a captivating podcast.",
            "✍️ Let the fog inspire some creative writing.",
            "🧘‍♀️ Practice some grounding exercises in the stillness.",
            isCool ? "🧣 A scarf might feel nice in the cool, damp air." : "😌 Enjoy the quiet solitude that fog can bring.",
        ];
        return foggyOptions[Math.floor(Math.random() * foggyOptions.length)];
    }

    if (condition.includes("storm") || condition.includes("thunder")) {
        const stormyOptions = [
            "⛈️ Stay safe indoors and enjoy the dramatic show!",
            "🍿 Perfect time for a movie marathon!",
            "⚡️ Listen to the rumble and feel the power of nature.",
            "🎲 Have a board game or card game session.",
            "📖 Curl up with a thrilling book.",
            "✍️ Let the storm inspire some intense writing.",
            "🧘‍♀️ Practice some calming meditation.",
            isCool ? "🔥 A warm beverage by a fireplace sounds perfect!" : "😌 Enjoy the cozy atmosphere of a storm from indoors.",
        ];
        return stormyOptions[Math.floor(Math.random() * stormyOptions.length)];
    }

    const generalOptions = [
        "🌈 Explore a local café or try a new hobby today!",
        "🚶‍♀️ Take a walk and discover something new in your neighborhood.",
        "🌻 Find a peaceful spot to relax and observe your surroundings.",
        "🚴 Go for a spontaneous bike ride.",
        "🎨 Get creative with an outdoor art project.",
        "📸 Capture the beauty of the everyday.",
        "🌳 Spend some time in a local green space.",
        isCool ? "🧥 A light jacket might be useful." : "😊 Enjoy the day!",
    ];
    return generalOptions[Math.floor(Math.random() * generalOptions.length)];
}

