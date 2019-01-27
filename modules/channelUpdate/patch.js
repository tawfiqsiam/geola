module.exports = channel => {

    if ((!channel.name.value) || (channel.name.value === "")) channel.name.value = "*None*";
    if ((!channel.topic.value) || (channel.topic.value === "")) channel.topic.value = "*None*";
    channel.nsfw.value = channel.nsfw.value ? "YEAH!" : "Nope";

    return channel;
};