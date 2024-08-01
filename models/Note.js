const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    header: {
        type:String,
        required:[true, "Please provide a header for your note with length between 1-25"],
        minlength:1,
        maxlength:25
    },
    content: {
        type:String,
        required:[true, "Content cannot be empty"],
        maxlength:1000
    },
})

module.exports = mongoose.model('Note', NoteSchema)