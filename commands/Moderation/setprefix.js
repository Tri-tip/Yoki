const BaseCommand = require('../BaseCommand');
const prompter = require('discordjs-prompter');
const Guild = require('../../internals/Guild.js');

module.exports = class setprefix extends BaseCommand {
    constructor() {
        super({
            "id": 5,
            "name": "setprefix",
            "category": "Moderation",
            "description": "set the prefix for this guild",
            "aliases": ['setp', 'configprefix'],
            "usage": "<newprefix>",
            "cooldown": 20,
            "guildOnly": true,
            "permisisons": ["MANAGE_SERVER"],
            "args": {
                "required_length": 1
            }
        })
    }
    async execute(message, args) {
        console.log('test')
        let fetch_guild = await Guild.findOne({
            "guildID": message.guild.id
        })
        if (!fetch_guild) return message.reply("Sorry, but this server has not be setup yet. You can do `y!setup` to get started");
        try {
            await Guild.findOneAndUpdate({
                "guildID": message.guild.id
            }, {
                "prefix": args[0]
            });
            message.reply("The guild prefix has been set to " + args[0])
        } catch (e) {
            throw e
        }
    }
}