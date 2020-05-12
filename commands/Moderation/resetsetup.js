const BaseCommand = require('../BaseCommand');
const prompter = require('discordjs-prompter');
const Guild = require('../../internals/Guild.js');

module.exports = class resetserver extends BaseCommand {
    constructor() {
        super({
            "id": 8,
            "name": "resetserver",
            "category": "Moderation",
            "description": "set the Log Channel for this guild",
            "usage": "",
            "aliases": ['reset'],
            "cooldown": 20,
            "guildOnly": true,
            "permisisons": ["MANAGE_SERVER"],
        })
    }
    async execute(message, args) {
        let fetch_guild = await Guild.findOne({"guildID": message.guild.id});
        if(!fetch_guild) return message.reply("Sorry, but this server is not even set up yet! You can do `y!setup` to start the setup process.")
        await Guild.findOneAndDelete({"guildID": message.guild.id});
        message.reply("Server has been reset!")
    }
}