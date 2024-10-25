<p align=center>
    <img src="public/logo_api.svg" alt="Logo EduDataHub API" 
    width="400" style="margin-top: 40px; margin-bottom: 20px;">
</p>

## Introdução

**A EduDataHub API** é uma solução REST projetada para otimizar a gestão escolar, eliminando ineficiências no controle de dados e na autenticação de usuários. Com ela, é possível cadastrar alunos, turmas e funcionários de forma simplificada, automatizar o cálculo de médias e garantir a segurança das rotas com autenticação JWT. Desenvolvida com Node.js e Express e utilizando o Sequelize como ORM, a API usa PostgreSQL para armazenamento de dados, oferecendo uma plataforma escalável e eficiente para a administração de escolas.

## Dependências do sistema

- [Node.js 20.18 ou superior](https://nodejs.org/)
- [Docker](https://docs.docker.com/desktop/install/windows-install/)

## Tecnologias e técnicas utilizadas

Essa API REST foi desenvolvida utilizando:

- **Linguagem:** JavaScript (Node.js)
- **Framework:** Express
- **Banco de Dados:** PostgreSQL
- **ORM:** Sequelize
- **Autenticação:** JWT (JSON Web Token)
- **Segurança:** bcrypt (hash de senhas)
- **Contêinerização:** Docker
- **Documentação:** Swagger
- **Deploy:** Render

## Modelagem da base de dados PostgreSQL

A imagem abaixo proporciona uma perspectiva geral da estrutura do banco de dados integrado ao sistema.

<p align=center>
    <img src="public/model_banco.png" alt="print do banco da modelagem do banco de dados" width="900">
</p>|

## IDE utilizada para o desenvolvimento

[VSCode](https://code.visualstudio.com/)

## Setup local

### Clone o projeto

```bash
cd "caminho/da/sua/pasta"
git clone https://github.com/generation-aws2-group3-js/data-school-group3
cd "data-school-group3"
code ./ # abrirá o Vscode na raiz do projeto
```

### Execute o projeto

```bash
docker compose up
```

O Docker Compose foi configurado para facilitar a execução completa da aplicação com um único comando, gerenciando automaticamente todos os contêineres necessários.

### Solução de Problemas

Se você encontrar problemas ao executar o projeto, verifique se:

- O Docker está em execução.
- Não há conflitos de porta com outros serviços.

## Autenticação e Autorização

A API EduDataHub utiliza um sistema de autenticação baseado em JSON Web Tokens (JWT) para garantir a segurança das rotas e a proteção das informações dos usuários.

### Funcionamento da Autenticação

1. O funcionário realiza o cadastro utilizando a rota **Cadastro de Funcionário** (POST /funcionarios).
2. Em seguida, ele faz login com suas credenciais na rota **Login** (POST /login).
3. Se o login for bem-sucedido, a API retorna um token JWT.
4. O token deve ser incluído no cabeçalho **Authorization** no seguinte formato:

   ```json
   {
     "token": "bearer seu-token-aqui"
   }
   ```

5. O token pode ser utilizado para acessar todas as rotas protegidas da API, durante 3h, após isso será necessário um novo login.

### Status de Resposta e Mensagens de Erro

Em caso de token válido, a API processa a requisição normalmente e retorna o resultado esperado.
Caso o token seja inválido ou não esteja presente, a API retornará uma resposta de erro correspondente.

| Response Status | Descrição                  |
| --------------- | -------------------------- |
| `200`           | Ok - Sucesso               |
| `401`           | Token não fornecido        |
| `403`           | Token inválido ou expirado |
| `500`           | Erro interno no servidor   |

## Documentação de Rotas

Endpoints

## Cadastro de Funcionários

`POST Path: /api/funcionarios`
Cadastrar um novo funcionário

Request Body:

{
"nome": "string",
"email": "string",
"senha": "string",
"cargo": "string"
}

Responses:

201: Funcionário criado com sucesso
400: Dados inválidos (e-mail duplicado, campos ausentes)
500: Erro interno do servidor

`GET path: /api/funcionarios`
Listar todos os funcionários (requer autenticação com JWT)

Responses:

200: Lista de funcionários retornada com sucesso
401: Não autorizado (falta de token ou token inválido)
500: Erro interno do servidor

`GET path: /api/funcionarios/{id}`

Buscar funcionário por ID (requer autenticação)

Parameters:

id: ID do funcionário (integer)
Responses:

200: Funcionário encontrado e retornado
404: Funcionário não encontrado
401: Não autorizado (falta de token ou token inválido)
500: Erro interno do servidor

`PUT path: /api/funcionarios/{id}`
Atualizar dados de um funcionário específico (requer autenticação)

Parameters:
id: ID do funcionário (integer)

Request Body:

{
"nome": "string",
"email": "string",
"cargo": "string"
}

Responses:
200: Funcionário atualizado com sucesso
404: Funcionário não encontrado
400: Dados inválidos
401: Não autorizado (falta de token ou token inválido)
500: Erro interno do servidor

`DELETE path: /api/funcionarios/{id}`
Deletar funcionário por ID (requer autenticação).

Parameters:
id: ID do funcionário (integer)

Responses:
204: Funcionário deletado com sucesso
404: Funcionário não encontrado
401: Não autorizado (falta de token ou token inválido)
500: Erro interno do servidor

## Login

`POST path: /api/login`
Realizar login e obter token JWT

Request Body:
{
"email": "string",
"senha": "string"
}

Responses:
200: Login realizado com sucesso (token JWT retornado)
401: Credenciais inválidas (email ou senha incorretos)
500: Erro interno do servidor

## Cadastro de Alunos

`POST path: /api/alunos`
Cadastrar um novo aluno (requer autenticação)

Request Body:
{
"nome": "string",
"email": "string",
"idade": "integer",
"nota_primeiro_modulo": "decimal",
"nota_segundo_modulo": "decimal",
"turma_id": "integer"
}

Responses:
201: Aluno criado com sucesso
400: Dados inválidos (e-mail duplicado, campos ausentes)
401: Não autorizado (falta de token ou token inválido)
500: Erro interno do servidor

`GET path: /api/alunos`
Listar todos os alunos (requer autenticação)

Responses:
200: Lista de alunos retornada com sucesso
401: Não autorizado (falta de token ou token inválido)
500: Erro interno do servidor

`GET path: /api/alunos/{id}`
Buscar aluno por ID (requer autenticação)

Parameters:
id: ID do aluno (integer)

Responses:
200: Aluno encontrado e retornado
404: Aluno não encontrado
401: Não autorizado (falta de token ou token inválido)
500: Erro interno do servidor

`PUT path: /api/alunos/{id}`
Atualizar dados de um aluno específico (requer autenticação)

Parameters:
id: ID do aluno (integer)

Request Body:
{
"nome": "string",
"email": "string",
"idade": "integer",
"nota_primeiro_modulo": "decimal",
"nota_segundo_modulo": "decimal"
}

Responses:
200: Aluno atualizado com sucesso
404: Aluno não encontrado
400: Dados inválidos
401: Não autorizado (falta de token ou token inválido)
500: Erro interno do servidor

`DELETE path: /api/alunos/{id}`
Deletar aluno por ID (requer autenticação)

Parameters:
id: ID do aluno (integer)

Responses:
204: Aluno deletado com sucesso
404: Aluno não encontrado
401: Não autorizado (falta de token ou token inválido)
500: Erro interno do servidor

## Cadastrar Turmas

`POST path: /api/turmas`
Cadastrar uma nova turma (requer autenticação)

Request Body:
{
"nome": "string",
"instrutor": "string"
}

Responses:
201: Turma criada com sucesso
400: Dados inválidos (campos ausentes)
401: Não autorizado (falta de token ou token inválido)
500: Erro interno do servidor

`GET path: /api/turmas`
Listar todas as turmas (requer autenticação)

Responses:
200: Lista de turmas retornada com sucesso
401: Não autorizado (falta de token ou token inválido)
500: Erro interno do servidor

`GET path: /api/turmas/{id}`
Buscar turma por ID (requer autenticação)

Parameters:
id: ID da turma (integer)

Responses:
200: Turma encontrada e retornada
404: Turma não encontrada
401: Não autorizado (falta de token ou token inválido)
500: Erro interno do servidor

`PUT path: /api/turmas/{id}`
Atualizar dados de uma turma específica (requer autenticação)

Parameters:
id: ID da turma (integer)

Request Body:
{
"nome": "string",
"instrutor": "string"
}

Responses:
200: Turma atualizada com sucesso
404: Turma não encontrada
400: Dados inválidos
401: Não autorizado (falta de token ou token inválido)
500: Erro interno do servidor

`DELETE path: /api/turmas/{id}`
Deletar turma por ID (requer autenticação)

Parameters:
id: ID da turma (integer)

Responses:
204: Turma deletada com sucesso
404: Turma não encontrada
401: Não autorizado (falta de token ou token inválido)
500: Erro interno do servidor

## Melhorias

- [x] **Docker Compose**: Implementar o Docker Compose de modo a permitir a configuração e execução de múltiplos contêineres Docker de forma simplificada, garantindo consistência entre diferentes ambientes.

- [x] **Tratamento de erros global**: Adicionar tratamento para capturar erros não tratados nas rotas, garantindo que os usuários recebam feedback apropriado e melhorando a experiência do usuário.

- [ ] **Testes Unitários e de Integração**: Implementar testes unitários e de integração para assegurar a robustez e a qualidade da aplicação.

- [ ] **Gerenciamento de Tokens**: Alterar o tipo de token para permitir a revogação do token anterior em casos de novo login ou logout, melhorando a segurança e o controle das sessões. O token atual é stateless e possui validade de 3 horas.

- [ ] **Vinculação de Funcionários**: Modificar o banco de dados da tabela de turmas para incluir o campo `funcionario_id`, estabelecendo uma relação direta com o ID do instrutor na tabela de funcionários.

- [ ] **Atualizações em Massa**: Permitir atualizações em massa para alunos ou turmas, facilitando a administração e a gestão eficiente dos dados.

- [ ] **Registro de Histórico de Mudanças**: Implementar um mecanismo para registrar e visualizar o histórico de alterações em registros de alunos ou funcionários, promovendo a transparência e a rastreabilidade.

- [ ] **Feedback dos Usuários**: Criar um sistema que permita aos usuários da API fornecer feedback ou relatar bugs, ajudando a priorizar futuras melhorias e aprimorando a usabilidade do sistema.
