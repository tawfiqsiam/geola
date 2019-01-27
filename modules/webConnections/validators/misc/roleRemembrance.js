module.exports = (client, roleRemembrance, { server }) => {

    //Set role remembrance
    server.data.roleRemembrance = roleRemembrance ? true : undefined;
};