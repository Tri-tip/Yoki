module.exports.ready = (client) => {
    //table for the commands loaded
    client.commands.table.setHeading('Command ID', 'Name', 'Category', 'Loaded');
    if (!client.commands.bot_commands.size) return console.log('There are no commands')
    client.commands.bot_commands.sort((a, b) => a.id - b.id).forEach(cmd => client.commands.table.addRow(cmd.id, cmd.name, cmd.category, "loaded"));
    return console.log(client.commands.table.toString().brightGreen.bold + "\n\n\n\n");
}