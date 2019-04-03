module.exports = (client, { data: disabledCommands }, { channel }) => {

    //Set disabled commands
    channel.data.disabledCommands = disabledCommands;
};