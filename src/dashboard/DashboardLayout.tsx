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

const isLessonViewRoute = (pathname: string) =>
  /^\/dashboard\/my-learning\/modules\/[^/]+\/lessons\/[^/]+$/.test(pathname);

export default function DashboardLayout() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isLessonView = isLessonViewRoute(location.pathname);
  const user = auth?.user as { userName?: string; email?: string } | null;
  const displayName = user?.userName ?? user?.email ?? 'User';

  const handleLogout = () => {
    auth?.logout();
    navigate('/login', { replace: true });
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 py-3 rounded-xl transition-all group ${
      isLessonView ? 'justify-center px-3' : 'px-4'
    } ${
      isActive
        ? 'bg-primary/10 text-primary font-medium border border-primary/20'
        : 'hover:bg-white/5 text-slate-400 hover:text-white'
    }`;

  const linkClass = isLessonView
    ? 'flex items-center justify-center px-3 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all group'
    : 'flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all group';

  return (
    <div className="flex h-screen overflow-hidden font-display bg-background-dark text-white">
      <aside
        className={`${
          isLessonView ? 'w-20' : 'w-64'
        } sidebar-glass flex flex-col h-full z-20 shrink-0 transition-[width] duration-200`}
      >
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
                  isLessonView
                    ? 'h-full w-full'
                    : 'max-h-32 w-full brightness-0 invert'
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
          {/* <NavLink to="/dashboard/manager-report" className={navLinkClass} title="Manager Report">
            <span className="material-symbols-outlined">description</span>
            {!isLessonView && <span>Manager Report</span>}
          </NavLink> */}
          {/* <NavLink
            to="/dashboard/brilliance-report"
            className={navLinkClass}
            title="Brilliance Report"
          >
            <span className="material-symbols-outlined">psychology</span>
            {!isLessonView && <span>Brilliance Report</span>}
          </NavLink> */}
          <Link to="#" className={linkClass} title="Video Library">
            <span className="material-symbols-outlined group-hover:text-primary">
              video_library
            </span>
            {!isLessonView && <span>Video Library</span>}
          </Link>
          {/* <Link to="#" className={linkClass} title="Certifications">
            <span className="material-symbols-outlined group-hover:text-primary">
              verified
            </span>
            {!isLessonView && <span>Certifications</span>}
          </Link> */}
        </nav>
        <div
          className={`border-t border-white/10 ${isLessonView ? 'p-2' : 'p-4'}`}
        >
          <div
            className={`rounded-xl bg-white/5 border border-white/5 flex items-center gap-3 ${
              isLessonView ? 'justify-center p-2' : 'p-4'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-semibold shrink-0">
              {displayName.charAt(0).toUpperCase()}
            </div>
            {!isLessonView && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate text-white">
                  {displayName}
                </p>
                <p className="text-xs text-slate-400 truncate">Member</p>
              </div>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="text-slate-400 hover:text-white transition-colors p-1"
              aria-label="Logout"
              title="Logout"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto relative">
        <Outlet />
      </main>
    </div>
  );
}
