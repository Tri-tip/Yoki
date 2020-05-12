const BaseCommand = require('../BaseCommand.js');
const BaseEmbed = require("../BaseEmbed.js");

module.exports = class guildinfo extends BaseCommand {
    constructor() {
        super({
            id: 12,
            name: "guildinfo",
            description: "Get the info on this Guild",
            aliases: ["info", 'guild', 'guild-info'],
            usage: "",
            cooldown: 10,
            guildOnly: true,
            permissions: [],
            category: "Utilities"
        })
    }
    async execute(message, args) {
        let guild = message.guild;
        let d = new Date(message.guild.createdTimestamp)
        console.log(guild.createdAt)
        let Embed = new BaseEmbed({
            "color": null,
            "image": null,
            "title": "This Server",
            "author": message.author,
            "footer": message.client.user
        }).toEmbed()
        Embed.setThumbnail(guild.iconURL).addFields({
            "name": "Guild Name",
            "value": guild.name,
            inline: true
        }, {
            "name": "Date of Creation",
            "value": (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear(),
            inline: true
        }, {
            "name": "Region",
            "value": guild.region,
            inline: true
        }, {
            "name": "Guild ID",
            "value": guild.id
        }, {
            "name": "Owner",
            "value": guild.owner.user.tag,
            inline: true
        }, {
            "name": "Member Count",
            "value": guild.memberCount,
            inline: true
        }, {
            "name": "Number of Boosts",
            "value": guild.premiumSubscriptionCount,
            inline: true
        }, {
            "name": "Roles",
            "value": guild.roles.cache.filter(g => g.id !== guild.id).map(g => g.name).join(", ").toString().substring(0, 500)
        }, {
            "name": "Verification Level",
            "value": guild.verificationLevel,
            inline: true
        }
        )
        message.channel.send(Embed)
    }
}