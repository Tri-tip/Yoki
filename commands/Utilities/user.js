const BaseCommand = require('../BaseCommand.js');
const BaseEmbed = require('../BaseEmbed.js');

module.exports = class user extends BaseCommand {
    constructor() {
        super({
            id: 13,
            name: "user",
            description: "Get the info on this user",
            aliases: ["user-info", 'member', 'userinfo'],
            usage: "[@user]",
            cooldown: 10,
            guildOnly: true,
            permissions: [],
            category: "Utilities"
        })
    }
    async execute(message, args) {
        let member = message.mentions.members.first() ? message.mentions.members.first() : message.member
        let d = new Date(member.joinedTimestamp);
        let c = new Date(member.user.createdTimestamp)
        let Embed = new BaseEmbed({
            title: "This user",
            author: message.author,
            footer: message.client.user
        }).toEmbed();
        Embed.setThumbnail(member.user.displayAvatarURL()).addFields([{
            "name": "Tag (Nickname)",
            "value": member.user.tag + " (" + member.displayName + ")",
            inline: true
        }, {
            "name": "ID",
            "value": member.user.id,
            inline: true
        },{
            "name": "Date of Creation",
            "value": (c.getMonth() + 1) + '/' + c.getDate() + '/' + c.getFullYear(),
            inline: false
        }, {
            "name": "Date of Joining",
            "value": (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear(),
            inline: true
        }, {
            "name": "Roles",
            "value": member.roles.cache.filter(g => g.id !== message.guild.id).map(g => g.name).join(", ").toString().substring(0, 500),
            inline: true
        }]);
        message.channel.send(Embed)
    }
}