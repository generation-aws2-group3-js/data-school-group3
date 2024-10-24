# data-school-group3

## Índice
-	Descrição
-	Funcionalidades
-	Instalação
-	Tecnologias e Dependências Utilizadas
-	Rotas
-	Modelos do Banco de Dados
-	Autenticação e Autorização
-	Regras de Negócio
________________________________________

## Descrição
**DATA-SCHOLL-GROUP3** é um sistema de gerenciamento escolar, desenvolvido para facilitar o controle de alunos, turmas e funcionários, além de permitir autenticação via JWT e gerenciamento de permissões. O projeto é focado em fornecer uma solução eficiente e escalável para a administração de escolas.
Este projeto foi construído com Node.js, Express e Sequelize ORM, utilizando PostgreSQL para armazenamento de dados. A aplicação foi desenvolvida seguindo os princípios RESTful, com suporte para autenticação JWT para proteção das rotas.

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
- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
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

