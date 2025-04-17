package br.com.diario.service;

import br.com.diario.DTO.mapper.PostagemMapper;
import br.com.diario.DTO.request.PostagemRequestDTO;
import br.com.diario.DTO.response.PostagemResponseDTO;
import br.com.diario.model.Postagem;
import br.com.diario.repository.PostagemRepository;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostagemService {

    private final PostagemRepository repository;

    public PostagemService(PostagemRepository repository) {
        this.repository = repository;
    }


    public Optional<PostagemResponseDTO> buscarPorId(Long id) {
        return repository.findById(id)
                .map(PostagemMapper::toDTO);
    }

    public PostagemResponseDTO salvar(PostagemRequestDTO dto) {
        Postagem postagem = new Postagem();
        postagem.setTexto(dto.getTexto());
        postagem.setFoto(dto.getFoto());
        postagem.setDataHora(LocalDateTime.now());
        return PostagemMapper.toDTO(repository.save(postagem));
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }


}

