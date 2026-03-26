---
title: Métricas de Plays — Plano de Implementação
type: implementation-guide
status: pending
last_updated: 2026-03-25
---

# Métricas de Plays com Supabase

## Contexto

Registrar quantas vezes cada música é ouvida e exibir esses dados numa página `/stats` acessível apenas pelo dono do site.

## Supabase

- **Organização:** Kysa Studio (`vcctsroibqtzwvtwvhaa`)
- **Custo:** $0/mês (plano gratuito confirmado)
- **Projeto a criar:** `oversound` na região `sa-east-1` (São Paulo)

## Estrutura do banco

```sql
create table plays (
  id bigserial primary key,
  track_id integer not null,
  played_at timestamptz default now()
);
```

Não armazena dados do usuário — apenas `track_id` e timestamp.

## Como implementar

### 1. Criar projeto no Supabase

Pedir ao agente (com MCP Supabase disponível):
> "Cria o projeto oversound no Supabase na org Kysa Studio, região sa-east-1"

### 2. Criar a tabela

Após o projeto estar `ACTIVE_HEALTHY`, rodar via `execute_sql`:

```sql
create table plays (
  id bigserial primary key,
  track_id integer not null,
  played_at timestamptz default now()
);

-- Desabilitar RLS (só leitura via API route protegida)
alter table plays disable row level security;
```

### 3. Variáveis de ambiente

Adicionar no `.env.local` e no painel da Vercel:

```
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
STATS_PASSWORD=<senha-secreta-do-dono>
```

Usar `SUPABASE_SERVICE_ROLE_KEY` (não a anon key) para que a API route possa inserir sem RLS.

### 4. API route para registrar play

Criar `src/app/api/play/route.ts`:

```ts
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { track_id } = await req.json();
  if (!track_id) return NextResponse.json({ error: "missing track_id" }, { status: 400 });
  await supabase.from("plays").insert({ track_id });
  return NextResponse.json({ ok: true });
}
```

### 5. Chamar a API ao iniciar reprodução

Em `MusicHub.tsx`, dentro da função que inicia o play (ex: `selectTrack` ou ao clicar na faixa):

```ts
fetch("/api/play", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ track_id: track.id }),
});
```

### 6. Página de stats

Criar `src/app/stats/page.tsx` — protegida por senha (`STATS_PASSWORD`), exibe:

- Total de plays por faixa
- Ranking das mais ouvidas
- Gráfico de plays ao longo do tempo (opcional)

Query sugerida:

```sql
select track_id, count(*) as total
from plays
group by track_id
order by total desc;
```

## Observações

- A senha da página `/stats` deve ser diferente da senha principal (`Overlindos`)
- O link da página não precisa aparecer no site — acesso direto pela URL
- Instalar dependência: `npm install @supabase/supabase-js`
