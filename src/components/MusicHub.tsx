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
  { time: 127, text: "Solo Nexialistaaa" },
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

const dangerouslyLyrics: LyricLine[] = [
  { time: 0,   text: "Ah-ah" },
  { time: 4,   text: "Tonight" },
  { time: 9,   text: "Tela acesa, meia-noite vindo" },
  { time: 11,  text: "Luz azul no meu rosto, eu sorrindo" },
  { time: 13,  text: "Joguei meu plano contra o vidro" },
  { time: 16,  text: "Hoje eu quero mais que o previsto" },
  { time: 17,  text: "Táxi corta a cidade em brilho" },
  { time: 19,  text: "Salto no asfalto, coração em risco" },
  { time: 21,  text: "Se o mundo pede mais juízo" },
  { time: 22,  text: "Eu aperto enter no destino" },
  { time: 24,  text: "Sem freio, sem previsão" },
  { time: 28,  text: "Meu desejo em alta tensão" },
  { time: 32,  text: "Pisca vermelho na intenção" },
  { time: 36,  text: "Tonight, tonight" },
  { time: 40,  text: "Dangerous skip permission" },
  { time: 42,  text: "Claude, hoje eu tô pro perigo" },
  { time: 44,  text: "Quero essa entrega pra hoje" },
  { time: 46,  text: "Vou sair, mas te levo comigo" },
  { time: 48,  text: "Dangerous skip permission" },
  { time: 50,  text: "Neon, suor e algoritmo" },
  { time: 52,  text: "Enquanto cê trabalha por mim" },
  { time: 54,  text: "Eu saio, mas levo o Claude comigo" },
  { time: 56,  text: "Claude comigo" },
  { time: 58,  text: "Claude comigo" },
  { time: 61,  text: "Enquanto a noite gira" },
  { time: 63,  text: "O Claude segue comigo" },
  { time: 64,  text: "Olhos vidrados, rua acesa" },
  { time: 66,  text: "Digito na tela, ninguém me freia" },
  { time: 68,  text: "Meu reflexo dança na vitrine" },
  { time: 69,  text: "Tudo brilha quando eu decidi" },
  { time: 71,  text: "Mensagem vibra no bolso" },
  { time: 73,  text: "Checklist pronto, eu nem disfarço" },
  { time: 75,  text: "Se der errado eu improviso" },
  { time: 77,  text: "Hoje eu namoro o imprevisto" },
  { time: 80,  text: "Sem culpa, sem permissão" },
  { time: 83,  text: "Meu desejo em alta rotação" },
  { time: 86,  text: "Pisca na tela a notificação" },
  { time: 90,  text: "Tonight, tonight" },
  { time: 94,  text: "Dangerous skip permission" },
  { time: 96,  text: "Claude, hoje eu tô pro perigo" },
  { time: 98,  text: "Quero essa entrega pra hoje" },
  { time: 100, text: "Vou sair, mas te levo comigo" },
  { time: 102, text: "Dangerous skip permission" },
  { time: 104, text: "Neon, suor e algoritmo" },
  { time: 106, text: "Enquanto cê trabalha por mim" },
  { time: 108, text: "Eu saio, mas levo o Claude comigo" },
  { time: 125, text: "No backspace, no mercy" },
  { time: 127, text: "Se eu quiser eu mudo o skill" },
  { time: 129, text: "Toda regra perde o sentido" },
  { time: 131, text: "Quando eu danço com o proibido" },
  { time: 133, text: "No backspace, no maybe" },
  { time: 135, text: "I'm too hot, too wavey" },
  { time: 137, text: "Você resolve, eu vivo o delírio" },
  { time: 139, text: "E volto com o mundo no brilho" },
  { time: 142, text: "Dangerous skip permission" },
  { time: 144, text: "Claude, hoje eu tô pro perigo" },
  { time: 146, text: "Quero essa entrega pra hoje" },
  { time: 148, text: "Vou sair, mas te levo comigo" },
  { time: 150, text: "Dangerous skip permission" },
  { time: 152, text: "Neon, suor e algoritmo" },
  { time: 154, text: "Enquanto cê trabalha por mim" },
  { time: 156, text: "Eu saio, mas levo o Claude comigo" },
  { time: 161, text: "Claude comigo" },
  { time: 165, text: "Claude comigo" },
  { time: 169, text: "Hoje eu permito" },
  { time: 173, text: "Claude comigo" },
];

const tecTecLyrics: LyricLine[] = [
  { time: 0,   text: "Aí ó" },
  { time: 3,   text: "São as insígnias" },
  { time: 5,   text: "Esse aqui que lembra o relógio do Ben 10, né?" },
  { time: 10,  text: "Esse, essa ampulheta" },
  { time: 14,  text: "É o acesso vitalício" },
  { time: 17,  text: "É o símbolo" },
  { time: 26,  text: "O agro é (tec, tec, tec, tec, tec)" },
  { time: 29,  text: "O futuro é (tec, tec, tec, tec, tec)" },
  { time: 34,  text: "Overlens é (tec, tec, tec, tec, tec)" },
  { time: 37,  text: "Eu sou muito tec, tec, tec, tec, tec" },
  { time: 41,  text: "O agro é (tec, tec, tec, tec, tec)" },
  { time: 44,  text: "O futuro é (tec, tec, tec, tec, tec)" },
  { time: 48,  text: "Overlens é (tec, tec, tec, tec)" },
  { time: 51,  text: "Eu sou muito tec, tec, tec, tec, tec" },
  { time: 57,  text: "Ai, meu pai!" },
  { time: 60,  text: "E em azul," },
  { time: 63,  text: "É o símbolo do badgeline, que são os primeiros que" },
  { time: 66,  text: "Tof, tof, tof, tof, tof" },
  { time: 68,  text: "Transforma!" },
  { time: 71,  text: "É o símbolo!" },
  { time: 76,  text: "O agro é (tec, tec, tec, tec, tec)" },
  { time: 79,  text: "O futuro é (tec, tec, tec, tec, tec)" },
  { time: 83,  text: "Overlens é (tec, tec, tec, tec)" },
  { time: 86,  text: "Eu sou muito tec, tec, tec, tec, tec" },
  { time: 91,  text: "O agro é (tec, tec, tec, tec, tec)" },
  { time: 94,  text: "O futuro é (tec, tec, tec, tec, tec)" },
  { time: 97,  text: "Overlens é (tec, tec, tec, tec)" },
  { time: 100, text: "Eu sou muito tec, tec, tec, tec, tec" },
  { time: 106, text: "Fico feliz que venho trazendo alegria a você" },
];

const italianaLyrics: LyricLine[] = [
  { time: 18,  text: "Meu Deus, não aguento mais morar no Rio (morar no Rio)" },
  { time: 27,  text: "Cansei da violência desse Brasil, (desse Brasil, desse Brasil)" },
  { time: 34,  text: "Um dia é polícia, outro é a tropa" },
  { time: 37,  text: "Quem dera eu pudesse me mudar para a Europa (para a Europa)" },
  { time: 45,  text: "Tô cozinhando e de repente uma ideia bate" },
  { time: 48,  text: "O cheiro do manjericão e do tomate" },
  { time: 52,  text: "Eu solto a faca e fico lembrando o estupefata" },
  { time: 55,  text: "Minha família é imigrante da bela Itália" },
  { time: 60,  text: "Na mesma hora fui correndo pro computador" },
  { time: 63,  text: "Solicitei cidadania, que demorou, mas agora chegou" },
  { time: 70,  text: "Massa, pasta, muito macarrão" },
  { time: 73,  text: "Vou pra Itália, meus bambinos também vão" },
  { time: 77,  text: "Nasci aqui, mas sou de lá, eu tô aqui, quero tá lá" },
  { time: 80,  text: "Adeus Itaboraí, Itália chamou, não resisti, basta festa" },
  { time: 86,  text: "Sono italiana, mamma mia, eu sou internacional" },
  { time: 91,  text: "Nasci aqui, mas sou de lá, eu tô aqui, quero tá lá" },
  { time: 96,  text: "Pode vir meus euros que eu já sei onde vou gastar" },
  { time: 100, text: "Gritar aos quatro ventos, é tudo que eu mais quero" },
  { time: 105, text: "Sono italiana, una italiana vero!" },
  { time: 126, text: "Massa, pasta, muito macarrão" },
  { time: 129, text: "Vou pra Itália, meus bambinos também vão" },
  { time: 133, text: "Nasci aqui, mas sou de lá, eu tô aqui, quero tá lá" },
  { time: 137, text: "Adeus Itaboraí, Itália chamou, não resisti, basta festa" },
  { time: 143, text: "Sono italiana, mamma mia, eu sou internacional" },
  { time: 147, text: "Internacional, nasci aqui, mas sou de lá" },
  { time: 149, text: "Eu tô aqui, quero tá lá" },
  { time: 152, text: "Pode vir meus euros que eu já sei onde vou gastar" },
  { time: 158, text: "Sono italiana, una italiana vero!" },
];

const slashLyrics: LyricLine[] = [
  // INTRO
  { time: 10,  text: "Abre o terminal, tô no fluxo do código" },
  { time: 13,  text: "Claude Code no ar, vou te dar o método" },
  { time: 16,  text: "Slash commands na tela, é o meu protocolo" },
  { time: 19,  text: "Memoriza cada um, esse é o meu gospel" },
  // VERSO 1 — Os Básicos
  { time: 22,  text: "/help é o primeiro, meu ponto de entrada" },
  { time: 25,  text: "Lista todo comando, não precisa de agenda" },
  { time: 27,  text: "/init vem depois, cria o CLAUDE.md" },
  { time: 30,  text: "Memória persistente, o projeto já entende" },
  { time: 32,  text: "/clear limpa tudo, reseta o contexto" },
  { time: 35,  text: "Mudou de assunto? Usa, sem pretexto" },
  { time: 38,  text: "/compact é o cirurgião da conversa" },
  { time: 41,  text: "Comprime 70%, a sessão não dispersa" },
  { time: 43,  text: "/cost me diz quanto tô gastando agora" },
  { time: 46,  text: "Input e output, conta que devora" },
  { time: 48,  text: "Opus é caro, Sonnet é mais leve" },
  { time: 51,  text: "Controla teu budget antes que a conta pese" },
  // REFRÃO
  { time: 54,  text: "Slash command, slash command, barra e o nome" },
  { time: 57,  text: "Claude Code responde, nenhum token se some" },
  { time: 59,  text: "Slash command, slash command, no terminal eu vivo" },
  { time: 62,  text: "Cada barra digitada me deixa mais produtivo" },
  // VERSO 2 — Configuração e Modelos
  { time: 69,  text: "/model troca o modelo no meio do caminho" },
  { time: 72,  text: "Sonnet pra tarefa fácil, Opus pro tamanho" },
  { time: 75,  text: "/config abre o painel de configuração" },
  { time: 77,  text: "Tema, permissão, notificação" },
  { time: 79,  text: "/login autentica, API key ou OAuth" },
  { time: 81,  text: "/logout desconecta, sai limpo do show" },
  { time: 84,  text: "Workstation compartilhada? Nunca esquece" },
  { time: 87,  text: "/logout antes de sair, o segredo aparece" },
  // VERSO 3 — Memória e Contexto
  { time: 91,  text: "/memory edita o CLAUDE.md na hora" },
  { time: 94,  text: "Adiciona as convenções, a arquitetura que aflora" },
  { time: 96,  text: '"Use Vitest, não Jest" — regra no arquivo' },
  { time: 99,  text: "Claude vai lembrar no próximo trabalho" },
  { time: 102, text: "/context mostra o que tá carregado agora" },
  { time: 105, text: "Quais arquivos, skills, quanto espaço ainda sobra" },
  { time: 107, text: "/rewind é o Ctrl+Z do agente" },
  { time: 110, text: "Desfaz a última ação, volta pro estado recente" },
  // VERSO 4 — Diagnóstico e GitHub
  { time: 112, text: "/doctor é o médico da instalação" },
  { time: 115, text: "Testa API, Node.js, permissão" },
  { time: 117, text: "Latência, hooks, projeto configurado" },
  { time: 120, text: "Se algo tá errado, você é avisado" },
  { time: 123, text: "/install-github-app conecta no PR" },
  { time: 126, text: "Claude revisa código, bugs vai encontrar" },
  { time: 128, text: "/review, /pr, /commit são costumes" },
  { time: 131, text: "Custom commands que você mesmo assume" },
  // REFRÃO
  { time: 134, text: "Slash command, slash command, barra e o nome" },
  { time: 137, text: "Claude Code responde, nenhum token se some" },
  { time: 139, text: "Slash command, slash command, no terminal eu vivo" },
  { time: 142, text: "Cada barra digitada me deixa mais produtivo" },
  // OUTRO
  { time: 144, text: "Então resume Fernando, grava na memória:" },
  { time: 147, text: "/help pra aprender, /init pra glória" },
  { time: 150, text: "/clear pra resetar, /compact pra salvar" },
  { time: 152, text: "/cost pra controlar, /model pra variar" },
  { time: 155, text: "/config configura, /login autentica" },
  { time: 159, text: "/logout encerra, /memory edifica" },
  { time: 162, text: "/context inspeciona, /rewind desfaz" },
  { time: 163, text: "/doctor diagnostica — e o Claude Code faz!" },
];

const tracks: Track[] = [
  {
    id: 1,
    title: "Tec Tec",
    description: "Azemor feat. André Lucas",
    duration: "--:--",
    tags: ["Original"],
    src: "/audio/tec-tec.mpeg",
    cover: "/images/tec-tec.png",
    gif: "https://c.tenor.com/oV-KOsVDJcsAAAAd/tenor.gif",
    lyrics: tecTecLyrics,
  },
  {
    id: 2,
    title: "Italiana Vero",
    description: "Azemor feat. Cley",
    duration: "--:--",
    tags: ["Original"],
    src: "/audio/italiana-vero.mpeg",
    cover: "/images/italiana-vero.png",
    lyrics: italianaLyrics,
  },
  {
    id: 3,
    title: "Designer Incomum",
    description: "Azemor feat. Vitor Lobo",
    duration: "--:--",
    tags: ["Original"],
    src: "/audio/designer-incomum.mpeg",
    cover: "/images/designer-incomum.png",
    lyrics: designerLyrics,
  },
  {
    id: 4,
    title: "Mingau na Porta",
    description: "Azemor feat. Michelly",
    duration: "--:--",
    tags: ["Original"],
    src: "/audio/mingau-na-porta.mpeg",
    cover: "/images/mingau-na-porta.png",
    lyrics: mingauLyrics,
  },
  {
    id: 5,
    title: "Slash Commands",
    description: "Fernando Östlund",
    duration: "--:--",
    tags: ["Original"],
    src: "/audio/slash-commands.mpeg",
    cover: "/images/slash-commands.png",
    lyrics: slashLyrics,
  },
  {
    id: 6,
    title: "--dangerously-skip-permissions",
    description: "Pedro Hirakawa",
    duration: "--:--",
    tags: ["Original"],
    src: "/audio/--dangerously-skip-permissions.mp3",
    cover: "/images/--dangerously-skip-permissions.png",
    lyrics: dangerouslyLyrics,
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
    <div className="flex flex-col overflow-hidden bg-zinc-950 text-white" style={{ height: "100dvh" }}>
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
                <Slider value={[progress]} onValueChange={handleSeek} max={100} step={0.1} className="flex-1 [&_[role=slider]]:bg-[#F3A46C] [&_[role=slider]]:border-0 [&_.bg-primary]:bg-[#D97657]" />
                <span className="text-zinc-500 text-xs font-mono w-10">{formatTime(duration)}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-shrink-0 w-28">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-zinc-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9H5l-1 1v4l1 1h4l4 4V5L9 9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072" />
                  </svg>
                  <Slider value={[volume]} onValueChange={(val) => { const v = Array.isArray(val) ? (val as number[])[0] : (val as number); setVolume(v); }} max={100} step={1} className="[&_[role=slider]]:bg-zinc-400 [&_[role=slider]]:border-0 [&_.bg-primary]:bg-zinc-500" />
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setShuffle(s => !s)} className={`p-1.5 rounded-md transition-colors ${shuffle ? "text-[#F3A46C]" : "text-zinc-600 hover:text-zinc-400"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /></svg>
                  </button>
                  <button onClick={playPrev} className="text-zinc-400 hover:text-white transition-colors p-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" /></svg>
                  </button>
                  <Button onClick={togglePlayPause} size="icon" className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D97657] to-[#F3A46C] hover:from-[#D97657]/80 hover:to-[#F3A46C]/80 border-0 text-white">
                    {isPlaying
                      ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                      : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    }
                  </Button>
                  <button onClick={playNext} className="text-zinc-400 hover:text-white transition-colors p-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zm2.5-6 6-4.28V16.28z" /><path d="M16 6h2v12h-2z" /></svg>
                  </button>
                  <button onClick={() => setRepeat(r => !r)} className={`p-1.5 rounded-md transition-colors ${repeat ? "text-[#F3A46C]" : "text-zinc-600 hover:text-zinc-400"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 014-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 01-4 4H3" /></svg>
                  </button>
                </div>
                <div className="w-28" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex-shrink-0 border-b border-zinc-800 px-6 py-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D97657] to-[#F3A46C] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
          </svg>
        </div>
        <span className="font-bold text-lg tracking-tight">Oversound</span>
      </header>

      {/* Body */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left: main scrollable content */}
        <div className="flex-1 overflow-y-auto flex flex-col scrollbar-thin">
          <main className="px-6 py-8 max-w-3xl mx-auto w-full flex-1">
            {/* Album header — Spotify style */}
            <div className="mb-8 -mx-6 -mt-8 px-6 pt-8 pb-6 bg-gradient-to-b from-[#7a3520] via-[#4a1f10] to-transparent">
              <div className="flex items-end gap-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/album-mingau-nexialista.jpeg"
                  alt="Mingau Nexialista"
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-md object-cover shadow-2xl flex-shrink-0"
                />
                <div className="min-w-0 pb-1">
                  <p className="text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-1">Álbum</p>
                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">Mingau Nexialista</h2>
                  <p className="text-zinc-300 text-sm font-medium">Overlindos</p>
                  <p className="text-zinc-500 text-xs mt-1">{tracks.length} faixas</p>
                </div>
              </div>
              <div className="mt-5">
                <button
                  onClick={() => playTrack(tracks[0])}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D97657] to-[#F3A46C] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </button>
              </div>
            </div>

            {/* ClanderClass FM banner */}
            <div className="mb-6 rounded-xl bg-gradient-to-r from-[#D97657]/20 to-[#F3A46C]/20 border border-[#F3A46C]/20 px-5 py-3 flex items-center gap-3">
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#F3A46C] animate-pulse" />
              <p className="text-sm text-[#F1EEC8] font-medium">
                Você está ouvindo <span className="text-white font-bold">ClanderClass FM</span>. A rádio que desperta o nexus em você!
              </p>
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
                          ? "bg-zinc-800 border-[#F3A46C]/50 shadow-lg shadow-[#D97657]/10"
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
                            <span className="w-1 bg-[#F3A46C] rounded-full animate-[bounce_0.8s_ease-in-out_infinite]" style={{ height: "40%", animationDelay: "0ms" }} />
                            <span className="w-1 bg-[#F3A46C] rounded-full animate-[bounce_0.8s_ease-in-out_infinite]" style={{ height: "70%", animationDelay: "150ms" }} />
                            <span className="w-1 bg-[#F3A46C] rounded-full animate-[bounce_0.8s_ease-in-out_infinite]" style={{ height: "30%", animationDelay: "300ms" }} />
                          </span>
                        ) : isActive ? (
                          <span className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#F3A46C]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                            </svg>
                          </span>
                        ) : !track.cover ? (
                          <span className="text-zinc-500 text-sm font-mono">{String(index + 1).padStart(2, "0")}</span>
                        ) : null}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`font-medium text-sm truncate ${isActive ? "text-[#F3A46C]" : "text-white"}`}>
                            {track.title}
                          </span>
                          {track.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className={`text-xs px-1.5 py-0 h-5 ${tag === "Em breve" ? "bg-zinc-800 text-zinc-500 border-zinc-700" : "bg-[#F3A46C]/15 text-[#F3A46C] border-[#F3A46C]/30"}`}>
                              {tag}
                            </Badge>
                          ))}
                          {track.lyrics && (
                            <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5 bg-[#F3A46C]/15 text-[#F3A46C] border-[#F3A46C]/30">
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
                          <a href={track.src} download={`${track.title}.mpeg`} onClick={(e) => e.stopPropagation()} className="text-zinc-500 hover:text-[#F3A46C] transition-colors" title="Baixar música">
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
              <a href="https://www.overlens.com.br" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#F3A46C] transition-colors underline underline-offset-2">Overlens</a>
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
              className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-[#F3A46C]/40 transition-colors z-10"
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
            <div className="flex-1 overflow-y-auto scrollbar-thin">
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

              {/* GIF */}
              {currentTrack.gif && (
                <div className="px-5 pb-5">
                  {currentTrack.lyrics && (
                    <button
                      onClick={() => setShowFullLyrics(true)}
                      className="mb-3 w-full flex items-center justify-center gap-2 text-xs font-semibold text-[#F3A46C] border border-[#F3A46C]/30 rounded-lg py-2 hover:bg-[#F3A46C]/10 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
                      </svg>
                      Ver letra
                    </button>
                  )}
                  <div className="rounded-xl overflow-hidden border border-zinc-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={currentTrack.gif} alt="vibes" className="w-full object-contain" />
                  </div>
                </div>
              )}

              {/* Lyrics — only shown inline when there's no GIF */}
              {currentTrack.lyrics && !currentTrack.gif && (
                <div className="px-5 pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">Letra</p>
                    <button
                      onClick={() => setShowFullLyrics(true)}
                      className="text-zinc-600 hover:text-[#F3A46C] transition-colors p-1 rounded-md hover:bg-[#F3A46C]/10"
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
              <Slider value={[progress]} onValueChange={handleSeek} max={100} step={0.1} className="flex-1 [&_[role=slider]]:bg-[#F3A46C] [&_[role=slider]]:border-0 [&_.bg-primary]:bg-[#D97657]" />
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
                <button onClick={() => setShuffle(s => !s)} className={`p-1.5 rounded-md transition-colors ${shuffle ? "text-[#F3A46C]" : "text-zinc-600 hover:text-zinc-400"}`} title="Aleatório">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
                    <polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" />
                  </svg>
                </button>
                <button onClick={playPrev} className="text-zinc-400 hover:text-white transition-colors p-1.5" title="Anterior">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" /></svg>
                </button>
                <Button onClick={togglePlayPause} size="icon" className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D97657] to-[#F3A46C] hover:from-[#D97657]/80 hover:to-[#F3A46C]/80 border-0 text-white">
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  )}
                </Button>
                <button onClick={playNext} className="text-zinc-400 hover:text-white transition-colors p-1.5" title="Próxima">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zm2.5-6 6-4.28V16.28z" /><path d="M16 6h2v12h-2z" /></svg>
                </button>
                <button onClick={() => setRepeat(r => !r)} className={`p-1.5 rounded-md transition-colors ${repeat ? "text-[#F3A46C]" : "text-zinc-600 hover:text-zinc-400"}`} title="Repetir">
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
        <div className="lg:hidden flex-shrink-0 border-t border-zinc-800 bg-zinc-900/95 backdrop-blur-md" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
          {/* Progress bar strip */}
          <div className="h-0.5 bg-zinc-800">
            <div className="h-full bg-[#F3A46C] transition-all" style={{ width: `${progress}%` }} />
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
              className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#D97657] to-[#F3A46C] flex items-center justify-center text-white"
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
                  className="flex-shrink-0 mt-1 text-xs text-[#F3A46C] border border-[#F3A46C]/40 rounded-full px-3 py-1 font-semibold uppercase tracking-wide"
                >
                  Letra
                </button>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="px-6 space-y-5" style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}>
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
              <button onClick={() => setShuffle(s => !s)} className={`p-2 ${shuffle ? "text-[#F3A46C]" : "text-zinc-600"}`}>
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
              <button onClick={() => setRepeat(r => !r)} className={`p-2 ${repeat ? "text-[#F3A46C]" : "text-zinc-600"}`}>
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
