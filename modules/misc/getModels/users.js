module.exports = {
    //User ID
    _id: {
        type: String,
        required: true,
        unique: true
    },
    bot: {
        type: Boolean,
        required: true
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
    inv: [{
        name: String,
        amount: Number
    }],
    stats: {
        type: {
            commandsUsed: Number,
            selfProfileChecks: Number,
            logs: Number,
            translations: Number
        },
        default: {}
    },
    badgeAlertsDisabled: Boolean,
    clientSecret: String,
    accessToken: String,
    refreshToken: String,
    translator: {
        acceptedTerms: Boolean,
        blacklisted: Boolean,
        languages: [String],
        nextTranslation: String,
        notifications: [{
            text: String,
            info: String,
            timestamp: Number
        }],
        lastNotificationsCheck: Number
    },
    verifiedTranslator: {
        message: String,
        messageType: String
    },
    devTranslator: {
        message: String,
        messageType: String
    },
    verified: Boolean
};