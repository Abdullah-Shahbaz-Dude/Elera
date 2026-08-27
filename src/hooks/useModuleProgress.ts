import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getModuleProgress,
  putModuleProgress,
  putPreference,
  putScenarioResponse,
  type ModuleProgress,
  type ModuleStatus,
  type ScenarioOptionKey,
} from '@/api/learning';
import { patchModuleSummary } from '@/hooks/useMyModules';

type ScreenLike = { id: number };

export type ModuleProgressPreferences = {
  readAloudKey?: string;
  scenarioCalloutKey?: string;
  onReadAloudHydrate?: (enabled: boolean) => void;
  onScenarioCalloutHydrate?: (dismissed: boolean) => void;
};

const PROGRESS_SAVE_DEBOUNCE_MS = 2000;
const SCENARIO_ANSWER_DEBOUNCE_MS = 400;

function buildProgressPayload(
  index: number,
  screens: ScreenLike[],
  completionBlockId: number
): { current_block_id: number; current_index: number; status: ModuleStatus } | null {
  const screen = screens[index];
  if (!screen) return null;

  let status: ModuleStatus = 'in_progress';
  if (index === 0) status = 'not_started';
  if (screen.id === completionBlockId) status = 'completed';

  return {
    current_block_id: screen.id,
    current_index: index,
    status,
  };
}

function buildSaveKey(payload: {
  current_block_id: number;
  current_index: number;
  status: ModuleStatus;
}): string {
  return `${payload.current_block_id}:${payload.current_index}:${payload.status}`;
}

function resolveResumeIndex(
  progress: ModuleProgress,
  screens: ScreenLike[]
): number | null {
  if (progress.status === 'completed') {
    const idx = screens.findIndex((s) => s.id === progress.current_block_id);
    return idx >= 0 ? idx : screens.length - 1;
  }
  if (progress.status === 'not_started' && progress.progress_percent === 0) {
    return null;
  }
  const byBlock = screens.findIndex((s) => s.id === progress.current_block_id);
  if (byBlock >= 0) return byBlock;
  if (progress.current_index > 0) {
    return Math.min(progress.current_index, screens.length - 1);
  }
  return null;
}

function patchSummaryFromProgress(progress: ModuleProgress) {
  patchModuleSummary(progress.module_id, {
    status: progress.status,
    progress_percent: progress.progress_percent,
  });
}

function scenarioMapsEqual(
  a: Partial<Record<number, ScenarioOptionKey>>,
  b: Partial<Record<number, ScenarioOptionKey>>
): boolean {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  return aKeys.every((key) => a[Number(key)] === b[Number(key)]);
}

function compareSeenMapsEqual(
  a: Partial<Record<number, boolean>>,
  b: Partial<Record<number, boolean>>
): boolean {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  return aKeys.every((key) => a[Number(key)] === b[Number(key)]);
}

function finishHydration(
  progress: ModuleProgress,
  resumeIndex: number | null,
  lastSavedKeyRef: React.MutableRefObject<string | null>,
  skipSaveRef: React.MutableRefObject<boolean>,
  readyRef: React.MutableRefObject<boolean>,
  setIsHydrating: (value: boolean) => void
) {
  const savedIndex = resumeIndex ?? 0;
  lastSavedKeyRef.current = buildSaveKey({
    current_block_id: progress.current_block_id,
    current_index: savedIndex,
    status: progress.status,
  });
  skipSaveRef.current = false;
  readyRef.current = true;
  setIsHydrating(false);
}

export function useModuleProgress({
  moduleId,
  screens,
  index,
  setIndex,
  completionBlockId,
  setScenarioAnswers,
  setScenarioCompareSeen,
  setScenarioCalloutDismissed,
  preferences,
}: {
  moduleId: string;
  screens: ScreenLike[];
  index: number;
  setIndex: (value: number) => void;
  completionBlockId: number;
  setScenarioAnswers?: React.Dispatch<
    React.SetStateAction<Partial<Record<number, ScenarioOptionKey>>>
  >;
  setScenarioCompareSeen?: React.Dispatch<
    React.SetStateAction<Partial<Record<number, boolean>>>
  >;
  setScenarioCalloutDismissed?: (value: boolean) => void;
  preferences?: ModuleProgressPreferences;
}) {
  const [isHydrating, setIsHydrating] = useState(true);
  const readyRef = useRef(false);
  const skipSaveRef = useRef(true);
  const lastSavedKeyRef = useRef<string | null>(null);
  const lastSavedScenarioAnswersRef = useRef<
    Partial<Record<number, ScenarioOptionKey>>
  >({});
  const lastSavedCompareSeenRef = useRef<Partial<Record<number, boolean>>>({});
  const scenarioAnswerTimerRef = useRef<Partial<Record<number, number>>>({});
  const saveContextRef = useRef({
    moduleId,
    index,
    screens,
    completionBlockId,
  });
  const preferencesRef = useRef(preferences);
  const indexRef = useRef(index);

  preferencesRef.current = preferences;
  indexRef.current = index;
  saveContextRef.current = {
    moduleId,
    index,
    screens,
    completionBlockId,
  };

  const flushProgressSave = useCallback(async () => {
    if (skipSaveRef.current || !readyRef.current) return;

    const { moduleId: id, index: idx, screens: list, completionBlockId: doneBlock } =
      saveContextRef.current;
    const payload = buildProgressPayload(idx, list, doneBlock);
    if (!payload) return;

    const saveKey = buildSaveKey(payload);
    if (lastSavedKeyRef.current === saveKey) return;

    const progress = await putModuleProgress(id, payload);
    lastSavedKeyRef.current = saveKey;
    patchSummaryFromProgress(progress);
  }, []);

  useEffect(() => {
    readyRef.current = false;
    skipSaveRef.current = true;
    lastSavedKeyRef.current = null;
    lastSavedScenarioAnswersRef.current = {};
    lastSavedCompareSeenRef.current = {};
    for (const timer of Object.values(scenarioAnswerTimerRef.current)) {
      window.clearTimeout(timer);
    }
    scenarioAnswerTimerRef.current = {};
    setIsHydrating(true);

    let cancelled = false;

    getModuleProgress(moduleId)
      .then((progress) => {
        if (cancelled) return;

        const resumeIndex = resolveResumeIndex(progress, screens);
        if (resumeIndex !== null && resumeIndex !== indexRef.current) {
          setIndex(resumeIndex);
        }

        if (setScenarioAnswers || setScenarioCompareSeen) {
          const answers: Partial<Record<number, ScenarioOptionKey>> = {};
          const compareSeen: Partial<Record<number, boolean>> = {};
          for (const [id, state] of Object.entries(progress.scenarios)) {
            const scenarioId = Number(id);
            if (state.answer) {
              answers[scenarioId] = state.answer;
              lastSavedScenarioAnswersRef.current[scenarioId] = state.answer;
            }
            if (state.compare_seen) {
              compareSeen[scenarioId] = true;
              lastSavedCompareSeenRef.current[scenarioId] = true;
            }
          }
          setScenarioAnswers?.((prev) =>
            scenarioMapsEqual(prev, answers) ? prev : answers
          );
          setScenarioCompareSeen?.((prev) =>
            compareSeenMapsEqual(prev, compareSeen) ? prev : compareSeen
          );
        }

        const prefs = preferencesRef.current;
        const calloutKey = prefs?.scenarioCalloutKey;
        if (calloutKey && progress.preferences[calloutKey]) {
          setScenarioCalloutDismissed?.(true);
          prefs.onScenarioCalloutHydrate?.(true);
        }

        const readAloudKey = prefs?.readAloudKey;
        if (
          readAloudKey &&
          typeof progress.preferences[readAloudKey] === 'boolean'
        ) {
          prefs.onReadAloudHydrate?.(
            progress.preferences[readAloudKey] as boolean
          );
        }

        finishHydration(
          progress,
          resumeIndex,
          lastSavedKeyRef,
          skipSaveRef,
          readyRef,
          setIsHydrating
        );
      })
      .catch(() => {
        if (cancelled) return;
        skipSaveRef.current = false;
        readyRef.current = true;
        setIsHydrating(false);
      });

    return () => {
      cancelled = true;
    };
  }, [moduleId]);

  useEffect(() => {
    return () => {
      for (const timer of Object.values(scenarioAnswerTimerRef.current)) {
        window.clearTimeout(timer);
      }
      void flushProgressSave();
    };
  }, [flushProgressSave, moduleId]);

  useEffect(() => {
    if (skipSaveRef.current || !readyRef.current) return;

    const timer = window.setTimeout(() => {
      void flushProgressSave();
    }, PROGRESS_SAVE_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [flushProgressSave, index, moduleId]);

  const persistScenarioAnswer = useCallback(
    (scenarioId: number, key: ScenarioOptionKey) => {
      if (!readyRef.current) return;
      if (lastSavedScenarioAnswersRef.current[scenarioId] === key) return;

      const previousAnswer = lastSavedScenarioAnswersRef.current[scenarioId];
      if (previousAnswer !== undefined && previousAnswer !== key) {
        lastSavedCompareSeenRef.current[scenarioId] = false;
      }

      const existingTimer = scenarioAnswerTimerRef.current[scenarioId];
      if (existingTimer !== undefined) {
        window.clearTimeout(existingTimer);
      }

      scenarioAnswerTimerRef.current[scenarioId] = window.setTimeout(() => {
        delete scenarioAnswerTimerRef.current[scenarioId];
        if (lastSavedScenarioAnswersRef.current[scenarioId] === key) return;

        putScenarioResponse(moduleId, scenarioId, { answer: key })
          .then(() => {
            lastSavedScenarioAnswersRef.current[scenarioId] = key;
          })
          .catch(() => undefined);
      }, SCENARIO_ANSWER_DEBOUNCE_MS);
    },
    [moduleId]
  );

  const persistScenarioCompareSeen = useCallback(
    (scenarioId: number) => {
      if (!readyRef.current) return;
      if (lastSavedCompareSeenRef.current[scenarioId]) return;

      putScenarioResponse(moduleId, scenarioId, { compare_seen: true })
        .then(() => {
          lastSavedCompareSeenRef.current[scenarioId] = true;
        })
        .catch(() => undefined);
    },
    [moduleId]
  );

  const persistScenarioCalloutDismissed = useCallback(() => {
    const key = preferencesRef.current?.scenarioCalloutKey;
    if (!key) return;
    putPreference(key, { done: true }).catch(() => undefined);
  }, []);

  const persistReadAloud = useCallback(
    (enabled: boolean) => {
      const key = preferencesRef.current?.readAloudKey;
      if (!key) return;
      putPreference(key, { enabled }).catch(() => undefined);
    },
    []
  );

  const completeModule = useCallback(async () => {
    const progress = await putModuleProgress(moduleId, {
      current_block_id: completionBlockId,
      current_index: index,
      status: 'completed',
    });
    lastSavedKeyRef.current = buildSaveKey({
      current_block_id: completionBlockId,
      current_index: index,
      status: 'completed',
    });
    patchSummaryFromProgress(progress);
  }, [completionBlockId, index, moduleId]);

  return {
    isHydrating,
    persistScenarioAnswer,
    persistScenarioCompareSeen,
    persistScenarioCalloutDismissed,
    persistReadAloud,
    completeModule,
  };
}
