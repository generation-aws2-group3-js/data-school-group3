# data-school-group3

## Criar banco de dados  PostgreSQL local:
Para executar um container PostgreSQL com as configurações necessárias, utilize o seguinte comando:

```bash
docker run --name data-school -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=data_school -p 5432:5432 -d bitnami/postgresql:latest
```

## Instalar pacotes:
```bash
npm install
```

## Rodar server:
```bash
node server.js
```
