const BaseAction = require('./BaseAction');


module.exports = class hug extends BaseAction {
    constructor() {
        super({
            "id": 1,
            "name": "hug",
        })
        super.initialize()
    }
    async execute(message) {
        super.execute(message)
    }
}