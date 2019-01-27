module.exports = async (server, value) => {

    //Parse value
    value = value.replace(/[<>@!]/g, "").toLowerCase().replace(/\s+/g, "");
    let member;

    //No value
    if (value === "") return null;

    //Fetch members
    await server.fetchMembers();

    //ID
    member = server.members.get(value);
    if (member) return member;

    //Display name
    member = server.members.find(m => m.displayName.toLowerCase().replace(/\s+/g, "") === value);
    if (member) return member;

    //Display name starts with
    member = server.members.find(m => m.displayName.toLowerCase().replace(/\s+/g, "").startsWith(value));
    if (member) return member;

    //Display name includes
    member = server.members.find(m => m.displayName.toLowerCase().replace(/\s+/g, "").includes(value));
    if (member) return member;

    //Username
    member = server.members.find(m => m.user.username.toLowerCase().replace(/\s+/g, "") === value);
    if (member) return member;

    //Username starts with
    member = server.members.find(m => m.user.username.toLowerCase().replace(/\s+/g, "").startsWith(value));
    if (member) return member;

    //Username includes
    member = server.members.find(m => m.user.username.toLowerCase().replace(/\s+/g, "").includes(value));
    if (member) return member;

    //No member
    return null;
};