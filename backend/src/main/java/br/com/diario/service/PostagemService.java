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
    private final Cloudinary cloudinary;

    @Autowired
    public PostagemService(PostagemRepository repository, Cloudinary cloudinary) {
        this.repository = repository;
        this.cloudinary = cloudinary;
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

    private PostagemResponseDTO toResponseDTO(Postagem postagem) {
        PostagemResponseDTO dto = new PostagemResponseDTO();
        dto.setId(postagem.getId());
        dto.setTitulo(postagem.getTitulo());
        dto.setTexto(postagem.getTexto());
        dto.setDataHora(postagem.getDataHora());
        dto.setUrlImagem(postagem.getUrlImagem());
        return dto;
    }

    public PostagemResponseDTO salvar(PostagemRequestDTO dto) {
        try {
            // Upload da imagem para o Cloudinary
            Map uploadResult = cloudinary.uploader().upload(
                    dto.getFoto().getBytes(),
                    ObjectUtils.asMap(
                            "folder", "diario_postagens", // Organiza em pastas
                            "resource_type", "auto" // Detecta automaticamente o tipo
                    )
            );

            // Extrai informações do upload
            String urlImagem = uploadResult.get("secure_url").toString();
            String publicId = uploadResult.get("public_id").toString();

            // Cria e salva a postagem
            Postagem postagem = new Postagem();
            postagem.setTitulo(dto.getTitulo());
            postagem.setTexto(dto.getTexto());
            postagem.setDataHora(LocalDateTime.now());
            postagem.setUrlImagem(urlImagem);
            postagem.setPublicIdImagem(publicId);

            Postagem savedPostagem = repository.save(postagem);

            return toResponseDTO(savedPostagem);
        } catch (IOException e) {
            throw new RuntimeException("Erro ao processar a imagem", e);
        }
    }

//    public void deletar(Long id) {
//        repository.deleteById(id);
//    }
//
    public List<PostagemResponseDTO> listarTodas() {
        return repository.findAll()
                .stream()
                .map(postagem -> new PostagemResponseDTO(postagem))
                .collect(Collectors.toList());
    }


    public void deletar(Long id) {
        // Primeiro busca a postagem para obter o publicId da imagem
        Optional<Postagem> postagemOptional = repository.findById(id);

        if (postagemOptional.isPresent()) {
            Postagem postagem = postagemOptional.get();

            // Se tiver publicId, deleta a imagem do Cloudinary
            if (postagem.getPublicIdImagem() != null && !postagem.getPublicIdImagem().isEmpty()) {
                try {
                    cloudinary.uploader().destroy(postagem.getPublicIdImagem(), ObjectUtils.emptyMap());
                } catch (IOException e) {
                    // Loga o erro mas continua com a deleção da postagem
                    System.err.println("Erro ao deletar imagem do Cloudinary: " + e.getMessage());
                }
            }

            // Deleta a postagem do banco de dados
            repository.deleteById(id);
        }
    }


}

