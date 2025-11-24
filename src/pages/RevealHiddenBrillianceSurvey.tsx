import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logoImage } from '@/assets/images';

const RevealHiddenBrillianceSurvey: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    industrySector: '',
    managersName: '',
    gender: '',
    departmentTeam: '',
    jobTitleRole: '',
    age: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission and navigate to next section
    console.log('Form data:', formData);
    // navigate('/survey/reveal-hidden-brilliance/section-2');
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Blur Effects - Gradient Ellipses */}
      <div className="absolute right-1/4 top-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-[rgba(96,165,250,0.2)] to-[rgba(147,51,234,0.2)] blur-[400px]"></div>
      <div className="absolute left-1/4 bottom-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-[rgba(167,139,250,0.2)] to-[rgba(147,51,234,0.2)] blur-[400px]"></div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4 md:px-8 md:py-5">
        {/* Gradient Border Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* Glass Morphism Background */}
        <div
          className="absolute inset-0 backdrop-blur-2xl"
          style={{
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.75) 50%, rgba(0, 0, 0, 0.65) 100%)',
          }}
        />

        {/* Subtle Gradient Overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center group relative z-10">
            {logoImage ? (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#60A5FA] to-[#9333EA] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 rounded-full"></div>
                <img
                  src={logoImage}
                  alt="Elara Logo"
                  className="relative h-20 w-auto brightness-0 invert md:h-24 lg:h-32 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="relative h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#9333EA] flex items-center justify-center shadow-lg shadow-[#60A5FA]/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[#60A5FA]/50">
                <span className="text-white font-bold text-2xl md:text-3xl lg:text-4xl">
                  E
                </span>
              </div>
            )}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="group mb-6 flex items-center gap-2 px-4 py-2 rounded-xl text-white/90 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background:
              'linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm md:text-base font-medium">Back</span>
        </button>

        {/* Page Title */}
        <h1 className="mb-8 md:mb-12 text-center text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          Reveal Hidden Brilliance
        </h1>

        {/* Form Card */}
        <div className="relative mx-auto max-w-5xl">
          <div
            className="relative rounded-2xl md:rounded-3xl overflow-hidden p-[2px]"
            style={{
              background: 'linear-gradient(135deg, #60A5FA, #A78BFA, #9333EA)',
              boxShadow: '0 20px 60px rgba(96, 165, 250, 0.3)',
            }}
          >
            <div
              className="relative rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 bg-black/80 backdrop-blur-xl"
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
              }}
            >
              {/* Form */}
              <form onSubmit={handleNext} className="relative z-10">
                <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                  {/* Left Column */}
                  <div className="space-y-4 md:space-y-6">
                    {/* Full Name */}
                    <div>
                      <label className="block mb-2 text-sm md:text-base font-medium text-white/90">
                        Full Name:
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Enter full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full rounded-xl md:rounded-2xl border border-white/20 bg-white/5 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:outline-none focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-[#60A5FA]"
                      />
                    </div>

                    {/* Industry/Sector */}
                    <div>
                      <label className="block mb-2 text-sm md:text-base font-medium text-white/90">
                        Industry/Sector:
                      </label>
                      <div className="relative">
                        <select
                          name="industrySector"
                          value={formData.industrySector}
                          onChange={handleChange}
                          className="w-full rounded-xl md:rounded-2xl border border-white/20 bg-white/5 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white backdrop-blur-sm transition-all focus:outline-none focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-[#60A5FA] appearance-none cursor-pointer"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1rem center',
                            paddingRight: '2.5rem',
                          }}
                        >
                          <option value="" className="bg-black text-white">
                            Industry/Sector
                          </option>
                          <option
                            value="technology"
                            className="bg-black text-white"
                          >
                            Technology
                          </option>
                          <option
                            value="finance"
                            className="bg-black text-white"
                          >
                            Finance
                          </option>
                          <option
                            value="healthcare"
                            className="bg-black text-white"
                          >
                            Healthcare
                          </option>
                          <option
                            value="education"
                            className="bg-black text-white"
                          >
                            Education
                          </option>
                          <option
                            value="retail"
                            className="bg-black text-white"
                          >
                            Retail
                          </option>
                          <option value="other" className="bg-black text-white">
                            Other
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* Manager's Name */}
                    <div>
                      <label className="block mb-2 text-sm md:text-base font-medium text-white/90">
                        Manager's Name:
                      </label>
                      <input
                        type="text"
                        name="managersName"
                        placeholder="Enter manager's name"
                        value={formData.managersName}
                        onChange={handleChange}
                        className="w-full rounded-xl md:rounded-2xl border border-white/20 bg-white/5 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:outline-none focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-[#60A5FA]"
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block mb-2 text-sm md:text-base font-medium text-white/90">
                        Gender:
                      </label>
                      <div className="relative">
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full rounded-xl md:rounded-2xl border border-white/20 bg-white/5 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white backdrop-blur-sm transition-all focus:outline-none focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-[#60A5FA] appearance-none cursor-pointer"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1rem center',
                            paddingRight: '2.5rem',
                          }}
                        >
                          <option value="" className="bg-black text-white">
                            Select gender
                          </option>
                          <option value="male" className="bg-black text-white">
                            Male
                          </option>
                          <option
                            value="female"
                            className="bg-black text-white"
                          >
                            Female
                          </option>
                          <option
                            value="non-binary"
                            className="bg-black text-white"
                          >
                            Non-binary
                          </option>
                          <option
                            value="prefer-not-to-say"
                            className="bg-black text-white"
                          >
                            Prefer not to say
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4 md:space-y-6">
                    {/* Department/Team */}
                    <div>
                      <label className="block mb-2 text-sm md:text-base font-medium text-white/90">
                        Department/Team:
                      </label>
                      <input
                        type="text"
                        name="departmentTeam"
                        placeholder="Enter Department"
                        value={formData.departmentTeam}
                        onChange={handleChange}
                        className="w-full rounded-xl md:rounded-2xl border border-white/20 bg-white/5 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:outline-none focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-[#60A5FA]"
                      />
                    </div>

                    {/* Job Title/Role */}
                    <div>
                      <label className="block mb-2 text-sm md:text-base font-medium text-white/90">
                        Job Title/Role:
                      </label>
                      <input
                        type="text"
                        name="jobTitleRole"
                        placeholder="Enter job title"
                        value={formData.jobTitleRole}
                        onChange={handleChange}
                        className="w-full rounded-xl md:rounded-2xl border border-white/20 bg-white/5 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:outline-none focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-[#60A5FA]"
                      />
                    </div>

                    {/* Age */}
                    <div>
                      <label className="block mb-2 text-sm md:text-base font-medium text-white/90">
                        Age:
                      </label>
                      <div className="relative">
                        <select
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          className="w-full rounded-xl md:rounded-2xl border border-white/20 bg-white/5 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white backdrop-blur-sm transition-all focus:outline-none focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-[#60A5FA] appearance-none cursor-pointer"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1rem center',
                            paddingRight: '2.5rem',
                          }}
                        >
                          <option value="" className="bg-black text-white">
                            Select age range
                          </option>
                          <option value="18-24" className="bg-black text-white">
                            18-24
                          </option>
                          <option value="25-34" className="bg-black text-white">
                            25-34
                          </option>
                          <option value="35-44" className="bg-black text-white">
                            35-44
                          </option>
                          <option value="45-54" className="bg-black text-white">
                            45-54
                          </option>
                          <option value="55-64" className="bg-black text-white">
                            55-64
                          </option>
                          <option value="65+" className="bg-black text-white">
                            65+
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Button */}
                <div className="mt-8 md:mt-10 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-xl px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-semibold text-white shadow-xl transition-all hover:scale-105 active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                      boxShadow: '0 8px 32px rgba(96, 165, 250, 0.4)',
                    }}
                  >
                    Next →
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 md:mt-12">
          <div className="mx-auto max-w-2xl">
            {/* Section Title */}
            <div className="mb-4 text-center">
              <p className="text-base md:text-lg font-semibold text-white">
                Section 1: About You
              </p>
            </div>

            {/* Progress Bar Container */}
            <div className="relative">
              {/* Background Bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10 backdrop-blur-sm">
                {/* Progress Fill */}
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: '20%', // 1 out of 5 sections = 20%
                    background: 'linear-gradient(90deg, #60A5FA, #A78BFA, #9333EA)',
                    boxShadow: '0 0 20px rgba(96, 165, 250, 0.5)',
                  }}
                />
              </div>

              {/* Section Steps */}
              <div className="mt-3 flex justify-between">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className="flex flex-col items-center"
                  >
                    <div
                      className={`h-3 w-3 rounded-full transition-all duration-300 ${
                        step === 1
                          ? 'bg-gradient-to-br from-[#60A5FA] to-[#9333EA] shadow-lg shadow-[#60A5FA]/50 scale-125'
                          : step <= 1
                          ? 'bg-white/30'
                          : 'bg-white/10'
                      }`}
                    />
                    {step === 1 && (
                      <span className="mt-1 text-xs text-white/60">1</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RevealHiddenBrillianceSurvey;
