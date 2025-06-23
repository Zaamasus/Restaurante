# Alteração na tabela restaurantes

-- Remover campo email e adicionar campo endereco

ALTER TABLE restaurantes
DROP COLUMN email;

ALTER TABLE restaurantes
ADD COLUMN endereco TEXT NOT NULL; 