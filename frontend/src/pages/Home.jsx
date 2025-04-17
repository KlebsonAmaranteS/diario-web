import React from "react";

// import React, { useEffect, useState } from "react";
// import axios from "axios";

import PostCard from "../components/PostCard";
import image001 from "../images/img_001.jpg";
import image002 from "../images/img_002.png";
import image003 from "../images/img_003.png";
import "../styles/Home.css";

function Home() {

  // Aqui abaixo deve fcar a logica para receber as postagens do banco
  // usando o axios
  // const [postagens, setPostagens] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [erro, setErro] = useState(null);

  // useEffect(() => {
  //  
  //   axios.get("http://localhost:8080/api/postagens")
  //     .then((response) => {
  //       setPostagens(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Erro ao buscar postagens:", error);
  //       setErro("Erro ao carregar postagens.");
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) return <p>Carregando postagens...</p>;
  // if (erro) return <p>{erro}</p>;



  const postagens = [
    {
      id: "1",
      titulo: "Um dia diferente",
      dataHora: "2025-04-08 15:30",
      imagem: image001,
      resumo: "Hoje foi um dia muito especial. Fiz algo que nunca tinha feito antes...",
    },
    {
      id: "2",
      titulo: "Estudando React",
      dataHora: "2025-04-10 10:00",
      imagem: image002,
      resumo: "Hoje comecei a estudar React e estou achando incrível! Já consigo fazer componentes.",
    },
    {
      id: "3",
      titulo: "Caminhada pela cidade",
      dataHora: "2025-04-12 18:45",
      imagem: image003,
      resumo: "Fiz uma caminhada longa pela cidade e tirei várias fotos legais dos lugares que passei.",
    },
    {
      id: "3",
      titulo: "Caminhada pela cidade",
      dataHora: "2025-04-12 18:45",
      imagem: image003,
      resumo: "Fiz uma caminhada longa pela cidade e tirei várias fotos legais dos lugares que passei.",
    },
    {
      id: "3",
      titulo: "Caminhada pela cidade",
      dataHora: "2025-04-12 18:45",
      imagem: image003,
      resumo: "Fiz uma caminhada longa pela cidade e tirei várias fotos legais dos lugares que passei.",
    },
    {
      id: "3",
      titulo: "Caminhada pela cidade",
      dataHora: "2025-04-12 18:45",
      imagem: image003,
      resumo: "Fiz uma caminhada longa pela cidade e tirei várias fotos legais dos lugares que passei.",
    },
  ];

  return (
    <div className="home-container">
      <h1 className="home-title">Diário</h1>
      
      <div className="posts-outer-wrapper">
        <h1>And this is a
        massive headline</h1>

        <p>Creio que aqi tem que ser feito outro componet para a imagem principal</p>
        <div className="posts-grid">
          {postagens.map((post) => (
            <div className="post-card-wrapper" key={post.id}>
              <PostCard
                idPostagem={post.id}
                titulo={post.titulo}
                dataHora={post.dataHora}
                imagem={post.imagem}
                resumo={post.resumo}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
