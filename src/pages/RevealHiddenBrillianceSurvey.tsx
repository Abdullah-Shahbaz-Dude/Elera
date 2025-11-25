import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logoImage } from '@/assets/images';
import {
  questions,
  sections,
  totalQuestions,
  Question,
} from '@/data/revealHiddenBrillianceQuestions';
import { getQuestionIcon } from '@/components/Icons/QuestionIcons';

const RevealHiddenBrillianceSurvey: React.FC = () => {
  const navigate = useNavigate();

  // Section 1 form data
  const [formData, setFormData] = useState({
    fullName: '',
    industrySector: '',
    managersName: '',
    gender: '',
    departmentTeam: '',
    jobTitleRole: '',
    age: '',
  });

  // Survey state
  const [currentSection, setCurrentSection] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{
    [key: number]:
      | string
      | string[]
      | { atWork?: string[]; outsideWork?: string[] };
  }>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);

  // Ref for question container to scroll into view
  const questionContainerRef = useRef<HTMLDivElement>(null);

  // Get current question
  const currentQuestion: Question | null =
    currentSection === 1 ? null : questions[currentQuestionIndex] || null;

  // Calculate progress
  useEffect(() => {
    if (currentSection === 1) {
      // Section 1: Show 0% initially, will animate to 100% on completion
      setProgressPercentage(0);
    } else if (currentQuestion) {
      // Questions: Calculate cumulative progress
      const questionNumber = currentQuestion.id;
      const progress = (questionNumber / totalQuestions) * 100;
      setProgressPercentage(progress);
    }
  }, [currentSection, currentQuestionIndex, currentQuestion]);

  // Scroll to question container when question changes with header offset
  useEffect(() => {
    if (
      !isTransitioning &&
      questionContainerRef.current &&
      (currentSection > 1 || currentQuestionIndex > 0)
    ) {
      // Delay to ensure DOM has updated and transition is complete
      const timer = setTimeout(() => {
        if (questionContainerRef.current) {
          // Get header height dynamically or use estimated offset
          const header = document.querySelector('header');
          const headerHeight = header ? header.offsetHeight : 120;

          // Calculate position with offset
          const elementPosition =
            questionContainerRef.current.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerHeight - 20; // 20px extra padding

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [currentSection, currentQuestionIndex, isTransitioning]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuestionAnswer = (
    questionId: number,
    value: string | string[] | { atWork?: string[]; outsideWork?: string[] }
  ) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const validateSection1 = (): boolean => {
    return !!(
      formData.fullName &&
      formData.industrySector &&
      formData.managersName &&
      formData.gender &&
      formData.departmentTeam &&
      formData.jobTitleRole &&
      formData.age
    );
  };

  const validateCurrentQuestion = (): boolean => {
    if (!currentQuestion) return false;
    if (currentQuestion.required === false) return true;

    const answer = answers[currentQuestion.id];
    if (currentQuestion.type === 'multiple-choice') {
      return Array.isArray(answer) && answer.length > 0;
    }
    if (currentQuestion.type === 'dual-multiple-choice') {
      const dualAnswer = answer as
        | { atWork?: string[]; outsideWork?: string[] }
        | undefined;
      if (!dualAnswer) return false;
      return (
        (dualAnswer.atWork && dualAnswer.atWork.length > 0) ||
        (dualAnswer.outsideWork && dualAnswer.outsideWork.length > 0) ||
        false
      );
    }
    return !!answer;
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate current step
    if (currentSection === 1) {
      if (!validateSection1()) {
        alert('Please fill in all required fields');
        return;
      }
    } else if (currentQuestion) {
      if (!validateCurrentQuestion()) {
        alert('Please select an answer');
        return;
      }
    }

    // Start transition
    setIsTransitioning(true);

    // Animate progress bar
    if (currentSection === 1) {
      // Section 1: Animate to 100%
      setProgressPercentage(100);
      // Wait for animation to complete
      await new Promise((resolve) => setTimeout(resolve, 800));
    } else {
      // Questions: Animate to next question's progress
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        const nextQuestion = questions[nextQuestionIndex];
        const nextProgress = (nextQuestion.id / totalQuestions) * 100;
        setProgressPercentage(nextProgress);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    // Advance to next step
    if (currentSection === 1) {
      // Move to Section 2, Question 1
      setCurrentSection(2);
      setCurrentQuestionIndex(0);
      setProgressPercentage((questions[0].id / totalQuestions) * 100);
    } else if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const nextQuestion = questions[currentQuestionIndex + 1];
      if (nextQuestion.section !== currentQuestion?.section) {
        setCurrentSection(nextQuestion.section);
      }
    } else {
      // Survey completed
      console.log('Survey completed!', { formData, answers });
      // TODO: Handle survey completion
      alert('Survey completed! Thank you for your responses.');
    }

    setIsTransitioning(false);
  };

  const handleBack = () => {
    if (currentSection === 1) {
      navigate('/dashboard');
    } else if (currentQuestionIndex > 0) {
      const prevQuestionIndex = currentQuestionIndex - 1;
      const prevQuestion = questions[prevQuestionIndex];
      setCurrentQuestionIndex(prevQuestionIndex);
      setCurrentSection(prevQuestion.section);
      const prevProgress = (prevQuestion.id / totalQuestions) * 100;
      setProgressPercentage(prevProgress);
    } else {
      // Go back to Section 1
      setCurrentSection(1);
      setCurrentQuestionIndex(0);
      setProgressPercentage(0);
    }
  };

  // Get icon color based on selection state
  const getIconColor = (isSelected: boolean, _iconName?: string): string => {
    // Selected icons: blue gradient color
    if (isSelected) return '#60A5FA';

    // All unselected icons: same neutral color for consistency
    return 'rgba(255, 255, 255, 0.6)';
  };

  // Render icon with professional styling
  const renderIcon = (
    iconName: string | undefined,
    isSelected: boolean,
    size: number = 24
  ) => {
    const iconColor = getIconColor(isSelected, iconName);
    const icon = getQuestionIcon(iconName, { size, color: iconColor });

    return (
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
          isSelected
            ? 'bg-gradient-to-br from-[#60A5FA]/20 to-[#9333EA]/20 border-2 border-[#60A5FA]/50'
            : 'bg-white/5 border border-white/10'
        }`}
      >
        {icon}
      </div>
    );
  };

  // Render single choice question
  const renderSingleChoice = (question: Question) => {
    const selectedAnswer = answers[question.id] as string | undefined;
    const useGrid = (question.options?.length || 0) > 6;
    return (
      <div
        className={
          useGrid
            ? 'grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3'
            : 'space-y-2 md:space-y-3'
        }
      >
        {question.options?.map((option) => {
          const isSelected = selectedAnswer === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleQuestionAnswer(question.id, option.value)}
              className={`group w-full ${
                useGrid ? 'h-full' : ''
              } flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl border-2 transition-all duration-300 ${
                isSelected
                  ? 'border-[#60A5FA] bg-gradient-to-r from-[#60A5FA]/20 via-[#9333EA]/15 to-[#60A5FA]/20 scale-[1.02]'
                  : 'border-white/20 bg-white/5 hover:border-[#60A5FA]/40 hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 hover:shadow-lg hover:scale-[1.01]'
              }`}
              style={{
                backdropFilter: 'blur(10px)',
              }}
            >
              {renderIcon(option.icon, isSelected)}
              <span
                className={`flex-grow text-left font-medium transition-colors duration-300 ${
                  isSelected
                    ? 'text-white'
                    : 'text-white/90 group-hover:text-white'
                }`}
              >
                {option.label}
              </span>
              {isSelected && (
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#9333EA] flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12l4 4 10-10"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  // Render multiple choice question
  const renderMultipleChoice = (question: Question) => {
    const selectedAnswers = (answers[question.id] as string[]) || [];
    const useGrid = (question.options?.length || 0) > 6;
    return (
      <div
        className={
          useGrid
            ? 'grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3'
            : 'space-y-2 md:space-y-3'
        }
      >
        {question.options?.map((option) => {
          const isSelected = selectedAnswers.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                const newAnswers = isSelected
                  ? selectedAnswers.filter((a) => a !== option.value)
                  : [...selectedAnswers, option.value];
                handleQuestionAnswer(question.id, newAnswers);
              }}
              className={`group w-full ${
                useGrid ? 'h-full' : ''
              } flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl border-2 transition-all duration-300 ${
                isSelected
                  ? 'border-[#60A5FA] bg-gradient-to-r from-[#60A5FA]/20 via-[#9333EA]/15 to-[#60A5FA]/20 scale-[1.02]'
                  : 'border-white/20 bg-white/5 hover:border-[#60A5FA]/40 hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 hover:shadow-lg hover:scale-[1.01]'
              }`}
              style={{
                backdropFilter: 'blur(10px)',
              }}
            >
              {renderIcon(option.icon, isSelected)}
              <span
                className={`flex-grow text-left font-medium transition-colors duration-300 ${
                  isSelected
                    ? 'text-white'
                    : 'text-white/90 group-hover:text-white'
                }`}
              >
                {option.label}
              </span>
              <div
                className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? 'border-[#60A5FA] bg-gradient-to-br from-[#60A5FA] to-[#9333EA]'
                    : 'border-white/40 bg-white/5 group-hover:border-white/60'
                }`}
              >
                {isSelected && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12l4 4 10-10"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  // Render dual multiple choice (At Work / Outside of Work)
  const renderDualMultipleChoice = (question: Question) => {
    const answerData =
      (answers[question.id] as { atWork?: string[]; outsideWork?: string[] }) ||
      {};
    const atWorkAnswers = answerData.atWork || [];
    const outsideWorkAnswers = answerData.outsideWork || [];
    const useGrid = (question.options?.length || 0) > 6;

    const handleDualAnswer = (
      context: 'atWork' | 'outsideWork',
      value: string
    ) => {
      const currentAnswers =
        context === 'atWork' ? atWorkAnswers : outsideWorkAnswers;
      const newAnswers = currentAnswers.includes(value)
        ? currentAnswers.filter((a) => a !== value)
        : [...currentAnswers, value];

      handleQuestionAnswer(question.id, {
        ...answerData,
        [context]: newAnswers,
      });
    };

    return (
      <div className="space-y-6 md:space-y-8">
        {/* At Work Section */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-white mb-4 md:mb-5 bg-gradient-to-r from-[#60A5FA] to-[#9333EA] bg-clip-text text-transparent">
            At Work:
          </h3>
          <div
            className={
              useGrid
                ? 'grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3'
                : 'space-y-2 md:space-y-3'
            }
          >
            {question.options?.map((option) => {
              const isSelected = atWorkAnswers.includes(option.value);
              return (
                <button
                  key={`atWork-${option.value}`}
                  type="button"
                  onClick={() => handleDualAnswer('atWork', option.value)}
                  className={`group w-full ${
                    useGrid ? 'h-full' : ''
                  } flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl border-2 transition-all duration-300 ${
                    isSelected
                      ? 'border-[#8B5CF6] bg-gradient-to-r from-[#6366F1]/25 via-[#8B5CF6]/20 to-[#9333EA]/25 shadow-xl shadow-[#8B5CF6]/25 scale-[1.02]'
                      : 'border-white/20 bg-white/5 hover:border-[#60A5FA]/40 hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 hover:shadow-lg hover:scale-[1.01]'
                  }`}
                  style={{
                    backdropFilter: 'blur(10px)',
                    boxShadow: isSelected
                      ? '0 10px 40px rgba(139, 92, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
                      : '0 2px 12px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {renderIcon(option.icon, isSelected)}
                  <span
                    className={`flex-grow text-left font-medium transition-colors duration-300 ${
                      isSelected
                        ? 'text-white'
                        : 'text-white/90 group-hover:text-white'
                    }`}
                  >
                    {option.label}
                  </span>
                  <div
                    className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'border-[#8B5CF6] bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#9333EA] shadow-lg shadow-[#8B5CF6]/40'
                        : 'border-white/40 bg-white/5 group-hover:border-white/60'
                    }`}
                  >
                    {isSelected && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 12l4 4 10-10"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Outside of Work Section */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-white mb-4 md:mb-5 bg-gradient-to-r from-[#60A5FA] to-[#9333EA] bg-clip-text text-transparent">
            Outside of Work:
          </h3>
          <div
            className={
              useGrid
                ? 'grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3'
                : 'space-y-2 md:space-y-3'
            }
          >
            {question.options?.map((option) => {
              const isSelected = outsideWorkAnswers.includes(option.value);
              return (
                <button
                  key={`outsideWork-${option.value}`}
                  type="button"
                  onClick={() => handleDualAnswer('outsideWork', option.value)}
                  className={`group w-full ${
                    useGrid ? 'h-full' : ''
                  } flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl border-2 transition-all duration-300 ${
                    isSelected
                      ? 'border-[#8B5CF6] bg-gradient-to-r from-[#6366F1]/25 via-[#8B5CF6]/20 to-[#9333EA]/25 shadow-xl shadow-[#8B5CF6]/25 scale-[1.02]'
                      : 'border-white/20 bg-white/5 hover:border-[#60A5FA]/40 hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 hover:shadow-lg hover:scale-[1.01]'
                  }`}
                  style={{
                    backdropFilter: 'blur(10px)',
                    boxShadow: isSelected
                      ? '0 10px 40px rgba(139, 92, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
                      : '0 2px 12px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {renderIcon(option.icon, isSelected)}
                  <span
                    className={`flex-grow text-left font-medium transition-colors duration-300 ${
                      isSelected
                        ? 'text-white'
                        : 'text-white/90 group-hover:text-white'
                    }`}
                  >
                    {option.label}
                  </span>
                  <div
                    className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'border-[#8B5CF6] bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#9333EA] shadow-lg shadow-[#8B5CF6]/40'
                        : 'border-white/40 bg-white/5 group-hover:border-white/60'
                    }`}
                  >
                    {isSelected && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 12l4 4 10-10"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Render text input question
  const renderTextInput = (question: Question) => {
    const answer = (answers[question.id] as string) || '';
    return (
      <textarea
        value={answer}
        onChange={(e) => handleQuestionAnswer(question.id, e.target.value)}
        placeholder={question.placeholder || 'Enter your answer here...'}
        className="w-full min-h-[140px] md:min-h-[160px] rounded-xl md:rounded-2xl border-2 border-white/20 bg-white/5 px-5 md:px-6 py-4 md:py-5 text-sm md:text-base text-white placeholder:text-white/40 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:border-[#60A5FA]/50 focus:bg-white/10 focus:ring-2 focus:ring-[#60A5FA]/30 resize-none shadow-lg"
        style={{
          boxShadow:
            '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        }}
      />
    );
  };

  // Get current section name
  const currentSectionName =
    sections.find((s) => s.id === currentSection)?.name || '';

  // Calculate question number for display
  const questionNumber = currentQuestion ? currentQuestion.id : 0;

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
          Reveal Hidden Brilliance Survey
        </h1>

        {/* Form Card */}
        <div ref={questionContainerRef} className="relative mx-auto max-w-5xl">
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
              {/* Section 1: Form */}
              {currentSection === 1 && (
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
                            <option
                              value="other"
                              className="bg-black text-white"
                            >
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
                            <option
                              value="male"
                              className="bg-black text-white"
                            >
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
                            <option
                              value="18-24"
                              className="bg-black text-white"
                            >
                              18-24
                            </option>
                            <option
                              value="25-34"
                              className="bg-black text-white"
                            >
                              25-34
                            </option>
                            <option
                              value="35-44"
                              className="bg-black text-white"
                            >
                              35-44
                            </option>
                            <option
                              value="45-54"
                              className="bg-black text-white"
                            >
                              45-54
                            </option>
                            <option
                              value="55-64"
                              className="bg-black text-white"
                            >
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
                      disabled={isTransitioning}
                      className="rounded-xl px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-semibold text-white shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                        boxShadow: '0 8px 32px rgba(96, 165, 250, 0.4)',
                      }}
                    >
                      Next →
                    </button>
                  </div>
                </form>
              )}

              {/* Questions Section 2+ */}
              {currentSection > 1 && currentQuestion && (
                <form onSubmit={handleNext} className="relative z-10">
                  {/* Question Text */}
                  <h2 className="mb-6 md:mb-8 text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                    <span className="bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent">
                      {currentQuestion.text}
                    </span>
                  </h2>

                  {/* Question Options/Input */}
                  <div className="mb-6">
                    {currentQuestion.type === 'single-choice' &&
                      renderSingleChoice(currentQuestion)}
                    {currentQuestion.type === 'multiple-choice' &&
                      renderMultipleChoice(currentQuestion)}
                    {currentQuestion.type === 'dual-multiple-choice' &&
                      renderDualMultipleChoice(currentQuestion)}
                    {currentQuestion.type === 'text-input' &&
                      renderTextInput(currentQuestion)}
                  </div>

                  {/* Info Box */}
                  {currentQuestion.type !== 'text-input' && (
                    <div
                      className="mb-6 p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-r from-[#60A5FA]/10 via-[#9333EA]/5 to-[#60A5FA]/10 border border-[#60A5FA]/30 flex items-start gap-2 md:gap-3 backdrop-blur-sm"
                      style={{
                        boxShadow:
                          '0 4px 16px rgba(96, 165, 250, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#9333EA] flex items-center justify-center mt-0.5">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-white"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                          />
                          <path
                            d="M12 16v-4M12 8h.01"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <p className="text-sm md:text-base text-white/90 leading-relaxed">
                        {currentQuestion.type === 'single-choice'
                          ? 'Only one option is allowed. This helps us understand different thinking patterns.'
                          : 'You can select multiple options.'}
                      </p>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center mt-8 md:mt-10">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 md:px-8 py-3 md:py-4 rounded-xl text-white/90 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={isTransitioning || !validateCurrentQuestion()}
                      className="rounded-xl px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-semibold text-white shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                        boxShadow: '0 8px 32px rgba(96, 165, 250, 0.4)',
                      }}
                    >
                      Next →
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 md:mt-12">
          <div className="mx-auto max-w-2xl">
            {/* Section Title */}
            <div className="mb-4 text-center">
              <p className="text-base md:text-lg font-semibold text-white">
                {currentSection === 1
                  ? 'Section 1: About You'
                  : `Section ${currentSection}: ${currentSectionName}`}
              </p>
              {currentSection > 1 && currentQuestion && (
                <p className="mt-2 text-sm md:text-base text-white/60">
                  Question {questionNumber} of {totalQuestions}
                </p>
              )}
            </div>

            {/* Progress Bar Container */}
            <div className="relative">
              {/* Background Bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10 backdrop-blur-sm">
                {/* Progress Fill */}
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${progressPercentage}%`,
                    background:
                      'linear-gradient(90deg, #60A5FA, #A78BFA, #9333EA)',
                    boxShadow: '0 0 20px rgba(96, 165, 250, 0.5)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RevealHiddenBrillianceSurvey;
