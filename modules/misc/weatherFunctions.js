module.exports = {

    toCelsius: f => ((f - 32) / 1.8).toFixed(2),

    toMS: mph => (mph * 0.44704).toFixed(2),

    toCM: inch => (inch * 2.54).toFixed(2),

    toDirection: met => {
        if ((met > 337.5) && (met <= 22.5)) return "North";
        else if ((met > 22.5) && (met <= 67.5)) return "North East";
        else if ((met > 67.5) && (met <= 112.5)) return "East";
        else if ((met > 112.5) && (met <= 157.5)) return "South East";
        else if ((met > 157.5) && (met <= 202.5)) return "South";
        else if ((met > 202.5) && (met <= 247.5)) return "South West";
        else if ((met > 247.5) && (met <= 292.5)) return "West";
        else if ((met > 292.5) && (met <= 337.5)) return "North West";
    }
};