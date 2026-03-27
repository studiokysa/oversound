---
title: Oversound — Contexto do Projeto
type: project-context
last_updated: 2026-03-25
---

# Oversound

## O que é

Oversound é um hub de trilhas sonoras criado pelos alunos da **Overlens** (escola/comunidade de design). O site permite que os membros ouçam, baixem e acompanhem as letras das músicas produzidas pelo grupo.

**URL de produção:** https://oversound.vercel.app
**Repositório:** C:\Users\kysar\Documents\GitHub\Oversound
**Hospedagem:** Vercel (plano gratuito)

## Acesso

O site tem proteção por senha na entrada. Senha atual: definida via variável de ambiente `NEXT_PUBLIC_SITE_PASSWORD` no Vercel.

## Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Estilo:** Tailwind CSS v4
- **Componentes UI:** shadcn/ui (Card, Badge, Button, Input, Slider)
- **Fontes:** Outfit (Google Fonts)
- **Deploy:** Vercel CLI

## Estrutura de pastas relevante

```
src/
  app/
    page.tsx          # Página de login com senha
    layout.tsx        # Layout raiz (dark mode, fonte Outfit)
    globals.css       # Variáveis de tema shadcn
  components/
    MusicHub.tsx      # Hub principal: lista de músicas + player + painel lateral
    ui/               # Componentes shadcn (button, card, badge, slider, input)
public/
  audio/              # Arquivos de áudio (.mpeg)
  images/             # Capas das músicas (.png)
letras/               # Letras das músicas em markdown com timestamps
```

## Funcionalidades implementadas

- Página de senha (senha via env var)
- Lista de faixas com capa, título, artista e duração
- Player de áudio com: play/pause, anterior, próxima, shuffle, repeat, volume
- Download de faixas
- Painel lateral estilo Spotify (desktop): capa grande, título, artista, letra sincronizada
- Letras com sincronização por timestamp (auto-scroll para linha atual)
- GIF de vibes para músicas específicas (Tec Tec)
- Pré-carregamento de durações de todas as faixas
- Aviso de disclaimer (Overlens) na página de login e no hub
- Tema escuro por padrão

## Músicas cadastradas

| ID | Título | Artista | Letra | Capa | GIF |
|----|--------|---------|-------|------|-----|
| 1  | Mingau na Porta | Azemor feat. Michelly | ✅ | ✅ | — |
| 2  | Designer Incomum | Azemor | ✅ | ✅ | — |
| 3  | Italiana Vero | Azemor feat. Cley | — | ✅ | — |
| 4  | Tec Tec | Azemor feat. André Lucas | — | ✅ | ✅ |

## Como adicionar uma nova música

1. Colocar o arquivo de áudio em `public/audio/nome-da-musica.mpeg`
2. Colocar a capa em `public/images/nome-da-musica.png`
3. Adicionar o objeto no array `tracks` em `src/components/MusicHub.tsx`
4. Opcional: criar `letras/nome-da-musica.md` com os timestamps e adicionar o array `lyrics` na track
5. Fazer deploy: `npx vercel deploy --prod`

## Como atualizar uma letra

1. Editar o arquivo em `letras/nome-da-musica.md`
2. Atualizar o array de lyrics correspondente em `src/components/MusicHub.tsx`
3. Fazer deploy

## Funcionalidades planejadas (não implementadas)

- **Métricas de plays por música** (via Supabase — projeto a criar)
- **Página de stats** acessível apenas pelo dono
- **Bloco "Sobre o artista"** no painel lateral (estrutura já reservada no código)

## Disclaimers importantes

- O site e as músicas foram criados por alunos da Overlens de forma independente
- A Overlens (empresa) não tem vínculo nem responsabilidade sobre o conteúdo
- Link oficial da Overlens: https://www.overlens.com.br
