const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
    default: Date.now,
    immutable: true,
    },
    author: {
        type: [mongoose.SchemaTypes.ObjectId],
        required: true,
        ref: 'User'
    }
})

module.exports = mongoose.model('Post', userSchema)