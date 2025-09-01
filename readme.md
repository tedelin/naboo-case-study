# Naboo interview

## What's used ?

backend

- mongodb
- nestjs
- mongoose
- data mapper pattern
- graphql

frontend

- nextjs (with page router)
- mantine-ui
- axios
- vitest
- graphql
- apollo client

## How to launch project ?

Database

```bash
cp .env.example .env
docker compose up
```

backend

```bash
cp .env.dist .env

npm i

npm run start:dev
```

frontend

```bash
npm i

npm run dev
```

after graphql modification

```bash
# > frontend
npm run generate-types
```

## Connection informations

email: user1@test.fr
password: user1
