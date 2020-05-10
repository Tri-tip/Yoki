const fs = require('fs');


module.exports.load_commands = (client) => {
    readDirectoryRecursive(client, 'commands')
}

let readDirectoryRecursive = (client, source, path = "\commands") => {
    fs.readdirSync(process.cwd() + "\\" + source, {
            withFileTypes: true
        })
        .forEach(file => {
            if (file.isDirectory()) {
                path += '\\' + file.name
                readDirectoryRecursive(client, path, path);
            } else {
                let tempreq = require('../' + path + "\\" + file.name);
                return client.commands.bot_commands.set(tempreq.name, tempreq)
            }
            path = "\commands";
        })
}