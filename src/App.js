import './App.css';
import Accueil from './pages/Accueil';
import Administration from './pages/Administration';
import Classes from './pages/Classes';
import Eleves from './pages/Eleves';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Intervenants from './pages/Intervenants';
import Matieres from './pages/Matieres';
import Notes from './pages/Notes';

function App() {
  return (
    <Router>
      <main className="App">
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ display: "inline-block", marginRight: "1rem" }}>
              <NavLink to="/">Accueil</NavLink>
            </li>
            <li style={{ display: "inline-block", marginRight: "1rem" }}>
              <NavLink to="/administration">Administration</NavLink>
            </li>
            <li style={{ display: "inline-block", marginRight: "1rem" }}>
              <NavLink to="/classes">Classes</NavLink>
            </li>
            <li style={{ display: "inline-block", marginRight: "1rem" }}>
              <NavLink to="/eleves">Eleves</NavLink>
            </li>
            <li style={{ display: "inline-block", marginRight: "1rem" }}>
              <NavLink to="/intervenants">Intervenants</NavLink>
            </li>
            <li style={{ display: "inline-block", marginRight: "1rem" }}>
              <NavLink to="/matieres">Matières</NavLink>
            </li>
            <li style={{ display: "inline-block", marginRight: "1rem" }}>
              <NavLink to="/notes">Notes</NavLink>
            </li>
          </ul>
        </nav>


        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/administration" element={<Administration />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/eleves" element={<Eleves />} />
          <Route path="/intervenants" element={<Intervenants />} />
          <Route path="/matieres" element={<Matieres />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
