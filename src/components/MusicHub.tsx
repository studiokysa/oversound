"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

interface LyricLine {
  time: number;
  text: string;
}

interface Track {
  id: number;
  title: string;
  description: string;
  duration: string;
  tags: string[];
  src: string;
  cover?: string;
  lyrics?: LyricLine[];
  gif?: string;
}

const mingauLyrics: LyricLine[] = [
  { time: 0,   text: "Quer leitinho com pera, então toma" },
  { time: 4,   text: "Michelly mandando a letra" },
  { time: 8,   text: "Não vem pedir mastigado, vida não é mingau" },
  { time: 12,  text: "Nem diploma salva quem quer tudo igual" },
  { time: 15,  text: "Quatro anos na cadeira só pra entender o princípio" },
  { time: 18,  text: "Depois mais dois, mais três e ver que ainda tá no início" },
  { time: 22,  text: "Conhecimento não cai do céu, não vem em PDF" },
  { time: 25,  text: "Não tem fórmula pronta, não tem Ctrl-Z" },
  { time: 28,  text: "Cada um acha o caminho que aguenta sustentar" },
  { time: 32,  text: "Quem copia receita nunca aprende a cozinhar" },
  { time: 35,  text: "Quer atalho vai achar em curso que engana" },
  { time: 38,  text: "Print de resultado" },
  { time: 40,  text: "Promessa fajuta pra arrancar sua grana" },
  { time: 42,  text: "Aqui é chão rachado, projeto na mão" },
  { time: 46,  text: "Erro compartilhado vale mais que ilusão" },
  { time: 50,  text: "Isso aqui é vida real, sem corte, sem filtro" },
  { time: 54,  text: "Troca de ideia vale mais que título" },
  { time: 58,  text: "Não tem herói nem guru no altar" },
  { time: 61,  text: "Só gente grande tentando se aprimorar" },
  { time: 64,  text: "Dá pra receber, ouve pra ser ouvido" },
  { time: 68,  text: "Grupo é espelho do que tu tem construído" },
  { time: 71,  text: "Não vem bater na porta pedindo colher" },
  { time: 74,  text: "Se quer comer com a gente, aprende a fazer" },
  { time: 78,  text: "Galera estuda pesado, lê até sangrar" },
  { time: 81,  text: "Divide o pouco que sabe sem cobrar pra falar" },
  { time: 84,  text: "Tem calo aberto, tem erro ao vivo" },
  { time: 87,  text: "Aqui ninguém é mestre, todo mundo tá ativo" },
  { time: 90,  text: "Relato milagroso, desconfia do tom" },
  { time: 94,  text: "Quem grita lucro demais geralmente vem de ilusão" },
  { time: 97,  text: "Aqui não tem cifra inflada pra te seduzir" },
  { time: 100, text: "Tem processo lento e verdade pra engolir" },
  { time: 104, text: "Plataforma é ferramenta, não promessa divina" },
  { time: 107, text: "Trilha é estrada pra treinar sua disciplina" },
  { time: 111, text: "Assina a testa, pensa por conta própria" },
  { time: 114, text: "Liberdade dói, mas é morte querer ser cópia" },
  { time: 117, text: "Isso aqui é vida da real, sem corte, sem filtro" },
  { time: 122, text: "Troca de ideia vale mais que título" },
  { time: 125, text: "Não tem herói nem guru no altar" },
  { time: 128, text: "Só gente grande tentando se aprimorar" },
  { time: 132, text: "Dá pra receber, ouve pra ser ouvido" },
  { time: 135, text: "Grupo é espelho do que tu tem construído" },
  { time: 139, text: "Não bate na porta pedindo colher" },
  { time: 142, text: "Se quer comer com a gente, aprende a fazer" },
  { time: 145, text: "Ninguém pega tua mão pra te ensinar a andar" },
  { time: 148, text: "Mas se tu cair do lado certo, alguém vai te levantar" },
  { time: 152, text: "Nesse work não é pedir, é participar" },
  { time: 155, text: "Confiança se planta antes de precisar" },
  { time: 159, text: "Não é grupinho de criança, é mesa de iguais" },
  { time: 162, text: "Cada um traz seu prato, seus erros, seus sinais" },
  { time: 165, text: "Aqui não tem mingau, louça limpa na pia" },
  { time: 168, text: "Tem fogo aceso, chega junto e colabora com a alquimia" },
  { time: 173, text: "Aqui não tem colo, tem troca justa" },
  { time: 176, text: "Suor verdadeiro de quem sabe o quanto custa" },
  { time: 180, text: "Ema tá fechada com facão na mão" },
  { time: 183, text: "Não vem pedindo sonho, quem não sabe fazer pão" },
  { time: 186, text: "Comunidade é força, não plateia sentada" },
  { time: 188, text: "Tamo na correria, todo dia na estrada" },
  { time: 190, text: "Esquece príncipe de Pinterest" },
  { time: 191, text: "Aqui a gente estuda e valida tudo no teste" },
  { time: 194, text: "Servido" },
];

const designerLyrics: LyricLine[] = [
  { time: 11,  text: "Entrei aqui com o overpass" },
  { time: 13,  text: "Me surpreendi com tudo o que é" },
  { time: 17,  text: "Até criei a ClanderClass" },
  { time: 21,  text: "Fui inspirado pelo André" },
  { time: 24,  text: "Agora eu sei que eu estou" },
  { time: 28,  text: "Num oceano azul" },
  { time: 31,  text: "Azul (3x)" },
  { time: 49,  text: "Cada projeto que eu tô pegando" },
  { time: 52,  text: "É mais um passo na minha estrada" },
  { time: 55,  text: "Já não me importo o quanto tão pagando" },
  { time: 58,  text: "Só quero deixar minha história marcada" },
  { time: 62,  text: "Agora eu sei que eu não sou" },
  { time: 65,  text: "Mais um designer comum" },
  { time: 67,  text: "Não sou mais (3x)" },
  { time: 86,  text: "Agora eu sou muito melhor que antes" },
  { time: 91,  text: "E sinto ecoar minha voz" },
  { time: 96,  text: "Me sinto vivo" },
  { time: 100, text: "Produzo por dois" },
  { time: 104, text: "Já me acostumei" },
  { time: 107, text: "Olha onde eu cheguei" },
  { time: 110, text: "E vou além" },
  { time: 111, text: "(Overleeeeeens)" },
  { time: 114, text: "DESIGN SOUND" },
  { time: 118, text: "(Overleeeeeens)" },
  { time: 122, text: "This is the Future" },
  { time: 124, text: "(Overleeeeeens)" },
  { time: 127, text: "?" },
  { time: 162, text: "Minha alma expande" },
  { time: 163, text: "Tô mais criativo" },
  { time: 165, text: "Tô mais veloz" },
  { time: 166, text: "Mais desenrolado" },
  { time: 168, text: "Nem mesmo eu sei o que acontece comigo" },
  { time: 171, text: "Já não reconheço hábitos passados" },
  { time: 175, text: "Onde será que isso vai dar?" },
  { time: 178, text: "Vou pagar pra ver" },
  { time: 206, text: "As minhas marcas são os meus legados" },
  { time: 210, text: "Existo em cada emoção" },
  { time: 218, text: "Provoco risos" },
  { time: 221, text: "Evoco paixões" },
  { time: 223, text: "Eu fico satisfeito" },
  { time: 228, text: "Quando o que sai do meu peito ganha o mundo" },
  { time: 234, text: "DESIGN SOUND" },
  { time: 241, text: "This is the future" },
  { time: 271, text: "ISSO É DESIGN SOUND" },
];

const tracks: Track[] = [
  {
    id: 1,
    title: "Mingau na Porta",
    description: "Azemor feat. Michelly",
    duration: "--:--",
    tags: ["Original"],
    src: "/audio/mingau-na-porta.mpeg",
    cover: "/images/mingau-na-porta.png",
    lyrics: mingauLyrics,
  },
  {
    id: 2,
    title: "Designer Incomum",
    description: "Azemor",
    duration: "--:--",
    tags: ["Original"],
    src: "/audio/designer-incomum.mpeg",
    cover: "/images/designer-incomum.png",
    lyrics: designerLyrics,
  },
  {
    id: 3,
    title: "Italiana Vero",
    description: "Azemor feat. Cley",
    duration: "--:--",
    tags: ["Original"],
    src: "/audio/italiana-vero.mpeg",
    cover: "/images/italiana-vero.png",
  },
  {
    id: 4,
    title: "Tec Tec",
    description: "Azemor feat. André Lucas",
    duration: "--:--",
    tags: ["Original"],
    src: "/audio/tec-tec.mpeg",
    cover: "/images/tec-tec.png",
    gif: "https://c.tenor.com/oV-KOsVDJcsAAAAd/tenor.gif",
  },
];

function formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function getCurrentLyricIndex(lyrics: LyricLine[], time: number): number {
  let idx = 0;
  for (let i = 0; i < lyrics.length; i++) {
    if (time >= lyrics[i].time) idx = i;
    else break;
  }
  return idx;
}

export default function MusicHub() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackDurations, setTrackDurations] = useState<Record<number, number>>({});
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [showFullLyrics, setShowFullLyrics] = useState(false);
  const [showMobilePlayer, setShowMobilePlayer] = useState(false);
  const [panelWidth, setPanelWidth] = useState(288); // 72 * 4 = 288px default
  const isResizing = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lyricRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const sidebarLyricsRef = useRef<HTMLDivElement | null>(null);

  const currentLyricIndex =
    currentTrack?.lyrics ? getCurrentLyricIndex(currentTrack.lyrics, currentTime) : -1;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      if (repeat && audio) {
        audio.currentTime = 0;
        audio.play();
      } else {
        const availableTracks = tracks.filter(t => t.src);
        const currentIndex = availableTracks.findIndex(t => t.id === currentTrack?.id);
        let next: Track | undefined;
        if (shuffle) {
          const others = availableTracks.filter(t => t.id !== currentTrack?.id);
          next = others[Math.floor(Math.random() * others.length)];
        } else if (currentIndex < availableTracks.length - 1) {
          next = availableTracks[currentIndex + 1];
        }
        if (next) {
          setCurrentTrack(next);
          setProgress(0);
          setCurrentTime(0);
          setIsPlaying(true);
          setTimeout(() => audioRef.current?.play(), 50);
        } else {
          setIsPlaying(false);
        }
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentTrack, repeat, shuffle]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  // Pre-load durations for all tracks
  useEffect(() => {
    tracks.forEach((track) => {
      if (!track.src) return;
      const audio = new Audio();
      audio.preload = "metadata";
      audio.src = track.src;
      audio.addEventListener("loadedmetadata", () => {
        setTrackDurations((prev) => ({ ...prev, [track.id]: audio.duration }));
      });
    });
  }, []);

  // Auto-scroll lyrics in sidebar
  useEffect(() => {
    if (currentLyricIndex < 0) return;
    const el = lyricRefs.current[currentLyricIndex];
    if (el && sidebarLyricsRef.current) {
      const container = sidebarLyricsRef.current;
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const relativeTop = elRect.top - containerRect.top + container.scrollTop;
      container.scrollTo({
        top: relativeTop - container.clientHeight / 2 + el.clientHeight / 2,
        behavior: "smooth",
      });
    }
  }, [currentLyricIndex]);

  const playTrack = useCallback((track: Track) => {
    if (!track.src) return;
    if (currentTrack?.id === track.id) {
      if (audioRef.current) {
        if (audioRef.current.paused) { audioRef.current.play(); setIsPlaying(true); }
        else { audioRef.current.pause(); setIsPlaying(false); }
      }
      return;
    }
    setCurrentTrack(track);
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 50);
  }, [currentTrack]);

  function playNext() {
    const availableTracks = tracks.filter(t => t.src);
    const currentIndex = availableTracks.findIndex(t => t.id === currentTrack?.id);
    let next: Track | undefined;
    if (shuffle) {
      const others = availableTracks.filter(t => t.id !== currentTrack?.id);
      next = others[Math.floor(Math.random() * others.length)];
    } else {
      next = availableTracks[(currentIndex + 1) % availableTracks.length];
    }
    if (!next) return;
    setCurrentTrack(next); setProgress(0); setCurrentTime(0); setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 50);
  }

  function playPrev() {
    if (currentTime > 3 && audioRef.current) { audioRef.current.currentTime = 0; return; }
    const availableTracks = tracks.filter(t => t.src);
    const currentIndex = availableTracks.findIndex(t => t.id === currentTrack?.id);
    const prev = availableTracks[(currentIndex - 1 + availableTracks.length) % availableTracks.length];
    if (!prev) return;
    setCurrentTrack(prev); setProgress(0); setCurrentTime(0); setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 50);
  }

  function togglePlayPause() {
    if (!audioRef.current || !currentTrack) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play(); setIsPlaying(true); }
  }

  function handleSeek(val: number | readonly number[]) {
    if (!audioRef.current || !duration) return;
    const v = Array.isArray(val) ? (val as number[])[0] : (val as number);
    audioRef.current.currentTime = (v / 100) * duration;
    setProgress(v);
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-zinc-950 text-white">
      {currentTrack?.src && <audio ref={audioRef} src={currentTrack.src} preload="metadata" />}

      {/* Fullscreen lyrics overlay */}
      {showFullLyrics && currentTrack?.lyrics && (
        <div className="fixed inset-0 z-50 flex flex-col bg-zinc-950/98 backdrop-blur-xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 flex-shrink-0">
            <div className="flex items-center gap-3">
              {currentTrack.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={currentTrack.cover} alt={currentTrack.title} className="w-10 h-10 rounded-md object-cover" />
              )}
              <div>
                <p className="text-white text-sm font-semibold">{currentTrack.title}</p>
                <p className="text-zinc-500 text-xs">{currentTrack.description}</p>
              </div>
            </div>
            <button onClick={() => setShowFullLyrics(false)} className="text-zinc-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-zinc-800" title="Fechar">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-8 scrollbar-thin">
            <div className="max-w-xl mx-auto space-y-4 pb-32">
              {currentTrack.lyrics.map((line, i) => (
                <p key={i} className={`text-2xl font-bold leading-snug transition-all duration-300 ${
                  i === currentLyricIndex ? "text-white scale-105 origin-left"
                  : i < currentLyricIndex ? "text-zinc-600"
                  : "text-zinc-500"
                }`}>
                  {line.text}
                </p>
              ))}
            </div>
          </div>
          <div className="border-t border-zinc-800 bg-zinc-900/95 px-6 py-4 flex-shrink-0">
            <div className="max-w-xl mx-auto space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-zinc-500 text-xs font-mono w-10 text-right">{formatTime(currentTime)}</span>
                <Slider value={[progress]} onValueChange={handleSeek} max={100} step={0.1} className="flex-1 [&_[role=slider]]:bg-violet-400 [&_[role=slider]]:border-0 [&_.bg-primary]:bg-violet-500" />
                <span className="text-zinc-500 text-xs font-mono w-10">{formatTime(duration)}</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <button onClick={() => setShuffle(s => !s)} className={`p-1.5 rounded-md transition-colors ${shuffle ? "text-violet-400" : "text-zinc-600 hover:text-zinc-400"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /></svg>
                </button>
                <button onClick={playPrev} className="text-zinc-400 hover:text-white transition-colors p-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" /></svg>
                </button>
                <Button onClick={togglePlayPause} size="icon" className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 border-0 text-white">
                  {isPlaying
                    ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  }
                </Button>
                <button onClick={playNext} className="text-zinc-400 hover:text-white transition-colors p-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zm2.5-6 6-4.28V16.28z" /><path d="M16 6h2v12h-2z" /></svg>
                </button>
                <button onClick={() => setRepeat(r => !r)} className={`p-1.5 rounded-md transition-colors ${repeat ? "text-violet-400" : "text-zinc-600 hover:text-zinc-400"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 014-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 01-4 4H3" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex-shrink-0 border-b border-zinc-800 px-6 py-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
          </svg>
        </div>
        <span className="font-bold text-lg tracking-tight">Oversound</span>
      </header>

      {/* Body */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left: main scrollable content */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          <main className="px-6 py-8 max-w-3xl mx-auto w-full flex-1">
            <div className="mb-8 space-y-4">
              <div className="rounded-xl bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/20 px-5 py-3 flex items-center gap-3">
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                <p className="text-sm text-violet-200 font-medium">
                  Você está ouvindo <span className="text-white font-bold">ClanderClass FM</span>. A rádio que desperta o nexus em você!
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Trilhas Sonoras</h2>
                <p className="text-zinc-400 text-sm mt-1">Clique em uma faixa para ouvir</p>
              </div>
            </div>

            <div className="space-y-3">
              {tracks.map((track, index) => {
                const isActive = currentTrack?.id === track.id;
                const isAvailable = !!track.src;
                return (
                  <Card
                    key={track.id}
                    className={`border transition-all duration-200 cursor-pointer ${
                      isAvailable
                        ? isActive
                          ? "bg-zinc-800 border-violet-500/50 shadow-lg shadow-violet-500/10"
                          : "bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/70"
                        : "bg-zinc-900/40 border-zinc-800/50 opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() => playTrack(track)}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-zinc-800 overflow-hidden relative">
                        {track.cover && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                        )}
                        {isActive && isPlaying ? (
                          <span className="absolute inset-0 flex items-center justify-center bg-black/50 gap-0.5">
                            <span className="w-1 bg-violet-400 rounded-full animate-[bounce_0.8s_ease-in-out_infinite]" style={{ height: "40%", animationDelay: "0ms" }} />
                            <span className="w-1 bg-violet-400 rounded-full animate-[bounce_0.8s_ease-in-out_infinite]" style={{ height: "70%", animationDelay: "150ms" }} />
                            <span className="w-1 bg-violet-400 rounded-full animate-[bounce_0.8s_ease-in-out_infinite]" style={{ height: "30%", animationDelay: "300ms" }} />
                          </span>
                        ) : isActive ? (
                          <span className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                            </svg>
                          </span>
                        ) : !track.cover ? (
                          <span className="text-zinc-500 text-sm font-mono">{String(index + 1).padStart(2, "0")}</span>
                        ) : null}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`font-medium text-sm truncate ${isActive ? "text-violet-300" : "text-white"}`}>
                            {track.title}
                          </span>
                          {track.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className={`text-xs px-1.5 py-0 h-5 ${tag === "Em breve" ? "bg-zinc-800 text-zinc-500 border-zinc-700" : "bg-violet-500/20 text-violet-300 border-violet-500/30"}`}>
                              {tag}
                            </Badge>
                          ))}
                          {track.lyrics && (
                            <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5 bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30">
                              Letra
                            </Badge>
                          )}
                        </div>
                        <p className="text-zinc-500 text-xs mt-0.5">{track.description}</p>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-zinc-500 text-xs font-mono">
                          {isActive ? formatTime(duration) : trackDurations[track.id] ? formatTime(trackDurations[track.id]) : track.duration}
                        </span>
                        {isAvailable && (
                          <a href={track.src} download={`${track.title}.mpeg`} onClick={(e) => e.stopPropagation()} className="text-zinc-500 hover:text-violet-400 transition-colors" title="Baixar música">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </main>

          <footer className="px-6 py-5 border-t border-zinc-900 text-center">
            <p className="text-zinc-600 text-xs leading-relaxed max-w-xl mx-auto">
              Este hub e suas músicas foram criados por alunos da{" "}
              <a href="https://www.overlens.com.br" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-violet-400 transition-colors underline underline-offset-2">Overlens</a>
              {" "}de forma independente, sem qualquer vínculo com a empresa. A Overlens não possui responsabilidade sobre o conteúdo aqui publicado.
            </p>
          </footer>
        </div>

        {/* Right: side panel — visible on lg+ when track is playing */}
        {currentTrack && (
          <aside
            className="hidden lg:flex flex-shrink-0 border-l border-zinc-800 flex-col overflow-hidden bg-zinc-950 relative"
            style={{ width: panelWidth }}
          >
            {/* Resize handle */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-violet-500/40 transition-colors z-10"
              onMouseDown={(e) => {
                e.preventDefault();
                isResizing.current = true;
                const startX = e.clientX;
                const startWidth = panelWidth;
                const onMove = (ev: MouseEvent) => {
                  if (!isResizing.current) return;
                  const delta = startX - ev.clientX;
                  const newWidth = Math.min(520, Math.max(200, startWidth + delta));
                  setPanelWidth(newWidth);
                };
                const onUp = () => {
                  isResizing.current = false;
                  window.removeEventListener("mousemove", onMove);
                  window.removeEventListener("mouseup", onUp);
                };
                window.addEventListener("mousemove", onMove);
                window.addEventListener("mouseup", onUp);
              }}
            />
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              {/* Cover art */}
              <div className="p-5">
                {currentTrack.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentTrack.cover}
                    alt={currentTrack.title}
                    className="w-full aspect-square object-cover rounded-xl shadow-xl"
                  />
                ) : (
                  <div className="w-full aspect-square rounded-xl bg-zinc-800 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                    </svg>
                  </div>
                )}

                {/* Title + artist */}
                <div className="mt-4">
                  <h3 className="text-white font-bold text-base leading-tight">{currentTrack.title}</h3>
                  <p className="text-zinc-400 text-sm mt-0.5">{currentTrack.description}</p>
                </div>
              </div>

              {/* GIF (for tracks without lyrics) */}
              {currentTrack.gif && (
                <div className="px-5 pb-5">
                  <div className="rounded-xl overflow-hidden border border-zinc-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={currentTrack.gif} alt="vibes" className="w-full object-contain" />
                  </div>
                </div>
              )}

              {/* Lyrics */}
              {currentTrack.lyrics && (
                <div className="px-5 pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">Letra</p>
                    <button
                      onClick={() => setShowFullLyrics(true)}
                      className="text-zinc-600 hover:text-violet-400 transition-colors p-1 rounded-md hover:bg-violet-500/10"
                      title="Expandir letra"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
                      </svg>
                    </button>
                  </div>
                  <div ref={sidebarLyricsRef} className="space-y-2 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin">
                    {currentTrack.lyrics.map((line, i) => (
                      <p
                        key={i}
                        ref={(el) => { lyricRefs.current[i] = el; }}
                        className={`leading-snug transition-all duration-300 ${
                          i === currentLyricIndex
                            ? "text-white font-semibold text-base"
                            : i < currentLyricIndex
                            ? "text-zinc-600 text-sm"
                            : "text-zinc-500 text-sm"
                        }`}
                      >
                        {line.text}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Placeholder for future "Sobre o artista" block */}
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Player — desktop only */}
      {currentTrack && (
        <div className="hidden lg:block flex-shrink-0 border-t border-zinc-800 bg-zinc-900/95 backdrop-blur-md px-6 py-4">
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-zinc-500 text-xs font-mono w-10 text-right">{formatTime(currentTime)}</span>
              <Slider value={[progress]} onValueChange={handleSeek} max={100} step={0.1} className="flex-1 [&_[role=slider]]:bg-violet-400 [&_[role=slider]]:border-0 [&_.bg-primary]:bg-violet-500" />
              <span className="text-zinc-500 text-xs font-mono w-10">{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {currentTrack.cover && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={currentTrack.cover} alt={currentTrack.title} className="w-10 h-10 rounded-md object-cover flex-shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">{currentTrack.title}</p>
                  <p className="text-zinc-500 text-xs">{currentTrack.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mx-4">
                <button onClick={() => setShuffle(s => !s)} className={`p-1.5 rounded-md transition-colors ${shuffle ? "text-violet-400" : "text-zinc-600 hover:text-zinc-400"}`} title="Aleatório">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
                    <polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" />
                  </svg>
                </button>
                <button onClick={playPrev} className="text-zinc-400 hover:text-white transition-colors p-1.5" title="Anterior">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" /></svg>
                </button>
                <Button onClick={togglePlayPause} size="icon" className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 border-0 text-white">
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  )}
                </Button>
                <button onClick={playNext} className="text-zinc-400 hover:text-white transition-colors p-1.5" title="Próxima">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zm2.5-6 6-4.28V16.28z" /><path d="M16 6h2v12h-2z" /></svg>
                </button>
                <button onClick={() => setRepeat(r => !r)} className={`p-1.5 rounded-md transition-colors ${repeat ? "text-violet-400" : "text-zinc-600 hover:text-zinc-400"}`} title="Repetir">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 014-4h14" />
                    <polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 01-4 4H3" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 w-28">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-zinc-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9H5l-1 1v4l1 1h4l4 4V5L9 9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072" />
                </svg>
                <Slider value={[volume]} onValueChange={(val) => { const v = Array.isArray(val) ? (val as number[])[0] : (val as number); setVolume(v); }} max={100} step={1} className="[&_[role=slider]]:bg-zinc-400 [&_[role=slider]]:border-0 [&_.bg-primary]:bg-zinc-500" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Mini Player */}
      {currentTrack && (
        <div className="lg:hidden flex-shrink-0 border-t border-zinc-800 bg-zinc-900/95 backdrop-blur-md">
          {/* Progress bar strip */}
          <div className="h-0.5 bg-zinc-800">
            <div className="h-full bg-violet-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div
            className="flex items-center gap-3 px-4 py-3 cursor-pointer"
            onClick={() => setShowMobilePlayer(true)}
          >
            {currentTrack.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={currentTrack.cover} alt={currentTrack.title} className="w-11 h-11 rounded-md object-cover flex-shrink-0" />
            ) : (
              <div className="w-11 h-11 rounded-md bg-zinc-800 flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">{currentTrack.title}</p>
              <p className="text-zinc-400 text-xs truncate">{currentTrack.description}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white"
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              )}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); playNext(); }}
              className="flex-shrink-0 text-zinc-400 p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zm2.5-6 6-4.28V16.28z" /><path d="M16 6h2v12h-2z" /></svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Fullscreen Player */}
      {showMobilePlayer && currentTrack && (
        <div className="lg:hidden fixed inset-0 z-50 bg-zinc-950 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-12 pb-4">
            <button onClick={() => setShowMobilePlayer(false)} className="text-zinc-400 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <p className="text-zinc-400 text-xs uppercase tracking-widest font-semibold">Tocando agora</p>
            <div className="w-8" />
          </div>

          {/* Cover Art */}
          <div className="flex-1 flex flex-col items-center justify-center px-10 gap-6 min-h-0">
            {currentTrack.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="w-full max-w-xs aspect-square rounded-2xl object-cover shadow-2xl"
              />
            ) : (
              <div className="w-full max-w-xs aspect-square rounded-2xl bg-zinc-800" />
            )}
            <div className="w-full max-w-xs flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-white text-xl font-bold truncate">{currentTrack.title}</p>
                <p className="text-zinc-400 text-sm truncate">{currentTrack.description}</p>
              </div>
              {currentTrack.lyrics && (
                <button
                  onClick={() => { setShowMobilePlayer(false); setShowFullLyrics(true); }}
                  className="flex-shrink-0 mt-1 text-xs text-violet-400 border border-violet-500/40 rounded-full px-3 py-1 font-semibold uppercase tracking-wide"
                >
                  Letra
                </button>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="px-6 pb-10 space-y-5">
            {/* Progress */}
            <div className="space-y-1">
              <Slider value={[progress]} onValueChange={handleSeek} max={100} step={0.1} className="[&_[role=slider]]:bg-white [&_[role=slider]]:border-0 [&_.bg-primary]:bg-white" />
              <div className="flex justify-between text-zinc-500 text-xs font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback buttons */}
            <div className="flex items-center justify-between">
              <button onClick={() => setShuffle(s => !s)} className={`p-2 ${shuffle ? "text-violet-400" : "text-zinc-600"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
                  <polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" />
                </svg>
              </button>
              <button onClick={playPrev} className="text-zinc-300 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" /></svg>
              </button>
              <Button onClick={togglePlayPause} size="icon" className="w-16 h-16 rounded-full bg-white text-zinc-900 hover:bg-zinc-200 border-0">
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                )}
              </Button>
              <button onClick={playNext} className="text-zinc-300 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zm2.5-6 6-4.28V16.28z" /><path d="M16 6h2v12h-2z" /></svg>
              </button>
              <button onClick={() => setRepeat(r => !r)} className={`p-2 ${repeat ? "text-violet-400" : "text-zinc-600"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 014-4h14" />
                  <polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 01-4 4H3" />
                </svg>
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-zinc-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9H5l-1 1v4l1 1h4l4 4V5L9 9z" />
              </svg>
              <Slider value={[volume]} onValueChange={(val) => { const v = Array.isArray(val) ? (val as number[])[0] : (val as number); setVolume(v); }} max={100} step={1} className="flex-1 [&_[role=slider]]:bg-zinc-400 [&_[role=slider]]:border-0 [&_.bg-primary]:bg-zinc-500" />
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-zinc-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9H5l-1 1v4l1 1h4l4 4V5L9 9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
