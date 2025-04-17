package br.com.diario.controller;

import br.com.diario.DTO.request.PostagemRequestDTO;
import br.com.diario.DTO.response.PostagemResponseDTO;
import br.com.diario.service.PostagemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/postagens")
public class PostagemController {

    private final PostagemService service;

    public PostagemController(PostagemService service) {
        this.service = service;
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<PostagemResponseDTO> criarComImagem(
            @RequestParam String titulo,
            @RequestParam String texto,
            @RequestParam("foto") MultipartFile foto) {

        PostagemRequestDTO dto = new PostagemRequestDTO();
        dto.setTitulo(titulo);
        dto.setTexto(texto);
        dto.setFoto(foto);

        return ResponseEntity.ok(service.salvar(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<PostagemResponseDTO>> listarTodas() {
        return ResponseEntity.ok(service.listarTodas());
    }

}

