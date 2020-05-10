const fs = require('fs');


module.exports.load_commands = (client) => {
    const commandFiles = fs.readdirSync(__dirname + '../commands');
}

let readDirectoryRecursive = (dir) => {
    for(file of commandFiles) {
        if(fs.lstatSync(__dirname + "../commands/" + file).isDirectory()) {
            readDirectoryRecursive();
        } else {
            let tempreq = require('../commands/' + file);
            client.commands.bot_commands.set(tempreq.name, tempreq)
        }
    }
}