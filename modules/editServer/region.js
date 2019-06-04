module.exports = async (client, message, value) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    value = value.toLowerCase().replace(/\s+/g, "");

    const regions = {
        "brazil": {
            inputs: ["brazil"],
            name: "Brazil"
        },
        "eu-central": {
            inputs: ["eucentral", "centraleu", "centraleurope", "europecentral"],
            name: "Central Europe"
        },
        "hongkong": {
            inputs: ["hongkong"],
            name: "Hong Kong"
        },
        "russia": {
            inputs: ["russia", "ussr", "sovietunion", "sovietrussia"],
            name: "Russia"
        },
        "singapore": {
            inputs: ["singapore"],
            name: "Singapore"
        },
        "sydney": {
            inputs: ["sydney"],
            name: "Sydney"
        },
        "us-central": {
            inputs: ["uscentral", "centralus", "centralunitedstates", "unitedstatescentral", "centralmerica", "mericacentral"],
            name: "US Central"
        },
        "us-east": {
            inputs: ["useast", "eastus", "eastunitedstates", "unitedstateseast", "eastmerica", "mericaeast"],
            name: "US East"
        },
        "us-south": {
            inputs: ["ussouth", "southus", "southunitedstates", "unitedstatessouth", "southmerica", "mericasouth"],
            name: "US South"
        },
        "us-west": {
            inputs: ["uswest", "westus", "westunitedstates", "unitedstateswest", "westmerica", "mericawest"],
            name: "US West"
        },
        "eu-west": {
            inputs: ["euwest", "westeu", "westeurope", "europewest"],
            name: "Western Europe"
        },
        "southafrica": {
            inputs: ["southafrica", "africasouth"],
            name: "South Africa"
        },
        "japan": {
            inputs: ["japan"],
            name: "Japan"
        },
        "india": {
            inputs: ["india"],
            name: "India"
        }
    };

    let regionValid = false;
    for (let r in regions) if (regions[r].inputs.includes(value)) {
        value = r;
        regionValid = true;
        break;
    }

    //Invalid region
    if (!regionValid) return _.send({
        client,
        id: "editserver region invalid",
        channel: message.channel,
        message: "That region doesn't exist!",
        emoji: "x"
    });

    return {
        value: value,
        action: "setRegion",
        id: "editserver region",
        message: "The server's region has been set to {VAR1}!",
        vars: [regions[value].name]
    };
};