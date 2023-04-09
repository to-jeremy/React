import axios from "axios";
import React, { useState, useEffect } from "react";

function ClassesComp() {
    const [classes, setClasses] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedClasseId, setSelectedClasseId] = useState(null);
    const [newClasse, setNewClasse] = useState({
        nomClasse: "",
        cursus: "",
        nbEleve: "",
    });
    const [updateClasse, setUpdateClasse] = useState({
        nomClasse: "",
        cursus: "",
        nbEleve: "",
    });

    const getAllClasse = async () => {
        const response = await axios.get("http://localhost:3001/classes");
        setClasses(response.data);
        console.log("resultats", response.data);
    };

    const addClasse = async (event) => {
        event.preventDefault();
        const response = await axios.post("http://localhost:3001/classes", newClasse);
        setNewClasse({
            nomClasse: "",
            cursus: "",
            nbEleve: "",
        });
        getAllClasse();
    };

    const updateClasseById = async (event, id) => {
        event.preventDefault();
        const response = await axios.put(`http://localhost:3001/classes/${id}`, updateClasse);
        setClasses(
            classes.map((classe) => (classe._id === id ? response.data : classe))
        );
        setUpdateClasse({
            nomClasse: "",
            cursus: "",
            nbEleve: "",
        });
        window.location.reload();
    };

    const deleteClasseById = async (id) => {
        await axios.delete(`http://localhost:3001/classes/${id}`);
        setClasses(classes.filter((classe) => classe._id !== id));
    };

    const selectClasse = (classe) => {
        setSelectedClasseId(classe._id);
        setIsEditing(true);
        setUpdateClasse(classe);
    };

    useEffect(() => {
        getAllClasse();
    }, []);

    return (
        <div>
            {isAdding ? (
                <form onSubmit={addClasse}>
                    <h1>Ajouter une classe :</h1>
                    Nom de la classe :{' '}
                    <label>
                        <input
                            type="text"
                            placeholder="Nom"
                            value={newClasse.nomClasse}
                            onChange={(event) =>
                                setNewClasse({ ...newClasse, nomClasse: event.target.value })
                            }
                        />
                    </label><br />
                    Cursus :{' '}
                    <label>
                        <input
                            type="text"
                            placeholder="Cursus"
                            value={newClasse.cursus}
                            onChange={(event) =>
                                setNewClasse({ ...newClasse, cursus: event.target.value })
                            }
                        />
                    </label><br />
                    Nombre d'élèves :{' '}
                    <label>
                        <input
                            type="number"
                            placeholder="nbEleve"
                            value={newClasse.nbEleve}
                            onChange={(event) =>
                                setNewClasse({ ...newClasse, nbEleve: event.target.value })
                            }
                        />
                    </label><br />
                    <button type="submit">Ajouter</button>{' '}
                    <button onClick={() => setIsAdding(false)}>Annuler</button>
                    <br /><br /><br />
                </form>
            ) : (
                <>
                    <h1>Ajouter une classe :</h1>
                    <button onClick={() => setIsAdding(true)}>Ajouter une classe</button>
                    <br /><br />
                </>
            )}

            <h1>Liste des classes</h1>
            <ul style={{ listStyleType: "none", padding: "0" }}>
                {classes.map((classe) => (
                    <li key={classe._id} style={{ border: "1px solid black", padding: "10px" }}>
                        {isEditing && classe._id === selectedClasseId ? (
                            <form onSubmit={(event) => updateClasseById(event, classe._id)}>
                                Nom de la classe :{' '}
                                <input
                                    type="text"
                                    placeholder="Nom"
                                    value={updateClasse.nomClasse}
                                    onChange={(event) =>
                                        setUpdateClasse({ ...updateClasse, nomClasse: event.target.value })
                                    }
                                /><br />
                                Cursus :{' '}
                                <input
                                    type="text"
                                    placeholder="Cursus"
                                    value={updateClasse.cursus}
                                    onChange={(event) =>
                                        setUpdateClasse({ ...updateClasse, cursus: event.target.value })
                                    }
                                /><br />
                                Nombre d'élèves :{' '}
                                <input
                                    type="number"
                                    placeholder="nbEleve"
                                    value={updateClasse.nbEleve}
                                    onChange={(event) =>
                                        setUpdateClasse({ ...updateClasse, nbEleve: event.target.value })
                                    }
                                /><br />
                                <button type="submit">Modifier</button>
                                <button onClick={() => setIsEditing(false)}>Annuler</button>
                            </form>
                        ) : (
                            <div>
                                Nom de la classe : {classe.nomClasse} <br />
                                Cursus : {classe.cursus} <br />
                                Nombre d'élèves : {classe.nbEleve} <br /><br />
                                <button className="delete-btn" onClick={() => deleteClasseById(classe._id)}>
                                    Supprimer
                                </button>{" "}
                                <button className="edit-btn" onClick={() => { selectClasse(classe); setIsEditing(true) }}>
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

export default ClassesComp;
