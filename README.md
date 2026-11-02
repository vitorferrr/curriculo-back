# Currículo Back

API REST desenvolvida para a atividade **Currículo Express**, da disciplina de **Aplicações Orientadas a Serviços**.

A API guarda e gerencia currículos: perfis, experiências acadêmicas, experiências profissionais, projetos e as tecnologias usadas em cada projeto. Ela também é o back-end do app mobile [curriculo-front](https://github.com/vitorferrr/curriculo-front), feito em React Native + Expo.

## API publicada

```text
https://curriculo-back.vercel.app
```

| Teste rápido | Link |
|---|---|
| Health check | https://curriculo-back.vercel.app/health |
| Perfis cadastrados | https://curriculo-back.vercel.app/profiles |
| Tecnologias | https://curriculo-back.vercel.app/technologies |

## Tecnologias

- **Node.js** + **Express 5**: servidor e rotas
- **PostgreSQL** hospedado no **NeonDB**: banco de dados na nuvem
- **Sequelize**: ORM (models, relacionamentos e consultas)
- **Vercel**: deploy da API
- **Postman**: testes das rotas

## Como rodar localmente

### 1. Instalar as dependências

```bash
npm install
```

### 2. Configurar o `.env`

Copie o `.env.example` para `.env` e preencha:

```env
PORT=3000
DATABASE_URL=postgresql://usuario:senha@host.neon.tech/neondb?sslmode=require
CORS_ORIGIN=*
```

### 3. Preparar o banco

```bash
npm run db:sync    # cria as tabelas
npm run db:seed    # recria as tabelas e cadastra os 2 currículos
```

> ⚠️ O `db:seed` apaga todos os dados antes de cadastrar.

### 4. Iniciar o servidor

```bash
npm run dev
```

A API fica disponível em `http://localhost:3000`.
