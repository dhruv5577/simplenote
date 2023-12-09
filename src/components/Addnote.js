import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/notecontext';

const Addnote = () => {
    const context = useContext(NoteContext)
    const { Addnote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleclick = (e) => {
        e.preventDefault();
        Addnote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className='container my-3'>

                <h1>Add a Note</h1>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" value={note.title} name="title" aria-describedby="title" onChange={onChange} minLength={5} required />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" value={note.description} name="description" id="description" onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">tag</label>
                        <input type="text" className="form-control" value={note.tag} name="tag" id="tag" onChange={onChange} />
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
                </form>


            </div>
        </div>
    )
}

export default Addnote
