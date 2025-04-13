function PostCard(props) {
    const { titulo, dataHora, imagem, resumo, idPostagem} = props;
    return (
        <div className="post-card">
            {imagem && <img src={imagem} alt={titulo} className="post-image"/>}
            <div className="post-content">
                <h2>{titulo}</h2>
                <p className="post-date">{dataHora}</p>
                <p className="post-resumo">{resumo}</p>
                <p className="post-id">ID: {idPostagem}</p>
            </div>
        </div>
    );
}

export default PostCard;