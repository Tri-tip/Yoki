let Guild = require('./Guild.js');

module.exports.checkguildsetup = async(id, channel) => {
    let check = await Guild.findOne({"guildID": id})
    if(check)
        return check;
    else {
        return false;
    }
}