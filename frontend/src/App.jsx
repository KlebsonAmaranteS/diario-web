import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Postagem from "./pages/Postagem";
import PostCard from "./components/postCard";

function App() {
  return (
    <Router>
      <Header />
      <PostCard>
        <h2>Exemplo de Cartão</h2>
        <p>11/04/2025</p>
        <p>Exemplo de entrada no diário. Aqui ficará o resumo do texto.. O usuário pode expandir esse cartão para ler o texto completo.</p>
      <button>Ver mais</button>
      </PostCard>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/postagem/:id" element={<Postagem />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;