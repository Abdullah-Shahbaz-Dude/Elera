import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ManagerReport from './pages/ManagerReport';
import BrillianceReport from './pages/BrillianceReport';

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-4">
            <Link
              to="/"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Mind Sync
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<ManagerReport />} />
        <Route path="/brilliance-report" element={<BrillianceReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
