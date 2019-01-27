module.exports = (client, nicknameRemembrance, { server }) => {

    //Set nickname remembrance
    server.data.nicknameRemembrance = nicknameRemembrance ? true : undefined;
};