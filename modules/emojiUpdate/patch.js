module.exports = emoji => {

    if ((!emoji.name.value) || (emoji.name.value === "")) emoji.name.value = "*None*";

    return emoji;
};