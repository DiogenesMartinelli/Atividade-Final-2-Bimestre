import { NextResponse } from "next/server";
import { isJsonObject } from "@/lib/alunos-api";
import { pocketbaseServer } from "@/lib/pocketbase-server";

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
    try {
        const { id } = await params;
        const aluno = await pocketbaseServer.collection("tb_aluno").getOne(id);
        return NextResponse.json(aluno);
    } catch (error) {
        console.error("Erro ao buscar aluno no PocketBase:", error);
        const message = error instanceof Error ? error.message : "Erro desconhecido.";
        return NextResponse.json({ error: message }, { status: 502 });
    }
}

export async function PATCH(request: Request, { params }: RouteContext) {
    try {
        const { id } = await params;
        const dados: unknown = await request.json();
        if (!isJsonObject(dados)) {
            return NextResponse.json({ error: "Dados do aluno inválidos." }, { status: 400 });
        }
        const aluno = await pocketbaseServer.collection("tb_aluno").update(id, dados);
        return NextResponse.json(aluno);
    } catch (error) {
        console.error("Erro ao atualizar aluno no PocketBase:", error);
        const message = error instanceof Error ? error.message : "Erro desconhecido.";
        return NextResponse.json({ error: message }, { status: 502 });
    }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
    try {
        const { id } = await params;
        await pocketbaseServer.collection("tb_aluno").delete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Erro ao excluir aluno no PocketBase:", error);
        const message = error instanceof Error ? error.message : "Erro desconhecido.";
        return NextResponse.json({ error: message }, { status: 502 });
    }
}
