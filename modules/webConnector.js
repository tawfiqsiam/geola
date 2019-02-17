module.exports = async (client, con) => {

    //Pre Module
    const { webConnections } = client.modules;

    //Stats
    con.on("stats", async (...params) => con.emit("stats", await webConnections.stats(client, ...params)));

    //Auth
    con.on("auth", async (...params) => con.emit("auth", await webConnections.auth(client, ...params)));

    //Dashboard Home
    con.on("dashboardHome", async (...params) => con.emit("dashboardHome", await webConnections.dashboardHome(client, ...params)));

    //Dashboard
    con.on("dashboard", async (...params) => con.emit("dashboard", await webConnections.dashboard(client, ...params)));

    //Dashboard Set
    con.on("dashboardSet", async (...params) => con.emit("dashboardSet", await webConnections.dashboardSet(client, ...params)));

    //Profile
    con.on("profile", async (...params) => con.emit("profile", await webConnections.profile(client, ...params)));

    //Credits
    con.on("credits", async (...params) => con.emit("credits", await webConnections.credits(client, ...params)));

    //Translator Dashboard
    con.on("translatorDashboard", async (...params) => con.emit("translatorDashboard", await webConnections.translatorDashboard(client, ...params)));

    //Translator Dashboard: Accept Terms
    con.on("tdAcceptTerms", async (...params) => con.emit("tdAcceptTerms", await webConnections.tdAcceptTerms(client, ...params)));

    //Translator Dashboard: Set Languages
    con.on("tdSetLanguages", async (...params) => con.emit("tdSetLanguages", await webConnections.tdSetLanguages(client, ...params)));

    //Translator Dashboard: Finish Tutorial
    con.on("tdFinishTutorial", async (...params) => con.emit("tdFinishTutorial", await webConnections.tdFinishTutorial(client, ...params)));

    //Translator Dashboard: Read Notifications
    con.on("tdReadNotifications", async (...params) => con.emit("tdReadNotifications", await webConnections.tdReadNotifications(client, ...params)));

    //Translator Dashboard: Submit
    con.on("tdSubmit", async (...params) => con.emit("tdSubmit", await webConnections.tdSubmit(client, ...params)));

    //Verified Translator Dashboard
    con.on("verifiedTranslatorDashboard", async (...params) => con.emit("verifiedTranslatorDashboard", await webConnections.verifiedTranslatorDashboard(client, ...params)));

    //Verified Translator Dashboard: Submit
    con.on("vtdSubmit", async (...params) => con.emit("vtdSubmit", await webConnections.vtdSubmit(client, ...params)));

    //Dev Translator Dashboard
    con.on("devTranslatorDashboard", async (...params) => con.emit("devTranslatorDashboard", await webConnections.devTranslatorDashboard(client, ...params)));

    //Dev Translator Dashboard: Submit
    con.on("dtdSubmit", async (...params) => con.emit("dtdSubmit", await webConnections.dtdSubmit(client, ...params)));
};