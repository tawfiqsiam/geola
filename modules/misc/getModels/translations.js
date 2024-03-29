module.exports = {
    //Message identifier
    _id: {
        type: String,
        required: true,
        unique: true
    },
    english: {
        type: String,
        required: true
    },
    lastEdit: Number,
    vars: [{
        number: Number,
        text: String
    }],
    varCount: Number,
    translations: [{
        language: String,
        translation: String,
        lastEdit: Number,
        proposedTranslation: {
            reportReason: String,
            user: {
                id: String,
                translation: String
            },
            translator: {
                id: String,
                translation: String
            }
        }
    }]
};