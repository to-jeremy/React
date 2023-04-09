import axios from "axios";
import React, { useState, useEffect } from "react";

function AdministrationComp() {
    const [personnes, setPersonnes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedPersonId, setSelectedPersonId] = useState(null);
    const [newPerson, setNewPerson] = useState({
        genrePerson: "",
        nomPerson: "",
        prenomPerson: "",
        poste: "",
        gereCursus: "",
    });
    const [updatePerson, setUpdatePerson] = useState({
        nomPerson: "",
        prenomPerson: "",
        poste: "",
        gereCursus: "",
    });

    const getAllPerson = async () => {
        const response = await axios.get("http://localhost:3001/administration");
        setPersonnes(response.data);
        console.log("resultats", response.data);
    };

    const addPerson = async (event) => {
        event.preventDefault();
        const response = await axios.post("http://localhost:3001/administration", newPerson);
        setNewPerson({
            genrePerson: "",
            nomPerson: "",
            prenomPerson: "",
            poste: "",
            gereCursus: "",
        });
        getAllPerson();
    };

    const updatePersonById = async (event, id) => {
        event.preventDefault();
        const response = await axios.put(`http://localhost:3001/administration/${id}`, updatePerson);
        setPersonnes(
            personnes.map((personne) => (personne._id === id ? response.data : personne))
        );
        setUpdatePerson({
            nomPerson: "",
            prenomPerson: "",
            poste: "",
            gereCursus: "",
        });
        window.location.reload();
    };

    const deletePersonById = async (id) => {
        await axios.delete(`http://localhost:3001/administration/${id}`);
        setPersonnes(personnes.filter((personne) => personne._id !== id));
    };

    const selectPerson = (personne) => {
        setSelectedPersonId(personne._id);
        setIsEditing(true);
        setUpdatePerson(personne);
    };

    useEffect(() => {
        getAllPerson();
    }, []);

    return (
        <div>
            {isAdding ? (
                <form onSubmit={addPerson}>
                    <h1>Ajouter une personne :</h1>
                    Genre :{' '}
                    <label>
                        <input
                            type="radio"
                            name="genrePerson"
                            value="M."
                            checked={newPerson.genrePerson === "M."}
                            onChange={(event) =>
                                setNewPerson({ ...newPerson, genrePerson: event.target.value })}
                        />
                        M.
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="genrePerson"
                            value="Mme."
                            checked={newPerson.genrePerson === "Mme."}
                            onChange={(event) =>
                                setNewPerson({ ...newPerson, genrePerson: event.target.value })}
                        />
                        Mme.
                    </label><br />

                    Nom :{' '}
                    <label>
                        <input
                            type="text"
                            placeholder="Nom"
                            value={newPerson.nomPerson}
                            onChange={(event) =>
                                setNewPerson({ ...newPerson, nomPerson: event.target.value })
                            }
                        />
                    </label><br />
                    Prénom :{' '}
                    <label>
                        <input
                            type="text"
                            placeholder="Prénom"
                            value={newPerson.prenomPerson}
                            onChange={(event) =>
                                setNewPerson({ ...newPerson, prenomPerson: event.target.value })
                            }
                        />
                    </label><br />
                    Poste :{' '}
                    <label>
                        <input
                            type="text"
                            placeholder="Poste"
                            value={newPerson.poste}
                            onChange={(event) =>
                                setNewPerson({ ...newPerson, poste: event.target.value })
                            }
                        />
                    </label><br />
                    Gère le cursus :{' '}
                    <label>
                        <input
                            type="text"
                            placeholder="gereCursus"
                            value={newPerson.gereCursus}
                            onChange={(event) =>
                                setNewPerson({ ...newPerson, gereCursus: event.target.value })
                            }
                        />
                    </label><br />
                    <button type="submit">Ajouter</button>{' '}
                    <button onClick={() => setIsAdding(false)}>Annuler</button>
                    <br /><br /><br />
                </form>
            ) : (
                <>
                    <h1>Ajouter une personne :</h1>
                    <button onClick={() => setIsAdding(true)}>Ajouter une personne</button>
                    <br /><br />
                </>
            )}

            <h1>Liste des personnes de l'administration</h1>
            <ul style={{ listStyleType: "none", padding: "0" }}>
                {personnes.map((personne) => (
                    <li key={personne._id} style={{ border: "1px solid black", padding: "10px" }}>
                        {isEditing && personne._id === selectedPersonId ? (
                            <form onSubmit={(event) => updatePersonById(event, personne._id)}>
                                Nom :{' '}
                                <input
                                    type="text"
                                    placeholder="Nom"
                                    value={updatePerson.nomPerson}
                                    onChange={(event) =>
                                        setUpdatePerson({ ...updatePerson, nomPerson: event.target.value })
                                    }
                                /><br />
                                Prenom :{' '}
                                <input
                                    type="text"
                                    placeholder="Prenom"
                                    value={updatePerson.prenomPerson}
                                    onChange={(event) =>
                                        setUpdatePerson({ ...updatePerson, prenomPerson: event.target.value })
                                    }
                                /><br />
                                Poste :{' '}
                                <input
                                    type="text"
                                    placeholder="Poste"
                                    value={updatePerson.poste}
                                    onChange={(event) =>
                                        setUpdatePerson({ ...updatePerson, poste: event.target.value })
                                    }
                                /><br />
                                Gère le cursus :{' '}
                                <input
                                    type="text"
                                    placeholder="gereCursus"
                                    value={updatePerson.gereCursus}
                                    onChange={(event) =>
                                        setUpdatePerson({ ...updatePerson, gereCursus: event.target.value })
                                    }
                                /><br />
                                <button type="submit">Modifier</button>
                                <button onClick={() => setIsEditing(false)}>Annuler</button>
                            </form>
                        ) : (
                            <div>
                                Genre : {personne.genrePerson} <br />
                                Nom : {personne.nomPerson} <br />
                                Prénom : {personne.prenomPerson} <br />
                                Poste : {personne.poste} <br />
                                Gère le cursus : {personne.gereCursus} <br /><br />
                                <button className="delete-btn" onClick={() => deletePersonById(personne._id)}>
                                    Supprimer
                                </button>{" "}
                                <button className="edit-btn" onClick={() => { selectPerson(personne); setIsEditing(true) }}>
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

export default AdministrationComp;
