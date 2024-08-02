const Note = require('../models/Note')
const { StatusCodes } = require('http-status-codes')
const {
    BadRequestError,
    NotFoundError,
    CustomAPIError,
} = require('../errors/errors-index')
const User = require('../models/User')

const getAllNotes = async (req,res) => {
    const notes = await Note.find( {createdBy:req.user.userId} )
    res.status(StatusCodes.OK).json( {notes, count:notes.length} )
}

const deleteNote = async (req,res) => {
    const {
        params: {id: noteId},  
        user: {userId: userId}
    } = req 
    
    const note = await Note.deleteOne({_id:noteId, createdBy:userId})
    if(note.deletedCount === 0){
        throw new NotFoundError(`Note with id ${noteId} not found, can't delete note.`)
    } 
    res.status(StatusCodes.OK).json( { msg:`Note successfully deleted` } )
}

const updateNote = async (req,res) => {
    const {
        body: {header, content},
        params: {id: noteId},
        user: {userId: userId, username: username, email: email}
    } = req

    if(!header || !content){
        throw new BadRequestError('Header and content must not be empty')
    }

    const note = await Note.updateOne(
        { _id: noteId, createdBy: userId },
        req.body,
        { new: true } // This will return the updated note
    )
    if(note.modifiedCount === 0){
        throw new NotFoundError(`Note with id ${noteId} not found, can't update note.`)
    }
    res.status(StatusCodes.OK).json( {msg: "Note updated"} )
}

const getNote = async (req,res) => {
    const {
        user: {userId: userId, username: username, email:email},
        params: {id: noteId}
    } = req
    
    const note = await Note.findOne( {_id:noteId, createdBy:userId} )
    if(!note){
        throw new NotFoundError(`No such note with id ${noteId}`)
    }
    res.status(StatusCodes.OK).json( { note } )
}


const addNote = async (req,res) => {
    req.body.createdBy = req.user.userId
    const note = await Note.create(req.body)
    res.status(StatusCodes.CREATED).json( {note} )
}



module.exports = {
    getAllNotes,
    getNote,
    addNote,
    deleteNote,
    updateNote
}