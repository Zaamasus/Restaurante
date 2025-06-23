# Anotações do Projeto Backend Restaurante

URL do projeto: https://oylmpnwfryhujmcawupo.supabase.co
anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95bG1wbndmcnlodWptY2F3dXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1Njc4OTgsImV4cCI6MjA2NjE0Mzg5OH0.yJj6lOTQMYy_4_gvEK9W--T847czR1QJdLg0OvW0Oro
service_role_secret: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95bG1wbndmcnlodWptY2F3dXBvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDU2Nzg5OCwiZXhwIjoyMDY2MTQzODk4fQ._HNQtRMFK8cShfGOlDcJtI7ZQZvJBmwm-RqvFW5naOg


usuer: samuelgomes22442@gmail.com
senha:senha123


<!-- user garson -->
garcom@teste.com
senha:senha123

# Exemplo de inserção de usuário 'cozinha'

-- Adiciona um usuário do tipo cozinha vinculado ao restaurante 'Restaurante Saboroso'
INSERT INTO usuarios (id, restaurante_id, nome, email, funcao)
VALUES (
  'f223c4dd-d42a-44b7-8a94-09afa194208c',
  'c1a1e1b2-1111-4a1b-8a1b-111111111111',
  'Cozinha',
  'cozinha@teste.com',
  'cozinha'
);

# Exemplo de inserção de usuário 'admin-restaurante'

-- Adiciona um usuário do tipo admin-restaurante vinculado ao restaurante 'Restaurante Saboroso'
INSERT INTO usuarios (id, restaurante_id, nome, email, funcao)
VALUES (
  'f223c4dd-d42a-44b7-8a94-09afa194208c',
  'c1a1e1b2-1111-4a1b-8a1b-111111111111',
  'Admin Restaurante',
  'admin@teste.com',
  'admin-restaurante'
);