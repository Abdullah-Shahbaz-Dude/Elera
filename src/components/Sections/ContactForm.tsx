import React from 'react';
import { useNavigate } from 'react-router-dom';

const SpeakToUs: React.FC = () => {
  const navigate = useNavigate();

  const handleBookMeeting = () => {
    navigate('/contact-us');
  };

  return (
    <section className="relative w-full overflow-hidden bg-black py-12 md:py-24 lg:py-32">
      {/* Background Glow Effects */}
      <div className="absolute right-1/4 top-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-[rgba(96,165,250,0.15)] to-[rgba(147,51,234,0.15)] blur-[400px]"></div>
      <div className="absolute left-1/4 bottom-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-[rgba(167,139,250,0.15)] to-[rgba(147,51,234,0.15)] blur-[400px]"></div>

      <div className="relative container mx-auto px-4 md:px-6 z-10">
        <div className="mx-auto max-w-4xl">
          {/* Modern Section Header */}
          <div className="mb-12 md:mb-16 text-center">
            <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
              Speak to Us
            </h2>
            <div
              className="mx-auto mb-4 md:mb-6 h-1 w-24 md:w-32 rounded-full"
              style={{
                background: 'linear-gradient(to right, #60A5FA, #9333EA)',
              }}
            ></div>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 px-4">
              Ready to transform your workplace? Let's start a conversation.
            </p>
          </div>

          {/* Contact Information Card */}
          <div className="relative mx-auto max-w-2xl">
            <div
              className="relative rounded-2xl md:rounded-3xl overflow-hidden p-[2px]"
              style={{
                background:
                  'linear-gradient(135deg, #60A5FA, #A78BFA, #9333EA)',
                boxShadow: '0 20px 60px rgba(96, 165, 250, 0.3)',
              }}
            >
              <div
                className="relative rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 bg-black/80 backdrop-blur-xl"
                style={{
                  background: 'rgba(0, 0, 0, 0.8)',
                }}
              >
                {/* Email Section */}
                <div className="text-center space-y-6 md:space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3 md:gap-4">
                      <div
                        className="p-3 md:p-4 rounded-xl"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(147, 51, 234, 0.2))',
                        }}
                      >
                        <svg
                          className="w-6 h-6 md:w-8 md:h-8 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-sm md:text-base text-white/70 mb-1">
                          Email us at
                        </p>
                        <a
                          href="mailto:hello@elara.com"
                          className="text-xl md:text-2xl lg:text-3xl font-semibold text-white hover:text-[#60A5FA] transition-colors duration-200"
                        >
                          hello@elara.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center justify-center gap-4">
                    <div
                      className="h-px flex-1 max-w-[100px]"
                      style={{
                        background:
                          'linear-gradient(to right, transparent, rgba(96, 165, 250, 0.5))',
                      }}
                    ></div>
                    <span className="text-white/50 text-sm">or</span>
                    <div
                      className="h-px flex-1 max-w-[100px]"
                      style={{
                        background:
                          'linear-gradient(to left, transparent, rgba(96, 165, 250, 0.5))',
                      }}
                    ></div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-2">
                    <button
                      onClick={handleBookMeeting}
                      className="group relative rounded-xl px-8 md:px-12 py-4 md:py-5 text-base md:text-lg font-semibold text-white shadow-xl transition-all hover:scale-105 active:scale-95 w-full md:w-auto min-w-[200px]"
                      style={{
                        background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                        boxShadow: '0 8px 32px rgba(96, 165, 250, 0.4)',
                      }}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Complete Booking Form
                        <svg
                          className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeakToUs;
