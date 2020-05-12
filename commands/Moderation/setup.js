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
            if (await Guild.findOne({
                    "guildID": message.guild.id
                })) {
                return message.reply("This server is already setup. You can go to the docs to see your command options for editing the settings, or you can kick and re-invite the bot to redo the setup")
            }
            message.client.messagelistener.set(message.author.id, super.name)
            let prefix = await prompter.message(message.channel, {
                question: 'What prefix would you like? You can change this later by doing the `setprefix` command.',
                userId: message.author.id,
                max: 1,
                timeout: 15000,
            });
            if (prefix.size === 0) return message.reply("You did not respond in time. You can restart the process by doing this command again")
            if (prefix.first().content.split(/ +/g).length > 1) return message.reply("that is too big to be a prefix")

            let welcome_channel = await prompter.message(message.channel, {
                question: 'What would you like the Welcome Channel to be? Please mention it. You can change this later by doing the command `setwelcome`. If you don\'t want to set this, type `no`',
                userId: message.author.id,
                max: 1,
                timeout: 25000,
            });
            if (welcome_channel.size === 0) return message.reply("You did not respond in time. You can restart the process by doing this command again")
            if (welcome_channel.first().mentions.channels.size === 0 && welcome_channel.first().content !== "no") {
                return message.reply("You did not mention a channel, please retry this again.");
            }
            let welcome_ex;
            if (welcome_channel.first().content !== "no") {
                let welcome_message = await prompter.message(message.channel, {
                    question: 'What would you like the welcome message to be? Your message will be added to the mention. (@member <yourmessage>). You can say `no` to use the default ("Member has joined the server!")',
                    userId: message.author.id,
                    max: 1,
                    timeout: 25000,
                });
                if (welcome_message.size === 0) return message.reply("You did not respond in time. You can restart the process by doing this command again")
                welcome_ex = {
                    "id": welcome_channel.first().mentions.channels.first().id,
                    "message": welcome_channel.first().content == "no" ? null : welcome_message.first().content
                }
            }

            let mod_log = await prompter.message(message.channel, {
                question: 'What would you like the Log Channel to be? Please mention it. You can change this later by doing the command `setlog`. If you don\'t want to set this, type `no`',
                userId: message.author.id,
                max: 1,
                timeout: 15000,
            });
            if (mod_log.size === 0) return message.reply("You did not respond in time. You can restart the process by doing this command again.");
            if (mod_log.first().mentions.channels.size === 0 && mod_log.first().content !== "no") return message.reply("You did not mention a channel, please retry this again.")

            let temp_guild = new Guild({
                "guildID": message.guild.id,
                "guildname": message.guild.name,
                "prefix": prefix.first().content,
                "welcome_channel": welcome_channel.first().content == "no" ? null : welcome_ex,
                "mod_log": mod_log.first().content == "no" ? null : mod_log.first().mentions.channels.first().id
            });
            try {
                message.client.messagelistener.delete(message.author.id)
                let saved = await temp_guild.save()
                message.channel.send("The server has been setup! If you want to change any of these settings, do " + saved.prefix + "help to see your options")
            } catch (e) {
                throw e;
            }
        }
    }
}