const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');


//get all the notes using GET -- Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error is Occured");
    }
})

//get all the notes using POST -- Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid Title').isLength({ min: 5 }),
    body('description', 'Enter a meaningfull Description').isLength({ min: 10 }),
], async (req, res) => {
    try {


        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savednotes = await note.save();
        res.json(savednotes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error is Occured");
    }
})

//update the existing notes using POST --Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {


        //create a newNote object
        const newNote = {}

        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be updated it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }


        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error is Occured");
    }
})

//delete the existing notes using DELETE --Login Required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        //Find the note to be update and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        //allow deletion only this became true
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Your Note has been deleted", note: note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error is Occured");
    }
})



module.exports = router;