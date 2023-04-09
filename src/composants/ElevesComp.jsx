import axios from "axios";
import React, { useState, useEffect } from "react";

function ElevesComp() {
    const [eleves, setEleves] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedEleveId, setSelectedEleveId] = useState(null);
    const [newEleve, setNewEleve] = useState({
        genreEleve: "",
        nomEleve: "",
        prenomEleve: "",
        cursus: "",
        nomClasse: "",
    });
    const [updateEleve, setUpdateEleve] = useState({
        nomEleve: "",
        prenomEleve: "",
        cursus: "",
        nomClasse: "",
    });

    const getAllEleves = async () => {
        const response = await axios.get("http://localhost:3001/eleves");
        setEleves(response.data);
        console.log("resultats", response.data);
    };

    const addEleve = async (event) => {
        event.preventDefault();
        const response = await axios.post("http://localhost:3001/eleves", newEleve);
        setNewEleve({
            genreEleve: "",
            nomEleve: "",
            prenomEleve: "",
            cursus: "",
            nomClasse: "",
        });
        getAllEleves();
    };

    const updateEleveById = async (event, id) => {
        event.preventDefault();
        const response = await axios.put(`http://localhost:3001/eleves/${id}`, updateEleve);
        setEleves(
            eleves.map((eleve) => (eleve._id === id ? response.data : eleve))
        );
        setUpdateEleve({
            nomEleve: "",
            prenomEleve: "",
            cursus: "",
            nomClasse: "",
        });
        window.location.reload();
    };

    const deleteEleveById = async (id) => {
        await axios.delete(`http://localhost:3001/eleves/${id}`);
        setEleves(eleves.filter((eleve) => eleve._id !== id));
    };

    const selectEleve = (eleve) => {
        setSelectedEleveId(eleve._id);
        setIsEditing(true);
        setUpdateEleve(eleve);
    };

    useEffect(() => {
        getAllEleves();
    }, []);

    return (
        <div>
            {isAdding ? (
                <form onSubmit={addEleve}>
                    <h1>Ajouter un(e) élève :</h1>
                    Genre :{' '}
                    <label>
                        <input
                            type="radio"
                            name="genreEleve"
                            value="M."
                            checked={newEleve.genreEleve === "M."}
                            onChange={(event) =>
                                setNewEleve({ ...newEleve, genreEleve: event.target.value })}
                        />
                        M.
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="genreEleve"
                            value="Mme."
                            checked={newEleve.genreEleve === "Mme."}
                            onChange={(event) =>
                                setNewEleve({ ...newEleve, genreEleve: event.target.value })}
                        />
                        Mme.
                    </label><br />
                    Nom :{' '}
                    <label>
                        <input
                            type="text"
                            placeholder="Nom"
                            value={newEleve.nomEleve}
                            onChange={(event) =>
                                setNewEleve({ ...newEleve, nomEleve: event.target.value })
                            }
                        />
                    </label><br />
                    Prénom :{' '}
                    <label>
                        <input
                            type="text"
                            placeholder="Prénom"
                            value={newEleve.prenomEleve}
                            onChange={(event) =>
                                setNewEleve({ ...newEleve, prenomEleve: event.target.value })
                            }
                        />
                    </label><br />
                    Cursus :{' '}
                    <label>
                        <input
                            type="text"
                            placeholder="Cursus"
                            value={newEleve.cursus}
                            onChange={(event) =>
                                setNewEleve({ ...newEleve, cursus: event.target.value })
                            }
                        />
                    </label><br />
                    Classe :{' '}
                    <label>
                        <input
                            type="text"
                            placeholder="Classe"
                            value={newEleve.nomClasse}
                            onChange={(event) =>
                                setNewEleve({ ...newEleve, nomClasse: event.target.value })
                            }
                        />
                    </label><br />
                    <button type="submit">Ajouter</button>{' '}
                    <button onClick={() => setIsAdding(false)}>Annuler</button>
                    <br /><br /><br />
                </form>
            ) : (
                <>
                    <h1>Ajouter un(e) élève :</h1>
                    <button onClick={() => setIsAdding(true)}>Ajouter un(e) élève</button>
                    <br /><br />
                </>
            )}

            <h1>Liste des élèves</h1>
            <ul style={{ listStyleType: "none", padding: "0" }}>
                {eleves.map((eleve) => (
                    <li key={eleve._id} style={{ border: "1px solid black", padding: "10px" }}>
                        {isEditing && eleve._id === selectedEleveId ? (
                            <form onSubmit={(event) => updateEleveById(event, eleve._id)}>
                                Nom :{' '}
                                <input
                                    type="text"
                                    placeholder="Nom"
                                    value={updateEleve.nomEleve}
                                    onChange={(event) =>
                                        setUpdateEleve({ ...updateEleve, nomEleve: event.target.value })
                                    }
                                /><br />
                                Prenom :{' '}
                                <input
                                    type="text"
                                    placeholder="Prenom"
                                    value={updateEleve.prenomEleve}
                                    onChange={(event) =>
                                        setUpdateEleve({ ...updateEleve, prenomEleve: event.target.value })
                                    }
                                /><br />
                                Cursus :{' '}
                                <input
                                    type="text"
                                    placeholder="Cursus"
                                    value={updateEleve.cursus}
                                    onChange={(event) =>
                                        setUpdateEleve({ ...updateEleve, cursus: event.target.value })
                                    }
                                /><br />
                                Classe :{' '}
                                <input
                                    type="text"
                                    placeholder="Classe"
                                    value={updateEleve.nomClasse}
                                    onChange={(event) =>
                                        setUpdateEleve({ ...updateEleve, nomClasse: event.target.value })
                                    }
                                /><br />
                                <button type="submit">Modifier</button>
                                <button onClick={() => setIsEditing(false)}>Annuler</button>
                            </form>
                        ) : (
                            <div>
                                Genre : {eleve.genreEleve} <br />
                                Nom : {eleve.nomEleve} <br />
                                Prénom : {eleve.prenomEleve} <br />
                                Cursus : {eleve.cursus} <br />
                                Classe : {eleve.nomClasse} <br /><br />
                                <button className="delete-btn" onClick={() => deleteEleveById(eleve._id)}>
                                    Supprimer
                                </button>{" "}
                                <button className="edit-btn" onClick={() => { selectEleve(eleve); setIsEditing(true) }}>
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

export default ElevesComp;
