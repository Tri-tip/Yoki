let Guild = require('../internals/Guild.js');

module.exports.message = async (message, mongodb) => {
    let prefix;
    message.guild ? await Guild.findOne({
        "guildID": message.guild.id
    }) ? prefix = (await Guild.findOne({
        "guildID": message.guild.id
    })).prefix : prefix = "y!" : prefix = "y!"
    console.log(prefix)
    //check to see if the message author is a bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    let lis_chec = message.client.messagelistener.get(message.author.id);
    console.log(lis_chec)
    if (lis_chec) return message.reply("Hey! You are already executing the " + lis_chec.cmdname + " command! Please finish that before you try to do this.")
    //after slicing the prefix off the message, split it into an args string by each space
    const args = message.content.slice(prefix.length).split(/ +/g);

    //remove and retrieve the first argument in args, which is the command name
    const commandName = args.shift().toLowerCase();

    //retrieve the command (by name) from the collection that is populated with the commands on startup
    const command = message.client.commands.bot_commands.get(commandName) || message.client.commands.bot_commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    //if the command is not in the collection, do not continue

    if (!command) return;
    if (message.guild) {
        //if the command has the property guildOnly as true, and the message isn't in a guild, do not continue
        if (command.guildOnly && message.channel.type !== 'text') {
            return message.reply('Sorry, but you can\'t execute that command inside DMs!');
        }
        //if the command *has* a required permissions array, and the executor does not have these said permissions, do not continue
        if (command.permissions && !message.guild.member(message.author).hasPermission(command.permissions, false, true, true)) {
            return message.reply("Sorry, but you do not have the permissions: " + command.permissions + ". ")
        }
    }
    if (command.mentions) {
        if ((command.mentions.required_mentions !== -1 && message.mentions.users.size !== command.mentions.required_mentions) || (message.mentions.users.size < 1)) {
            if (message.mentions.users.size > 5) return message.reply("Too many mentions!");
            let reply = "You either mentioned too many or haven't mentioned any people. You gotta mention the right amount of people for this command to work!"
            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }
            return message.reply(reply)
        }
        if (message.mentions.users.size > 5)
            return message.reply("Too many mentions!")
    }
    //if the command has the property args as true, and the amount of args are not equal to the required args length AND the required length isn't set to -1 (unlimited args, usually the command will have a regex that takes quote args)
    if (command.args && ((command.args.required_length !== -1 && args.length !== command.args.required_length) || args.length < 1)) {
        let reply = `Sorry, either you didn't provide any arguments or you provided too many!`;
        if (message.channel.type == 'text') {
            await message.react("709155919963095040");
        }
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.reply(reply);
    }
    //execute the command
    try {
        //wrap it in an async because most of the commands should return a promise that we would like to await.
        await command.execute(message, args, mongodb);
    } catch (e) {
        message.channel.send(`An internal exception has occured. This should not happen, and we'd like to ask you to join our support server that you can access using \`?support\` and to copy paste the error below and the command code into https://pastebin.com/ and share it with us. \n\n The error to copy paste: \`\`\` ${e}\n${e.stack.substring(0, 200)} \`\`\`\n **Please Include this: Command Code: ${command.id}**`)
    }
}