import { NextResponse } from "next/server";
import { isJsonObject } from "@/lib/alunos-api";
import { pocketbaseServer } from "@/lib/pocketbase-server";

export async function GET() {
    try {
        const alunos = await pocketbaseServer
            .collection("tb_aluno")
            .getFullList({ sort: "nome", requestKey: null });
        return NextResponse.json(alunos);
    } catch (error) {
        console.error("Erro ao carregar alunos do PocketBase:", error);
        const message = error instanceof Error ? error.message : "Erro desconhecido.";
        return NextResponse.json({ error: message }, { status: 502 });
    }
}

export async function POST(request: Request) {
    try {
        const dados: unknown = await request.json();
        if (!isJsonObject(dados)) {
            return NextResponse.json({ error: "Dados do aluno inválidos." }, { status: 400 });
        }
        const aluno = await pocketbaseServer.collection("tb_aluno").create(dados);
        return NextResponse.json(aluno, { status: 201 });
    } catch (error) {
        console.error("Erro ao cadastrar aluno no PocketBase:", error);
        const message = error instanceof Error ? error.message : "Erro desconhecido.";
        return NextResponse.json({ error: message }, { status: 502 });
    }
}
