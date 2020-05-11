const BaseCommand = require('../BaseCommand');
const prompter = require('discordjs-prompter');
const Guild = require('../../internals/Guild.js')

module.exports = class setup extends BaseCommand {
    constructor() {
        super({
            "id": 4,
            "name": "setup",
            "category": "Moderation",
            "description": "use this to setup your server (first-time setup when you invite the bot)",
            "aliases": ['fconfig', 'firsttime'],
            "usage": "",
            "cooldown": 20,
            "guildOnly": true,
            "permisisons": ["MANAGE_SERVER"]
        })
    }
    async execute(message, args) {
        if (!args[0]) {
            console.log('test1')
            if (await Guild.findOne({
                    "guildID": message.guild.id
                })) {
                console.log('test2')
                return message.reply("This server is already setup. You can go to the docs to see your command options for editing the settings, or you can kick and re-invite the bot to redo the setup")
            }
            let prefix = await prompter.message(message.channel, {
                question: 'What prefix would you like?',
                userId: message.author.id,
                max: 1,
                timeout: 1500,
            });
            console.log(prefix.first().content)
            if (!prefix) return message.reply("You did not respond in time. You can restart the process by doing this command again")
            let temp_guild = new Guild({
                "guildID": message.guild.id,
                "guildname": message.guild.name,
                "prefix": prefix.first().content
            });
            try {
                await temp_guild.save()
            } catch (e) {
                throw e;
            }
        }
    }
}