"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAluno, updateAluno, type Aluno } from "@/lib/alunos-api";
import ScreenShell from "../../../components/ScreenShell";

export default function AlterarAluno() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [aluno, setAluno] = useState<Aluno | null>(null);

    useEffect(() => {
        getAluno(id)
            .then(setAluno);
    }, [id]);

    async function salvar(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const dados = new FormData(e.currentTarget);
        await updateAluno(id, {
            nome: String(dados.get("nome") ?? ""),
            idade: String(dados.get("idade") ?? ""),
            email: String(dados.get("email") ?? ""),
            telefone: String(dados.get("telefone") ?? ""),
        });
        alert("Aluno Alterado");
        router.push("/alunos/consulta");
    }

    const campo = "w-full rounded-lg border border-white/15 bg-white/10 p-3 text-white placeholder:text-white/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30";

    return (
        <ScreenShell
            eyebrow="Alunos"
            title="Alterar aluno"
            backHref="/alunos/consulta"
            maxWidth="max-w-xl"
        >
            {aluno && (
                <form onSubmit={salvar} className="space-y-4">
                    <input type="text" name="nome" defaultValue={aluno.nome} placeholder="Nome do aluno" className={campo} aria-label="Nome do aluno" />
                    <input type="text" name="idade" defaultValue={aluno.idade} placeholder="Idade do aluno" className={campo} aria-label="Idade do aluno" />
                    <input type="text" name="email" defaultValue={aluno.email} placeholder="E-mail do aluno" className={campo} aria-label="E-mail do aluno" />
                    <input type="text" name="telefone" defaultValue={aluno.telefone} placeholder="Telefone do aluno" className={campo} aria-label="Telefone do aluno" />
                    <div className="flex flex-wrap gap-3 pt-2">
                        <button
                            type="submit"
                            className="rounded-xl bg-gradient-to-r from-purple-600 to-cyan-400 px-5 py-3 font-semibold text-white shadow-lg shadow-purple-900/30 transition hover:scale-[1.01] hover:shadow-cyan-400/40"
                        >
                            Salvar
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push("/alunos/consulta")}
                            className="rounded-xl border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}
        </ScreenShell>
    )
}
