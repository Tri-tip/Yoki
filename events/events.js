const {
    ready
} = require('./ready.js');
const {
    message
} = require('./message.js');
const {
    guildCreate
} = require('./guildCreate.js');
const {
    guildMemberAdd
} = require('./guildMemberAdd.js')

module.exports = {
    "READY": ready,
    "GUILDCREATE": guildCreate,
    "MESSAGE": message,
    "GUILDMEMBERADD": guildMemberAdd
}