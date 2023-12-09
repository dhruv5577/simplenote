import { useState } from "react";
import noteContext from "./notecontext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesi = []
    const [notes, setNotes] = useState(notesi)
    const Getallnotes = async () => {

        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhZTk2YWJmZTlmZmIzNzgyYWY4YjdhIn0sImlhdCI6MTY4OTIyNDAwMX0.DLt7hSchwTFNzj3lBCctXR0wiAxDUX5ztSbmJTzC7I4"
            }
        });
        const json = await response.json();
        setNotes(json);


    }

    //Add note
    const Addnote = async (title, description, tag) => {

        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhZTk2YWJmZTlmZmIzNzgyYWY4YjdhIn0sImlhdCI6MTY4OTIyNDAwMX0.DLt7hSchwTFNzj3lBCctXR0wiAxDUX5ztSbmJTzC7I4"
            },
            body: JSON.stringify({ title, description, tag }),
        });

        const note = await response.json();
        setNotes(notes.concat(note))
    }

    //Delete note
    const Deletenote = async (id) => {

        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhZTk2YWJmZTlmZmIzNzgyYWY4YjdhIn0sImlhdCI6MTY4OTIyNDAwMX0.DLt7hSchwTFNzj3lBCctXR0wiAxDUX5ztSbmJTzC7I4"
            },

        });
        const json = await response.json();
        console.log(json)


        //Deletenote
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    //Edit note
    const Editnote = async (id, title, description, tag) => {

        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhZTk2YWJmZTlmZmIzNzgyYWY4YjdhIn0sImlhdCI6MTY4OTIyNDAwMX0.DLt7hSchwTFNzj3lBCctXR0wiAxDUX5ztSbmJTzC7I4"
            },
            body: JSON.stringify({ title, description, tag }),
        });

        const json = await response.json();
        console.log(json)


        //Edit the note
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes)
    }


    return (
        <noteContext.Provider value={{ notes, Editnote, Deletenote, Addnote, Getallnotes }}>
            {props.children}
        </noteContext.Provider>
    )
}


export default NoteState;