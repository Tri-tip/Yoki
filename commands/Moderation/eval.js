let BaseCommand = require('../BaseCommand.js')

module.exports = class ceval extends BaseCommand {
    constructor() {
        super({
            "id": 11,
            "name": "ceval",
            "category": "Moderation",
            "description": "Nope",
            "usage": "",
            "cooldown": 5,
            "guildOnly": true,
            "permissions": ["MANAGE_GUILD"]
        })
    }
    async execute(message, args) {
        console.log("joe");
        if (message.author.id !== "500765481788112916") return message.reply('no');
        try {
            let code = args.join(" ");
            let evaled = eval(code);
            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);
            message.channel.send(clean(evaled), {
                code: "xl"
            })
        } catch (e) {
            message.reply("Eval failed. " + e)
        }
    }
}
const clean = text => {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}