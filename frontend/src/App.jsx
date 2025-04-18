import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/Postagem.css'
import Postagem from './pages/Postagem'
import Home from './pages/Home' // Você precisará criar esta página também

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/postagens/:id" element={<Postagem />} />
      </Routes>
    </Router>
  )
}

export default App