let {
    Schema,
    model
} = require('mongoose');
let Guild = new Schema({
    guildID: {
        type: String,
        required: true
    },
    guildname: {
        type: String,
        required: true
    },
    prefix: {
        type: String,
        required: false,
        default: "y!"
    },
    welcome_channel: {
        id: {
            type: String,
            required: false,
            default: null
        },
        message: {
            type: String,
            required: false,
            default: "has joined the server!",
        }
    },
    mod_log: {
        type: String,
        required: false,
        default: null
    }
})

module.exports = model('Guild', Guild);