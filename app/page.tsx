'use client';

import React from 'react';
import Link from 'next/link';
import ScreenShell from './components/ScreenShell';

export default function Home() {
  return (
    <ScreenShell
      eyebrow="Página inicial do sistema"
      title="Sistema de Gerenciamento de Alunos"
      maxWidth="max-w-md"
    >
      <div className="flex flex-col gap-4">
        <Link
          href="/alunos/cadastro"
          className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-400 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-purple-900/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-400/40"
        >
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          Cadastrar Aluno
        </Link>

        <Link
          href="/alunos/consulta"
          className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-900/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/40"
        >
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          Consultar Aluno
        </Link>
      </div>
    </ScreenShell>
  );
}