import axios from "axios";
import React, { useState, useEffect } from "react";

function IntervenantsComp() {
    const [intervenants, setIntervenants] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedIntervId, setSelectedIntervId] = useState(null);
    const [newInterv, setNewInterv] = useState({
        genreInterv: "",
        nomInterv: "",
        prenomInterv: "",
        gereCursus: "",
    });
    const [updateInterv, setUpdateInterv] = useState({
        nomInterv: "",
        prenomInterv: "",
        gereCursus: "",
    });

    const getAllInterv = async () => {
        const response = await axios.get("http://localhost:3001/intervenants");
        setIntervenants(response.data);
        console.log("resultats", response.data);
    };

    const addInterv = async (event) => {
        event.preventDefault();
        const response = await axios.post("http://localhost:3001/intervenants", newInterv);
        setNewInterv({
            genreInterv: "",
            nomInterv: "",
            prenomInterv: "",
            gereCursus: "",
        });
        getAllInterv();
    };

    const updateIntervById = async (event, id) => {
        event.preventDefault();
        const response = await axios.put(`http://localhost:3001/intervenants/${id}`, updateInterv);
        setIntervenants(
            intervenants.map((intervenant) => (intervenant._id === id ? response.data : intervenant))
        );
        setUpdateInterv({
            nomInterv: "",
            prenomInterv: "",
            gereCursus: "",
        });
        window.location.reload();
    };

    const deleteIntervById = async (id) => {
        await axios.delete(`http://localhost:3001/intervenants/${id}`);
        setIntervenants(intervenants.filter((intervenant) => intervenant._id !== id));
    };

    const selectInterv = (intervenant) => {
        setSelectedIntervId(intervenant._id);
        setIsEditing(true);
        setUpdateInterv(intervenant);
    };

    useEffect(() => {
        getAllInterv();
    }, []);

    return (
        <div>
            {isAdding ? (
                <form onSubmit={addInterv}>
                    <h1>Ajouter un(e) intervenant(e) :</h1>
                    Genre :{' '}
                    <label>
                        <input
                            type="radio"
                            name="genreInterv"
                            value="M."
                            checked={newInterv.genreInterv === "M."}
                            onChange={(event) =>
                                setNewInterv({ ...newInterv, genreInterv: event.target.value })}
                        />
                        M.
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="genreInterv"
                            value="Mme."
                            checked={newInterv.genreInterv === "Mme."}
                            onChange={(event) =>
                                setNewInterv({ ...newInterv, genreInterv: event.target.value })}
                        />
                        Mme.
                    </label><br />
                    Nom :{' '}
                    <label>
                        <input
                            type="text"
                            placeholder="Nom"
                            value={newInterv.nomInterv}
                            onChange={(event) =>
                                setNewInterv({ ...newInterv, nomInterv: event.target.value })
                            }
                        />
                    </label><br />
                    Prénom :{' '}
                    <label>
                        <input
                            type="text"
                            placeholder="Prénom"
                            value={newInterv.prenomInterv}
                            onChange={(event) =>
                                setNewInterv({ ...newInterv, prenomInterv: event.target.value })
                            }
                        />
                    </label><br />
                    Gère le cursus :{' '}
                    <label>
                        <input
                            type="text"
                            placeholder="gereCursus"
                            value={newInterv.gereCursus}
                            onChange={(event) =>
                                setNewInterv({ ...newInterv, gereCursus: event.target.value })
                            }
                        />
                    </label><br />
                    <button type="submit">Ajouter</button>{' '}
                    <button onClick={() => setIsAdding(false)}>Annuler</button>
                    <br /><br /><br />
                </form>
            ) : (
                <>
                    <h1>Ajouter un(e) intervenant(e) :</h1>
                    <button onClick={() => setIsAdding(true)}>Ajouter un(e) intervenant(e)</button>
                    <br /><br />
                </>
            )}

            <h1>Liste des intervenant(e)s</h1>
            <ul style={{ listStyleType: "none", padding: "0" }}>
                {intervenants.map((intervenant) => (
                    <li key={intervenant._id} style={{ border: "1px solid black", padding: "10px" }}>
                        {isEditing && intervenant._id === selectedIntervId ? (
                            <form onSubmit={(event) => updateIntervById(event, intervenant._id)}>
                                Nom :{' '}
                                <input
                                    type="text"
                                    placeholder="Nom"
                                    value={updateInterv.nomInterv}
                                    onChange={(event) =>
                                        setUpdateInterv({ ...updateInterv, nomInterv: event.target.value })
                                    }
                                /><br />
                                Prenom :{' '}
                                <input
                                    type="text"
                                    placeholder="Prenom"
                                    value={updateInterv.prenomInterv}
                                    onChange={(event) =>
                                        setUpdateInterv({ ...updateInterv, prenomInterv: event.target.value })
                                    }
                                /><br />
                                Gère le cursus :{' '}
                                <input
                                    type="text"
                                    placeholder="gereCursus"
                                    value={updateInterv.gereCursus}
                                    onChange={(event) =>
                                        setUpdateInterv({ ...updateInterv, gereCursus: event.target.value })
                                    }
                                /><br />
                                <button type="submit">Modifier</button>
                                <button onClick={() => setIsEditing(false)}>Annuler</button>
                            </form>
                        ) : (
                            <div>
                                Genre : {intervenant.genreInterv} <br />
                                Nom : {intervenant.nomInterv} <br />
                                Prénom : {intervenant.prenomInterv} <br />
                                Gère le cursus : {intervenant.gereCursus} <br /><br />
                                <button className="delete-btn" onClick={() => deleteIntervById(intervenant._id)}>
                                    Supprimer
                                </button>{" "}
                                <button className="edit-btn" onClick={() => { selectInterv(intervenant); setIsEditing(true) }}>
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

export default IntervenantsComp;
