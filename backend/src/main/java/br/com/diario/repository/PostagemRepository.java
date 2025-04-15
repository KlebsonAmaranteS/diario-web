package br.com.diario.repository;

import br.com.diario.model.Postagem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostagemRepository extends JpaRepository<Postagem, Long> {
}
