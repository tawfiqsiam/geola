module.exports = (client, { id, data: roles }, { server }) => {

    //Get acr
    const acr = server.data.acrs.find(a => a.trigger === id);

    //Set roles
    acr.addRoles = [];
    acr.removeRoles = [];
    roles.forEach(r => {
        if (r.data === "add") acr.addRoles.push(r.role);
        else if (r.data === "remove") acr.removeRoles.push(r.role);
    });
};