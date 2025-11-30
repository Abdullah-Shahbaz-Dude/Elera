import { managerInfo } from '../data';

export default function ReportHeader() {
  return (
    <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white border-b border-indigo-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">Mind Sync Manager Report</h1>
          <p className="text-indigo-100 text-lg">Psychology and Data Intelligence – Seeing Things Differently</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-2xl font-semibold mb-4">{managerInfo.name}</h2>
              <div className="space-y-2 text-indigo-50">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Role:</span> {managerInfo.role}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Sector:</span> {managerInfo.sector}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Team:</span> {managerInfo.teamSize}
                </p>
              </div>
            </div>
            <div className="space-y-2 text-indigo-50">
              <p className="flex items-center gap-2">
                <span className="font-medium">Work Style:</span> {managerInfo.workStyle}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Age:</span> {managerInfo.age}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Report Date:</span> {managerInfo.reportDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

