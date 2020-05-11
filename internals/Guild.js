let { Schema, model } = require('mongoose');
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
    }
})

module.exports = model('Guild', Guild);