import { userInfo } from '../../brillianceData';

export default function BrillianceHeader() {
  return (
    <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white border-b border-indigo-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">Reveal Hidden Brilliance Report</h1>
          <p className="text-indigo-100 text-lg">Psychology and Data Intelligence</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 text-indigo-50">
              <p className="flex items-center gap-2">
                <span className="font-medium">Role:</span> {userInfo.role || '—'}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Team:</span> {userInfo.team || '—'}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Age:</span> {userInfo.age || '—'}
              </p>
            </div>
            <div className="space-y-2 text-indigo-50">
              <p className="flex items-center gap-2">
                <span className="font-medium">Gender:</span> {userInfo.gender || '—'}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Neurodivergence:</span> {userInfo.neurodivergence}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Industry/Sector:</span> {userInfo.industry || '—'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


