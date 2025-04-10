import { useParams } from "react-router-dom";

export default function Postagem() {
  const { id } = useParams();
  return <div><h2>Postagem {id}</h2></div>;
}