module.exports.ready = (client) => {
    console.log(`Guilds that the bot is in: ${client.guilds.cache.size} \nMembers that the bot has: ${client.users.cache.size}`)
    console.log(`Bot Invite Link: https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`);
    
    //table for the commands loaded
    client.commands.table.setHeading('Command ID', 'Name', 'Loaded');
    if(!client.commands.bot_commands.size) return console.log('There are no commands')
    client.commands.bot_commands.forEach(cmd => client.commands.table.addRow(cmd.id, cmd.name, "loaded"));
    return console.log(client.commands.table.toString());
}