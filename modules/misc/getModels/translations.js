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
    translations: [{
        language: String,
        translation: String,
        proposedTranslations: [{
            message: String,
            reported: Boolean,
            user: {
                id: String,
                translation: String
            },
            translator: {
                id: String,
                translation: String
            }
        }]
    }]
};