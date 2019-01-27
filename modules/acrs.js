module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);
    const memberData = message.member.data;

    //Get acr
    const acr = message.guild.data.acrs.find(a => a.trigger.toLowerCase().replace(/\s+/g, "") === message.content.toLowerCase().replace(/\s+/g, ""));
    if (!acr) return;

    //Minimum level
    if ((acr.minLevel) && (memberData.xp.level < acr.minLevel)) return;

    //Whitelisted channels
    if ((acr.whitelistedChannels.length > 0) && (!acr.whitelistedChannels.includes(message.channel.id))) return;

    //Blacklisted channels
    if ((acr.blacklistedChannels.length > 0) && (acr.blacklistedChannels.includes(message.channel.id))) return;

    //Whitelisted roles
    if ((acr.whitelistedRoles.length > 0) && (!acr.whitelistedRoles.some(r => message.member.roles.has(r)))) return;

    //Blacklisted roles
    if ((acr.blacklistedRoles.length > 0) && (acr.blacklistedRoles.some(r => message.member.roles.has(r)))) return;

    //Cooldown
    if (acr.cooldown) {
        let cooldown = memberData.acrCooldowns.find(c => c.trigger === acr.trigger);
        cooldown = (cooldown && cooldown.cooldown) || 0;
        if (cooldown > Date.now()) return _.send({
            client,
            id: "acrs cooldown",
            channel: message.channel,
            message: "You're using that command too quickly! Please wait another {VAR1} seconds!",
            emoji: "x",
            vars: [Math.ceil((cooldown - Date.now()) / 1000)]
        });
    }

    //Pre command
    if (!await _.preCommand(client, message, null, 3000)) return;

    //Not enough currency
    if ((acr.removeCurrency) && (memberData.currency < acr.removeCurrency)) return _.send({
        client,
        id: "acrs not enough currency",
        channel: message.channel,
        message: "This command requires you to have {VAR1} {VAR2} but you only have {VAR3} {VAR2}!",
        emoji: "x",
        vars: [acr.removeCurrency, message.guild.data.currencyName, memberData.currency]
    });

    //No enough roles
    if ((acr.removeRoles.length > 0) && (!acr.removeRoles.some(r => message.member.roles.has(r)))) return _.send({
        client,
        id: "acrs not enough roles",
        channel: message.channel,
        message: "You don't have all the roles required by this command!",
        emoji: "x"
    });

    //Message
    if (acr.messages.length > 0) message.channel.send(
        acr.messages[Math.floor(Math.random() * acr.messages.length)]
            .replace(/{@user}/ig, message.author)
            .replace(/{user}/ig, message.author.username)
            .replace(/{tag}/ig, message.author.tag)
            .replace(/{userid}/ig, message.author.id)
            .replace(/{server}/ig, message.guild.name)
            .replace(/{serverid}/ig, message.guild.id)
            .replace(/{members}/ig, message.guild.memberCount)
            .replace(/{membercount}/ig, message.guild.memberCount)
    );

    //Add roles
    await message.member.addRoles(acr.addRoles).catch(() => { });

    //Remove roles
    await message.member.removeRoles(acr.removeRoles).catch(() => { });

    //Delete trigger
    if (acr.deleteTrigger) message.delete();

    //Add currency
    if (acr.addCurrency) memberData.currency = memberData.currency + acr.addCurrency;

    //Remove currency
    if (acr.removeCurrency) memberData.currency = memberData.currency - acr.removeCurrency;

    //Add items
    acr.addItems.forEach(i => memberData.inv[i.name] = memberData.inv[i.name] + i.amount || i.amount);

    //Remove items
    acr.removeItems.forEach(i => {
        memberData.inv[i.name] = memberData.inv[i.name] - i.amount;
        if (!memberData.inv[i.name]) delete memberData.inv[i.name];
        memberData.markModified("inv");
    });

    //Set cooldown
    if (acr.cooldown) {
        let cooldown = memberData.acrCooldowns.find(c => c.trigger === acr.trigger);
        if (!cooldown) memberData.acrCooldowns.push({ trigger: acr.trigger });
        cooldown = memberData.acrCooldowns.find(c => c.trigger === acr.trigger);
        cooldown.cooldown = Date.now() + acr.cooldown;
    }
};