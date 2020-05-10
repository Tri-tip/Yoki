const BaseFun = require('./BaseFun');

class hug extends BaseFun {
    constructor(message, args, database) {
        super({
            id: 1,
            name: "hug",
            url: 'https://acegif.com/wp-content/gif/anime-hug-21-gap.jpg',
            args_length: -1,
            usage: "@target",
            mentions: -1
        })
    }
    async execute(message, args) {
        let list = [];
        if(message.mentions.users.size > 0) {
            message.mentions.users.forEach(e => {
                list.push(e.tag)
            })
            list = list.join(" and ")
            if(message.mentions.users.size === 1)
                list += " has"
            else 
                list += " have"
        }

        super.execute(message, {
            title: `${list} been hugged by ${message.author.tag}`
        })
    }
}
module.exports = hug