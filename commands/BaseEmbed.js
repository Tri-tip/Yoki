const {
    MessageEmbed
} = require('discord.js');

class BaseEmbed {
    constructor(obj) {
        let {
            color = "PURPLE", image, title, author, footer
        } = obj;
        let ReturnEmbed = new MessageEmbed()
            .setColor(color)
            .setTitle(title)
            .setImage(image)
            .setAuthor(author.tag, author.displayAvatarURL())
            .setFooter(footer.tag, footer.icon)
            .setTimestamp()
        this.returnembed = ReturnEmbed;
    }
    toEmbed() {
        return this.returnembed;
    }
}

module.exports = BaseEmbed