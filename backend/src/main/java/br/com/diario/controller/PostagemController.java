package br.com.diario.controller;

import br.com.diario.DTO.request.PostagemRequestDTO;
import br.com.diario.DTO.response.PostagemResponseDTO;
import br.com.diario.model.Postagem;
import br.com.diario.service.PostagemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/postagens")
@CrossOrigin(origins = "*")
public class PostagemController {

    private final PostagemService service;

    public PostagemController(PostagemService service) {
        this.service = service;
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> criarComImagem(
            @RequestParam String titulo,
            @RequestParam String texto,
            @RequestParam("foto") MultipartFile foto) {

        try {
            PostagemRequestDTO dto = new PostagemRequestDTO();
            dto.setTitulo(titulo);
            dto.setTexto(texto);
            dto.setFoto(foto);

            if (!dto.isValid()) {
                return ResponseEntity.badRequest().body("Dados inválidos");
            }

            PostagemResponseDTO response = service.salvar(dto);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Erro ao criar postagem: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        try {
            // Verifica se a postagem existe antes de tentar deletar
            Optional<PostagemResponseDTO> postagemExistente = service.buscarPorId(id);
            if (postagemExistente.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            service.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Erro ao deletar postagem: " + e.getMessage());
        }
    }
    @GetMapping
    public ResponseEntity<List<PostagemResponseDTO>> listarTodas() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        Optional<PostagemResponseDTO> postagem = service.buscarPorId(id);

        return postagem
                .map(ResponseEntity::ok) // Se existir, retorna 200 OK com a postagem
                .orElseGet(() -> ResponseEntity.notFound().build()); // Se não existir, retorna 404
    }

}

