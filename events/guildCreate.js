module.exports.guildCreate = async (guild) => {
    let intro_channel = guild.channels.cache.find(c => c.name.includes('general')) || member.guild.channels.cache.random()
    console.log("added to a guild")
    intro_channel.send("**Thank you for inviting me!** I am honored to be a part of your server and I hope to make your experience using me a useful one! \n If you happen to have a problem or question/require support, please join our support server at: https://nicoandco.live/invite. \n **Please do y!setup to setup me up! Anyone with the `MANAGE_GUILD` permission has the ability to create Spaces and do most things. Check a command using y!help to see what permission a command requires**")
}