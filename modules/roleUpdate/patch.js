module.exports = role => {

    if ((!role.name.value) || (role.name.value === "")) role.name.value = "*None*";
    if (role.hexColor.value === "#000000") role.hexColor.value = "*None*";
    if (role.color.value === 0) role.color.value = "*None*";
    role.hoist.value = role.hoist.value ? "Ye" : "Nah";
    role.mentionable.value = role.mentionable.value ? "Yup" : "Nope";

    return role;
};