import axios from "axios";
import React, { useState, useEffect } from "react";

function NotesComp() {
    const [notes, setNotes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [newNote, setNewNote] = useState({
        noteEleve: "",
        nomEleve: "",
        prenomEleve: "",
        nomMatiere: "",
    });
    const [updateNote, setUpdateNote] = useState({
        noteEleve: "",
        nomEleve: "",
        prenomEleve: "",
        nomMatiere: "",
    });

    const getAllNotes = async () => {
        const response = await axios.get("http://localhost:3001/notes");
        setNotes(response.data);
        console.log("resultats", response.data);
    };

    const addNote = async (event) => {
        event.preventDefault();
        const response = await axios.post("http://localhost:3001/notes", newNote);
        setNewNote({
            noteEleve: "",
            nomEleve: "",
            prenomEleve: "",
            nomMatiere: "",
        });
        getAllNotes();
    };

    const updateNoteById = async (event, id) => {
        event.preventDefault();
        const response = await axios.put(`http://localhost:3001/notes/${id}`, updateNote);
        setNotes(
            notes.map((note) => (note._id === id ? response.data : note))
        );
        setUpdateNote({
            noteEleve: "",
            nomEleve: "",
            prenomEleve: "",
            nomMatiere: "",
        });
        window.location.reload();
    };

    const deleteNoteById = async (id) => {
        await axios.delete(`http://localhost:3001/notes/${id}`);
        setNotes(notes.filter((note) => note._id !== id));
    };

    const selectNote = (note) => {
        setSelectedNoteId(note._id);
        setIsEditing(true);
        setUpdateNote(note);
    };

    useEffect(() => {
        getAllNotes();
    }, []);

    return (
        <div>
            {isAdding ? (
                <form onSubmit={addNote}>
                    <h1>Ajouter une note :</h1>
                    Note :{' '}
                    <label>
                        <input
                            type="number"
                            placeholder="noteEleve"
                            value={newNote.noteEleve}
                            onChange={(event) =>
                                setNewNote({ ...newNote, noteEleve: event.target.value })
                            }
                        />
                    </label><br />
                    Nom de l'élève :{' '}
                    <label>
                        <input
                            type="text"
                            placeholder="Nom"
                            value={newNote.nomEleve}
                            onChange={(event) =>
                                setNewNote({ ...newNote, nomEleve: event.target.value })
                            }
                        />
                    </label><br />
                    Prénom de l'élève :{' '}
                    <label>
                        <input
                            type="text"
                            placeholder="Prenom"
                            value={newNote.prenomEleve}
                            onChange={(event) =>
                                setNewNote({ ...newNote, prenomEleve: event.target.value })
                            }
                        />
                    </label><br />
                    Matiere :{' '}
                    <label>
                        <input
                            type="text"
                            placeholder="Matiere"
                            value={newNote.nomMatiere}
                            onChange={(event) =>
                                setNewNote({ ...newNote, nomMatiere: event.target.value })
                            }
                        />
                    </label><br />
                    <button type="submit">Ajouter</button>{' '}
                    <button onClick={() => setIsAdding(false)}>Annuler</button>
                    <br /><br /><br />
                </form>
            ) : (
                <>
                    <h1>Ajouter une note :</h1>
                    <button onClick={() => setIsAdding(true)}>Ajouter une note</button>
                    <br /><br />
                </>
            )}

            <h1>Liste des notes</h1>
            <ul style={{ listStyleType: "none", padding: "0" }}>
                {notes.map((note) => (
                    <li key={note._id} style={{ border: "1px solid black", padding: "10px" }}>
                        {isEditing && note._id === selectedNoteId ? (
                            <form onSubmit={(event) => updateNoteById(event, note._id)}>
                                Note :{' '}
                                <input
                                    type="number"
                                    placeholder="noteEleve"
                                    value={updateNote.noteEleve}
                                    onChange={(event) =>
                                        setUpdateNote({ ...updateNote, noteEleve: event.target.value })
                                    }
                                /><br />
                                Nom :{' '}
                                <input
                                    type="text"
                                    placeholder="Nom"
                                    value={updateNote.nomEleve}
                                    onChange={(event) =>
                                        setUpdateNote({ ...updateNote, nomEleve: event.target.value })
                                    }
                                /><br />
                                Prenom :{' '}
                                <input
                                    type="text"
                                    placeholder="Prenom"
                                    value={updateNote.prenomEleve}
                                    onChange={(event) =>
                                        setUpdateNote({ ...updateNote, prenomEleve: event.target.value })
                                    }
                                /><br />
                                Matiere :{' '}
                                <input
                                    type="text"
                                    placeholder="Matiere"
                                    value={updateNote.nomMatiere}
                                    onChange={(event) =>
                                        setUpdateNote({ ...updateNote, nomMatiere: event.target.value })
                                    }
                                /><br />
                                <button type="submit">Modifier</button>
                                <button onClick={() => setIsEditing(false)}>Annuler</button>
                            </form>
                        ) : (
                            <div>
                                Note : {note.noteEleve} <br />
                                Nom de l'élève : {note.nomEleve} <br />
                                Prénom de l'élève : {note.prenomEleve} <br />
                                Matiere : {note.nomMatiere} <br /><br />
                                <button className="delete-btn" onClick={() => deleteNoteById(note._id)}>
                                    Supprimer
                                </button>{" "}
                                <button className="edit-btn" onClick={() => { selectNote(note); setIsEditing(true) }}>
                                    Modifier
                                </button>
                            </div>
                        )}
                    </li>
                ))}

            </ul>

        </div>
    );
}

export default NotesComp;
