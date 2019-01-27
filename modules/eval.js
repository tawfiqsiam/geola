module.exports = async (client, message) => {

    //Pre Module
    const { chalk } = client.modules.misc.preModule(client);

    //Restrict command
    if (message.author.id !== client.apixel.id) return;

    //Get params
    let code = message.content.split("eval").slice(1).join("eval");

    //Parse code
    code = `
        async function func() {
            ${code}
        }

        func();
    `;

    //Eval
    try {

        eval(code);

        message.channel.send(":white_check_mark:  **|  Done!**");
    }
    catch (err) {

        console.log(chalk.red(err));

        message.channel.send(":x:  **|  Error has been logged to the console!**");
    }
};