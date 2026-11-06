"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteAluno, getAlunos, type Aluno } from "@/lib/alunos-api";
import ScreenShell from "../../components/ScreenShell";

export default function ConsultarAluno() {
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [busca, setBusca] = useState("");
    const [excluir, setExcluir] = useState<Aluno | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function carregarAlunos() {
            try {
                const registros = await getAlunos();
                setAlunos(registros);
                setErro("");
            } catch (error) {
                const detalhe = error instanceof Error ? error.message : "Erro desconhecido.";
                setErro(`Não foi possível carregar os alunos. ${detalhe}`);
            } finally {
                setCarregando(false);
            }
        }

        void carregarAlunos();
    }, []);

    const filtrados = alunos.filter((a) =>
        a.nome?.toLowerCase().includes(busca.toLowerCase())
    );

    async function confirmarExclusao() {
        if (!excluir) return;
        await deleteAluno(excluir.id);
        setAlunos((lista) => lista.filter((a) => a.id !== excluir.id));
        setExcluir(null);
    }

    return (
        <ScreenShell
            eyebrow="Alunos"
            title="Consultar alunos"
            backHref="/"
            maxWidth="max-w-6xl"
        >
            <div>
                <input
                    type="text"
                    placeholder="Buscar aluno por nome"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="mb-4 w-full rounded-lg border border-white/15 bg-white/10 p-3 text-white placeholder:text-white/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                />
                {erro && (
                    <p role="alert" className="mb-4 rounded-lg border border-rose-400/40 bg-rose-500/15 p-3 text-sm text-rose-100">
                        {erro}
                    </p>
                )}
                <div className="overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full min-w-[640px] bg-[#111429]/80 text-left text-sm text-white">
                        <thead className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                            <tr>
                                <th className="p-2 text-left">Nome</th>
                                <th className="p-2 text-left">Idade</th>
                                <th className="p-2 text-left">E-mail</th>
                                <th className="p-2 text-left">Telefone</th>
                                <th className="p-2 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carregando && (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center text-white/60">
                                        Carregando alunos...
                                    </td>
                                </tr>
                            )}
                            {filtrados.map((a) => (
                                <tr key={a.id} className="border-t border-white/10">
                                    <td className="p-2">{a.nome}</td>
                                    <td className="p-2">{a.idade}</td>
                                    <td className="p-2">{a.email}</td>
                                    <td className="p-2">{a.telefone}</td>
                                    <td className="p-2 text-center">
                                        <Link
                                            href={`/alunos/alterar/${a.id}`}
                                            className="mr-2 inline-block rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1 text-white transition hover:brightness-110"
                                        >
                                            Alterar
                                        </Link>
                                        <button
                                            onClick={() => setExcluir(a)}
                                            className="rounded-lg bg-gradient-to-r from-rose-600 to-red-500 px-3 py-1 text-white transition hover:brightness-110"
                                        >
                                            Deletar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {!carregando && !erro && filtrados.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center text-white/60">
                                        Nenhum aluno encontrado
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {excluir && (
                <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-[#111429] p-6 text-white shadow-2xl">
                        <p className="mb-4">
                            Deseja realmente deletar o aluno <strong>{excluir.nome}</strong>?
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setExcluir(null)}
                                className="rounded-lg bg-white/10 px-3 py-2 text-white transition hover:bg-white/20"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmarExclusao}
                                className="rounded-lg bg-gradient-to-r from-rose-600 to-red-500 px-3 py-2 text-white transition hover:brightness-110"
                            >
                                Sim, deletar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ScreenShell>
    )
}
