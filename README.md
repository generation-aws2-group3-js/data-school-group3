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

