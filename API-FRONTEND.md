# API Backend — Referência para Frontend React

Documento de integração. Copie para o projeto React como referência de configuração.

---

## URLs (desenvolvimento local)

| Variável | Valor |
|----------|-------|
| URL base da API | `http://localhost:3000/api` |
| URL base de imagens | `http://localhost:3000` |
| Porta do backend | `3000` |
| CORS | Habilitado (aceita requisições do front em outra porta) |

### Variável de ambiente sugerida no React (Vite)

```
VITE_API_URL=http://localhost:3000/api
VITE_ASSETS_URL=http://localhost:3000
```

### Montagem de URL de foto

O backend retorna `foto` como caminho relativo, ex: `/uploads/abc123.jpg`

URL completa = `VITE_ASSETS_URL` + `foto`

Exemplo: `http://localhost:3000/uploads/abc123.jpg`

---

## Autenticação

| Item | Valor |
|------|-------|
| Tipo | JWT Bearer Token |
| Header | `Authorization: Bearer <token>` |
| Validade do token | 7 dias (configurável no backend) |
| Onde obter token | Resposta de `POST /auth/login` |
| Campo do token | `token` |

### Payload do login (dentro do JWT)

O token contém internamente:
- `sub` → id do usuário
- `tipo` → `CIDADAO` ou `PREFEITURA`

### Persistência recomendada no front

Salvar no `localStorage`:
- `token`
- Opcional: dados de `usuario` retornados no login

Usar `GET /auth/me` ao recarregar a página para validar sessão.

---

## Tipos de usuário

| Valor | Descrição | Permissões no front |
|-------|-----------|---------------------|
| `CIDADAO` | Cidadão comum | Cadastro, login, criar reporte, dar/remover alerta, ver feed |
| `PREFEITURA` | Conta administrativa | Login, dashboard, alterar status de reportes. **Não** cria reportes nem alertas |

### Contas de teste (desenvolvimento)

**Prefeitura** (criada via seed do backend):
- Email: `prefeitura@cidades.gov.br`
- Senha: `admin123`

**Cidadão**: criar via `POST /auth/register`

---

## Enums

### TipoUsuario
```
CIDADAO
PREFEITURA
```

### CategoriaReporte (labels sugeridos para UI)
| Valor API | Label sugerido |
|-----------|----------------|
| `ILUMINACAO` | Iluminação pública |
| `BURACO_PAVIMENTACAO` | Buraco / Pavimentação |
| `LIXO` | Lixo acumulado |
| `SINALIZACAO` | Sinalização danificada |
| `OUTROS` | Outros |

### StatusReporte (labels sugeridos para UI)
| Valor API | Label sugerido |
|-----------|----------------|
| `ABERTO` | Aberto |
| `EM_ANDAMENTO` | Em andamento |
| `RESOLVIDO` | Resolvido |

### OrdenacaoFeed (query param)
| Valor | Comportamento |
|-------|---------------|
| `alertas` | Default. Mais alertados primeiro |
| `recentes` | Mais recentes primeiro (`createdAt` desc) |

---

## Formato de erros

Todas as respostas de erro:

```json
{
  "message": "descrição do erro"
}
```

| HTTP Status | Quando ocorre |
|-------------|---------------|
| 400 | Dados inválidos, transição de status inválida, reporte resolvido |
| 401 | Token ausente/inválido, login incorreto |
| 403 | Tipo de usuário sem permissão, alertar próprio reporte |
| 404 | Recurso não encontrado |
| 409 | Email duplicado, alerta duplicado |
| 500 | Erro interno |

---

## Endpoints

Legenda de acesso:
- **Público** — sem token
- **Autenticado** — qualquer usuário logado
- **Cidadão** — token com `tipo: CIDADAO`
- **Prefeitura** — token com `tipo: PREFEITURA`
- **Opcional** — funciona sem token; com token enriquece resposta

---

### POST /auth/register — Público

Cadastro de cidadão. Tipo sempre `CIDADAO` (não enviar).

**Content-Type:** `application/json`

**Body:**
```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "senha": "123456",
  "bairro": "Centro"
}
```

| Campo | Obrigatório | Regras |
|-------|-------------|--------|
| nome | Sim | string |
| email | Sim | email válido, único |
| senha | Sim | mínimo 6 caracteres |
| bairro | Não | string |

**Response 201:**
```json
{
  "id": "uuid",
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "tipo": "CIDADAO",
  "bairro": "Centro",
  "createdAt": "2026-09-06T12:00:00.000Z"
}
```

**Erros:** 409 email já cadastrado | 400 senha curta ou dados inválidos

---

### POST /auth/login — Público

**Content-Type:** `application/json`

**Body:**
```json
{
  "email": "maria@email.com",
  "senha": "123456"
}
```

**Response 200:**
```json
{
  "token": "jwt.token.aqui",
  "usuario": {
    "id": "uuid",
    "nome": "Maria Silva",
    "tipo": "CIDADAO"
  }
}
```

**Erros:** 401 `"E-mail ou senha inválidos"` (mensagem genérica)

---

### GET /auth/me — Autenticado

**Headers:** `Authorization: Bearer <token>`

**Response 200:**
```json
{
  "id": "uuid",
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "tipo": "CIDADAO",
  "bairro": "Centro"
}
```

**Erros:** 401 token inválido/ausente

**Uso no front:** decidir rotas/telas conforme `tipo`

---

### POST /reportes — Cidadão

**Content-Type:** `multipart/form-data`

**Headers:** `Authorization: Bearer <token>`

**Campos do form:**

| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| foto | arquivo (File) | Sim |
| descricao | string | Sim |
| categoria | enum CategoriaReporte | Sim |
| localizacao | string | Sim |

**Restrições foto:** JPEG, PNG ou WebP | máximo 5MB

**Response 201:**
```json
{
  "id": "uuid",
  "foto": "/uploads/reporte123.jpg",
  "descricao": "Poste apagado há 3 dias",
  "categoria": "ILUMINACAO",
  "localizacao": "Rua das Flores, Centro",
  "status": "ABERTO",
  "autorId": "uuid-do-cidadao",
  "totalAlertas": 0,
  "createdAt": "2026-09-06T12:00:00.000Z"
}
```

**Erros:** 403 prefeitura | 400 sem foto ou categoria inválida

---

### GET /reportes — Público (token opcional)

**Query params:**

| Param | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| ordenacao | `alertas` \| `recentes` | `alertas` | Ordenação do feed |
| categoria | CategoriaReporte | — | Filtro |
| bairro | string | — | Busca parcial em `localizacao` |
| status | StatusReporte | — | Se omitido, **exclui RESOLVIDO** |
| page | number | 1 | Página |
| limit | number | 10 | Itens por página |

**Exemplo:** `/reportes?ordenacao=alertas&categoria=ILUMINACAO&bairro=Centro&page=1&limit=10`

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "foto": "/uploads/reporte123.jpg",
      "descricao": "Poste apagado há 3 dias",
      "categoria": "ILUMINACAO",
      "localizacao": "Rua das Flores, Centro",
      "status": "ABERTO",
      "totalAlertas": 12,
      "jaAlertado": false,
      "autor": {
        "id": "uuid",
        "nome": "Maria Silva"
      },
      "createdAt": "2026-09-06T12:00:00.000Z"
    }
  ],
  "page": 1,
  "totalPages": 5,
  "totalItems": 47
}
```

**Campo `jaAlertado`:**
- Sem token → sempre `false`
- Com token cidadão → `true` se já deu alerta naquele reporte (desabilitar botão)

---

### GET /reportes/resolvidos — Público (token opcional)

Mesmos query params de listagem (exceto `ordenacao` — sempre por data de resolução).

Retorna **apenas** reportes com `status: RESOLVIDO`.

Ordenação fixa: `updatedAt` decrescente.

**Response 200:** mesmo formato de `GET /reportes`

**Uso no front:** aba/seção "Resolvidos" separada do feed principal

---

### GET /reportes/:id — Público (token opcional)

**Response 200:** mesmo objeto de um item do feed (com `jaAlertado` e `autor`)

**Erros:** 404 reporte não encontrado

---

### PATCH /reportes/:id/status — Prefeitura

**Content-Type:** `application/json`

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "status": "EM_ANDAMENTO"
}
```

**Transições permitidas (obrigatório seguir ordem):**
```
ABERTO → EM_ANDAMENTO → RESOLVIDO
```

Não permite pular etapa nem retroceder.

**Response 200:**
```json
{
  "id": "uuid",
  "status": "EM_ANDAMENTO",
  "updatedAt": "2026-09-06T14:00:00.000Z"
}
```

**Erros:** 403 cidadão | 400 transição inválida | 404 não encontrado

---

### POST /reportes/:id/alertas — Cidadão

**Headers:** `Authorization: Bearer <token>`

**Body:** nenhum

**Response 201:**
```json
{
  "reporteId": "uuid",
  "totalAlertas": 13
}
```

**Regras:**
- Cidadão não pode alertar **próprio** reporte → 403
- Não pode alertar reporte **RESOLVIDO** → 400
- Não pode alertar **duas vezes** → 409

---

### DELETE /reportes/:id/alertas — Cidadão

**Headers:** `Authorization: Bearer <token>`

**Body:** nenhum

**Response 200:**
```json
{
  "reporteId": "uuid",
  "totalAlertas": 12
}
```

**Erros:** 404 nunca alertou | 400 reporte resolvido

---

### GET /dashboard/resumo — Prefeitura

**Headers:** `Authorization: Bearer <token>`

**Response 200:**
```json
{
  "totalReportes": 152,
  "porStatus": {
    "ABERTO": 80,
    "EM_ANDAMENTO": 42,
    "RESOLVIDO": 30
  },
  "porCategoria": {
    "ILUMINACAO": 40,
    "BURACO_PAVIMENTACAO": 55,
    "LIXO": 30,
    "SINALIZACAO": 20,
    "OUTROS": 7
  }
}
```

**Erros:** 403 cidadão

---

## Regras de negócio (impacto na UI)

| Regra | Comportamento no front |
|-------|------------------------|
| Feed principal | Não mostra reportes `RESOLVIDO` (usar endpoint `/reportes/resolvidos`) |
| Ordenação default | Por quantidade de alertas (decrescente) |
| Cidadão | Vê botão criar reporte e botão alerta |
| Prefeitura | Vê dashboard e controle de status; **sem** criar reporte/alerta |
| Próprio reporte | Botão alerta desabilitado/oculto |
| `jaAlertado: true` | Botão alerta desabilitado ou vira "remover alerta" (DELETE) |
| Status RESOLVIDO | Sem alertas; sai do feed principal |
| Status prefeitura | Mostrar próximo status na sequência: ABERTO→EM_ANDAMENTO→RESOLVIDO |
| Visitante (sem login) | Pode ver feed e detalhes; `jaAlertado` sempre false |
| Upload | Usar `multipart/form-data`, campo `foto` |

---

## Mapa de rotas sugerido no React

| Rota front | Tipo usuário | Endpoints usados |
|------------|--------------|------------------|
| `/login` | Público | POST /auth/login |
| `/cadastro` | Público | POST /auth/register |
| `/feed` | Público/Cidadão | GET /reportes |
| `/resolvidos` | Público | GET /reportes/resolvidos |
| `/reportes/:id` | Público | GET /reportes/:id |
| `/novo-reporte` | Cidadão | POST /reportes |
| `/dashboard` | Prefeitura | GET /dashboard/resumo, PATCH /reportes/:id/status |

---

## Checklist de integração

- [ ] Backend rodando: `npm run db:up` + `npm run start:dev`
- [ ] `.env` React com `VITE_API_URL` e `VITE_ASSETS_URL`
- [ ] Header `Authorization` em rotas protegidas
- [ ] Login salva `token`
- [ ] `GET /auth/me` ao iniciar app para restaurar sessão
- [ ] Redirecionar conforme `tipo` (CIDADAO vs PREFEITURA)
- [ ] Fotos: prefixar URL base em `/uploads/...`
- [ ] Criar reporte: `multipart/form-data`
- [ ] Tratar erros pelo campo `message`

---

## Pré-requisito: backend rodando

```bash
npm run db:up
npm run start:dev
```

API: `http://localhost:3000/api`
