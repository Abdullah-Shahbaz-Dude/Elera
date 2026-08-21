import { useCallback, useEffect, useMemo, useSyncExternalStore } from 'react';
import {
  getMyModules,
  type ModuleResume,
  type ModuleSummary,
  type ModuleStatus,
  type MyModulesResponse,
} from '@/api/learning';

type StoreState = {
  data: MyModulesResponse | null;
  loading: boolean;
  error: Error | null;
};

let store: StoreState = {
  data: null,
  loading: false,
  error: null,
};

let inflight: Promise<MyModulesResponse> | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): StoreState {
  return store;
}

async function loadMyModules(force = false): Promise<MyModulesResponse> {
  if (inflight) return inflight;
  if (!force && store.data) return store.data;

  store = { ...store, loading: true, error: null };
  notify();

  inflight = getMyModules()
    .then((data) => {
      store = { data, loading: false, error: null };
      inflight = null;
      notify();
      return data;
    })
    .catch((error: Error) => {
      store = { ...store, loading: false, error };
      inflight = null;
      notify();
      throw error;
    });

  return inflight;
}

export function invalidateMyModules() {
  store = { data: null, loading: false, error: null };
  inflight = null;
  notify();
}

export function patchModuleSummary(
  moduleId: string,
  patch: Partial<ModuleSummary>
) {
  if (!store.data) return;

  const modules = store.data.modules.map((mod) =>
    mod.module_id === moduleId ? { ...mod, ...patch } : mod
  );

  let resume = store.data.resume;
  if (resume?.module_id === moduleId) {
    const progressPercent = patch.progress_percent ?? resume.progress_percent;
    resume = {
      ...resume,
      ...patch,
      progress_percent: progressPercent,
      remaining_percent: Math.max(0, 100 - progressPercent),
    };
  }

  store = { ...store, data: { modules, resume } };
  notify();
}

export function pickBestModule(
  modules: ModuleSummary[],
  resume: ModuleResume | null
): ModuleResume | ModuleSummary | null {
  if (resume && resume.progress_percent > 0) return resume;
  if (resume?.status === 'in_progress') return resume;

  const withProgress = modules.filter((mod) => mod.progress_percent > 0);
  if (withProgress.length > 0) {
    return withProgress.reduce((best, mod) =>
      mod.progress_percent > best.progress_percent ? mod : best
    );
  }

  return resume ?? modules[0] ?? null;
}

export function useMyModules() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  useEffect(() => {
    if (!state.data && !inflight) {
      void loadMyModules().catch(() => undefined);
    }
  }, [state.data]);

  const modulesById = useMemo(() => {
    const map: Record<string, ModuleSummary> = {};
    for (const mod of state.data?.modules ?? []) {
      map[mod.module_id] = mod;
    }
    return map;
  }, [state.data]);

  const activeModule = useMemo(
    () => pickBestModule(state.data?.modules ?? [], state.data?.resume ?? null),
    [state.data]
  );

  const refresh = useCallback(() => loadMyModules(true), []);

  return {
    modules: state.data?.modules ?? [],
    resume: state.data?.resume ?? null,
    activeModule,
    modulesById,
    loading: state.loading || (!state.data && Boolean(inflight)),
    error: state.error,
    refresh,
  };
}

export type { ModuleResume, ModuleSummary, MyModulesResponse, ModuleStatus };
