const fs = require('fs');


module.exports.load_commands = (client) => {
    readDirectoryRecursive(client, 'commands')
}

let readDirectoryRecursive = (client, source, path = "\commands") => {
    //read the directory
    fs.readdirSync(process.cwd() + "\\" + source, {
            withFileTypes: true
        })
        .forEach(file => {
            //for every item inside this directory, check if it is a directory, if it is, call this function again till it hits an actual file
            if (file.isDirectory()) {
                path += '\\' + file.name
                readDirectoryRecursive(client, path, path);
            } else {
            //if not a directory, load it into commands
                let tempreq = require('../' + path + "\\" + file.name);
                return client.commands.bot_commands.set(tempreq.name, tempreq)
            }
            //once it is done with one directory, reset the path and move on to the next directory
            path = "\commands";
        })
}