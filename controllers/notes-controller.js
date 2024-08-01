const Note = require('../models/Note')
const { StatusCodes } = require('http-status-codes')
const {
    BadRequestError,
    NotFoundError,
    UnauthenticatedError,
    CustomAPIError
} = require('../errors/errors-index')

const getAllNotes = async (req,res) => {
    const notes = await Note.find( {} )
    res.status(StatusCodes.OK).json( {notes, count:notes.length} )
}

const getNote = async (req,res) => {
    const note = await Note.findOne( {_id:req.params.id} )
    if(!note){
        throw new NotFoundError((`Note with id ${id} not found, can't get note`))
    }
    res.status(StatusCodes.OK).json( { note } )
}

const addNote = async (req,res) => {
    const note = await Note.create(req.body)
    res.status(StatusCodes.CREATED).json( {note} )
}

const deleteNote = async (req,res) => {
    
    const note = await Note.findByIdAndDelete({_id: req.params.id})   
    if(!note){
        throw new NotFoundError(`Note with id ${id} not found, can't delete note.`)
    } 
    res.status(StatusCodes.OK).send()
}

const updateNote = async (req,res) => {
    const note = await Note.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true } // This will return the updated note
    )
    if(!note){
        throw new NotFoundError(`Note with id ${id} not found, can't update note.`)
    }
    res.status(StatusCodes.OK).json( {note} )
}

module.exports = {
    getAllNotes,
    getNote,
    addNote,
    deleteNote,
    updateNote
}