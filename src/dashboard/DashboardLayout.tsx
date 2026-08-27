import {
  Outlet,
  NavLink,
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import logoImage from '@/assets/images/logo/logo.png';
import logoFav from '@/assets/images/logo/logo-favicon-white.png';
import {
  isMindSyncTeacherTrainingRoute,
  ModuleTrainingSidebarProvider,
  useModuleTrainingSidebar,
} from '@/dashboard/contexts/ModuleTrainingSidebarContext';

const isLessonViewRoute = (pathname: string) =>
  /^\/dashboard\/my-learning\/modules\/[^/]+\/lessons\/[^/]+$/.test(pathname);

function DashboardLayoutInner() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebar } = useModuleTrainingSidebar();
  const isLessonView = isLessonViewRoute(location.pathname);
  const isTrainingRoute = isMindSyncTeacherTrainingRoute(location.pathname);
  const showModuleSidebar = isTrainingRoute && sidebar !== null;
  const hideDashboardNav = isTrainingRoute && sidebar === null;
  const rawName = auth?.user?.username ?? auth?.user?.email ?? 'User';
  const displayName =
    rawName === 'User'
      ? rawName
      : rawName.charAt(0).toUpperCase() + rawName.slice(1);

  const handleLogout = () => {
    auth?.logout();
    navigate('/login', { replace: true });
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 py-3 rounded-xl transition-all group ${
      isLessonView ? 'justify-center px-3' : 'px-4'
    } ${
      isActive
        ? 'bg-[#bdd2f8] text-[#1F3864] font-medium border border-[#bdd2f8]'
        : 'hover:bg-[#EEF4FF] text-slate-600 hover:text-[#1F3864]'
    }`;

  const linkClass = isLessonView
    ? 'flex items-center justify-center px-3 py-3 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all group'
    : 'flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all group';

  return (
    <div className="flex h-screen overflow-hidden font-display bg-white text-slate-900">
      <aside
        className={`${
          hideDashboardNav
            ? 'w-0 border-0 overflow-hidden'
            : isLessonView
              ? 'w-20'
              : showModuleSidebar
                ? 'w-[280px]'
                : 'w-64'
        } flex flex-col h-full z-20 shrink-0 transition-[width] duration-200 bg-white border-r border-slate-200`}
      >
        {showModuleSidebar ? (
          sidebar
        ) : hideDashboardNav ? null : (
          <>
            <div
              className={`flex items-center ${
                isLessonView ? 'justify-center p-4' : 'justify-center py-0 px-2'
              }`}
            >
              {(isLessonView ? logoFav : logoImage) ? (
                <Link
                  to="/dashboard"
                  className={`flex items-center justify-center shrink-0 ${
                    isLessonView
                      ? 'h-12 w-12'
                      : 'w-full max-w-[15rem] h-auto min-h-0'
                  }`}
                >
                  <img
                    src={isLessonView ? logoFav : logoImage}
                    alt="Elara"
                    className={`object-contain ${
                      isLessonView ? 'h-full w-full' : 'max-h-32 w-full'
                    }`}
                  />
                </Link>
              ) : (
                <div
                  className={`bg-primary rounded-lg flex items-center justify-center shrink-0 ${
                    isLessonView ? 'h-12 w-12' : 'h-20 w-20'
                  }`}
                >
                  <span className="material-symbols-outlined text-white text-2xl">
                    auto_awesome
                  </span>
                </div>
              )}
            </div>
            <nav
              className={`flex-1 ${
                isLessonView ? 'px-2' : 'px-4'
              } space-y-2 overflow-y-auto`}
            >
              <NavLink
                to="/dashboard"
                end
                className={navLinkClass}
                title="Dashboard"
              >
                <span className="material-symbols-outlined">dashboard</span>
                {!isLessonView && <span>Dashboard</span>}
              </NavLink>
              <NavLink
                to="/dashboard/my-learning"
                className={navLinkClass}
                title="My Learning"
              >
                <span className="material-symbols-outlined">school</span>
                {!isLessonView && <span>My Learning</span>}
              </NavLink>
              <Link to="#" className={linkClass} title="Question Bank">
                <span className="material-symbols-outlined group-hover:text-primary">
                  quiz
                </span>
                {!isLessonView && <span>Question Bank</span>}
              </Link>
              <Link to="#" className={linkClass} title="Video Library">
                <span className="material-symbols-outlined group-hover:text-primary">
                  video_library
                </span>
                {!isLessonView && <span>Video Library</span>}
              </Link>
            </nav>
            <div
              className={`border-t border-slate-200 ${isLessonView ? 'p-2' : 'p-4'}`}
            >
              <div
                className={`rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 ${
                  isLessonView ? 'justify-center p-2' : 'p-4'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-semibold shrink-0">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                {!isLessonView && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate text-slate-900">
                      {displayName}
                    </p>
                    <p className="text-xs text-slate-400 truncate">Member</p>
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-slate-500 hover:text-slate-900 transition-colors p-1"
                  aria-label="Logout"
                  title="Logout"
                >
                  <span className="material-symbols-outlined text-lg">
                    logout
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
      <main
        className={`flex-1 relative bg-white ${
          showModuleSidebar || hideDashboardNav
            ? 'overflow-hidden'
            : 'overflow-y-auto'
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default function DashboardLayout() {
  return (
    <ModuleTrainingSidebarProvider>
      <DashboardLayoutInner />
    </ModuleTrainingSidebarProvider>
  );
}
