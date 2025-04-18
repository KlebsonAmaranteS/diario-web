import { useState, useRef } from 'react';
import axios from 'axios';
import '../styles/formularioPostagem.css';

const FormularioPostagem = ({ onNovaPostagem }) => {
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [imagem, setImagem] = useState(null);
  const [previewImagem, setPreviewImagem] = useState(null);
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });
  const [enviando, setEnviando] = useState(false);
  const fileInputRef = useRef(null);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Verifica o tipo da imagem
      if (!file.type.match('image.*')) {
        setMensagem({ texto: 'Por favor, selecione um arquivo de imagem válido.', tipo: 'erro' });
        return;
      }

      // Verifica o tamanho da imagem (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMensagem({ texto: 'A imagem deve ter no máximo 5MB.', tipo: 'erro' });
        return;
      }

      setImagem(file);
      setPreviewImagem(URL.createObjectURL(file));
      setMensagem({ texto: '', tipo: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação simples
    if (!titulo.trim()) {
      setMensagem({ texto: 'O título é obrigatório.', tipo: 'erro' });
      return;
    }

    if (titulo.length > 100) {
      setMensagem({ texto: 'O título deve ter no máximo 100 caracteres.', tipo: 'erro' });
      return;
    }

    if (!texto.trim()) {
      setMensagem({ texto: 'O texto da postagem é obrigatório.', tipo: 'erro' });
      return;
    }

    try {
      setEnviando(true);

      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('texto', texto);
      if (imagem) {
        formData.append('foto', imagem);
      }

      const response = await axios.post('http://localhost:8080/postagens', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Limpa o formulário
      setTitulo('');
      setTexto('');
      setImagem(null);
      setPreviewImagem(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      setMensagem({ texto: 'Postagem criada com sucesso!', tipo: 'sucesso' });

      // Chama a função para atualizar a listagem
      if (onNovaPostagem) {
        onNovaPostagem(response.data);
      }
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
      setMensagem({
        texto: error.response?.data?.message || 'Erro ao criar postagem. Tente novamente.',
        tipo: 'erro'
      });
    } finally {
      setEnviando(false);
    }
  };

  const removerImagem = () => {
    setImagem(null);
    setPreviewImagem(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <footer className="formulario-postagem-container">
      <h2 className="formulario-titulo">Criar Nova Postagem</h2>

      {mensagem.texto && (
        <div className={`mensagem ${mensagem.tipo}`}>
          {mensagem.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="formulario-postagem">
        <div className="campo-formulario">
          <label htmlFor="titulo">Título*</label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            maxLength="100"
            placeholder="Dê um título à sua postagem"
            required
          />
          <span className="contador-caracteres">{titulo.length}/100</span>
        </div>

        <div className="campo-formulario">
          <label htmlFor="imagem">Imagem (opcional)</label>
          <div className="upload-container">
            {previewImagem ? (
              <div className="preview-imagem-container">
                <img src={previewImagem} alt="Preview" className="preview-imagem" />
                <button
                  type="button"
                  onClick={removerImagem}
                  className="botao-remover-imagem"
                >
                  Remover
                </button>
              </div>
            ) : (
              <>
                <label htmlFor="imagem" className="custom-file-upload">
                  <span>Selecionar imagem</span>
                  <input
                    id="imagem"
                    type="file"
                    accept="image/*"
                    onChange={handleImagemChange}
                    ref={fileInputRef}
                  />
                </label>
                <span className="dica-upload">Formatos: JPG, PNG (Máx. 5MB)</span>
              </>
            )}
          </div>
        </div>

        <div className="campo-formulario">
          <label htmlFor="texto">Texto da Postagem*</label>
          <textarea
            id="texto"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Descreva como foi seu dia..."
            required
            rows="5"
          ></textarea>
        </div>

        <button
          type="submit"
          className="botao-enviar"
          disabled={enviando}
        >
          {enviando ? 'Enviando...' : 'Publicar Postagem'}
        </button>
      </form>
    </footer>
  );
};

export default FormularioPostagem;