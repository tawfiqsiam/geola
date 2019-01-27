module.exports = (client, { id, data: muteRole }, { server }) => {

    //Remove mute role
    if (!muteRole) return server.data.muteRole = undefined;

    //Get role
    const role = server.roles.get(id);

    //No role
    if (!role) return;

    //Set mute role
    server.data.muteRole = role.id;
};