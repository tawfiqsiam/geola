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
    }
};