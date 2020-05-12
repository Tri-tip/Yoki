const BaseCommand = require('../BaseCommand');
const { checkguildsetup } = require('../../internals/checkguildsetup.js');
const Guild = require('../../internals/Guild.js');

module.exports = class setprefix extends BaseCommand {
    constructor() {
        super({
            "id": 6,
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
        let fetch_guild = await checkguildsetup(message.guild.id, message.channel);
        if (!fetch_guild) return message.reply("Sorry, but this server has not been setup yet.")
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