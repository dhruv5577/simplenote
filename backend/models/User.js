const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect("mongodb://127.0.0.1:27017/inotebook")

const UserSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Time: {
        type: Date,
        default: Date.now
    },
});


const User = mongoose.model('user', UserSchema)
User.createIndexes();
module.exports = User