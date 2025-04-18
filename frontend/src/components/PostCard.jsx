import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import '../styles/postcard.css';

const PostCard = ({ titulo, dataHora, imagem, resumo, idPostagem }) => {
  // Formatar a data para exibição
  const formatarData = (dataString) => {
    return format(parseISO(dataString), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
      locale: ptBR
    });
  };

  const resumoLimitado = resumo.length > 150 ? resumo.slice(0, 150) + '...' : resumo;

  return (
    <div className="post-card">
      <Link to={`/postagens/${idPostagem}`} className="card-link">
        {/* Container da Imagem */}
        <div className="image-container">
          {imagem ? (
            <img
              src={imagem}
              alt={titulo}
              className="post-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x225?text=Imagem+indisponível';
              }}
            />
          ) : (
            <div className="image-placeholder">
              <svg className="placeholder-icon" viewBox="0 0 24 24">
                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Conteúdo do Card */}
        <div className="card-content">
          <h3 className="post-title">{titulo}</h3>
          <div className="post-date">
            <svg className="date-icon" viewBox="0 0 24 24">
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatarData(dataHora)}</span>
          </div>
          <p className="post-resume">{resumoLimitado}</p>
        </div>
      </Link>

      {/* Botão Ver Mais */}
      <div className="card-footer">
        <Link to={`/postagens/${idPostagem}`} className="see-more-button">
          Ver mais
        </Link>
      </div>
    </div>
  );
};

export default PostCard;