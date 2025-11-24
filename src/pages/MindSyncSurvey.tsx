import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logoImage } from '@/assets/images';

interface Question {
  id: number;
  text: string;
  options: string[];
}

const MindSyncSurvey: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const questionCardRef = useRef<HTMLDivElement>(null);

  // Sample questions with varying numbers of options
  const questions: Question[] = [
    {
      id: 1,
      text: 'What is your current role? (Select one)',
      options: [
        'Team leader',
        'Manager',
        'Senior manager',
        'Director',
        'Other',
      ],
    },
    {
      id: 2,
      text: 'How many years of management experience do you have?',
      options: [
        'Less than 1 year',
        '1-3 years',
        '4-6 years',
        '7-10 years',
        '11-15 years',
        '16-20 years',
        'More than 20 years',
      ],
    },
    {
      id: 3,
      text: 'What is your primary industry?',
      options: [
        'Technology',
        'Finance',
        'Healthcare',
        'Education',
        'Retail',
        'Manufacturing',
        'Consulting',
        'Other',
      ],
    },
    {
      id: 4,
      text: 'How familiar are you with the concept of neurodiversity?',
      options: [
        'Very familiar',
        'Somewhat familiar',
        'Not very familiar',
        'Not familiar at all',
      ],
    },
    {
      id: 5,
      text: 'How many team members do you currently manage?',
      options: [
        '1-5',
        '6-10',
        '11-20',
        '21-30',
        '31-50',
        '51-100',
        'More than 100',
      ],
    },
    {
      id: 6,
      text: 'What is your biggest challenge when managing diverse teams?',
      options: [
        'Communication barriers',
        'Different working styles',
        'Accommodating individual needs',
        'Team cohesion',
        'Performance management',
        'Time management',
        'Resource allocation',
        'Other',
      ],
    },
    {
      id: 7,
      text: 'How often do you provide feedback to your team members?',
      options: [
        'Daily',
        'Weekly',
        'Bi-weekly',
        'Monthly',
        'Quarterly',
        'Rarely',
      ],
    },
    {
      id: 8,
      text: 'What training have you received on managing neurodiverse teams?',
      options: [
        'Formal training program',
        'Workshop or seminar',
        'Online course',
        'Self-study',
        'No training',
        'Other',
      ],
    },
    {
      id: 9,
      text: 'How confident are you in identifying and supporting neurodiverse team members?',
      options: [
        'Very confident',
        'Somewhat confident',
        'Neutral',
        'Not very confident',
        'Not confident at all',
      ],
    },
    {
      id: 10,
      text: 'What resources would be most helpful for managing neurodiverse teams?',
      options: [
        'Training programs',
        'Assessment tools',
        'Consultation services',
        'Online resources',
        'Peer support groups',
        'Best practice guides',
        'Software tools',
        'Other',
      ],
    },
  ];

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion.id];

  const handleOptionSelect = (option: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: option,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Survey completed
      console.log('Survey completed!', answers);
      // TODO: Handle survey completion (submit data, show results, etc.)
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      navigate('/survey/mind-sync');
    }
  };

  const isNextDisabled = !selectedAnswer;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  // Scroll to question card when question changes
  useEffect(() => {
    if (questionCardRef.current) {
      questionCardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }, [currentQuestionIndex]);

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
      <main className="relative z-10 mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
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

        {/* Survey Title */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
            Mindsync Survey - Manager and Team Leader Neurodiversity Awareness
          </h1>
          <p className="text-base md:text-lg text-white/80">
            Answer some simple questions to uncover your cognitive strengths and
            untapped work potential
          </p>
        </div>

        {/* Question Card */}
        <div
          ref={questionCardRef}
          className="relative rounded-2xl md:rounded-3xl overflow-hidden mb-8"
          style={{
            background: 'linear-gradient(135deg, #60A5FA, #A78BFA, #9333EA)',
            boxShadow: '0 20px 60px rgba(96, 165, 250, 0.3)',
            padding: '2px',
          }}
        >
          <div
            className="relative h-full w-full rounded-2xl md:rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="p-6 md:p-8 lg:p-10">
              {/* Progress Indicator */}
              <div className="mb-6 text-sm md:text-base font-medium text-white/60">
                {currentQuestionIndex + 1} / {totalQuestions}
              </div>

              {/* Question */}
              <h2 className="mb-6 md:mb-8 text-xl md:text-2xl lg:text-3xl font-bold text-white">
                {currentQuestion.text}
              </h2>

              {/* Answer Options */}
              <div className="space-y-3 md:space-y-4 max-h-[500px] overflow-y-auto px-3 py-2">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(option)}
                      className={`w-full text-left p-4 md:p-5 rounded-xl md:rounded-2xl border-2 transition-all duration-300 ${
                        isSelected
                          ? 'border-[#60A5FA] text-white scale-[1.02]'
                          : 'bg-white/5 border-white/20 text-white/90 hover:border-[#60A5FA]/50 hover:bg-white/10'
                      }`}
                      style={{
                        background: isSelected
                          ? 'rgba(96, 165, 250, 0.15)'
                          : undefined,
                      }}
                    >
                      <span className="text-base md:text-lg font-medium">
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Decorative Corner Glow */}
            <div
              className="absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl opacity-20"
              style={{
                background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
              }}
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-semibold text-[#60A5FA] hover:text-white transition-all duration-300"
            style={{
              background: 'rgba(96, 165, 250, 0.1)',
              border: '1px solid rgba(96, 165, 250, 0.3)',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            disabled={isNextDisabled}
            className={`flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-semibold text-white shadow-xl transition-all duration-300 ${
              isNextDisabled
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:scale-105 active:scale-95'
            }`}
            style={{
              background: isNextDisabled
                ? 'rgba(96, 165, 250, 0.3)'
                : 'linear-gradient(135deg, #60A5FA, #9333EA)',
              boxShadow: isNextDisabled
                ? 'none'
                : '0 8px 32px rgba(96, 165, 250, 0.4)',
            }}
          >
            <span>{isLastQuestion ? 'Complete' : 'Next'}</span>
            {!isLastQuestion && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </main>
    </div>
  );
};

export default MindSyncSurvey;
