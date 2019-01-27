module.exports = {
    //User ID
    _id: {
        type: String,
        required: true,
        unique: true
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
        }
    },
    cubits: {
        type: Number,
        default: 0
    },
    reputation: {
        type: Number,
        default: 0
    },
    reputationCooldown: Number,
    inv: {
        type: Object,
        default: {}
    },
    stats: {
        type: {
            commandsUsed: Number,
            selfProfileChecks: Number,
            logs: Number
        },
        default: {}
    },
    badgeAlertsDisabled: Boolean,
    clientSecret: String,
    accessToken: String,
    refreshToken: String,
    verified: Boolean
};