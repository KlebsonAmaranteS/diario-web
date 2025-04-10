import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Postagem from "./pages/Postagem";

function App() {
  return (
    <Router>
      <Header />
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