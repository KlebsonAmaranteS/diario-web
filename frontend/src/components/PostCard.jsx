import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function PostCard(props) {
    const { titulo, dataHora, imagem, resumo, idPostagem } = props;
    const sliceResumo = (texto, tamanhoMaximo) => {
        if (texto.length <= tamanhoMaximo) {
            return texto;
        }
        return texto.slice(0, tamanhoMaximo) + "...";
    };
    const resumoTruncado = sliceResumo(resumo, 50);
    return (
        <div className="post-card">
            {imagem && <img src={imagem} alt={titulo} className="post-image" />}
            <div className="post-content">
                <h2>{titulo}</h2>
                <p className="post-date">{dataHora}</p>
                <p className="post-resumo">{resumoTruncado}</p>
                <p className="post-id">ID: {idPostagem}</p>
                <Link to={`/postagem/${idPostagem}`}>
                    <button>Ver mais</button>
                </Link>
            </div>
        </div>
    );
}

export default PostCard;