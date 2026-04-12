import { useMemo, useState, type ReactNode } from 'react';

type TabKey = 'summary' | 'visuals' | 'builder';

type VisualCard = {
  id: string;
  title: string;
  subtitle: string;
};

function Button({
  children,
  variant = 'secondary',
  onClick,
}: {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        variant === 'primary'
          ? 'rounded-full bg-gradient-blue px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-primary-blue-end/30 hover:opacity-95 transition'
          : 'rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 transition'
      }
    >
      {children}
    </button>
  );
}

function MiniBarChart({ values }: { values: number[] }) {
  const max = Math.max(1, ...values);
  return (
    <div className="flex items-end gap-2 h-28">
      {values.map((v, idx) => (
        <div
          key={idx}
          className="flex-1 rounded-lg border border-white/10 bg-black/30 overflow-hidden"
        >
          <div
            className="w-full rounded-lg bg-gradient-blue"
            style={{ height: `${Math.round((v / max) * 100)}%` }}
          />
        </div>
      ))}
    </div>
  );
}

export default function ReportPopupsUIDemo() {
  const visuals = useMemo<VisualCard[]>(
    () => [
      {
        id: 'v1',
        title: 'AI Readiness by Team',
        subtitle: 'Confidence + adoption signals (preview)',
      },
      {
        id: 'v2',
        title: 'Underuse Risk Heat',
        subtitle: 'Mismatch between role and strengths (preview)',
      },
      {
        id: 'v3',
        title: 'Hidden Talent Signals',
        subtitle: 'Clusters of overlooked capability (preview)',
      },
    ],
    []
  );

  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState<TabKey>('summary');

  return (
    <main className="min-h-screen bg-background-dark text-white">
      <div className="mx-auto w-full max-w-[1200px] px-4 pt-36 pb-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Report Popups (UI Demo)
            </h1>
            <p className="mt-2 text-sm md:text-base text-white/70 max-w-2xl">
              Modal design for reports and data visuals, matching your current
              dark + blue gradient branding.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/ui/chat-agent"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10 transition"
            >
              View Chat Agent
            </a>
            <Button variant="primary" onClick={() => setOpen(true)}>
              Open Popup
            </Button>
          </div>
        </div>

        <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5">
          <div className="text-sm text-white/70">This page demonstrates:</div>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="text-sm font-semibold">Report Summary</div>
              <div className="mt-1 text-xs text-white/60">
                Executive bullets + highlights
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="text-sm font-semibold">Data Visuals</div>
              <div className="mt-1 text-xs text-white/60">
                Cards + charts + filters
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="text-sm font-semibold">Customer Builder</div>
              <div className="mt-1 text-xs text-white/60">
                Choose sections to include
              </div>
            </div>
          </div>
        </section>
      </div>

      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="relative w-full max-w-[980px] rounded-3xl border border-white/10 bg-[#0b0b13] shadow-2xl shadow-black/50 overflow-hidden">
            <div className="absolute inset-0 opacity-60 pointer-events-none">
              <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-primary-blue-start/30 to-primary-blue-end/30 blur-3xl" />
              <div className="absolute -bottom-28 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/25 to-accent-blue/20 blur-3xl" />
            </div>

            <div className="relative border-b border-white/10 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-gradient-blue flex items-center justify-center shadow-sm shadow-primary-blue-end/30">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 19V5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M20 19H4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 17v-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 17V8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16 17v-3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold">Elara Report</div>
                  <div className="text-xs text-white/60">
                    Readiness • Underuse • Hidden talent
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10 transition"
              >
                Close
              </button>
            </div>

            <div className="relative px-5 py-4">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setTab('summary')}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition border ${
                    tab === 'summary'
                      ? 'bg-white/10 border-white/20 text-white'
                      : 'bg-transparent border-white/10 text-white/70 hover:bg-white/5'
                  }`}
                >
                  Summary
                </button>
                <button
                  type="button"
                  onClick={() => setTab('visuals')}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition border ${
                    tab === 'visuals'
                      ? 'bg-white/10 border-white/20 text-white'
                      : 'bg-transparent border-white/10 text-white/70 hover:bg-white/5'
                  }`}
                >
                  Data visuals
                </button>
                <button
                  type="button"
                  onClick={() => setTab('builder')}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition border ${
                    tab === 'builder'
                      ? 'bg-white/10 border-white/20 text-white'
                      : 'bg-transparent border-white/10 text-white/70 hover:bg-white/5'
                  }`}
                >
                  Customer builder
                </button>
              </div>

              {tab === 'summary' && (
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-white/60">Top insight</div>
                    <div className="mt-1 text-sm font-semibold">
                      One team shows high readiness but low adoption capacity.
                    </div>
                    <div className="mt-3 text-xs text-white/70 leading-relaxed">
                      Suggest redeploying underused strengths into enablement
                      roles to prevent bottlenecks.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-white/60">Risk area</div>
                    <div className="mt-1 text-sm font-semibold">
                      Underuse risk concentrated in operational support.
                    </div>
                    <div className="mt-3 text-xs text-white/70 leading-relaxed">
                      Misalignment patterns suggest hidden analytical
                      capability.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-white/60">Opportunity</div>
                    <div className="mt-1 text-sm font-semibold">
                      Multiple micro-clusters of digital confidence.
                    </div>
                    <div className="mt-3 text-xs text-white/70 leading-relaxed">
                      Run a pilot with targeted upskilling and peer champions.
                    </div>
                  </div>
                </div>
              )}

              {tab === 'visuals' && (
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {visuals.map((v, idx) => (
                    <div
                      key={v.id}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold">{v.title}</div>
                          <div className="mt-1 text-xs text-white/60">
                            {v.subtitle}
                          </div>
                        </div>
                        <span className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] text-white/70">
                          Preview
                        </span>
                      </div>

                      <div className="mt-4">
                        <MiniBarChart
                          values={
                            idx === 0
                              ? [62, 85, 48, 74, 90, 56]
                              : idx === 1
                                ? [18, 42, 65, 33, 51, 70]
                                : [20, 25, 40, 55, 65, 80]
                          }
                        />
                      </div>

                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-2">
                          <div className="text-[11px] text-white/60">
                            Metric
                          </div>
                          <div className="text-xs font-semibold">
                            {idx === 0
                              ? 'Readiness index'
                              : idx === 1
                                ? 'Underuse risk'
                                : 'Hidden signals'}
                          </div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-2">
                          <div className="text-[11px] text-white/60">
                            Filter
                          </div>
                          <div className="text-xs font-semibold">Team</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'builder' && (
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-semibold">
                    My report customer builder (preview)
                  </div>
                  <div className="mt-1 text-xs text-white/60">
                    Choose which sections appear in the exported report.
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {[
                      'Executive summary',
                      'AI readiness (team view)',
                      'Underuse patterns',
                      'Hidden talent signals',
                      'Recommendations',
                      'Appendix / sources',
                    ].map((label) => (
                      <label
                        key={label}
                        className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3"
                      >
                        <span className="text-sm text-white/80">{label}</span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 accent-[#5FA5FB]"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative border-t border-white/10 px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => setTab('summary')}>
                    Return to start
                  </Button>
                  <Button onClick={() => setTab('summary')}>
                    What does this mean
                  </Button>
                  <Button onClick={() => setTab('visuals')}>
                    Explore data visuals
                  </Button>
                  <Button onClick={() => setTab('builder')}>
                    My report customer builder
                  </Button>
                </div>

                <Button variant="primary" onClick={() => setOpen(false)}>
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
