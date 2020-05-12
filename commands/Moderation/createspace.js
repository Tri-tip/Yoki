const BaseCommand = require('../BaseCommand.js');
const BaseEmbed = require('../BaseEmbed.js');

module.exports = class createspace extends BaseCommand {
    constructor() {
        super({
            "id": 12,
            "name": "createspace",
            "category": "Moderation",
            "description": "Create a Space",
            "usage": "",
            "aliases": ['cs'],
            "cooldown": 20,
            "guildOnly": true,
            "permisisons": ["MANAGE_SERVER"],
        })
    }
    async execute(message, args) {
        message.reply("not yet")
    }
}