const BaseAction = require('./BaseAction');


module.exports = class kiss extends BaseAction {
    constructor() {
        super({
            "id": 1,
            "name": "kiss",
        })
        super.initialize()
    }
    async execute(message) {
        super.execute(message)
    }
}