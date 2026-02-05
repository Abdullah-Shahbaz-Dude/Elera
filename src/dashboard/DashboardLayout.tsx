import { Outlet } from 'react-router-dom';

/**
 * Layout for all protected dashboard routes.
 * Renders the nested route (Dashboard index, manager-report, brilliance-report, etc.)
 * via <Outlet />. Wrap this once with ProtectedRoute in App.
 */
export default function DashboardLayout() {
  return <Outlet />;
}
