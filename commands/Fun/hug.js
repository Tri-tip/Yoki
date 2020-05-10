const BaseAction = require('./BaseAction');

class hug extends BaseAction {
    constructor() {
        super({
            "id": 1,
            "name": "hug",
            "url": 'https://acegif.com/wp-content/gif/anime-hug-21-gap.jpg',
        })
    }
    async execute(message, args) {
        super.execute(message)
    }
}
module.exports = hug