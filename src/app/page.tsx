"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import MusicHub from "@/components/MusicHub";

export default function Home() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_SITE_PASSWORD) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  }

  if (unlocked) {
    return <MusicHub />;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#D97657]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#F3A46C]/20 rounded-full blur-3xl" />
      </div>

      <div className="absolute bottom-5 left-0 right-0 px-6 text-center z-10">
        <p className="text-zinc-600 text-xs leading-relaxed max-w-sm mx-auto">
          Este hub e suas músicas foram criados por alunos da{" "}
          <a href="https://www.overlens.com.br" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#F3A46C] transition-colors underline underline-offset-2">
            Overlens
          </a>
          {" "}de forma independente, sem qualquer vínculo com a empresa. A Overlens não possui responsabilidade sobre o conteúdo aqui publicado.
        </p>
      </div>

      <Card className="w-full max-w-sm mx-4 bg-zinc-900/80 border-zinc-800 backdrop-blur-sm relative z-10">
        <CardHeader className="pb-2 pt-8 text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D97657] to-[#F3A46C] flex items-center justify-center shadow-lg shadow-[#D97657]/25">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Oversound</h1>
            <p className="text-zinc-400 text-sm mt-1">Digite a senha para acessar o hub</p>
          </div>
        </CardHeader>

        <CardContent className="pb-8 px-6">
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={`bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-[#F3A46C] h-11 ${
                  error ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
                autoFocus
              />
              {error && (
                <p className="text-red-400 text-xs">Senha incorreta. Tente novamente.</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-[#D97657] to-[#F3A46C] hover:from-[#D97657]/80 hover:to-[#F3A46C]/80 text-white font-medium border-0"
            >
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
