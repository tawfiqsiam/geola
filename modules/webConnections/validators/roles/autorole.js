module.exports = (client, { id, data: autorole }, { server }) => {

    //Remove autorole
    if (!autorole) {
        if (server.data.autoroles.includes(id)) server.data.autoroles.splice(server.data.autoroles.indexOf(id), 1);
        return;
    }

    //Get role
    const role = server.roles.get(id);

    //No role
    if (!role) return;

    //Add autorole
    server.data.autoroles.push(role.id);
};