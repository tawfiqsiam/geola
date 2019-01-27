module.exports = (client, { id, data: autorole }, { server }) => {

    //Remove autorole
    if ((!autorole) && (server.data.autoroles.includes(id))) return server.data.autoroles.splice(server.data.autoroles.indexOf(id), 1);

    //Get role
    const role = server.roles.get(id);

    //No role
    if (!role) return;

    //Add autorole
    server.data.autoroles.push(role.id);
};