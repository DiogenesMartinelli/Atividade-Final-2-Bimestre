"use client";

import { useState } from "react";
import { createAluno } from "@/lib/alunos-api";
import ScreenShell from "../../components/ScreenShell";

export default function CadastroAluno() {
    const [erro, setErro] = useState("");
    const [salvando, setSalvando] = useState(false);

    async function salvar(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const dados = new FormData(form);
        setErro("");
        setSalvando(true);

        try {
            await createAluno({
                nome: String(dados.get("nome") ?? ""),
                idade: String(dados.get("idade") ?? ""),
                email: String(dados.get("email") ?? ""),
                telefone: String(dados.get("telefone") ?? ""),
            });
            alert("Aluno cadastrado com sucesso.");
            form.reset();
        } catch (error) {
            const detalhe = error instanceof Error ? error.message : "Erro desconhecido.";
            setErro(`Não foi possível cadastrar o aluno. ${detalhe}`);
        } finally {
            setSalvando(false);
        }
    }

    return (
        <ScreenShell
            eyebrow="Alunos"
            title="Cadastrar aluno"
            backHref="/"
            maxWidth="max-w-xl"
        >
            {erro && (
                <p role="alert" className="mb-4 rounded-lg border border-rose-400/40 bg-rose-500/15 p-3 text-sm text-rose-100">
                    {erro}
                </p>
            )}
            <form onSubmit={salvar} className="space-y-4">
                <label className="block text-sm font-medium text-white" htmlFor="nome">
                    Nome do aluno
                </label>
                <input
                    id="nome"
                    type="text"
                    name="nome"
                    placeholder="Nome do aluno"
                    className="w-full rounded-lg border border-white/15 bg-white/10 p-3 text-white placeholder:text-white/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                />
                <input
                    aria-label="Idade do aluno"
                    type="text"
                    name="idade"
                    placeholder="Idade do aluno"
                    className="w-full rounded-lg border border-white/15 bg-white/10 p-3 text-white placeholder:text-white/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                />
                <input
                    aria-label="E-mail do aluno"
                    type="text"
                    name="email"
                    placeholder="E-mail do aluno"
                    className="w-full rounded-lg border border-white/15 bg-white/10 p-3 text-white placeholder:text-white/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                />
                <input
                    aria-label="Telefone do aluno"
                    type="text"
                    name="telefone"
                    placeholder="Telefone do aluno"
                    className="w-full rounded-lg border border-white/15 bg-white/10 p-3 text-white placeholder:text-white/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                />
                <button
                    type="submit"
                    disabled={salvando}
                    className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-cyan-400 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-900/30 transition-all hover:scale-[1.01] hover:shadow-cyan-400/40 sm:w-auto"
                >
                    {salvando ? "Cadastrando..." : "Cadastrar"}
                </button>
            </form>
        </ScreenShell>
    )
}