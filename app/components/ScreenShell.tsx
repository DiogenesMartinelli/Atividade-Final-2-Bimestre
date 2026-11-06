import Link from "next/link";
import type { ReactNode } from "react";

type ScreenShellProps = {
    children: ReactNode;
    title: string;
    eyebrow: string;
    backHref?: string;
    backLabel?: string;
    maxWidth?: string;
};

const icons = ["🎓", "📚", "🎒", "✏️", "🧑‍🎓", "👩‍🎓", "👨‍🎓", "💡"];

export default function ScreenShell({
    children,
    title,
    eyebrow,
    backHref,
    backLabel = "Voltar",
    maxWidth = "max-w-3xl",
}: ScreenShellProps) {
    return (
        <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0b0c1b] px-4 py-10 font-sans">
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <div className="absolute -left-12 -top-12 h-96 w-96 rounded-full bg-purple-600/50 blur-[100px] animate-pulse" />
                <div className="absolute -bottom-24 -right-24 h-[500px] w-[500px] rounded-full bg-cyan-400/40 blur-[120px] animate-pulse [animation-delay:1s]" />
                <div className="absolute left-2/3 top-1/2 h-72 w-72 rounded-full bg-pink-500/40 blur-[90px] animate-pulse [animation-delay:500ms]" />
            </div>

            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                {icons.map((icon, index) => (
                    <div
                        key={icon}
                        className="absolute animate-bounce text-3xl opacity-25"
                        style={{
                            left: `${(index * 12 + 5) % 90}%`,
                            top: `${(index * 15 + 10) % 80}%`,
                            animationDuration: `${3 + (index % 4)}s`,
                            animationDelay: `${index * 0.5}s`,
                        }}
                    >
                        {icon}
                    </div>
                ))}
            </div>

            <section className={`relative z-10 mx-4 w-full ${maxWidth} rounded-3xl border border-white/15 bg-white/5 p-6 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_12px_40px_0_rgba(0,223,216,0.2)] sm:p-10`}>
                {backHref && (
                    <Link
                        href={backHref}
                        className="mb-6 inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
                    >
                        <svg aria-hidden="true" className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                        </svg>
                        {backLabel}
                    </Link>
                )}
                <header className="mb-8">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                        {eyebrow}
                    </p>
                    <h1 className="text-2xl font-bold leading-snug text-white sm:text-3xl">
                        {title}
                    </h1>
                </header>
                {children}
            </section>
        </main>
    );
}
