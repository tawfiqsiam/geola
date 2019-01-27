module.exports = (client, { id, data: selfRole }, { server }) => {

    //Remove self role
    if ((!selfRole) && (server.data.selfRoles.includes(id))) return server.data.selfRoles.splice(server.data.selfRoles.indexOf(id), 1);

    //Get role
    const role = server.roles.get(id);

    //No role
    if (!role) return;

    //Add self role
    server.data.selfRoles.push(role.id);
};