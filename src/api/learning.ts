import { api } from '@/api/client';

export type ModuleStatus = 'not_started' | 'in_progress' | 'completed';
export type ScenarioOptionKey = 'A' | 'B' | 'C' | 'D';

export const MINDSYNC_MODULE_1_ID = '1';
export const MINDSYNC_MODULE_2_ID = '2';

export function modulePrefKey(moduleId: string, name: string): string {
  return `mindsync.${moduleId}.${name}`;
}

export const PREF_READ_ALOUD = modulePrefKey(MINDSYNC_MODULE_2_ID, 'read_aloud');
export const PREF_SCENARIO_CALLOUT = modulePrefKey(
  MINDSYNC_MODULE_2_ID,
  'scenario_callout_done'
);

export interface ScenarioState {
  answer: ScenarioOptionKey | null;
  compare_seen: boolean;
}

export interface ModuleProgress {
  module_id: string;
  status: ModuleStatus;
  current_block_id: number;
  current_index: number;
  progress_percent: number;
  completed_at: string | null;
  scenarios: Record<string, ScenarioState>;
  preferences: Record<string, unknown>;
}

export interface ModuleSummary {
  module_id: string;
  title: string;
  programme: string;
  route: string;
  status: ModuleStatus;
  progress_percent: number;
  last_visited_at?: string | null;
}

export interface ModuleResume {
  module_id: string;
  title: string;
  programme: string;
  route: string;
  status: ModuleStatus;
  progress_percent: number;
  remaining_percent: number;
  last_visited_at?: string | null;
}

export interface MyModulesResponse {
  modules: ModuleSummary[];
  resume: ModuleResume | null;
}

export interface ProgrammeSummary {
  programme_id: string;
  title: string;
  subtitle: string;
  description: string;
  route: string;
  module_count: number;
  progress_percent: number;
  status: ModuleStatus;
}

export interface LearningProgrammesResponse {
  programmes: ProgrammeSummary[];
}

export interface ModuleProgressUpdate {
  current_block_id?: number;
  current_index?: number;
  status?: ModuleStatus;
}

export interface ScenarioResponseUpdate {
  answer?: ScenarioOptionKey | null;
  compare_seen?: boolean;
}

export interface ModuleAggregate {
  module_id: string;
  title: string;
  programme: string;
  total_users: number;
  not_started: number;
  in_progress: number;
  completed: number;
}

export interface SchoolModulesSummary {
  school_id: number | null;
  modules: ModuleAggregate[];
}

function normalizeMyModulesResponse(data: unknown): MyModulesResponse {
  if (Array.isArray(data)) {
    const modules = data as ModuleSummary[];
    const best =
      modules.reduce<ModuleSummary | null>((top, mod) => {
        if (!top || mod.progress_percent > top.progress_percent) return mod;
        return top;
      }, null) ?? modules[0] ?? null;

    return {
      modules,
      resume: best
        ? {
            ...best,
            remaining_percent: Math.max(0, 100 - best.progress_percent),
          }
        : null,
    };
  }

  const payload = data as MyModulesResponse;
  return {
    modules: payload.modules ?? [],
    resume: payload.resume ?? null,
  };
}

export async function getMyModules(): Promise<MyModulesResponse> {
  const res = await api.get<MyModulesResponse | ModuleSummary[]>('/api/v1/me/modules');
  return normalizeMyModulesResponse(res.data);
}

export async function getLearningProgrammes(): Promise<LearningProgrammesResponse> {
  const res = await api.get<LearningProgrammesResponse>('/api/v1/me/learning-programmes');
  return res.data;
}

const moduleProgressInflight = new Map<string, Promise<ModuleProgress>>();

export async function getModuleProgress(moduleId: string): Promise<ModuleProgress> {
  const inflight = moduleProgressInflight.get(moduleId);
  if (inflight) return inflight;

  const request = api
    .get<ModuleProgress>(`/api/v1/me/modules/${moduleId}/progress`)
    .then((res) => {
      moduleProgressInflight.delete(moduleId);
      return res.data;
    })
    .catch((error) => {
      moduleProgressInflight.delete(moduleId);
      throw error;
    });

  moduleProgressInflight.set(moduleId, request);
  return request;
}

export async function putModuleProgress(
  moduleId: string,
  data: ModuleProgressUpdate
): Promise<ModuleProgress> {
  const res = await api.put<ModuleProgress>(`/api/v1/me/modules/${moduleId}/progress`, data);
  return res.data;
}

export async function putScenarioResponse(
  moduleId: string,
  scenarioId: number,
  data: ScenarioResponseUpdate
): Promise<ModuleProgress> {
  const res = await api.put<ModuleProgress>(
    `/api/v1/me/modules/${moduleId}/scenarios/${scenarioId}`,
    data
  );
  return res.data;
}

export async function putPreference(
  key: string,
  value: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const res = await api.put<{ preferences: Record<string, unknown> }>(
    `/api/v1/me/preferences/${encodeURIComponent(key)}`,
    { value }
  );
  return res.data.preferences;
}

export async function getSchoolModulesSummary(): Promise<SchoolModulesSummary> {
  const res = await api.get<SchoolModulesSummary>('/api/v1/school-lead/modules/summary');
  return res.data;
}
