const BaseFun = require('./BaseFun');

class BaseAction extends BaseFun {
    constructor(obj) {
        let {
            id,
            name,
        } = obj
        super({
            "id": id,
            "name": name,
            "args_length": -1,
            "usage": "@target",
            "mentions": -1
        })
    }
    async execute(message) {
        let list = [];
        if (message.mentions.users.size > 0) {
            message.mentions.users.forEach(e => {
                list.push(e.tag)
            })
            list = list.join(" and ")
            if (message.mentions.users.size === 1)
                list += " has"
            else
                list += " have"
        }
        let ac = this.name.slice(-1)
        super.execute(message, {
            title: `${list} been ${this.name + ac}ed by ${message.author.tag}`
        })
    }
}
module.exports = BaseAction