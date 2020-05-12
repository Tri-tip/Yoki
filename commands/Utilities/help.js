const BaseCommand = require('../BaseCommand.js');
const BaseEmbed = require('../BaseEmbed.js');

module.exports = class help extends BaseCommand {
    constructor() {
        super({
            "id": 14,
            "name": "help",
            "category": "Utilities",
            "description": "Get a list of commands or a info about a specific command",
            "usage": "",
            "aliases": ['h'],
            "cooldown": 5,
        })
    }
    async execute(message, args) {
        const data = [];
        const { bot_commands } = message.client.commands;
        if (!args.length) {
            return message.author.send({
                "embed": {
                    "description": "Here\'s a list of all my commands:" + '\n\n**Admin Commands:** ```' + bot_commands.filter(a => a.category === "Moderation" || a.permissions.length !== 0).map(a => a.name).join(', ') + '```\n\n**Regular Commands:** ```' + bot_commands.filter(a => a.category !== "Moderation" || a.permissions.length == 0).map(a => a.name).join(', ') + '```',
                    "color": 6106314,
                    "timestamp": new Date().toString(),
                    "fields": [
                        {
                            "name": "What does admin commands mean?",
                            "value": "Commands labeled with (admin), can only be done by an admin or moderator"
                        },
                        {
                            "name": "Need more help?",
                            "value": `You can send \`y!help or yourprefix + help [command name]\` to get info on a specific command! or dm ociN#3727`
                        }
                    ]
                }, split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    message.reply('it seems like I can\'t DM you!');
                });
        }

        const name = args[0].toLowerCase();
        const command = bot_commands.get(name) || bot_commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** y!${command.name} ${command.usage} or yourprefix${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 0} second(s)`);

        message.channel.send(data, { split: true });
    }
}