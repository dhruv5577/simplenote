import React, { useContext, useState, useEffect, useRef } from 'react'
import NoteContext from '../context/notes/notecontext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const context = useContext(NoteContext)
    const { notes, Getallnotes, Editnote } = context;
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            Getallnotes();
        }
        else {
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const ref = useRef(null);
    const refclose = useRef(null);

    const updateNote = (currentnote) => {
        ref.current.click();
        setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })
    }

    const handleclick = (e) => {
        console.log("updating the note...", note)
        Editnote(note.id, note.etitle, note.edescription, note.etag)
        refclose.current.click();

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Addnote />
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                    <div id="emailHelp" className="form-text" minLength={5} required></div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" name="edescription" value={note.edescription} id="edescription" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">tag</label>
                                    <input type="text" className="form-control" name="etag" value={note.etag} id="etag" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" onClick={handleclick} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h1>Your Notes</h1>
                <div className="container mx-2">
                    {notes.length === 0 && 'no notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
