package br.com.diario.service;

import br.com.diario.DTO.mapper.PostagemMapper;
import br.com.diario.DTO.request.PostagemRequestDTO;
import br.com.diario.DTO.response.PostagemResponseDTO;
import br.com.diario.model.Postagem;
import br.com.diario.repository.PostagemRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostagemService {

    private final PostagemRepository repository;

    @Autowired
    private Cloudinary cloudinary;

    public PostagemService(PostagemRepository repository) {
        this.repository = repository;
    }

    public List<PostagemResponseDTO> listar() {
        return repository.findAll()
                .stream()
                .map(PostagemMapper::toDTO)
                .toList();
    }

    public Optional<PostagemResponseDTO> buscarPorId(Long id) {
        return repository.findById(id)
                .map(PostagemMapper::toDTO);
    }

    public PostagemResponseDTO salvar(PostagemRequestDTO dto) {
        try {
            Map uploadResult = cloudinary.uploader().upload(dto.getFoto().getBytes(), ObjectUtils.emptyMap());
            String urlImagem = uploadResult.get("secure_url").toString();

            Postagem postagem = new Postagem();
            postagem.setTitulo(dto.getTitulo());
            postagem.setTexto(dto.getTexto());
            postagem.setDataHora(LocalDateTime.now());
            postagem.setUrlImagem(urlImagem);

            repository.save(postagem);

            return new PostagemResponseDTO(postagem.getId(), postagem.getTitulo(), postagem.getTexto(), postagem.getDataHora(), postagem.getUrlImagem());
        } catch (IOException e) {
            throw new RuntimeException("Erro ao fazer upload da imagem", e);
        }
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public List<PostagemResponseDTO> listarTodas() {
        return repository.findAll()
                .stream()
                .map(postagem -> new PostagemResponseDTO(postagem))
                .collect(Collectors.toList());
    }



}

