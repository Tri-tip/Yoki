let Guild = require('../internals/Guild.js');
module.exports.guildMemberAdd = async (member) => {
    let check = await Guild.findOne({"guildID": member.guild.id})
    if(check) {
        if(check.welcome_channel) {
            let channel = await member.guild.channels.cache.get(check.welcome_channel.id) 
            channel.send(member.toString() + " " + check.welcome_channel.message)
        }
    }
}