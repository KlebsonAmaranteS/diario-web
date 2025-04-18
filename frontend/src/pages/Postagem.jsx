import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import '../styles/Postagem.css';

const Postagem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postagem, setPostagem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchPostagem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/postagens/${id}`);
        setPostagem(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Erro ao carregar a postagem');
      } finally {
        setLoading(false);
      }
    };

    fetchPostagem();
  }, [id]);

  const formatarData = (dataString) => {
    return format(parseISO(dataString), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
      locale: ptBR
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-card">
          <div className="error-message">{error}</div>
          <button
            onClick={() => navigate('/')}
            className="home-button"
          >
            ← Voltar para página inicial
          </button>
        </div>
      </div>
    );
  }

  if (!postagem) {
    return (
      <div className="not-found-container">
        <div className="not-found-card">
          <h1>Postagem não encontrada</h1>
          <button
            onClick={() => navigate('/')}
            className="home-button"
          >
            ← Voltar para página inicial
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="post-container">
      <div className="post-content">
        <button
          onClick={() => navigate(-1)}
          className="back-button"
        >
          <svg className="back-icon" viewBox="0 0 24 24">
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar
        </button>

        <article className="post-card">
          <div className="post-header">
            <h1 className="post-title">{postagem.titulo}</h1>
            <div className="post-date">
              <svg className="date-icon" viewBox="0 0 24 24">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatarData(postagem.dataHora)}</span>
            </div>
          </div>

          <div className="post-body">
            {postagem.urlImagem && (
              <div className="image-container">
                {imageLoading && (
                  <div className="image-loader"></div>
                )}
                <img
                  src={postagem.urlImagem}
                  alt={postagem.titulo}
                  className={`post-image ${imageLoading ? 'image-hidden' : ''}`}
                  onLoad={() => setImageLoading(false)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/800x450?text=Imagem+não+disponível';
                    setImageLoading(false);
                  }}
                />
              </div>
            )}

            <div className="post-text">
              {postagem.texto}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Postagem;