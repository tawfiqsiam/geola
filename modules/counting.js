module.exports = async (client, message) => {

    //Not a counting channel
    if (!message.channel.data.counting) return;

    //Has enter
    if (message.content.includes("\n")) return message.delete().catch(() => { });

    //Has attachment
    if (message.attachments.size > 0) return message.delete().catch(() => { });

    //Has embed
    if (message.embeds.length > 0) return message.delete().catch(() => { });

    //Check for valid number
    const number = parseInt(message.content);
    if ((isNaN(number)) || (number < 1)) return message.delete().catch(() => { });

    //Fetch last 2 messages
    const msgs = (await message.channel.fetchMessages({ limit: 2 })).array();

    if ((msgs.length === 1) && (number !== 1)) return message.delete().catch(() => { }); //first message
    else if (msgs.length > 1) {
        let oldNumber = parseInt(msgs[1].content);
        if ((isNaN(oldNumber)) || (oldNumber < 0)) oldNumber = 0; //incase counting is starting on a non-counting, non-new channel
        if (oldNumber + 1 !== number) return message.delete().catch(() => { }); //number doesnt increment properly
    }
};