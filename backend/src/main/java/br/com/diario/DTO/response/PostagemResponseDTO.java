package br.com.diario.DTO.response;

import br.com.diario.model.Postagem;
import lombok.Data;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostagemResponseDTO {
    private Long id;
    private String titulo;
    private String texto;
    private LocalDateTime dataHora;
    private String urlImagem;

    public PostagemResponseDTO(Postagem postagem) {
        this.id = postagem.getId();
        this.titulo = postagem.getTitulo();
        this.texto = postagem.getTexto();
        this.dataHora = postagem.getDataHora();
        this.urlImagem = postagem.getUrlImagem();
    }


}

