module.exports = guild => {

    guild.owner.value = `${guild.owner.value} (${guild.owner.id})`;
    if ((!guild.iconURL.value) || (guild.iconURL.value === "")) guild.iconURL.value = "*None*";
    guild.afkChannel.value = ((!guild.afkChannel.value) || (guild.afkChannel.value === "")) ? "*None*" : `${guild.afkChannel.value} (${guild.afkChannel.id})`;
    if ((!guild.splashURL.value) || (guild.splashURL.value === "")) guild.splashURL.value = "*None*";
    guild.systemChannel.value = ((!guild.systemChannel.value) || (guild.systemChannel.value === "")) ? "*None*" : `${guild.systemChannel.value} (${guild.systemChannel.id})`;
    guild.verificationLevel.value = [
        "None",
        "Low",
        "Medium",
        "(╯°□°）╯︵ ┻━┻",
        "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻"
    ][guild.verificationLevel.value];
    guild.explicitContentFilter.value = [
        "Don't scan any messages",
        "Scan messages from members without a role",
        "Scan messages sent by all members"
    ][guild.explicitContentFilter.value];
    guild.afkTimeout.value = {
        "60": "1 Minute",
        "300": "5 Minutes",
        "900": "15 Minutes",
        "1800": "30 Minutes",
        "3600": "1 Hour"
    }[guild.afkTimeout.value];
    guild.region.value = {
        "brazil": "Brazil",
        "eu-central": "Central Europe",
        "hongkong": "Hong Kong",
        "russia": "Russia",
        "singapore": "Singapore",
        "sydney": "Sydney",
        "us-central": "US Central",
        "us-east": "US East",
        "us-south": "US South",
        "us-west": "US West",
        "eu-west": "Western Europe",
        "southafrica": "South Africa",
        "japan": "Japan",
        "india": "India",
        "vip-brazil": "Brazil (VIP)",
        "vip-eu-central": "Central Europe (VIP)",
        "vip-hongkong": "Hong Kong (VIP)",
        "vip-russia": "Russia (VIP)",
        "vip-singapore": "Singapore (VIP)",
        "vip-sydney": "Sydney (VIP)",
        "vip-us-central": "US Central (VIP)",
        "vip-us-east": "US East (VIP)",
        "vip-us-south": "US South (VIP)",
        "vip-us-west": "US West (VIP)",
        "vip-eu-west": "Western Europe (VIP)",
        "vip-southafrica": "South Africa (VIP)",
        "vip-japan": "Japan (VIP)",
        "vip-india": "India (VIP)"
    }[guild.region.value];

    return guild;
};