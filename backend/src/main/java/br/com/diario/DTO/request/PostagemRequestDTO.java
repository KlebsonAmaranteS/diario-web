package br.com.diario.DTO.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PostagemRequestDTO {
    private String titulo;
    private String texto;
    private MultipartFile foto;
}

