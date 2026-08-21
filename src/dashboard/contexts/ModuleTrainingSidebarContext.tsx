import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export const isMindSyncTeacherTrainingRoute = (pathname: string) =>
  /^\/dashboard\/my-learning\/mind-sync\/modules\/2$/.test(pathname);

type ModuleTrainingSidebarContextValue = {
  sidebar: ReactNode | null;
  setSidebar: (node: ReactNode | null) => void;
};

const ModuleTrainingSidebarContext =
  createContext<ModuleTrainingSidebarContextValue | null>(null);

export function ModuleTrainingSidebarProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [sidebar, setSidebar] = useState<ReactNode | null>(null);
  const value = useMemo(() => ({ sidebar, setSidebar }), [sidebar]);

  return (
    <ModuleTrainingSidebarContext.Provider value={value}>
      {children}
    </ModuleTrainingSidebarContext.Provider>
  );
}

export function useModuleTrainingSidebar() {
  const ctx = useContext(ModuleTrainingSidebarContext);
  if (!ctx) {
    throw new Error(
      'useModuleTrainingSidebar must be used within ModuleTrainingSidebarProvider'
    );
  }
  return ctx;
}
