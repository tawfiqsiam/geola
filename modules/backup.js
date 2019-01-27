module.exports = async (client, message) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!await _.isDev(client, message.author)) return;

    //Loop through each model
    const date = new Date();
    const time = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}-${Date.now()}`;
    for (let m in models) {

        models[m].aggregate([
            { $out: `~${m}-${time}` }
        ]).exec();
    }

    //Send
    message.channel.send(":white_check_mark:  **|  Done!**");
};