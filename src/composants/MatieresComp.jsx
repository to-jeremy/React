import axios from "axios";
import React, { useState, useEffect } from "react";

function MatieresComp() {
    const [matieres, setMatieres] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedMatiereId, setSelectedMatiereId] = useState(null);
    const [newMatiere, setNewMatiere] = useState({
        nomMatiere: "",
        nomClasse: "",
        nomInterv: "",
        prenomInterv: "",
    });
    const [updateMatiere, setUpdateMatiere] = useState({
        nomMatiere: "",
        nomClasse: "",
        nomInterv: "",
        prenomInterv: "",
    });

    const getAllMatiere = async () => {
        const response = await axios.get("http://localhost:3001/matieres");
        setMatieres(response.data);
        console.log("resultats", response.data);
    };

    const addMatiere = async (event) => {
        event.preventDefault();
        const response = await axios.post("http://localhost:3001/matieres", newMatiere);
        setNewMatiere({
            nomMatiere: "",
            nomClasse: "",
            nomInterv: "",
            prenomInterv: "",
        });
        getAllMatiere();
    };

    const updateMatiereById = async (event, id) => {
        event.preventDefault();
        const response = await axios.put(`http://localhost:3001/matieres/${id}`, updateMatiere);
        setMatieres(
            matieres.map((matiere) => (matiere._id === id ? response.data : matiere))
        );
        setUpdateMatiere({
            nomMatiere: "",
            nomClasse: "",
            nomInterv: "",
            prenomInterv: "",
        });
        window.location.reload();
    };

    const deleteMatiereById = async (id) => {
        await axios.delete(`http://localhost:3001/matieres/${id}`);
        setMatieres(matieres.filter((matiere) => matiere._id !== id));
    };

    const selectMatiere = (matiere) => {
        setSelectedMatiereId(matiere._id);
        setIsEditing(true);
        setUpdateMatiere(matiere);
    };

    useEffect(() => {
        getAllMatiere();
    }, []);

    return (
        <div>
            {isAdding ? (
                <form onSubmit={addMatiere}>
                    <h1>Ajouter une matiere :</h1>
                    Matière :{' '}
                    <label>
                        <input
                            type="text"
                            placeholder="NomM"
                            value={newMatiere.nomMatiere}
                            onChange={(event) =>
                                setNewMatiere({ ...newMatiere, nomMatiere: event.target.value })
                            }
                        />
                    </label><br />
                    Classe :{' '}
                    <label>
                        <input
                            type="text"
                            placeholder="NomC"
                            value={newMatiere.nomClasse}
                            onChange={(event) =>
                                setNewMatiere({ ...newMatiere, nomClasse: event.target.value })
                            }
                        />
                    </label><br />
                    Nom de l'intervenant :{' '}
                    <label>
                        <input
                            type="text"
                            placeholder="NomI"
                            value={newMatiere.nomInterv}
                            onChange={(event) =>
                                setNewMatiere({ ...newMatiere, nomInterv: event.target.value })
                            }
                        />
                    </label><br />
                    Prénom de l'intervenant :{' '}
                    <label>
                        <input
                            type="text"
                            placeholder="PrenomI"
                            value={newMatiere.prenomInterv}
                            onChange={(event) =>
                                setNewMatiere({ ...newMatiere, prenomInterv: event.target.value })
                            }
                        />
                    </label><br />
                    <button type="submit">Ajouter</button>{' '}
                    <button onClick={() => setIsAdding(false)}>Annuler</button>
                    <br /><br /><br />
                </form>
            ) : (
                <>
                    <h1>Ajouter une matiere :</h1>
                    <button onClick={() => setIsAdding(true)}>Ajouter une matiere</button>
                    <br /><br />
                </>
            )}

            <h1>Liste des matieres</h1>
            <ul style={{ listStyleType: "none", padding: "0" }}>
                {matieres.map((matiere) => (
                    <li key={matiere._id} style={{ border: "1px solid black", padding: "10px" }}>
                        {isEditing && matiere._id === selectedMatiereId ? (
                            <form onSubmit={(event) => updateMatiereById(event, matiere._id)}>
                                Matière :{' '}
                                <input
                                    type="text"
                                    placeholder="NomM"
                                    value={updateMatiere.nomMatiere}
                                    onChange={(event) =>
                                        setUpdateMatiere({ ...updateMatiere, nomMatiere: event.target.value })
                                    }
                                /><br />
                                Classe :{' '}
                                <input
                                    type="text"
                                    placeholder="NomC"
                                    value={updateMatiere.nomClasse}
                                    onChange={(event) =>
                                        setUpdateMatiere({ ...updateMatiere, nomClasse: event.target.value })
                                    }
                                /><br />
                                Nom de l'intervenant :{' '}
                                <input
                                    type="text"
                                    placeholder="NomI"
                                    value={updateMatiere.nomInterv}
                                    onChange={(event) =>
                                        setUpdateMatiere({ ...updateMatiere, nomInterv: event.target.value })
                                    }
                                /><br />
                                Prénom de l'intervenant :{' '}
                                <input
                                    type="text"
                                    placeholder="PrenomI"
                                    value={updateMatiere.prenomInterv}
                                    onChange={(event) =>
                                        setUpdateMatiere({ ...updateMatiere, prenomInterv: event.target.value })
                                    }
                                /><br />
                                <button type="submit">Modifier</button>
                                <button onClick={() => setIsEditing(false)}>Annuler</button>
                            </form>
                        ) : (
                            <div>
                                Matière : {matiere.nomMatiere} <br />
                                Classe : {matiere.nomClasse} <br />
                                Nom de l'intervenant : {matiere.nomInterv} <br />
                                Prénom de l'intervenant : {matiere.prenomInterv} <br /><br />
                                <button className="delete-btn" onClick={() => deleteMatiereById(matiere._id)}>
                                    Supprimer
                                </button>{" "}
                                <button className="edit-btn" onClick={() => { selectMatiere(matiere); setIsEditing(true) }}>
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

export default MatieresComp;
