const express = require('express')
const router = express.Router()

const {
    getAllNotes,
    addNote,
    deleteNote,
    updateNote,
    getNote
} = require('../controllers/notes-controller')

router.route('/').get(getAllNotes).post(addNote)
router.route('/:id').delete(deleteNote).patch(updateNote).get(getNote)

module.exports = router