const BaseCommand = require('../BaseCommand');
const prompter = require('discordjs-prompter');
const Guild = require('../../internals/Guild.js');

module.exports = class kick extends BaseCommand {
    constructor() {
        super({
            "id": 10,
            "name": "ban",
            "category": "Moderation",
            "description": "ban a user (NOTICE: DO NOT PING MORE THAN ONE PERSON)",
            "usage": "<@persontokick> [reason]",
            "aliases": ['b'],
            "cooldown": 20,
            "guildOnly": true,
            "permisisons": ["BAN_MEMBERS"],
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
        if(!member.bannable) return message.reply("There was an error in banning this person");
        args.shift();
        let reason = args.join(" ");
        member.ban({"reason": reason}).catch(e => {
            message.reply("I either do not have permissions to ban this person, or their role is higher than mine.")
        });
    }
}