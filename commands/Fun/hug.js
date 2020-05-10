const BaseFun = require('./BaseFun');

class hug extends BaseFun {
    constructor(message, args, database) {
        super({
            id: 1,
            name: "hug",
            url: 'https://acegif.com/wp-content/gif/anime-hug-21-gap.jpg',
            args_length: 1,
            usage: "@target"
        })
    }
    async execute(message, args) {
        super.execute(message, {
            title: `${message.mentions.users.first().tag} has been hugged by ${message.author.tag}`
        })
    }
}
module.exports = hug