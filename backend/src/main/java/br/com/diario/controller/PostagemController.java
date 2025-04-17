package br.com.diario.controller;

import br.com.diario.DTO.request.PostagemRequestDTO;
import br.com.diario.DTO.response.PostagemResponseDTO;
import br.com.diario.service.PostagemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@RequestMapping("/postagens")
public class PostagemController {

    private final PostagemService service;

    public PostagemController(PostagemService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostagemResponseDTO> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    // Criar postagem com imagem (multipart)
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<PostagemResponseDTO> criarComImagem(
            @RequestParam String titulo,
            @RequestParam String texto,
            @RequestParam("foto") MultipartFile foto) throws IOException {

        PostagemRequestDTO dto = new PostagemRequestDTO();
        dto.setTitulo(titulo);
        dto.setTexto(texto);
        dto.setFoto(foto.getBytes());

        return ResponseEntity.ok(service.salvar(dto));
    }

    // Obter imagem de uma postagem
//    @GetMapping("/{id}/imagem")
//    public ResponseEntity<byte[]> obterImagem(@PathVariable Long id) {
//        return service.buscarPorId(id)
//                .map(dto -> ResponseEntity.ok()
//                        .header("Content-Type", "image/jpeg")
//                        .body(dto.getFoto()))
//                .orElse(ResponseEntity.notFound().build());
//    }

    // Deletar uma postagem
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
