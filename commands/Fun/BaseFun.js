const BaseCommand = require('../BaseCommand');
const BaseEmbed = require('../BaseEmbed');
class BaseFun extends BaseCommand {
    constructor(obj) {
        let {
            id,
            name,
            url,
            aliases = [],
            guildOnly = true,
            args_length = 1,
            usage
        } = obj
        super({
            "id": id,
            "name": name,
            "description": "Sends a fun gif/image",
            "aliases": aliases,
            "usage": usage,
            "cooldown": 1,
            "guildOnly": guildOnly,
            "args": {
                required_length: args_length
            }
        });
        this.url = url
    }
    async execute(message, obj) {
        let {
            title
        } = obj
        let Embed = new BaseEmbed({
            color: null,
            title: title,
            image: this.url,
            author: message.author,
            footer: {
                icon: message.client.user.displayAvatarURL(),
                tag: message.client.user.tag
            }
        })
        message.channel.send(Embed.toEmbed());
    }
}

module.exports = BaseFun