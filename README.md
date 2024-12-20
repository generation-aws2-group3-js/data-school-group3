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
    <img src="public/model_banco.png" alt="print da modelagem do banco de dados" width="900">
</p>

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

## Documentação da API
### Swagger
Esta API conta com uma documentação interativa no Swagger, onde é possível visualizar e testar todos os endpoints disponíveis.
Acesse [clicando aqui.](https://data-school-group3.onrender.com/api/docs)

<p align=center>
    <img src="public/doc_swagger.png" alt="print do swagger" width="900">
</p>

##

### Endpoints - Rota Autenticação

#### Login de Funcionário

**Rota pública** destinada è realização do login.

`POST /api/login`

| Parâmetro | Tipo     | Descrição                                                                                               |
| --------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `email`   | `string` | **Obrigatório**. Máximo de 255 caracteres. Deve ser um email válido cadastrado.                         |
| `senha`   | `string` | **Obrigatório**. Mínimo de 6 caracteres, máximo de 30 caracteres. Deve corresponder à senha cadastrada. |

#### Exemplo de Request

Headers

```http
Accept: application/json
```

Request Body

```json
{
  "email": "jane.doe@example.com",
  "senha": "securePass456@"
}
```

Response

```json
{
  "message": "Login realizado com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJqYW5lLmRvZUBleGFt"
}
```

| Response Status | Descrição                |
| --------------- | ------------------------ |
| `200`           | OK                       |
| `401`           | Email ou senha inválidos |
| `500`           | Erro interno no servidor |

##

### Endpoints - Rotas Funcionários

#### Cadastro de Funcionário

**Rota pública** destinada ao cadastro de um novo Funcionário.

`POST /api/funcionarios`

| Parâmetro | Tipo     | Descrição                                                                                                                                                             |
| --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nome`    | `string` | **Obrigatório**. Mínimo de 3 caracteres, máximo de 150 caracteres.                                                                                                    |
| `email`   | `string` | **Obrigatório**. Máximo de 255 caracteres. Deve ser válido e único.                                                                                                   |
| `senha`   | `string` | **Obrigatório**. Mínimo de 6 caracteres, máximo de 30 caracteres. Deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial. |
| `cargo`   | `string` | **Obrigatório**. Mínimo de 5 caracteres, máximo de 30 caracteres.                                                                                                     |

#### Exemplo de Request

Headers

```http
Accept: application/json
```

Request Body

```json
{
  "nome": "Jane Doe",
  "email": "jane.doe@example.com",
  "senha": "securePass456@",
  "cargo": "Desenvolvedora"
}
```

Response

```json
{
  "id": 2,
  "nome": "Jane Doe",
  "email": "jane.doe@example.com",
  "senha": "$2b$10$AqvR2FyJmrQKaRw20HD6.cXFl6e563GntRdAfaIlZ.oz7ApbLci",
  "cargo": "Desenvolvedora",
  "updatedAt": "2024-10-25T13:38:25.416Z",
  "createdAt": "2024-10-25T13:38:25.416Z"
}
```

| Response Status | Descrição                |
| --------------- | ------------------------ |
| `201`           | Criado com sucesso       |
| `400`           | Dados inválidos          |
| `500`           | Erro interno no servidor |

##

#### Listagem de Funcionários

**Rota privada** destinada à listagem de todos os funcionários.

`GET /api/funcionarios`

#### Exemplo de Request

Headers

```http
Accept: application/json
Auth: Bearer token
```

Response

```json
[
  {
    "id": 1,
    "nome": "Ana Souza",
    "email": "ana.souza@example.com",
    "cargo": "Coordenador"
  },
  {
    "id": 2,
    "nome": "Jane Doe",
    "email": "jane.doe@example.com",
    "cargo": "Desenvolvedora"
  }
]
```

| Response Status | Descrição                |
| --------------- | ------------------------ |
| `200`           | Ok - Sucesso             |
| `401`           | Token inválido           |
| `403`           | Nenhum token fornecido   |
| `500`           | Erro interno no servidor |

##

#### Listagem de Funcionário

**Rota privada** destinada à listagem de um funcionário.

`GET /api/funcionarios/id`

| Parâmetro | Tipo  | Descrição                                                       |
| --------- | ----- | --------------------------------------------------------------- |
| `id`      | `int` | **Obrigatório e chave primária válida na tabela funcionários**. |

#### Exemplo de Request

```http
GET /api/funcionarios/2
```

Headers

```http
Accept: application/json
Auth: Bearer token
```

Response

```json
{
  "id": 2,
  "nome": "Jane Doe",
  "email": "jane.doe@example.com",
  "cargo": "Desenvolvedora"
}
```

| Response Status | Descrição                  |
| --------------- | -------------------------- |
| `200`           | Ok                         |
| `401`           | Token inválido             |
| `403`           | Nenhum token fornecido     |
| `404`           | Funcionário não encontrado |
| `500`           | Erro interno no servidor   |

##

#### Atualização de Funcionário

**Rota privada** destinada à atualização de um funcionário.

`PUT /api/funcionarios/id`

| Parâmetro | Tipo  | Descrição                                                       |
| --------- | ----- | --------------------------------------------------------------- |
| `id`      | `int` | **Obrigatório e chave primária válida na tabela funcionários**. |

**Parâmetros**
| Parâmetro | Tipo | Descrição |
| --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nome` | `string` | **Opcional**. Mínimo de 3 caracteres, máximo de 150 caracteres. |
| `email` | `string` | **Opcional**. Máximo de 255 caracteres. Deve ser válido e único. |
| `senha` | `string` | **Opcional**. Mínimo de 6 caracteres, máximo de 30 caracteres. Deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial. |
| `cargo` | `string` | **Opcional**. Mínimo de 5 caracteres, máximo de 30 caracteres. |

#### Exemplo de Request

```http
PUT /api/funcionarios/2
```

Headers

```http
Accept: application/json
Auth: Bearer token
```

Request Body

```json
{
  "nome": "Jane Doe novo nome"
}
```

Response

```json
{
  "message": "Funcionário atualizado com sucesso. | Campos atualizados: nome.",
  "funcionario": {
    "id": 2,
    "nome": "Jane Doe novo nome",
    "email": "jane.doe@example.com",
    "cargo": "Desenvolvedora"
  }
}
```

| Response Status | Descrição                  |
| --------------- | -------------------------- |
| `200`           | Ok                         |
| `401`           | Token inválido             |
| `403`           | Nenhum token fornecido     |
| `404`           | Funcionário não encontrado |
| `500`           | Erro interno no servidor   |

##

#### Deleção de Funcionário

**Rota privada** destinada à deleção de um funcionário.

`DELETE /api/funcionarios/id`

| Parâmetro | Tipo  | Descrição                                                       |
| --------- | ----- | --------------------------------------------------------------- |
| `id`      | `int` | **Obrigatório e chave primária válida na tabela funcionários**. |

#### Exemplo de Request

```http
DELETE /api/funcionarios/1
```

Headers

```http
Accept: application/json
Auth: Bearer token
```

Response

```
No Content
```

| Response Status | Descrição                  |
| --------------- | -------------------------- |
| `204`           | Sem conteúdo (sucesso)     |
| `401`           | Token inválido             |
| `403`           | Nenhum token fornecido     |
| `404`           | Funcionário não encontrado |
| `500`           | Erro interno no servidor   |

##

### Endpoints - Rotas Turmas

#### Cadastro de Turma

**Rota privada** destinada ao cadastro de uma nova turma.

`POST /api/turmas`

| Parâmetro   | Tipo     | Descrição                                                          |
| ----------- | -------- | ------------------------------------------------------------------ |
| `nome`      | `string` | **Obrigatório**. Mínimo de 3 caracteres, máximo de 150 caracteres. |
| `instrutor` | `string` | **Obrigatório**. Mínimo de 3 caracteres, máximo de 150 caracteres. |

#### Exemplo de Request

Headers

```http
Accept: application/json
Auth: Bearer token
```

Request Body

```json
{
  "nome": "Aws Restart",
  "instrutor": "João Silva"
}
```

Response

```json
{
  "id": 1,
  "nome": "Aws Restart",
  "instrutor": "João Silva",
  "updatedAt": "2024-10-25T14:34:03.566Z",
  "createdAt": "2024-10-25T14:34:03.566Z"
}
```

| Response Status | Descrição                |
| --------------- | ------------------------ |
| `201`           | Criado com sucesso       |
| `400`           | Dados inválidos          |
| `401`           | Token inválido           |
| `403`           | Nenhum token fornecido   |
| `500`           | Erro interno no servidor |

##

#### Listagem de Turmas

**Rota privada** destinada à listagem de todas as turmas.

`GET /api/turmas`

#### Exemplo de Request

Headers

```http
Accept: application/json
Auth: Bearer token
```

Response

```json
[
  {
    "id": 1,
    "nome": "Aws Restart",
    "instrutor": "João Silva"
  },
  {
    "id": 2,
    "nome": "Aws Restart 02",
    "instrutor": "Joe Doe"
  }
]
```

| Response Status | Descrição                |
| --------------- | ------------------------ |
| `200`           | Ok - Sucesso             |
| `401`           | Token inválido           |
| `403`           | Nenhum token fornecido   |
| `500`           | Erro interno no servidor |

##

#### Listagem de Turma

**Rota privada** destinada à listagem de uma turma.

`GET /api/turmas/id`

| Parâmetro | Tipo  | Descrição                                                 |
| --------- | ----- | --------------------------------------------------------- |
| `id`      | `int` | **Obrigatório e chave primária válida na tabela turmas**. |

#### Exemplo de Request

```http
GET /api/turmas/1
```

Headers

```http
Accept: application/json
Auth: Bearer token
```

Response - Não existem alunos vínculados à turma.

```json
{
  "id": 1,
  "nome": "Aws Restart",
  "instrutor": "João Silva"
}
```

Response - Existem alunos vínculados à turma.

```json
{
  "id": 1,
  "nome": "Aws Restart",
  "instrutor": "João Silva",
  "alunos": [
    {
      "id": 1,
      "nome": "Luana moura",
      "nota_primeiro_modulo": 9,
      "nota_segundo_modulo": 7,
      "media": 8
    },
    {
      "id": 2,
      "nome": "Carlos Pereira",
      "nota_primeiro_modulo": 9,
      "nota_segundo_modulo": 10,
      "media": 9.5
    },
    {
      "id": 3,
      "nome": "João da Silva",
      "nota_primeiro_modulo": 8.5,
      "nota_segundo_modulo": 9,
      "media": 8.75
    }
  ]
}
```

| Response Status | Descrição                |
| --------------- | ------------------------ |
| `200`           | Ok                       |
| `401`           | Token inválido           |
| `403`           | Nenhum token fornecido   |
| `404`           | Turma não encontrada     |
| `500`           | Erro interno no servidor |

##

#### Atualização de Turma

**Rota privada** destinada à atualização de uma turma.

`PUT /api/turmas/id`

| Parâmetro | Tipo  | Descrição                                                 |
| --------- | ----- | --------------------------------------------------------- |
| `id`      | `int` | **Obrigatório e chave primária válida na tabela turmas**. |

**Parâmetros**
| Parâmetro | Tipo | Descrição |
| ----------- | -------- | ------------------------------------------------------------------ |
| `nome` | `string` | **Obrigatório**. Mínimo de 3 caracteres, máximo de 150 caracteres. |
| `instrutor` | `string` | **Obrigatório**. Mínimo de 3 caracteres, máximo de 150 caracteres. |

#### Exemplo de Request

```http
PUT /api/turmas/2
```

Headers

```http
Accept: application/json
Auth: Bearer token
```

Request Body

```json
{
  "instrutor": "Pedro Santos"
}
```

Response

```json
{
  "id": 1,
  "nome": "Aws Restart 02",
  "instrutor": "Pedro Santos"
}
```

| Response Status | Descrição                |
| --------------- | ------------------------ |
| `200`           | Ok                       |
| `400`           | Dados inválidos          |
| `401`           | Token inválido           |
| `403`           | Nenhum token fornecido   |
| `404`           | Turma não encontrada     |
| `500`           | Erro interno no servidor |

##

#### Deleção de Turma

**Rota privada** destinada à deleção de uma turma.

`DELETE /api/turmas/id`

| Parâmetro | Tipo  | Descrição                                                 |
| --------- | ----- | --------------------------------------------------------- |
| `id`      | `int` | **Obrigatório e chave primária válida na tabela turmas**. |

#### Exemplo de Request

```http
DELETE /api/turmas/2
```

Headers

```http
Accept: application/json
Auth: Bearer token
```

Response

```
No Content
```

| Response Status | Descrição                |
| --------------- | ------------------------ |
| `204`           | Sem conteúdo (sucesso)   |
| `401`           | Token inválido           |
| `403`           | Nenhum token fornecido   |
| `404`           | Turma não encontrada     |
| `500`           | Erro interno no servidor |

\*\*\* No caso de deleção de uma turma que possui alunos, o campo turma_id do aluno será setado como null.

##

### Endpoints - Rotas Alunos

#### Cadastro de Aluno

**Rota privada** destinada ao cadastro de um novo aluno.

`POST /api/alunos`

| Parâmetro              | Tipo     | Descrição                                                                               |
| ---------------------- | -------- | --------------------------------------------------------------------------------------- |
| `nome`                 | `string` | **Obrigatório**. Mínimo de 3 caracteres, máximo de 150 caracteres.                      |
| `email`                | `string` | **Obrigatório**. Deve ser um endereço de email válido e único.                          |
| `idade`                | `int`    | **Opcional**. Deve ser um número inteiro positivo e no máximo 120 anos.                 |
| `nota_primeiro_modulo` | `float`  | **Opcional**. Deve ser um número decimal entre 0 e 10.                                  |
| `nota_segundo_modulo`  | `float`  | **Opcional**. Deve ser um número decimal entre 0 e 10.                                  |
| `turma_id`             | `int`    | **Opcional**. Chave primária válida na tabela turmas para vincular o aluno a uma turma. |

#### Exemplo de Request

Headers

```http
Accept: application/json
Auth: Bearer token
```

Request Body - Campos obrigatórios

```json
{
  "nome": "João da Silva",
  "email": "joao.silva@example.com"
}
```

Request Body - Todos os campos

```json
{
  "nome": "João da Silva",
  "email": "joao.silva@example.com",
  "idade": 20,
  "nota_primeiro_modulo": 8.5,
  "nota_segundo_modulo": 9,
  "turma_id": 1
}
```

Response

```json
{
  "id": 3,
  "nome": "João da Silva",
  "email": "joao.silva@example.com",
  "idade": 20,
  "nota_primeiro_modulo": 8.5,
  "nota_segundo_modulo": 9,
  "turma_id": 2,
  "media": 8.75,
  "updatedAt": "2024-10-25T14:50:43.540Z",
  "createdAt": "2024-10-25T14:50:43.540Z"
}
```

| Response Status | Descrição                |
| --------------- | ------------------------ |
| `201`           | Criado com sucesso       |
| `400`           | Dados inválidos          |
| `401`           | Token inválido           |
| `403`           | Nenhum token fornecido   |
| `500`           | Erro interno no servidor |

\*\*\* Se as notas do módulo forem enviadas, a média será calculada automaticamente.

##

#### Listagem de Alunos

**Rota privada** destinada à listagem de todos os alunos.

`GET /api/alunos`

#### Exemplo de Request

Headers

```http
Accept: application/json
Auth: Bearer token
```

Response

```json
[
  [
    {
      "id": 1,
      "nome": "Carlos Pereira",
      "email": "carlos.pereira@example.com",
      "idade": 22,
      "nota_primeiro_modulo": 9,
      "nota_segundo_modulo": 10,
      "media": 9.5,
      "turma": {
        "id": 1,
        "nome": "Aws Restart",
        "instrutor": "João Silva"
      }
    },
    {
      "id": 2,
      "nome": "Luana moura",
      "email": "luana.moura@example.com",
      "idade": 22,
      "nota_primeiro_modulo": 9,
      "nota_segundo_modulo": 7,
      "media": 8,
      "turma": {
        "id": 1,
        "nome": "Aws Restart",
        "instrutor": "João Silva"
      }
    },
    {
      "id": 3,
      "nome": "João da Silva",
      "email": "joao.silva@example.com",
      "idade": 20,
      "nota_primeiro_modulo": 8.5,
      "nota_segundo_modulo": 9,
      "media": 8.75,
      "turma": {
        "id": 1,
        "nome": "Aws Restart",
        "instrutor": "João Silva"
      }
    }
  ]
]
```

| Response Status | Descrição                |
| --------------- | ------------------------ |
| `200`           | Ok - Sucesso             |
| `401`           | Token inválido           |
| `403`           | Nenhum token fornecido   |
| `500`           | Erro interno no servidor |

##

#### Listagem de Aluno

**Rota privada** destinada à listagem de um aluno.

`GET /api/alunos/id`

| Parâmetro | Tipo  | Descrição                                                 |
| --------- | ----- | --------------------------------------------------------- |
| `id`      | `int` | **Obrigatório e chave primária válida na tabela alunos**. |

#### Exemplo de Request

```http
GET /api/alunos/1
```

Headers

```http
Accept: application/json
Auth: Bearer token
```

Response

```json
{
  "id": 1,
  "nome": "Carlos Pereira",
  "email": "carlos.pereira@example.com",
  "idade": 22,
  "nota_primeiro_modulo": 9,
  "nota_segundo_modulo": 10,
  "media": 9.5,
  "turma": {
    "id": 2,
    "nome": "Turma A",
    "instrutor": "João Silva"
  }
}
```

| Response Status | Descrição                |
| --------------- | ------------------------ |
| `200`           | Ok                       |
| `401`           | Token inválido           |
| `403`           | Nenhum token fornecido   |
| `404`           | Aluno não encontrado     |
| `500`           | Erro interno no servidor |

##

#### Atualização de Aluno

**Rota privada** destinada à atualização de um aluno.

`PUT /api/alunos/id`

| Parâmetro | Tipo  | Descrição                                                 |
| --------- | ----- | --------------------------------------------------------- |
| `id`      | `int` | **Obrigatório e chave primária válida na tabela alunos**. |

**Parâmetros**
| Parâmetro | Tipo | Descrição |
| ---------------------- | -------- | --------------------------------------------------------------------------------------- |
| `nome` | `string` | **Opcional**. Mínimo de 3 caracteres, máximo de 150 caracteres. |
| `email` | `string` | **Opcional**. Deve ser um endereço de email válido e único. |
| `idade` | `int` | **Opcional**. Deve ser um número inteiro positivo e no máximo 120 anos. |
| `nota_primeiro_modulo` | `float` | **Opcional**. Deve ser um número decimal entre 0 e 10. |
| `nota_segundo_modulo` | `float` | **Opcional**. Deve ser um número decimal entre 0 e 10. |
| `turma_id` | `int` | **Opcional**. Chave primária válida na tabela turmas para vincular o aluno a uma turma. |

#### Exemplo de Request

```http
PUT /api/alunos/3
```

Headers

```http
Accept: application/json
Auth: Bearer token
```

Request Body

```json
{
  "nota_segundo_modulo": 10
}
```

Response

```json
{
  "message": "Aluno atualizado com sucesso. | Campos atualizados: nota_segundo_modulo.",
  "aluno": {
    "id": 3,
    "nome": "João da Silva",
    "email": "joao.silva@example.com",
    "idade": 20,
    "nota_primeiro_modulo": 8.5,
    "nota_segundo_modulo": 10,
    "media": 9.25,
    "turma_id": 2
  }
}
```

| Response Status | Descrição                |
| --------------- | ------------------------ |
| `200`           | Ok                       |
| `400`           | Dados inválidos          |
| `401`           | Token inválido           |
| `403`           | Nenhum token fornecido   |
| `404`           | Aluno não encontrado     |
| `500`           | Erro interno no servidor |

\*\*\* Se as notas do módulo forem re-enviadas, a média será recalculada automaticamente.

##

#### Deleção de Aluno

**Rota privada** destinada à deleção de um aluno.

`DELETE /api/alunos/id`

| Parâmetro | Tipo  | Descrição                                                 |
| --------- | ----- | --------------------------------------------------------- |
| `id`      | `int` | **Obrigatório e chave primária válida na tabela alunos**. |

#### Exemplo de Request

```http
DELETE /api/alunos/3
```

Headers

```http
Accept: application/json
Auth: Bearer token
```

Response

```
No Content
```

| Response Status | Descrição                |
| --------------- | ------------------------ |
| `204`           | Sem conteúdo (sucesso)   |
| `401`           | Token inválido           |
| `403`           | Nenhum token fornecido   |
| `404`           | Aluno não encontrado     |
| `500`           | Erro interno no servidor |

\*\*\* No caso de deleção de uma turma que possui alunos, o campo turma_id do aluno será setado como null.

##

## Melhorias

- [x] **Docker Compose**: Implementar o Docker Compose de modo a permitir a configuração e execução de múltiplos contêineres Docker de forma simplificada, garantindo consistência entre diferentes ambientes.

- [x] **Tratamento de erros global**: Adicionar tratamento para capturar erros não tratados nas rotas, garantindo que os usuários recebam feedback apropriado e melhorando a experiência do usuário.

- [ ] **Testes Unitários e de Integração**: Implementar testes unitários e de integração para assegurar a robustez e a qualidade da aplicação.

- [ ] **Gerenciamento de Tokens**: Alterar o tipo de token para permitir a revogação do token anterior em casos de novo login ou logout, melhorando a segurança e o controle das sessões. O token atual é stateless e possui validade de 3 horas.

- [ ] **Vinculação de Funcionários**: Modificar o banco de dados da tabela de turmas para incluir o campo `funcionario_id`, estabelecendo uma relação direta com o ID do instrutor na tabela de funcionários.

- [ ] **Atualizações em Massa**: Permitir atualizações em massa para alunos ou turmas, facilitando a administração e a gestão eficiente dos dados.

- [ ] **Registro de Histórico de Mudanças**: Implementar um mecanismo para registrar e visualizar o histórico de alterações em registros de alunos ou funcionários, promovendo a transparência e a rastreabilidade.

- [ ] **Feedback dos Usuários**: Criar um sistema que permita aos usuários da API fornecer feedback ou relatar bugs, ajudando a priorizar futuras melhorias e aprimorando a usabilidade do sistema.
