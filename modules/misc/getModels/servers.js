module.exports = {
    //Server ID
    _id: {
        type: String,
        required: true,
        unique: true
    },
    prefix: {
        type: String,
        default: "g!"
    },
    modPrefix: {
        type: String,
        default: "g@"
    },
    autoroles: [String],
    muteRole: String,
    currencyName: {
        type: String,
        default: "Dollars"
    },
    welcomeChannel: String,
    welcomeMessage: String,
    leaveChannel: String,
    leaveMessage: String,
    globalBanProtection: Boolean,
    rememberedRoles: [String],
    nicknameRemembrance: Boolean,
    xp: {
        min: Number,
        max: Number,
        cooldown: Number,
        currencySync: Boolean,
        levelUpMessage: String
    },
    language: {
        type: String,
        default: "english"
    },
    logChannels: {
        channelCreate: String,
        channelDelete: String,
        channelUpdate: String,
        roleCreate: String,
        roleDelete: String,
        roleUpdate: String,
        emojiCreate: String,
        emojiDelete: String,
        emojiUpdate: String,
        serverUpdate: String,
        memberJoin: String,
        memberLeave: String,
        memberUpdate: String,
        memberBanned: String,
        memberUnbanned: String,
        messageDelete: String,
        messagesPruned: String,
        say: String
    },
    levelRewards: [{
        level: Number,
        message: String,
        addRoles: [String],
        removeRoles: [String],
        addItems: [{
            name: String,
            amount: Number
        }],
        removeItems: [{
            name: String,
            amount: Number
        }]
    }],
    items: [String],
    shops: [{
        name: String,
        items: [{
            name: String,
            itemType: String,
            price: Number,
            sellPrice: Number
        }]
    }],
    selfRoles: [String],
    forbiddenWords: [String],
    pollEmojis: {
        1: String,
        2: String,
        3: String
    },
    warningActions: {
        kick: Number,
        ban: Number
    },
    temporaryRoles: {
        type: [{
            action: String,
            role: String,
            member: String,
            timestamp: Number
        }],
        default: []
    },
    timedAnnouncement: {
        channel: String,
        message: String,
        interval: Number,
        timestamp: Number
    },
    acrs: {
        type: [{
            trigger: String,
            messages: [String],
            minLevel: Number,
            whitelistedChannels: [String],
            blacklistedChannels: [String],
            whitelistedRoles: [String],
            blacklistedRoles: [String],
            cooldown: Number,
            addCurrency: Number,
            removeCurrency: Number,
            addRoles: [String],
            removeRoles: [String],
            deleteTrigger: Boolean,
            addItems: [{
                name: String,
                amount: Number
            }],
            removeItems: [{
                name: String,
                amount: Number
            }]
        }],
        default: []
    },
    verified: Boolean
};