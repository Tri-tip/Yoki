/*Copyright © 2020 Zaid Arshad

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/


// Requires
const Discord = require('discord.js');
require('dotenv').config();
const AsciiTable = require('ascii-table');
const mongoose = require('mongoose');
const console_colors = require('colors');
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(e => console.error("Error encountered with connecting to the database: " + e))

//Initializations
const client = new Discord.Client();

//Collections
client.commands = {
    "table": new AsciiTable('Yoki Bot'),
    "bot_commands": new Discord.Collection()
}

//events
const events = require('./events/events.js');
const internals = require('./internal_functions/internals.js')

//Ensure the database is connected
mongoose.connection.on('open', () => {
    //listeners
    client.on('ready', () => {
        internals.LOAD_COMMANDS(client);
        events.READY(client);
    });
    client.on('message', async (message) => await events.MESSAGE(message));
});

mongoose.connection.on('error', () => console.log("Unfortunately, a connection to the mongo database was unsuccessful. Please contact mongo support for help with this or go to their knowledge base.".underline.red))


//login
client.login(process.env.BOT_TOKEN);