package br.com.diario.DTO.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PostagemRequestDTO {
    private String titulo;
    private String texto;
    private MultipartFile foto;

    // Validação adicional
    public boolean isValid() {
        return titulo != null && !titulo.isBlank() &&
                texto != null && !texto.isBlank() &&
                foto != null && !foto.isEmpty();
    }
}

