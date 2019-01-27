module.exports = {
    //Channel ID
    _id: {
        type: String,
        required: true,
        unique: true
    },
    disabledCommands: {
        type: [String],
        default: ["Say", "Say Embed"]
    },
    xpGain: Boolean,
    counting: Boolean,
    language: String,
    ignoreDeletedMessages: Boolean
};