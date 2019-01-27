module.exports = async (client, oldMember, newMember) => {

    //Pre Module
    const modules = client.modules.memberUpdate;

    //Module
    if (oldMember.roles.size !== newMember.roles.size) modules.roles(client, oldMember, newMember); //roles
    else if (oldMember.nickname !== newMember.nickname) modules.nickname(client, oldMember, newMember); //nickname
};