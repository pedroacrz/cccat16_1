Este conteúdo é parte do curso Clean Code e Clean Architecture da Branas.io

Para mais informações acesse:

https://branas.io

##### Requisitos

Docker -> https://docs.docker.com/get-docker/
Docker-compose -> https://docs.docker.com/compose/
Node -> https://nodejs.org/en
Npm -> https://docs.npmjs.com/getting-started

## Getting started

1 - Criar o container do Postgres
1.1 - Rode no seu terminal: sudo docker-compose up -d
// Case tenha erro de credenciais, rode: sudo docker pull postgres
// e depois rode o sudo docker-compose up -d
1.2 - Verifique se o container está rodando: sudo docker ps

2 - Criar o schema do banco
2.1 - Rode no seu terminal: npm install
2.2 - Rode no seu terminal: npx ts-node seeds/create-database-postgres/index.ts

3 - Rode o projeto os testes do projeto
3.1 - npx jest test/create-account/create-account.test.ts
