import { useCallback, useEffect, useSyncExternalStore } from 'react';
import {
  getLearningProgrammes,
  type LearningProgrammesResponse,
  type ProgrammeSummary,
} from '@/api/learning';

type StoreState = {
  data: LearningProgrammesResponse | null;
  loading: boolean;
  error: Error | null;
};

let store: StoreState = {
  data: null,
  loading: false,
  error: null,
};

let inflight: Promise<LearningProgrammesResponse> | null = null;
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

async function loadLearningProgrammes(force = false): Promise<LearningProgrammesResponse> {
  if (inflight) return inflight;
  if (!force && store.data) return store.data;

  store = { ...store, loading: true, error: null };
  notify();

  inflight = getLearningProgrammes()
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

export function invalidateLearningProgrammes() {
  store = { data: null, loading: false, error: null };
  inflight = null;
  notify();
}

export function useLearningProgrammes() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  useEffect(() => {
    if (!state.data && !inflight) {
      void loadLearningProgrammes().catch(() => undefined);
    }
  }, [state.data]);

  const refresh = useCallback(() => loadLearningProgrammes(true), []);

  return {
    programmes: state.data?.programmes ?? [],
    loading: state.loading || (!state.data && Boolean(inflight)),
    error: state.error,
    refresh,
  };
}

export type { ProgrammeSummary, LearningProgrammesResponse };
