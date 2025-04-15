package br.com.diario.DTO.mapper;

import br.com.diario.DTO.response.PostagemResponseDTO;
import br.com.diario.model.Postagem;

import java.time.LocalDateTime;

public class PostagemMapper {

    public static PostagemResponseDTO toDTO(Postagem postagem) {
        PostagemResponseDTO dto = new PostagemResponseDTO();
        dto.setId(postagem.getId());
        dto.setTitulo(postagem.getTitulo());
        dto.setTexto(postagem.getTexto());
        dto.setDataHora(LocalDateTime.now());
        dto.setFoto(postagem.getFoto());
        return dto;
    }

    public static Postagem toEntity(PostagemResponseDTO dto) {
        Postagem postagem = new Postagem();
        postagem.setId(dto.getId());
        postagem.setTitulo(dto.getTitulo());
        postagem.setTexto(dto.getTexto());
        postagem.setDataHora(dto.getDataHora());
        postagem.setFoto(dto.getFoto());
        return postagem;
    }
}
