const BaseAction = require('./BaseAction');


module.exports = class slap extends BaseAction {
    constructor() {
        super({
            "id": 2,
            "name": "slap",
        })
        super.initialize()
    }
    async execute(message) {
        super.execute(message)
    }
}