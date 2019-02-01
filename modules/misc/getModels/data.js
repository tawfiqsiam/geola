module.exports = {
    _id: {
        type: String,
        required: true,
        unique: true
    },
    updates: {
        type: Number,
        require: true
    },
    blacklistedUsers: [
        {
            id: {
                type: String,
                require: true,
                unique: true
            },
            reason: {
                type: String,
                require: true
            },
            removeTimestamp: Number
        }
    ],
    blacklistedServers: [
        {
            id: {
                type: String,
                require: true,
                unique: true
            },
            reason: {
                type: String,
                require: true
            },
            removeTimestamp: Number
        }
    ],
    botFarmWhitelist: [String],
    globalBans: [{
        user: String,
        reason: String
    }],
    validLanguages: [{
        name: String,
        displayName: String
    }],
    clientSecrets: [String]
};