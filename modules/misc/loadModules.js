module.exports = () => {

    //Modules
    const readdir = require("directory-tree");

    let buildModules = src => {

        let data = {};

        src = src.children ? src.children : src;

        src.forEach(f => {
            if (!f.name.includes("!")) {
                if ((f.type === "file") && (f.extension === ".js")) data[f.name.replace(/\.js/g, "")] = require(`./../../${f.path}`);
                else if (f.type === "directory") data[f.name] = buildModules(f);
            }
        });

        return data;
    };

    let tree = readdir("./modules").children;
    return buildModules(tree);
};