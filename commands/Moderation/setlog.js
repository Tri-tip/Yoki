const BaseCommand = require('../BaseCommand');
const {
    checkguildsetup
} = require('../../internals/checkguildsetup.js');
const Guild = require('../../internals/Guild.js');

module.exports = class setlog extends BaseCommand {
    constructor() {
        super({
            "id": 5,
            "name": "setlog",
            "category": "Moderation",
            "description": "set the Log Channel for this guild",
            "usage": "<newchannel>",
            "cooldown": 20,
            "guildOnly": true,
            "permisisons": ["MANAGE_SERVER"],
            "args": {
                "required_length": 1
            }
        })
    }
    async execute(message, args) {
        let fetch_guild = await checkguildsetup(message.guild.id, message.channel);
        if (!fetch_guild) return message.reply("Sorry, but this server has not been setup yet.")

        try {
            await Guild.findOneAndUpdate({
                "guildID": message.guild.id
            }, {
                "mod_log": message.mentions.channels.first().id
            });
            message.reply("The guild prefix has been set to " + args[0])
        } catch (e) {
            throw e
        }
    }
}