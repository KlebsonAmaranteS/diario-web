package br.com.diario.DTO.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostagemResponseDTO {
    private Long id;
    private String titulo;
    private String texto;
    private LocalDateTime dataHora;
    private byte[] foto;
}
