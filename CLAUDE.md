# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build (run before deploy to catch errors)
npm run lint     # eslint
npx vercel deploy --prod   # deploy to production
```

No test suite exists in this project.

## Deploy

Hosted on Vercel (free tier, org: Kysa Studio). Deploy manually via CLI — there is no GitHub Actions / auto-deploy integration yet.

## Stack specifics

- **Next.js 16** App Router with TypeScript. This version has breaking changes — read `node_modules/next/dist/docs/` before using APIs you are unsure about.
- **Tailwind CSS v4** — config is in `globals.css` via `@theme`, not `tailwind.config.js`. There is no `tailwind.config.js`.
- **shadcn/ui** components live in `src/components/ui/`. The Slider uses `@base-ui/react` — its `onValueChange` signature is `(value: number | readonly number[]) => void`, not `number[]`.
- **zod** is pinned to v3 (`zod@3`). Do not upgrade — v4 breaks shadcn CLI's `locales/index.js` import.
- **Outfit** font loaded via `next/font/google` in `layout.tsx`. Dark mode is always on (`dark` class on `<html>`).

## Architecture

The entire app is two pages:

1. **`src/app/page.tsx`** — password gate (password via `NEXT_PUBLIC_SITE_PASSWORD` env var). On success renders `<MusicHub />`.
2. **`src/components/MusicHub.tsx`** — the whole player UI (~850 lines). Single component with all state, no context or external state library.

### MusicHub layout structure

```
div (100dvh, flex col)
  ├── header bar (tagline + logo)
  ├── div (flex-1, flex row, overflow-hidden)
  │     ├── main scroll area (track list)
  │     └── aside (hidden on mobile, resizable via drag handle, lg:flex)
  ├── bottom player (hidden lg:block — desktop only)
  ├── mobile mini player (lg:hidden — tappable, opens fullscreen)
  └── mobile fullscreen player overlay (fixed inset-0, z-50)
```

The sidebar is resizable: `panelWidth` state + `onMouseDown` on a `w-1` drag handle, min 200px / max 520px.

### Audio playback

Single `<audio>` element via `audioRef`. Key behaviors:
- Durations pre-loaded on mount via temporary `new Audio()` instances for all tracks.
- `onEnded` respects `repeat` (restart) and `shuffle` (random next excluding current). Both `repeat` and `shuffle` must be in the `useEffect` dependency array.
- Lyrics sync: `getCurrentLyricIndex()` compares `currentTime` against `LyricLine[]` timestamps. Auto-scroll uses `getBoundingClientRect()` relative to the scroll container — do not use `offsetTop` (wrong reference frame).

### Adding a track

1. Place audio in `public/audio/<name>.mpeg` and cover in `public/images/<name>.png`
2. Add object to the `tracks` array in `MusicHub.tsx`
3. **New tracks always go at the end** of the `tracks` array — never insert in the middle.
4. **Always** create `letras/<name>.md` with frontmatter and timestamps whenever lyrics are provided — even if adding lyrics later. Add a `lyrics: LyricLine[]` array to the track object in `MusicHub.tsx`.

### Lyrics file format (`letras/<name>.md`)

Every lyrics file must start with this frontmatter:

```md
---
title: Track Title
artist: Artist Name
track_id: <id>
audio: /audio/<name>.mpeg
cover: /images/<name>.png
has_lyrics: true
---
```

Followed by the lyrics with timestamps in `(m:ss)` format.

### Accent colors

The design uses the Overlens brand palette — **not** Tailwind violet/fuchsia:
- `#F3A46C` — warm orange (primary accent, text, slider thumb)
- `#D97657` — terracota (gradient start, darker accent)
- Gradients go `from-[#D97657] to-[#F3A46C]`

### Planned but not implemented

See `docs/stats-supabase.md` for the full implementation plan for play-count metrics via Supabase + a hidden `/stats` page.
