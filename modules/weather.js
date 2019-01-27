module.exports = async (client, message) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);
    const fetch = require("node-fetch");
    const weather = _.weatherFunctions;

    //Pre command
    if (!await _.preCommand(client, message, "Weather", 3000)) return;

    //Get params
    let query = message.content.split(" ").slice(1).join(" ");

    //No query
    if (query === "") return _.send({
        client,
        id: "weather no location",
        channel: message.channel,
        message: "You must provide a location name!",
        emoji: "x"
    });

    //Fetch
    let data = await fetch(`http://api.openweathermap.org/data/2.5/weather?APPID=${process.env.WEATHER_API_KEY}&units=imperial&q=${query}`);
    data = await data.json();

    //No results
    if (!data.hasOwnProperty("name")) return _.send({
        client,
        id: "weather no results",
        channel: message.channel,
        message: "I couldn't find a location with that name!",
        emoji: "x"
    });

    //Embed
    let embed = new Discord.RichEmbed()
        .setAuthor(`Weather for ${data.name}`, `http://openweathermap.org/img/w/${data.weather[0].icon}.png`)
        .setDescription(data.weather[0].main)
        .setColor(_.colors.geola)
        .addField("Humidity", `${data.main.humidity}%`, true)
        .addField("Temperature", `${data.main.temp}°F / ${weather.toCelsius(data.main.temp)}°C`, true)
        .addField("Pressure", `${data.main.pressure} hPa`, true)
        .addField("Cloudiness", `${data.clouds.all}%`, true)
        .addField("Wind Speed", `${data.wind.speed} mph / ${weather.toMS(data.wind.speed)} m/s`, true)
        .addField("Wind Direction", weather.toDirection(data.wind.deg), true);

    if (data.hasOwnProperty("rain")) embed.addField("Rain", `${data.rain["1h"]} in / ${weather.toCM(data.rain["1h"])} cm (Past hour)`, true);
    if (data.hasOwnProperty("snow")) embed.addField("Snow", `${data.snow["1h"]} in / ${weather.toCM(data.snow["1h"])} cm (Past hour)`, true);

    //Send
    message.channel.send(embed);

    //Post command
    await _.postCommand(client, message, "Weather");
};