export type Aluno = {
    id: string;
    nome: string;
    idade: string | number;
    email: string;
    telefone: string;
};

export function isJsonObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, {
        ...init,
        headers: {
            ...init?.headers,
            ...(init?.body ? { "Content-Type": "application/json" } : {}),
        },
    });

    if (!response.ok) {
        const detail = await response.text();
        throw new Error(detail || `Erro na solicitação (${response.status}).`);
    }

    return response.json() as Promise<T>;
}

export function getAlunos() {
    return request<Aluno[]>("/api/alunos");
}

export function createAluno(aluno: Omit<Aluno, "id">) {
    return request<Aluno>("/api/alunos", {
        method: "POST",
        body: JSON.stringify(aluno),
    });
}

export function getAluno(id: string) {
    return request<Aluno>(`/api/alunos/${encodeURIComponent(id)}`);
}

export function updateAluno(id: string, aluno: Omit<Aluno, "id">) {
    return request<Aluno>(`/api/alunos/${encodeURIComponent(id)}`, {
        method: "PATCH",
        body: JSON.stringify(aluno),
    });
}

export function deleteAluno(id: string) {
    return request<{ success: boolean }>(`/api/alunos/${encodeURIComponent(id)}`, {
        method: "DELETE",
    });
}
