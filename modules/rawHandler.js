module.exports = async (client, packet) => {

    //Filter events
    if (!["MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE", "MESSAGE_REACTION_REMOVE_ALL"].includes(packet.t)) return;

    //Get channel
    const channel = client.channels.get(packet.d.channel_id);
    if (channel.messages.has(packet.d.message_id)) return; //Message is cached, event will fire normally

    //Fetch message
    const message = await channel.fetchMessage(packet.d.message_id);

    if ((packet.t === "MESSAGE_REACTION_ADD") || (packet.t === "MESSAGE_REACTION_REMOVE")) {
        //Reaction added/removed

        //Get user
        const user = client.users.get(packet.d.user_id);

        //Get emoji
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;

        //Get reaction
        const reaction = message.reactions.get(emoji);

        //Emit normal event
        client.emit(packet.t === "MESSAGE_REACTION_ADD" ? "messageReactionAdd" : "messageReactionRemove", reaction, user);
    }
    else if (packet.t === "MESSAGE_REACTION_REMOVE_ALL") {
        //Reactions cleared

        //Emit normal event
        client.emit("messageReactionRemoveAll", message);
    }
};