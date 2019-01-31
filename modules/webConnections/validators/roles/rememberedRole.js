module.exports = (client, { id, data: rememberedRole }, { server }) => {

    //Remove remembered role
    if (!rememberedRole) {
        if (server.data.rememberedRoles.includes(id)) server.data.rememberedRoles.splice(server.data.rememberedRoles.indexOf(id), 1);
        return;
    }

    //Get role
    const role = server.roles.get(id);

    //No role
    if (!role) return;

    //Add remembered role
    server.data.rememberedRoles.push(role.id);
};