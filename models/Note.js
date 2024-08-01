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
    createdBy: {
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'Provide the user that created this note']
    },
}, {timestamps:true})

module.exports = mongoose.model('Note', NoteSchema)