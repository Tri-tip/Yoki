const BaseCommand = require('../BaseCommand');
const rp = require('request-promise');
require('dotenv').config();
const BaseEmbed = require('../BaseEmbed');
class BaseFun extends BaseCommand {
    constructor(obj) {
        let {
            id,
            name,
            aliases = [],
            guildOnly = true,
            args_length = 1,
            usage,
            mentions
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
            },
            "mentions": {
                required_mentions: mentions
            }
        });
    }
    initialize() {
        rp({
            uri: `https://api.tenor.com/v1/search?q=anime%20${super.name}&key=${process.env.TENOR_TOKEN}&limit=50`
        }).then(res => {
            res = JSON.parse(res)
            this.url = res
        })
    }
    async execute(message, obj) {
        let random = Math.floor((Math.random()*51)+1);
        console.log(random)
        let {
            title
        } = obj
        let Embed = new BaseEmbed({
            color: null,
            title: title,
            image: this.url['results'][random]['media'][0]["gif"]["url"],
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