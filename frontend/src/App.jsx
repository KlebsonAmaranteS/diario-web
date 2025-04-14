import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Postagem from "./pages/Postagem";
import PostCard from "./components/postCard";
import image001 from './images/img_001.jpg';

function App() {
  return (
    <Router>
      <Header />
      <PostCard
        titulo="Um dia diferente"
        dataHora="2025-04-08 15:30"
        imagem={image001}
        resumo="Hoje foi um dia muito especial. Fiz algo que nunca tinha feito antes..."
        idPostagem="123"
      />
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