module.exports.ready = (client) => {
    //table for the commands loaded
    client.commands.table.setHeading('Command ID', 'Name', 'Loaded');
    if (!client.commands.bot_commands.size) return console.log('There are no commands')
    client.commands.bot_commands.forEach(cmd => client.commands.table.addRow(cmd.id, cmd.name, "loaded"));
    return console.log(client.commands.table.toString().brightGreen.bold + "\n\n\n\n");
}