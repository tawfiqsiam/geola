module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);
    const { exec } = require("child_process");

    //Restrict command
    if (message.author.id !== client.apixel.id) return;

    //Get params
    let command = message.content.split(" ").slice(1).join(" ");

    //No command
    if (command === "") return message.channel.send(`:x:  **|  Bitch you dumb as hell wheres the command ${client.emojis.get("497633097769287691").toString().repeat(3)}**`);

    //Execute
    exec(command, async (err, output, error) => {

        let result;
        if (error) {
            //Error

            //Parse error
            if (error.toString().length > 2000 - 18) error = await _.paste({
                name: "Execute",
                description: "Execute Error",
                content: error.toString()
            });
            else error = `\`\`\`\n${error}\`\`\``;

            result = `**Error:**\n${error}`;
        }
        else {
            //Output

            //Parse output
            if (output.length > 2000 - 19) output = await _.paste({
                name: "Execute",
                description: "Execute Output",
                content: output
            });
            else output = `\`\`\`\n${output}\`\`\``;

            result = `**Output:**\n${output}`;
        }

        //Send
        message.channel.send(result);
    });
};