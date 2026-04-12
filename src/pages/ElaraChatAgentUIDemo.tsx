import { useMemo, useState } from 'react';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const initialAssistantMessage: ChatMessage = {
  id: 'm0',
  role: 'assistant',
  content:
    'Hi, I’m Elara. Ask a question, or pick a prompt on the left to explore insights.',
};

export default function ElaraChatAgentUIDemo() {
  const promptTemplates = useMemo(
    () => [
      {
        id: 'p1',
        title: 'Which team is ready for AI',
        subtitle: 'Readiness signals, blockers, and quick wins',
        prompt:
          'Which team is ready for AI, and what evidence supports that conclusion?',
      },
      {
        id: 'p2',
        title: 'Where are we underusing people',
        subtitle: 'Role-to-strength mismatch and redeployment ideas',
        prompt:
          'Where are we underusing people, and which roles/teams show the largest mismatch?',
      },
      {
        id: 'p3',
        title: 'What hidden talent do we have',
        subtitle: 'Surface overlooked strengths across the organisation',
        prompt:
          'What hidden talent do we have, and where is it most likely to be found?',
      },
    ],
    []
  );

  const [messages, setMessages] = useState<ChatMessage[]>([
    initialAssistantMessage,
  ]);
  const [draft, setDraft] = useState('');

  const send = (content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: trimmed,
    };

    const assistantMessage: ChatMessage = {
      id: `a_${Date.now()}`,
      role: 'assistant',
      content:
        'This is a UI design preview. When connected to the backend, I’ll generate a real response here and optionally attach a report popup with visuals.',
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setDraft('');
  };

  return (
    <main className="min-h-screen bg-background-dark text-white">
      <div className="mx-auto w-full max-w-[1400px] px-4 pt-36 pb-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Elara AI Agent (UI Demo)
            </h1>
            <p className="mt-2 text-sm md:text-base text-white/70 max-w-2xl">
              Chat-first experience with prompt shortcuts, expandable citations,
              and report popups.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <a
              href="/ui/report-popups"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10 transition"
            >
              View Report Popups
            </a>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
          <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white/90">
                  AI Engine Prompts
                </h2>
                <span className="text-xs text-white/50">Templates</span>
              </div>
            </div>

            <div className="p-3 space-y-3">
              {promptTemplates.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => send(p.prompt)}
                  className="group w-full text-left rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 px-4 py-3 hover:border-white/20 hover:bg-white/10 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {p.title}
                      </div>
                      <div className="mt-1 text-xs text-white/60">
                        {p.subtitle}
                      </div>
                    </div>
                    <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-blue text-white shadow-sm shadow-primary-blue-end/30 opacity-90 group-hover:opacity-100 transition">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-[18px] w-[18px]"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 12h12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </button>
              ))}

              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs font-semibold text-white/70">
                  Suggested next actions
                </div>
                <div className="mt-3 grid gap-2">
                  <button
                    type="button"
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10 transition"
                  >
                    Attach a report to the last answer
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10 transition"
                  >
                    Compare two teams
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-blue flex items-center justify-center shadow-sm shadow-primary-blue-end/30">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 18h6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 22h4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M7 11a5 5 0 0110 0v3a3 3 0 01-3 3H10a3 3 0 01-3-3v-3z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 6V4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M5 12H4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M20 12h-1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 12h.01"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M14 12h.01"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold">Elara Agent</div>
                  <div className="text-xs text-white/60">Insight Engine</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMessages([initialAssistantMessage])}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10 transition"
                >
                  Clear
                </button>
                <a
                  href="/ui/report-popups"
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10 transition md:hidden"
                >
                  Popups
                </a>
              </div>
            </div>

            <div className="h-[520px] overflow-y-auto p-4 space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed border backdrop-blur-md ${
                      m.role === 'user'
                        ? 'bg-gradient-blue border-white/10 text-white'
                        : 'bg-black/40 border-white/10 text-white/90'
                    }`}
                  >
                    {m.content}

                    {m.role === 'assistant' && (
                      <div className="mt-3 grid gap-2">
                        <button
                          type="button"
                          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10 transition text-left"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-medium">
                              Open report popup
                            </span>
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              className="h-[18px] w-[18px]"
                              aria-hidden="true"
                            >
                              <path
                                d="M14 4h6v6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M10 14L20 4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M20 14v5a1 1 0 01-1 1H6a2 2 0 01-2-2V5a1 1 0 011-1h5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div className="mt-1 text-[11px] text-white/60">
                            Preview the visuals + report actions
                          </div>
                        </button>

                        <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-2">
                          <div className="text-[11px] text-white/60">
                            Sources (preview)
                          </div>
                          <div className="mt-1 text-[11px] text-white/80">
                            1) Workforce survey (Q2)
                            <br />
                            2) Role allocation snapshot
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <label className="sr-only" htmlFor="chatDraft">
                    Message
                  </label>
                  <textarea
                    id="chatDraft"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Ask Elara…"
                    rows={2}
                    className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary-blue-accent/40"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => send(draft)}
                  className="rounded-2xl bg-gradient-blue px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-primary-blue-end/30 hover:opacity-95 transition"
                >
                  Send
                </button>
              </div>

              <div className="mt-3 text-[11px] text-white/50">
                This page is UI-only. Backend integration can be wired to your
                API later.
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
