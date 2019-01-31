module.exports = (client, { id, data: selfRole }, { server }) => {

    //Remove self role
    if (!selfRole) {
        if (server.data.selfRoles.includes(id)) server.data.selfRoles.splice(server.data.selfRoles.indexOf(id), 1);
        return;
    }

    //Get role
    const role = server.roles.get(id);

    //No role
    if (!role) return;

    //Add self role
    server.data.selfRoles.push(role.id);
};