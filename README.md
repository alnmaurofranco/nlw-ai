<div align="center">
<img src=".github/assets/logotipo@nlwai.png" />

<h4 align="center" style="margin-top:0.75rem;">
Gerador de Descrições e Títulos para Vídeos do YouTube
</h4>
</div>


## 🎉 Sobre o projeto

Este é um projeto que visa criar automaticamente descrições e títulos para vídeos do YouTube com base na transcrição do conteúdo. foi desenvolvido durante a semana da NLW feita pela Rocketseat

## 🚀 Tecnologias

* [TypeScript](https://typescriptlang.org) - TypeScript extends JavaScript by adding types to the language.
* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
* [Vite](https://vite.dev/) - Vite Next Generation Frontend Tooling
* [shadcn/ui](https://ui.shadcn.com/) - Build your component library. Beautifully designed components that you can copy and paste into your apps. Accessible, Customizable & Open Source
* [tailwindcss](https://tailwindcss.com/) - Rapidly build modern websites without ever leaving your HTML.
* [PrismaORM](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM
* [PostgreSQL](https://www.postgresql.org/) - The World's Most Advanced Open Source Relational Database
* [FFmpeg](https://ffmpegwasm.netlify.app/) - ffmpeg.wasm is a pure WebAssembly / JavaScript port of FFmpeg enabling video & audio record, convert and stream right inside browsers!
* [Fastify](https://fastify.dev/) - Fast and low overhead web framework, for Node.js
* [Zod](https://cdn.svgporn.com/logos/zod.svg) - TypeScript-first schema validation with static type inference

<p>
<img src="https://cdn.svgporn.com/logos/typescript-icon.svg" alt="typescript" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/react.svg" alt="reactjs" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/vitejs.svg" alt="vite" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/tailwindcss-icon.svg" alt="vite" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://avatars.githubusercontent.com/u/75042455?s=280&v=4" alt="radixui" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/nodejs-icon.svg" alt="nodejs" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/postgresql.svg" alt="postgresql" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/prisma.svg" alt="prismaorm" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/ffmpeg-icon.svg" alt="ffmpeg" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/fastify-icon.svg" alt="fastify" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/zod.svg" alt="zod" width="45" height="45" style="margin-left: 5px;"/>

## ✨ Funcionalidades

- Upload video
- Criar Transcrição
- Geração de transcrições com AI
- Obter todos os prompts

## 👨🏼‍💻 Como executar

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de aprendizado, desenvolvimento e teste.

### 📃 *Pre-requisitos*

* **OpenAI** - Você vai precisar de uma conta para ter acesso das funcionalidades da API da OpenAI. Basta criar uma nova conta no site (<https://openai.com/>) e realizar a criação de uma nova chave de acesso.
- **Node.js** - Para rodar este projeto é necessário ter [Node.js](https://nodejs.org/) instalado em sua maquina. Caso não tenha ainda basta acessar o site do [Node.js](https://nodejs.org/) e instalar para continuar.


### 🔧 *Instalação*

- Clone este repositório

```bash
git clone https://github.com/alnmaurofranco/nlw-ai
```

- Acesse a pasta do projeto

```bash
cd nlw-ai
```

- Instale as dependências de cada projeto com (pnpm, yarn ou npm) nesse exemplo estou usando **pnpm** e vou primeiramente executar na pasta web
* **⚠ IMPORTANTE! Faça isso também para a pasta (server)**

```bash
cd web && pnpm install
```

- Após a instalação, você deve renomear o arquivo `.env.example` para `.env` que se encontra na raiz da pasta (server) da aplicação back-end e modificar a variavel de acordo com a sua configuração.

* Configure o banco de dados PostgreSQL no arquivo `.env` do diretório `server`. Certifique-se de fornecer as informações corretas de conexão com o banco de dados.
* Execute as migrações do banco de dados para criar as tabelas necessárias:

```bash
cd server && pnpm db:deploy
```

### *Executando a aplicação*

- Após completa todas as instalações, vamos iniciar nossa aplicaçaõ web com o seguinte comando:

```
cd web && pnpm dev
```

- Pronto, agora sua aplicação web está rodando e já pode ser acessada em: <http://localhost:5173>

- Inicie a API com o comando:

```bash
cd server && pnpm start:dev
```

- **Pronto agora sua aplicação back-end está rodando em** [`http://localhost:3333`](http://localhost:3333)


## 💫 Milha extra

- [x] ESLint & Prettier
- [x] React Hook Form
- [x] Zod no front-end
- [x] Funcionalidade para copiar resultado
- [x] Funcionalidade de criação de uma prompt


## 📝 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE) para detalhes


---

<h3 align="center">

*Feito com 💚 by [AlanM Franco](https://github.com/alnmaurofranco)*
</h3>
