const { writeFile, readFile } = require("./fileUtils");

const express = require('express');
const fs = require('fs');
const app = express();


// Before setting up your routes, you'll want to add this line, 
// which sets up Express to parse the JSON bodies of incoming requests.
// You'll need this for the POST and PUT routes.
app.use(express.json());

// Returns a list of all notes.
app.get('/notes', function (req, res) {
  let notes = readFile()
  res.json(notes);
  
});


// Adds a new note. The title and body of the 
// note are provided in the request body.
app.post('/notes', function (req, res) {
  const userTitle = req.body.userTitle
  const userBody = req.body.userBody
  let userTime = new Date().toISOString();

    let newNote = {
        title : userTitle,
        body : userBody,
        time_added : userTime
    };

    let notes = readFile();
    notes.push(newNote);

    writeFile(notes); 
    console.log("Note added successfully!"); 
    res.redirect("/notes");
});

app
    .route("/notes/:title")
    // Returns the note with the given title.
    .get((req,res) => {
        const noteToFind = req.params.title
        let notes = readFile();
        
        for (let note of notes) {
            if (noteToFind === note.title) {       
                res.json(note)
                return;
            }
        } 
        res.status(404).json({message: "Note not found."});  
    })
    // Deletes the note with the given title.
    .delete((req,res) => {
        const noteToDelete = req.params.title
        
        let notes = readFile();
        
        let leftOverNotes = [];
        
        for (let note of notes) {
            if (noteToDelete != note.title) {
                leftOverNotes.push(note)
            }
        }
        writeFile(leftOverNotes); 
        res.json({message: "Note deleted successfully!"}); 
         
    })
    // Updates the note with the given title. 
    // The new body is provided in the request body.
    .put((req,res) => {

    })

app.listen(3000, function () {
  console.log('Note Organizer API is listening on port 3000!')
});