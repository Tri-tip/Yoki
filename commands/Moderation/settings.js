let Guild = require('../../internals/Guild.js');
let BaseCommand = require('../BaseCommand.js')
const {
    checkguildsetup
} = require('../../internals/checkguildsetup.js');
let BaseEmbed = require('../BaseEmbed.js');

module.exports = class settings extends BaseCommand {
    constructor() {
        super({
            "id": 10,
            "name": "settings",
            "category": "Moderation",
            "description": "See this server's settings",
            "usage": "",
            "aliases": ['guildsettings', 'setting'],
            "cooldown": 5,
            "guildOnly": true,
            "permissions": ["MANAGE_GUILD"]
        })
    }
    async execute(message, args) {
        let guild_check = await checkguildsetup(message.guild.id, message.channel)
        let Embed = new BaseEmbed({
            color: "BLUE",
            title: "This Server's Settings",
            image: null,
            author: message.author,
            footer: {
                icon: message.client.user.displayAvatarURL(),
                tag: message.client.user.tag
            }
        }).toEmbed();
        Embed.addFields([{
                "name": "Guild Info",
                "value": "id: " + message.guild.id
            },
            {
                "name": "Bot Settings",
                "value": `Prefix: ${guild_check.prefix} \n Welcome Channel: ${message.guild.channels.cache.get(guild_check.welcome_channel.id) ? message.guild.channels.cache.get(guild_check.welcome_channel.id).toString() : "Not Set"} \n Log Channel: ${message.guild.channels.cache.get(guild_check.mod_log) ? message.guild.channels.cache.get(guild_check.mod_log).toString() : "Not Set"}`
            }
        ]);
        message.channel.send(Embed)
    }
}