# EduDataHub API

## Índice
-	Descrição
-	Regras de Negócio
-	Funcionalidades
-	Instalação
-	Tecnologias e Dependências Utilizadas
-	Rotas
-	Modelos do Banco de Dados
-	Autenticação e Autorização

________________________________________

## Descrição
**EduDataHub API** é um sistema de gerenciamento escolar, desenvolvido para facilitar o controle de alunos, turmas e funcionários, além de permitir autenticação via JWT e gerenciamento de permissões. O projeto é focado em fornecer uma solução eficiente e escalável para a administração de escolas.
Este projeto foi construído com Node.js, Express e Sequelize ORM, utilizando PostgreSQL para armazenamento de dados. A aplicação foi desenvolvida seguindo os princípios RESTful, com suporte para autenticação JWT para proteção das rotas.

## Regras de Negócio
### Instruções gerais:
1. Utilize a Linguagem de Programação/Framework mais confortável para o grupo. 2. Crie um repositório no Github para o projeto, preferencialmente uma Organização. 3. Caso não possua ainda, crie uma conta no **Render**, vinculada ao Github.

### SHOWCASE
01 - Proposta de projeto desenvolvimento e deploy:
1) Com base na API criada durante o processo seletivo, refatorar a mesma, incluindo:

```bash
+-----------------------------------------------------------------------------------------------+
|                                       ALUNO                                                   |
+--------------------+--------------------+-----------------+--------------+--------------------+
| id (PK)            | nome               | email           | turmaId (FK) | idade              |
+--------------------+--------------------+-----------------+--------------+--------------------+
| INTEGER            | STRING(100)        | STRING          | INTEGER      | INTEGER (positive) |
| AUTO INCREMENT     | NOT NULL           | UNIQUE NOT NULL | FK Turma     | NOT NULL, positive |
+--------------------+--------------------+-----------------+--------------+--------------------+
| notaPrimeiroModulo | notaSegundoModulo  | média           |
+--------------------+--------------------+-----------------+
| DECIMAL (max 10.0) | DECIMAL (max 10.0) | DECIMAL         |
| NOT NULL, max 10.0 | NOT NULL, max 10.0 |                 |
+--------------------+--------------------+-----------------+

+--------------------------------------------------------------------------+
|                                    TURMA                                 |
+-------------+-----------------------+----------------+-------------------+
| id (PK)     | nome                  | instrutor      | alunoId (FK)      |
+-------------+-----------------------+----------------+-------------------+
| INTEGER     | STRING(100)           | STRING(100)    | INTEGER           |
| AUTO        | NOT NULL              | NOT NULL       | REFERENCES Aluno  |
| INCREMENT   |                       |                |                   |
+-------------+-----------------------+----------------+-------------------+

+------------------------------------------------------------------------------------------+
|                                        FUNCIONARIO                                       |
+-------------+-----------------------+----------------+-------------+---------------------+
| id (PK)     | nome                  | email          | senha       | cargo               |
+-------------+-----------------------+----------------+-------------+---------------------+
| INTEGER     | STRING(100)           | STRING(100)    | STRING(100) | STRING(100)         |
| AUTO        | NOT NULL              | UNIQUE, NOT    | NOT NULL    | NOT NULL            |
| INCREMENT   |                       | NULL           | HASHED      |                     |
+-------------+-----------------------+----------------+-------------+---------------------+
```

2) A aplicação deve possuir todas as rotas padrão de um CRUD, como Get, Post, Put e Delete, bem como deve ser possível, para qualquer uma das entidades, efetuar o Get pelo número de ID da informação; 

3) Como regras de negócios obrigatórias:

a) não deve ser possível cadastrar 2 funcionários ou alunos com o mesmo e-mail, sendo
necessário que a aplicação devolva um erro para este caso;

b) Toda a aplicação deverá passar por uma camada de segurança, com Cadastro e Login feito pela entidade "Funcionário", com geração de token JWT de autenticação com prazo de vida de 3 horas;

c) As únicas requisições que poderão ser feitas sem a devida autenticação, são as requisições de Cadastro de um novo Funcionário, e o próprio Login, para todas as demais, deverá ser feito uma requisição com apresentação de cabeçalho de autenticação com o token;

d) Cada aluno poderá participar apenas de um único curso;

4) Toda a API deve ser documentada com Swagger/OpenAPI, acessível pelo navegador, para testes;

5) Criar o Dockerfile necessário para a linguagem de programação utilizada no projeto;

6) Efetuar o deploy da aplicação e a criação do banco de dados pelo **Render**.

## Funcionalidades
- Cadastro de alunos com validação de e-mail único e cálculo automático de médias.
- Cadastro de funcionários com encriptação de senhas utilizando **bcrypt**.
- Autenticação de rotas via **JWT**, com exceções para login e cadastro de funcionários.
- Cadastro de turmas e associação de alunos a turmas.
- Relações entre modelos (Turma-Aluno) com exclusão em cascata.
- Documentação das rotas utilizando **Swagger**.

## Instalação

### Pré-requisitos
Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:
- [Node.js](https://nodejs.org/en/) versão 20.8
- [PostgreSQL](https://www.postgresql.org/) versão 16
- [Docker](https://www.docker.com/)

### Criar banco de dados  PostgreSQL local:
Para executar um container PostgreSQL com as configurações necessárias, utilize o seguinte comando:

```bash
docker run --name data-school -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=data_school -p 5433:5432 -d bitnami/postgresql:latest
```

### Instalar pacotes:
```bash
npm install
```

### Rodar server:
```bash
node server.js
```
## Tecnologias utilizadas

Essa API REST completa foi desenvolvida utilizando:

-   **Node.js**
-   **Express**: utilizado como framework de servidor.
-   **Sequelize**: ORM utilizado para gerenciamento do banco de dados.
-   **PostgreSQL**: banco de dados relacional.
-   **JWT**: autenticação baseada em tokens.
-   **bcrypt**: hash de senhas para segurança dos dados.
-   **Swagger**: documentação da API.
-   **Docker**: usado para gerenciar o ambiente de desenvolvimento com contêineres.
-   **Render:** Site para hospedar o Deploy da aplicação


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

## Autenticação e Autorização

A EduDataHub API implementa um sistema de autenticação baseado em JSON Web Tokens (JWT) para proteger as rotas.

`Geração de Token JWT`
-O JWT é gerado quando um funcionário se cadastra com sucesso na rota de login. 
-O token tem um tempo de vida de 3 horas. 

`Como funciona a autenticação`
-O funcionário se cadastra utilizando a rota de Cadastro de Funcionário (POST /funcionarios)
-Ele faz o Login utilizando as suas credenciais na rota de Login (POST /login)
-A resposta sendo login com sucesso, a API retorna um token JWT
-Esse token deve ser incluído no cabeçalho Authorization com o formato:
{
  "Authorization": "Bearer seu-token-aqui"
}
-O token já pode ser usado para acessar todas as rotas protegidas.

`Exemplo de Resposta`

-Se o token for válido, a API processa a requisição normalmente e retorna o resultado esperado
-Caso o token seja inválido ou não esteja presente a API retorna uma resposta de erro:
    -Status 401 (Unauthorized): Token não fornecido.
    {
        "message": "Token não fornecido"
    }
    -Status 403 (Forbidden): Token inválido ou expirado.
    {
        "message": "Token inválido ou expirado"
    }


## Modelo de Banco de dados 

`Aluno`

Campo                      Tipo          Descrição

id                         INTEGER       Chave primária
nome                       STRING        Nome do aluno
email                      STRING        E-mail único do aluno
idade                      INTEGER       Idade do aluno (deve ser positiva)
nota_primeiro_modulo       FLOAT         Nota do primeiro módulo (máx. 10.0)
nota_segundo_modulo	       FLOAT         Nota do segundo módulo (máx. 10.0)
media                      FLOAT         (primeiro + segundo módulo)
turma_id                   INTEGER       Referência para o ID da Turma

`Turma`

Campo                      Tipo          Descrição

id                         INTEGER       Chave primária
nome                       STRING        Nome da turma
instrutor                  STRING        Nome do instrutor responsável

`Funcionário`

Campo                      Tipo          Descrição

id                         INTEGER       Chave primária
nome                       STRING        Nome do funcionário
email                      STRING        E-mail único do funcionário
senha                      STRING        Senha encriptada
cargo                      STRING        Cargo do funcionário


## Melhorias:

1. Alterar tipo do token que atualmente é stateless, com validade de 3h, sem a possibilidade de remoção. Seria interessante poder excluir o token anterior no caso de novo login e no caso de logout
2. Alterar banco de dados de forma que na tabela de turmas além do campo instrutor tivesse o funcionario_id, vinculando ao id do instrutor na tabela funcionario
3. Fazer testes unitários e de integração para a aplicação
4. Adicionar um middleware para capturar erros que não são tratados nas rotas, garantindo que o usuário receba feedback adequado
5. Permitir atualizações em massa para alunos ou turmas, facilitando a administração
6. Adicionar a capacidade de registrar e visualizar o histórico de mudanças em registros de alunos ou funcionários
7. Criar um mecanismo para os usuários da API fornecerem feedback ou reportarem bugs, ajudando a priorizar futuras melhorias







