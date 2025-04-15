package br.com.diario.DTO.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostagemRequestDTO {
    private String titulo;
    private String texto;
    private byte[] foto;
}
