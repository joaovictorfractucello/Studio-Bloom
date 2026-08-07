# Studio Bloom

Sistema de agendamento para salão de beleza (em evolução).

- **`web/`** — frontend Next.js (landing page)
- **`api/`** — backend Express + TypeScript (API reutilizável)

Arquitetura da API em camadas: routes → controllers → application (use cases) → infrastructure (Prisma, JWT, bcrypt).

## Status atual

Já funciona na API:

- Health check com conexão ao banco
- Auth: register, login, `/me` (Bearer), refresh com rotação de token
- PostgreSQL via Prisma (Neon ou outro host)

Em breve: CRUD de serviços/horários, slots e agendamento.

## Pré-requisitos

- Node.js 20+ (recomendado)
- Conta PostgreSQL (ex.: [Neon](https://neon.tech))

## Setup da API

```bash
cd api
cp .env.example .env
```

Edite o `.env` com sua `DATABASE_URL` e secrets JWT.

```bash
npm install
npx prisma migrate dev
npx prisma generate
npm run dev
```

API em: `http://localhost:3333`

### Rotas de Auth (Postman / Insomnia)

| Método | Rota | Body / Auth |
| ------ | ---- | ----------- |
| GET | `/health` | — |
| POST | `/auth/register` | `{ "name", "email", "password" }` |
| POST | `/auth/login` | `{ "email", "password" }` |
| GET | `/auth/me` | Header `Authorization: Bearer <accessToken>` |
| POST | `/auth/refresh` | `{ "refreshToken" }` |

Body sempre em **JSON** (`Content-Type: application/json`).

## Setup do frontend

```bash
cd web
npm install
npm run dev
```

Site em: `http://localhost:3000`

## Estrutura

```
Studio Bloom/
  api/     # Express + Prisma + Auth
  web/     # Next.js (landing)
```

## Segurança

- Não versione o arquivo `.env` (já está no `.gitignore`)
- Use `.env.example` só como modelo de chaves
- Nunca compartilhe access/refresh tokens em repositórios públicos

## Licença

Projeto em desenvolvimento (portfólio / estudo).
