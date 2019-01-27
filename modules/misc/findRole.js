module.exports = (server, value) => {

    //Parse value
    value = value.replace(/[<>@&]/g, "").toLowerCase().replace(/\s+/g, "");
    let role;

    //No value
    if (value === "") return null;

    //ID
    role = server.roles.get(value);
    if (role) return role;

    //Name
    role = server.roles.find(r => r.name.toLowerCase().replace(/\s+/g, "") === value);
    if (role) return role;

    //Name starts with
    role = server.roles.find(r => r.name.toLowerCase().replace(/\s+/g, "").startsWith(value));
    if (role) return role;

    //Name inrludes
    role = server.roles.find(r => r.name.toLowerCase().replace(/\s+/g, "").includes(value));
    if (role) return role;

    //No role
    return null;
};