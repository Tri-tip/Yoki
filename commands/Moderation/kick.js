const BaseCommand = require('../BaseCommand');
const prompter = require('discordjs-prompter');
const Guild = require('../../internals/Guild.js');

module.exports = class kick extends BaseCommand {
    constructor() {
        super({
            "id": 9,
            "name": "kick",
            "category": "Moderation",
            "description": "Kick a user (NOTICE: DO NOT PING MORE THAN ONE PERSON)",
            "usage": "<@persontokick> [reason]",
            "aliases": ['k'],
            "cooldown": 20,
            "guildOnly": true,
            "permisisons": ["KICK_MEMBERS"],
            "args": {
                "required_length": -1
            },
            "mentions": {
                "required_mentions": 1
            }
        })
    }
    async execute(message, args) {
        let member = message.mentions.members.first() || message.guild.member(args[0]);
        if (!member.kickable) return message.reply("There was an error in kicking this person")
        args.shift()
        let reason = args.join(" ")
        try {
            member.kick(reason);
            message.reply(`${member} has been kicked!`)
        } catch (e) {
            message.reply("I either do not have permissions to kick this person, or their role is higher than mine.")
        }
    }
}