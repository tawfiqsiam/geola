module.exports = async input => {

    //Modules
    const vibrant = require("node-vibrant");

    //No input
    if (!input) return null;

    //Get palette
    const palette = await vibrant.from(input).getPalette();

    //Get color
    let color =
        palette.Vibrant ||
        palette.LightVibrant ||
        palette.DarkVibrant ||
        palette.Muted ||
        palette.LightMuted ||
        palette.DarkMuted;

    //Get hex
    color = color.getHex();

    //Return
    return color;
};