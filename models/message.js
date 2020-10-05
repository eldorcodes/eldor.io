const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
    chats: [{
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        senderRead: {
            type: Boolean,
            default: false
        },
        senderReadDate: {
            type: Date,
            default: Date.now
        },
        senderMessage: {
            type: String
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        receiverRead: {
            type: Boolean,
            default: false
        },
        receiverReadDate: {
            type: Date,
            default: false
        },
        receiverMessage: {
            type: String
        },
        chatDate: {
            type: Date,
            default: Date.now
        }
    }]
})
module.exports = mongoose.model('Message',messageSchema);