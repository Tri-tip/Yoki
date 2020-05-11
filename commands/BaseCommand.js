class BaseCommand {
    constructor(obj) {
        let {
            id,
            name,
            description,
            aliases = [],
            usage = "",
            cooldown = 1,
            guildOnly,
            permissions = [],
            args,
            mentions,
            category
        } = obj;
        this._id = id;
        this._name = name;
        this._category = category
        this._description = description;
        this._usage = usage;
        this._cooldown = cooldown;
        this._aliases = aliases;
        this._guildOnly = guildOnly;
        this._permissions = permissions;
        this._args = args
        this._mentions = mentions
    }
    get id() {
        return this._id
    }
    get category() {
        return this._category
    }
    get args() {
        return this._args
    }
    get mentions() {
        return this._mentions
    }
    get guildOnly() {
        return this._guildOnly;
    }
    get permissions() {
        return this._permissions
    }
    get name() {
        return this._name
    }
    get description() {
        return this._description
    }
    get aliases() {
        return this._aliases
    }
    get usage() {
        return this._usage
    }
    get cooldown() {
        return this._cooldown
    }
}
module.exports = BaseCommand