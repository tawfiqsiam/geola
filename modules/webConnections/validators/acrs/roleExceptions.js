module.exports = (client, { id, data: roleExceptions }, { server }) => {

    //Get acr
    const acr = server.data.acrs.find(a => a.trigger === id);

    //Set role exceptions
    acr.whitelistedRoles = [];
    acr.blacklistedRoles = [];
    roleExceptions.forEach(r => {
        if (r.data === "whitelist") acr.whitelistedRoles.push(r.role);
        else if (r.data === "blacklist") acr.blacklistedRoles.push(r.role);
    });
};