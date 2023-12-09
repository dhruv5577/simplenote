const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String
    },
    Time: {
        type: Date,
        default: Date.now
    },
});

// const NotesModel = mongoose.model('Notes', NotesSchema);

module.exports = mongoose.model('Notes', NotesSchema)