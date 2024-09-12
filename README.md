# in.Orbit (NLW Pocket Javascript)

## Sobre
Este projeto foi desenvolvido durante o evento do NLW Pocket da Rocketseat, que tem como intuito <br>
criar metas na semana e com uma frequencia de até no máximo 7 dias e ir completando elas.

## Imagens

### Pagina pra quem não criou nenhuma meta
<img src="/screenshots/nlw-inorbit-empty-goals-screen-screenshot.png">


### Criar meta (Pagina pra quem não criou nenhuma meta)
<img src="/screenshots/nlw-inorbit-create-goal-in-empty-goals-screen-screenshot.png">


### Pagina pra listar todas as metas e um resumo das metas completadas
<img src="/screenshots/nlw-inorbit-list-goals-and-goals-summary-screenshot.png">


### Criar meta (Pagina pra quem já criou alguma meta)
<img src="/screenshots/nlw-inorbit-create-goal-screenshot.png">


## Tecnologias

### Site
- React JS
- Vite
- Zod
- React Hook Form
- React Query
- DayJS

### Servidor
- Node JS
- Fastify
- Zod
- Drizzle ORM
- PostgresQL




## Como testar o projeto?

### Rodar ele na própria máquina
### Servidor

- Primeiro você precisa ter o docker instalado, se caso você não tenha ele instalado, siga esse link: https://docs.docker.com/engine/install/ ou procure como que instala
- Depois você precisa criar um arquivo .env dentro da pasta **server**
e setar duas variaveis de ambiente: **DATABASE_URL** (que deve conter URL de conexão com o banco de dados PostgresQL) e a
**ORIGIN_URL** (que deve conter a URL que irá permitir que o frotend se conecte com o servidor)
- Logo em seguida você precisa executar o docker-compose usando esse comando: docker-compose up -d, que irá criar um banco de dados PostgresQL.
- E por fim você irá executar o comando pra iniciar o servidor usando yarn, npm ou etc rodando o script dev

  
### Web (Site)
- Depois você precisa criar um arquivo .env dentro da pasta **web**
e setar duas variaveis de ambiente: **VITE_INORBIT_API_URL** (que deve conter URL do servidor que foi iniciado, exemplo: http://localhost:4000)
- E por fim você irá executar o comando pra iniciar a aplicação web usando yarn, npm ou etc e rodar o script dev


### Rodar ele sem precisar ter ele na máquina

- Só acessar esse link que você irá ser direcionado ao site onde a aplicação está rodando: https://nlw-inorbit-fernandobarrosd.vercel.app
  

