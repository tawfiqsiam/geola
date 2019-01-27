module.exports = {
    //Server + User ID
    _id: {
        server: String,
        user: String
    },
    xp: {
        xp: {
            type: Number,
            default: 0
        },
        totalXP: {
            type: Number,
            default: 0
        },
        level: {
            type: Number,
            default: 0
        },
        cooldown: {
            type: Number,
            default: 0
        },
        blacklisted: Boolean
    },
    currency: {
        type: Number,
        default: 0
    },
    inv: {
        type: Object,
        default: {}
    },
    warnings: {
        type: [String],
        default: []
    },
    acrCooldowns: {
        type: [{
            trigger: String,
            cooldown: Number
        }],
        default: []
    },
    roles: [String],
    nickname: String
};