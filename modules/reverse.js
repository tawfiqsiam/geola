module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Reverse", 2000)) return;

    //Get params
    let target = message.content.split(" ").slice(1).join(" ");

    //No target
    if (target === "") return _.send({
        client,
        id: "nothing reverse",
        channel: message.channel,
        message: "What would you like me to reverse?",
        emoji: "x"
    });

    //Edit for tags
    const users = target.match(/<@!?[0-9]+>/g);
    const channels = target.match(/<#([0-9]+)>/g);
    const roles = target.match(/<@&[0-9]+>/g);

    if (users) users.forEach(u => {
        let user = client.users.get(u.replace(/[<>@!]/g, ""));
        if (user) target = target.replace(u, `@${user.tag}`);
    });
    if (channels) channels.forEach(c => {
        let channel = message.guild.channels.get(c.replace(/[<>#]/g, ""));
        if (channel) target = target.replace(c, `#${channel.name}`);
    });
    if (roles) roles.forEach(r => {
        let role = message.guild.roles.get(r.replace(/[<>@&]/g, ""));
        if (role) target = target.replace(r, `@${role.name}`);
    });

    //Reverse
    target = target.split("").reverse().join("");

    //Send
    message.channel.send(`:leftwards_arrow_with_hook:  **|  ${target}**`);

    //Post command
    await _.postCommand(client, message, "Reverse");
};