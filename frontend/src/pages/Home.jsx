import { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import FormularioPostagem from '../components/FormularioPostagem';
import '../styles/Home.css';

const Home = () => {
  const [postagens, setPostagens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchPostagens = async () => {
      try {
        const response = await axios.get('http://localhost:8080/postagens');
        setPostagens(response.data);
      } catch (error) {
        setErro('Erro ao carregar postagens. Tente recarregar a página.');
        console.error('Erro:', error);
      } finally {
        setCarregando(false);
      }
    };

    fetchPostagens();
  }, []);

  const handleNovaPostagem = (novaPostagem) => {
    setPostagens([novaPostagem, ...postagens]);
  };

  // Separa a última postagem (destaque) das demais
  const ultimaPostagem = postagens.length > 0 ? postagens[0] : null;
  const demaisPostagens = postagens.length > 1 ? postagens.slice(1) : [];

  return (
    <div className="home-container">
      {/* Header Moderno */}
      <header className="home-header">
        <div className="header-content">
          <h1>MEU DIARIO WEB</h1>
          <p className="subtitle">D.A.W III</p>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="home-main">
        {carregando ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : erro ? (
          <div className="error-message">
            {erro}
          </div>
        ) : (
          <div className="posts-container">
            <h1>Minhas postagens</h1>
            {/* Card destacado (última postagem) */}
            {ultimaPostagem && (
              <div className="featured-post">
                <PostCard
                  key={ultimaPostagem.id}
                  titulo={ultimaPostagem.titulo}
                  dataHora={ultimaPostagem.dataHora}
                  imagem={ultimaPostagem.urlImagem}
                  resumo={ultimaPostagem.texto}
                  idPostagem={ultimaPostagem.id}
                  isFeatured={true}
                />
              </div>
            )}

            {/* Grid de postagens em pares */}
            {demaisPostagens.length > 0 && (
              <div className="posts-grid">
                
                {demaisPostagens.map((postagem, index) => (
                  <PostCard
                    key={postagem.id}
                    titulo={postagem.titulo}
                    dataHora={postagem.dataHora}
                    imagem={postagem.urlImagem}
                    resumo={postagem.texto}
                    idPostagem={postagem.id}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Formulário no Rodapé */}
      <FormularioPostagem onNovaPostagem={handleNovaPostagem} />
    </div>
  );
};

export default Home;