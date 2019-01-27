module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Get words
    const words = message.guild.data.forbiddenWords;
    if (!words) return; //no words

    //Loop through each word
    words.forEach(async word => {

        //Match
        if (
            (message.content.toLowerCase().replace(/[^a-zA-Z\d\s]/g, "").split(" ").includes(word.toLowerCase().replace(/[^a-zA-Z\d\s]/g, ""))) ||
            (message.content.toLowerCase().replace(/\W/g, "") === word.toLowerCase().replace(/\W/g, ""))
        ) {

            //Delete message
            const deleted = await _.promise(message.delete(), true);

            if (deleted) await _.stats(client, "Forbidden Words Deleted"); //stats if deleted

            return;
        }
    });
};