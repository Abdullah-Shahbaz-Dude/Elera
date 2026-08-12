import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import VideoLessonPlayer from '../components/VideoLessonPlayer';
import moduleBgImage from '../../assets/images/Module-1/module-1.jpg';
import structureLearnImage from '../../assets/images/mindsync/6.jpg';
import structurePracticeImage from '../../assets/images/mindsync/Untitled design.jpg';
import structureTakeawayImage from '../../assets/images/mindsync/7.jpg';
import scenario1Image from '../../assets/images/mindsync/3.jpg';
import scenario2Image from '../../assets/images/mindsync/4.jpg';
import scenario3Image from '../../assets/images/mindsync/1.jpg';
import logoFav from '../../assets/images/logo/logo-fav-removebg-preview.png';

type ScreenType =
  | 'landing'
  | 'cover'
  | 'text'
  | 'bullets'
  | 'divider'
  | 'video'
  | 'accordion'
  | 'key'
  | 'technique'
  | 'technique_intro'
  | 'technique_honest'
  | 'timeline'
  | 'scenario_situation'
  | 'scenario_choose'
  | 'scenario_feedback'
  | 'takeaway'
  | 'closing'
  | 'research';

type TechniqueStateCard = {
  state: 'green' | 'amber' | 'red';
  label: string;
  description: string;
};

type TechniqueStep = {
  number: number;
  title: string;
  body: string;
  bodyExtra?: string;
  expand?: DropdownItem;
  showTrafficLight?: boolean;
  stateCards?: TechniqueStateCard[];
};

type DropdownItem = {
  header: string;
  body: string;
};

type TimelineStep = {
  shortLabel: string;
  icon: string;
  header: string;
  body: string;
  keyInsight: string;
  image: string;
};

type DropdownProps = DropdownItem & {
  dropdownId: string;
  onOpenChange?: (dropdownId: string, open: boolean) => void;
  containerClassName?: string;
  buttonClassName?: string;
  bodyClassName?: string;
  variant?: 'default' | 'cover';
  fullExpand?: boolean;
};

function isDropdownOpenForScreen(
  openDropdownIds: Set<string>,
  screenId: number
) {
  const prefix = `${screenId}:`;
  for (const id of openDropdownIds) {
    if (id.startsWith(prefix)) return true;
  }
  return false;
}

type ScenarioOptionKey = 'A' | 'B' | 'C' | 'D';

type Scenario = {
  id: 1 | 2 | 3;
  title: string;
  situation: string;
  question: string;
  options: Record<ScenarioOptionKey, string>;
  feedback: Record<ScenarioOptionKey, string>;
  point: string;
};

type Screen = {
  id: number;
  type: ScreenType;
  t1?: string;
  t2?: string;
  t3?: string;
  lead?: string;
  body?: string;
  bullets?: string[];
  dropdowns?: DropdownItem[];
  accordionTitle?: string;
  accordionItems?: DropdownItem[];
  keyPoint?: string;
  videoTitle?: string;
  videoUrl?: string | null;
  videoPrompt?: string;
  transcriptDropdown?: DropdownItem;
  scenarioId?: 1 | 2 | 3;
  takeawayHeading?: string;
  takeawayBody?: string;
  closingBody?: string;
  techniqueSteps?: TechniqueStep[];
  timelineSteps?: TimelineStep[];
  /** Optional explicit purple header title for this block (overrides auto-derived title). */
  headerTitle?: string;
  watchIntro?: {
    headline: string;
    // before: { version: string; timing: string; description: string };
    // after: { version: string; timing: string; description: string };
    // footer: string;
  };
};

type SidebarSectionKey =
  | 'introduction'
  | 'research'
  | 'watch'
  | 'learn'
  | 'practise'
  | 'takeaway'
  | 'closing';

type WatchIntroPhase =
  | 'center'
  | 'header'
  | 'reveal_intro'
  | 'intro'
  | 'fade_out_intro'
  | 'done';

type TechniqueIntroPhase =
  | 'center'
  | 'header'
  | 'paragraph'
  | 'reveal'
  | 'done';

type ScenarioIntroPhase =
  | 'center'
  | 'header'
  | 'reveal_situation'
  | 'situation'
  | 'reveal_options'
  | 'done';

type SidebarSection = {
  key: SidebarSectionKey;
  label: string;
  indices: number[];
  landingBlockId?: number;
};

/** Sidebar Module Contents labels — edit here only for the right-hand nav. */
const SIDEBAR_SECTION_LABELS: Record<SidebarSectionKey, string> = {
  introduction: 'Introduction',
  research: 'Research',
  watch: 'Part 1. Watch',
  learn: 'Part 2. Learn',
  practise: 'Part 3. Practise',
  takeaway: 'Part 4. Your Take Away Card',
  closing: 'Closing',
};

/** Large purple header — section fallback when a block has no own title. */
const MODULE_HEADER_TITLES: Record<SidebarSectionKey, string> = {
  introduction: 'What you will learn on this module',
  research: 'The research behind the technique',
  watch: 'The three second pause in action',
  learn: 'Underneath the behaviour: three states',
  practise: 'Part 3. Practise',
  takeaway: 'Part 4. Take Away ',
  closing: 'Closing',
};

const SCENARIO_MAIN_TITLE = "Let's put the learning into practice";
const SCENARIO_CALLOUT_KEY = 'mindsync-m1-scenario-callout-done';
const MODULE_READ_ALOUD_KEY = 'mindsync-m1-read-aloud';

/**
 * Per-block purple header overrides (by block id).
 * Edit here for a specific screen; sidebar labels are not affected.
 * Omit a block to auto-use screen.headerTitle, t3, t2, or scenario title.
 */
const MODULE_BLOCK_HEADER_TITLES: Partial<Record<number, string>> = {
  3: 'What You Will Learn On This Module',
  4: 'The Research Behind The Technique',
  5: 'The Three Second Pause In Action',
  7: 'Underneath The Behaviour: Three States',
  17: 'The Technique. The Three Second Pause',
};

const RESEARCH_SOURCES_HEADER = 'Read the research in full';

const RESEARCH_EVIDENCE_DROPDOWNS: DropdownItem[] = [
  {
    header: 'The evidence behind the three second pause',
    body: 'In 1974, an education researcher called Mary Budd Rowe recorded and timed hundreds of classroom exchanges. She found that teachers, on average, wait only about one second before they respond.\n\nWhen she coached them to hold that pause for three seconds or more, the classroom changed. Pupils gave longer answers, more pupils joined in, and the pupils who usually said nothing began to contribute.\n\nRowe was studying the pause after a question, not the pause before responding to a pupil in distress. So we use her finding as the principle behind the technique, not as a study of behaviour. The lesson holds either way: a few deliberate seconds change what happens next.\n\nThree seconds is long enough to interrupt your reflex, and short enough to be realistic in a live classroom.',
  },
  {
    header: 'UK Neurodivergence Task and Finish Group findings',
    body: 'An independent group of experts, commissioned by the government and chaired by Professor Karen Guldberg of the University of Birmingham, reviewed how to support neurodivergent children in mainstream schools.\n\nIt found that neurodivergent pupils face much higher rates of suspension and absence, and it called for behaviour policies to be rooted in an inclusive culture that values understanding, acceptance and curiosity. This module is one small part of that shift.',
  },
  {
    header: 'School distress research',
    body: 'Sinéad Mullally and colleagues at Newcastle University studied children who struggle to attend school. In their sample, more than nine in ten of these children were neurodivergent, and the distress driving their absence was too often missed or misread.\n\nIt is a powerful reminder that behaviour which looks like refusal is frequently distress that has not yet been understood.',
  },
  {
    header: RESEARCH_SOURCES_HEADER,
    body: 'If you would like to go deeper, the full sources are here. Each opens in a new tab.',
  },
];

function getDerivedBlockHeaderTitle(screen: Screen): string | undefined {
  if (screen.headerTitle?.trim()) return screen.headerTitle.trim();

  if (
    (screen.type === 'scenario_situation' ||
      screen.type === 'scenario_choose' ||
      screen.type === 'scenario_feedback') &&
    screen.scenarioId
  ) {
    return SCENARIO_MAIN_TITLE;
  }

  if (screen.type === 'takeaway') {
    return MODULE_HEADER_TITLES.takeaway;
  }

  if (screen.type === 'closing') {
    return screen.t2 ?? MODULE_HEADER_TITLES.closing;
  }

  if (screen.type === 'technique_intro' || screen.type === 'technique') {
    return screen.t2;
  }

  if (screen.t3?.trim()) return screen.t3.trim();

  if (screen.t2?.trim() && !/^part\s+\d/i.test(screen.t2.trim())) {
    return screen.t2.trim();
  }

  return undefined;
}

function isPractiseScenarioScreen(screen: Screen): boolean {
  return (
    screen.type === 'scenario_situation' ||
    screen.type === 'scenario_choose' ||
    screen.type === 'scenario_feedback'
  );
}

function shouldSkipPractiseScenarioNavTransition(
  from: Screen,
  to: Screen
): boolean {
  return (
    to.type === 'scenario_situation' &&
    isPractiseScenarioScreen(from) &&
    from.scenarioId !== undefined &&
    to.scenarioId !== undefined &&
    from.scenarioId !== to.scenarioId
  );
}

function getModulePageTitle(
  screen: Screen,
  activeSidebarSectionKey: SidebarSectionKey | null
): string {
  const blockOverride = MODULE_BLOCK_HEADER_TITLES[screen.id];
  if (blockOverride) return blockOverride;

  const derived = getDerivedBlockHeaderTitle(screen);
  if (derived) return derived;

  if (activeSidebarSectionKey) {
    return MODULE_HEADER_TITLES[activeSidebarSectionKey];
  }
  return 'MODULE 1 – THE THREE SECOND PAUSE';
}

function isSameAsBlockHeader(
  text: string | undefined,
  screen: Screen,
  activeSidebarSectionKey: SidebarSectionKey | null
): boolean {
  if (!text?.trim()) return false;
  return (
    text.trim().toLowerCase() ===
    getModulePageTitle(screen, activeSidebarSectionKey).trim().toLowerCase()
  );
}

function isPartTitleDuplicate(
  t1: string | undefined,
  sectionKey: SidebarSectionKey | null
): boolean {
  if (!t1 || !sectionKey) return false;
  const normalized = t1.trim().toLowerCase();
  const headerPrefix = MODULE_HEADER_TITLES[sectionKey]
    .toLowerCase()
    .slice(0, 8);
  const sidebarPrefix = SIDEBAR_SECTION_LABELS[sectionKey]
    .toLowerCase()
    .slice(0, 8);
  return (
    normalized.startsWith(headerPrefix) || normalized.startsWith(sidebarPrefix)
  );
}

function ModulePartTitle({
  title,
  blockId: _blockId,
  titleRef,
}: {
  title: string;
  blockId: number;
  titleRef?: React.RefObject<HTMLHeadingElement>;
}) {
  return (
    <div className="mb-1 w-full min-w-0">
      <h1
        ref={titleRef}
        className={`min-w-0 ${MODULE_PART_TITLE_CLASS}`}
        style={MODULE_PART_TITLE_STYLE}
      >
        {title}
      </h1>
    </div>
  );
}

const MODULE_PART_TITLE_CLASS =
  'font-display text-[64px] leading-tight font-bold whitespace-nowrap';
const MODULE_PART_TITLE_COLOR = '#6366F1';
const MODULE_PART_TITLE_STYLE: React.CSSProperties = {
  color: MODULE_PART_TITLE_COLOR,
  fontFamily: 'Arial',
};

type LearningOutcomesPhase = 'center' | 'header' | 'reveal' | 'done';

const CARD_TO_BULLET_DELAY_MS = 1500;
const SPEECH_LEAD_MS = 1500;
const BULLET_GAP_MS = 2000;
const INTRO_TITLE_HEADER_SETTLE_MS = 350;
const BULLET_TYPING_SPEED_MS = 30;
const STEP_STAGGER_MS = 500;
const MODULE_1_MAIN_VIDEO_URL =
  'https://drive.google.com/file/d/11Bp_-ULiJLnF22QHjTu4NRxzTeM28ZuR/view?usp=sharing';

function useTypingText(
  text: string,
  enabled: boolean,
  speedMs = 42,
  whenDisabled: 'full' | 'empty' = 'full'
) {
  const [displayed, setDisplayed] = useState(() =>
    enabled ? '' : whenDisabled === 'empty' ? '' : text
  );
  const [isComplete, setIsComplete] = useState(() =>
    enabled ? false : whenDisabled !== 'empty'
  );

  useLayoutEffect(() => {
    if (!enabled) {
      setDisplayed(whenDisabled === 'empty' ? '' : text);
      setIsComplete(whenDisabled === 'empty' ? false : true);
      return;
    }

    setDisplayed('');
    setIsComplete(false);
    let charIndex = 0;
    const timer = window.setInterval(() => {
      charIndex += 1;
      setDisplayed(text.slice(0, charIndex));
      if (charIndex >= text.length) {
        window.clearInterval(timer);
        setIsComplete(true);
      }
    }, speedMs);

    return () => window.clearInterval(timer);
  }, [text, enabled, speedMs, whenDisabled]);

  return { displayed, isComplete };
}

function getContentCenterStyle(
  contentAreaRef: React.RefObject<HTMLDivElement>
): React.CSSProperties {
  const rect = contentAreaRef.current?.getBoundingClientRect();
  const centerX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  return {
    position: 'fixed',
    left: centerX,
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 50,
    transition: 'none',
  };
}

function getHeaderTrackLeft(
  contentAreaRef: React.RefObject<HTMLDivElement>,
  anchorRef?: React.RefObject<HTMLHeadingElement>
): number {
  const anchor = anchorRef?.current;
  if (anchor) {
    return anchor.getBoundingClientRect().left;
  }

  const rect = contentAreaRef.current?.getBoundingClientRect();
  if (!rect) return 20;

  // Match ModuleInlineHeader: px-5 md:px-14, then max-w-[1200px] mx-auto
  const headerPadding = window.matchMedia('(min-width: 768px)').matches
    ? 56
    : 20;
  const innerWidth = rect.width - headerPadding * 2;
  const maxW = Math.min(1200, innerWidth);
  return rect.left + headerPadding + (innerWidth - maxW) / 2;
}

function getLeftHeaderStyle(
  contentAreaRef: React.RefObject<HTMLDivElement>,
  anchorRef?: React.RefObject<HTMLHeadingElement>
): React.CSSProperties {
  return {
    position: 'fixed',
    left: getHeaderTrackLeft(contentAreaRef, anchorRef),
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 50,
    transition: 'none',
  };
}

function getIntroTitleStyle(
  contentAreaRef: React.RefObject<HTMLDivElement>,
  centerContent: boolean,
  anchorRef?: React.RefObject<HTMLHeadingElement>
): React.CSSProperties {
  return centerContent
    ? getContentCenterStyle(contentAreaRef)
    : getLeftHeaderStyle(contentAreaRef, anchorRef);
}

function snapIntroTitleToAnchor(anchor: HTMLElement): React.CSSProperties {
  const rect = anchor.getBoundingClientRect();
  return {
    position: 'fixed',
    left: rect.left,
    top: rect.top,
    transform: 'none',
    zIndex: 50,
    transition: 'none',
  };
}

function IntroTitleOverlay({
  title,
  phase,
  anchorRef,
  contentAreaRef,
  centerContent,
  displayedText,
  onMoveComplete,
}: {
  title: string;
  phase: 'center' | 'header';
  anchorRef: React.RefObject<HTMLHeadingElement>;
  contentAreaRef: React.RefObject<HTMLDivElement>;
  centerContent: boolean;
  displayedText: string;
  onMoveComplete: () => void;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>(() =>
    getIntroTitleStyle(contentAreaRef, centerContent, anchorRef)
  );

  const applyIntroStyle = useCallback(() => {
    setStyle(getIntroTitleStyle(contentAreaRef, centerContent, anchorRef));
  }, [contentAreaRef, centerContent, anchorRef]);

  useEffect(() => {
    if (phase !== 'center') return;
    applyIntroStyle();
  }, [phase, applyIntroStyle]);

  useEffect(() => {
    if (phase !== 'center') return;

    const handleLayoutChange = () => applyIntroStyle();
    window.addEventListener('resize', handleLayoutChange);

    const contentEl = contentAreaRef.current;
    let observer: ResizeObserver | undefined;
    if (contentEl && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(handleLayoutChange);
      observer.observe(contentEl);
    }

    return () => {
      window.removeEventListener('resize', handleLayoutChange);
      observer?.disconnect();
    };
  }, [phase, applyIntroStyle, contentAreaRef]);

  useEffect(() => {
    if (phase !== 'center' || centerContent) return;

    let raf = 0;
    let cancelled = false;

    const syncToAnchor = () => {
      if (cancelled) return;
      if (anchorRef.current) {
        applyIntroStyle();
        return;
      }
      raf = requestAnimationFrame(syncToAnchor);
    };

    raf = requestAnimationFrame(syncToAnchor);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [phase, centerContent, applyIntroStyle, anchorRef]);

  useEffect(() => {
    if (phase !== 'header') return;

    let cancelled = false;
    let raf1 = 0;
    let raf2 = 0;
    let raf3 = 0;
    let completeTimer = 0;
    let settleTimer = 0;
    let transitionTarget: HTMLHeadingElement | null = null;
    let finished = false;

    const finishMove = () => {
      if (cancelled || finished) return;
      finished = true;
      window.clearTimeout(completeTimer);
      transitionTarget?.removeEventListener(
        'transitionend',
        handleTransitionEnd
      );

      const anchor = anchorRef.current;
      if (anchor) {
        setStyle(snapIntroTitleToAnchor(anchor));
      }
      requestAnimationFrame(() => {
        if (!cancelled) onMoveComplete();
      });
    };

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName !== 'transform') return;
      finishMove();
    };

    raf1 = requestAnimationFrame(() => {
      if (cancelled) return;

      const startStyle = getIntroTitleStyle(
        contentAreaRef,
        centerContent,
        anchorRef
      );
      setStyle(startStyle);

      raf2 = requestAnimationFrame(() => {
        if (cancelled) return;

        settleTimer = window.setTimeout(() => {
          if (cancelled) return;

          const runMove = () => {
            if (cancelled) return;

            const titleEl = titleRef.current;
            const anchor = anchorRef.current;
            if (!titleEl || !anchor) {
              raf3 = requestAnimationFrame(runMove);
              return;
            }

            const titleRect = titleEl.getBoundingClientRect();
            const anchorRect = anchor.getBoundingClientRect();
            const deltaX = anchorRect.left - titleRect.left;
            const deltaY = anchorRect.top - titleRect.top;

            transitionTarget = titleEl;
            titleEl.addEventListener('transitionend', handleTransitionEnd);

            if (centerContent) {
              setStyle({
                ...startStyle,
                transform: `translate(-50%, -50%) translate(${deltaX}px, ${deltaY}px)`,
                transition: 'transform 0.75s ease-in-out',
              });
            } else {
              setStyle({
                ...startStyle,
                transform: `translateY(-50%) translate(${deltaX}px, ${deltaY}px)`,
                transition: 'transform 0.75s ease-in-out',
              });
            }

            completeTimer = window.setTimeout(finishMove, 850);
          };

          runMove();
        }, INTRO_TITLE_HEADER_SETTLE_MS);
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      cancelAnimationFrame(raf3);
      window.clearTimeout(completeTimer);
      window.clearTimeout(settleTimer);
      transitionTarget?.removeEventListener(
        'transitionend',
        handleTransitionEnd
      );
    };
  }, [phase, anchorRef, contentAreaRef, centerContent, onMoveComplete]);

  return createPortal(
    <h1
      ref={titleRef}
      className={`${MODULE_PART_TITLE_CLASS} pointer-events-none`}
      style={{ ...MODULE_PART_TITLE_STYLE, ...style }}
      aria-label={title}
    >
      {displayedText}
    </h1>,
    document.body
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reduced;
}

type ModuleNarrationState = {
  isSpeaking: boolean;
  isPaused: boolean;
  readAloudEnabled: boolean;
};

const moduleNarrationListeners = new Set<() => void>();
let moduleNarrationState: ModuleNarrationState = {
  isSpeaking: false,
  isPaused: false,
  readAloudEnabled: true,
};
let moduleNarrationPendingResolve: (() => void) | null = null;

function readStoredReadAloudPreference(): boolean {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem(MODULE_READ_ALOUD_KEY);
  if (stored === '0') return false;
  if (stored === '1') return true;
  return true;
}

function setModuleNarrationState(patch: Partial<ModuleNarrationState>) {
  moduleNarrationState = { ...moduleNarrationState, ...patch };
  moduleNarrationListeners.forEach((listener) => listener());
}

function subscribeModuleNarration(listener: () => void) {
  moduleNarrationListeners.add(listener);
  return () => moduleNarrationListeners.delete(listener);
}

function getModuleNarrationSnapshot() {
  return moduleNarrationState;
}

function initModuleNarrationPreference() {
  setModuleNarrationState({
    readAloudEnabled: readStoredReadAloudPreference(),
  });
}

if (typeof window !== 'undefined') {
  initModuleNarrationPreference();
}

function useModuleNarration() {
  const state = useSyncExternalStore(
    subscribeModuleNarration,
    getModuleNarrationSnapshot,
    getModuleNarrationSnapshot
  );

  const setReadAloudEnabled = useCallback((enabled: boolean) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(MODULE_READ_ALOUD_KEY, enabled ? '1' : '0');
    }
    if (!enabled) {
      stopAllModuleSpeech();
    }
    setModuleNarrationState({ readAloudEnabled: enabled });
  }, []);

  return { ...state, setReadAloudEnabled };
}

function stopAllModuleSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  moduleNarrationPendingResolve?.();
  moduleNarrationPendingResolve = null;
  setModuleNarrationState({ isSpeaking: false, isPaused: false });
}

function speakTextOnce(text: string) {
  if (typeof window === 'undefined') return;
  if (!('speechSynthesis' in window)) return;
  if (!moduleNarrationState.readAloudEnabled) return;
  const trimmed = text.trim();
  if (!trimmed) return;

  window.speechSynthesis.cancel();
  moduleNarrationPendingResolve?.();
  moduleNarrationPendingResolve = null;

  const utterance = new SpeechSynthesisUtterance(trimmed);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.onstart = () => {
    setModuleNarrationState({ isSpeaking: true, isPaused: false });
  };
  utterance.onend = () => {
    setModuleNarrationState({ isSpeaking: false, isPaused: false });
  };
  utterance.onerror = () => {
    setModuleNarrationState({ isSpeaking: false, isPaused: false });
  };
  window.speechSynthesis.speak(utterance);
}

function speakTextOnceAsync(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }
    if (!('speechSynthesis' in window)) {
      resolve();
      return;
    }
    if (!moduleNarrationState.readAloudEnabled) {
      resolve();
      return;
    }
    const trimmed = text.trim();
    if (!trimmed) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();
    moduleNarrationPendingResolve?.();
    moduleNarrationPendingResolve = null;

    const utterance = new SpeechSynthesisUtterance(trimmed);
    utterance.rate = 1;
    utterance.pitch = 1;

    const finish = () => {
      if (moduleNarrationPendingResolve === finishWrapper) {
        moduleNarrationPendingResolve = null;
      }
      setModuleNarrationState({ isSpeaking: false, isPaused: false });
      resolve();
    };
    const finishWrapper = finish;

    utterance.onstart = () => {
      setModuleNarrationState({ isSpeaking: true, isPaused: false });
    };
    utterance.onend = finish;
    utterance.onerror = finish;
    moduleNarrationPendingResolve = finishWrapper;
    window.speechSynthesis.speak(utterance);
  });
}

function useAutoNarration(text: string, enabled: boolean) {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const lastSpokenTextRef = useRef('');

  const speak = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (!('speechSynthesis' in window)) return;
    if (!enabled) return;
    if (!moduleNarrationState.readAloudEnabled) return;
    if (!text.trim()) return;
    if (lastSpokenTextRef.current === text.trim()) return;

    window.speechSynthesis.cancel();
    moduleNarrationPendingResolve?.();
    moduleNarrationPendingResolve = null;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onstart = () => {
      setModuleNarrationState({ isSpeaking: true, isPaused: false });
    };
    utterance.onend = () => {
      setModuleNarrationState({ isSpeaking: false, isPaused: false });
    };
    utterance.onerror = () => {
      setModuleNarrationState({ isSpeaking: false, isPaused: false });
    };

    lastSpokenTextRef.current = text.trim();
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [enabled, text]);

  useEffect(() => {
    lastSpokenTextRef.current = '';
  }, [text, enabled]);

  useEffect(() => {
    if (!enabled) return;
    speak();
    return () => {
      utteranceRef.current = null;
    };
  }, [enabled, speak]);
}

function ModuleAudioGuide({
  autoNarrationEnabled,
  autoNarrationText,
}: {
  autoNarrationEnabled: boolean;
  autoNarrationText: string;
}) {
  const { isSpeaking, readAloudEnabled, setReadAloudEnabled } =
    useModuleNarration();
  const [expanded, setExpanded] = useState(false);

  useAutoNarration(autoNarrationText, autoNarrationEnabled && readAloudEnabled);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.getVoices();
  }, []);

  const handleToggleReadAloud = () => {
    setReadAloudEnabled(!readAloudEnabled);
  };

  const pillLabel = isSpeaking
    ? 'Reading…'
    : readAloudEnabled
      ? 'Audio guide'
      : 'Audio off';

  return (
    <div
      className="fixed bottom-[92px] right-5 z-[120] max-w-[min(320px,calc(100vw-2.5rem))]"
      aria-live="polite"
    >
      <div
        className={`rounded-2xl border bg-white shadow-[0_12px_30px_rgba(15,23,42,0.12)] overflow-hidden transition-all ${
          isSpeaking ? 'border-[#2E7CF6]/35 ring-2 ring-[#2E7CF6]/20' : 'border-slate-200'
        }`}
      >
        {expanded ? (
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#1F3864]">
                  Audio guide
                </p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {isSpeaking
                    ? 'Reading aloud. Turn off read aloud to stop.'
                    : readAloudEnabled
                      ? 'Content is read aloud as you progress through the module.'
                      : 'Read aloud is off. Turn it on to hear content as you move through the module.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="shrink-0 text-slate-400 hover:text-slate-600"
                aria-label="Close audio guide"
              >
                <span className="material-symbols-outlined text-[20px]">
                  close
                </span>
              </button>
            </div>

            <label className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2.5">
              <span className="text-sm font-medium text-slate-700">
                Read aloud
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={readAloudEnabled}
                onClick={handleToggleReadAloud}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  readAloudEnabled ? 'bg-[#2E7CF6]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    readAloudEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </label>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-2 w-full h-12 pl-3 pr-4 transition-all active:scale-[0.99]"
          aria-label={
            expanded
              ? 'Collapse audio guide'
              : readAloudEnabled
                ? 'Open audio guide controls'
                : 'Read aloud is off — open audio guide'
          }
          aria-expanded={expanded}
        >
          <img
            src="/favicon.png"
            alt=""
            className={`w-8 h-8 shrink-0 ${isSpeaking ? 'animate-pulse' : ''}`}
          />
          <span className="text-xs font-semibold text-[#1F3864] whitespace-nowrap flex-1 text-left">
            {pillLabel}
          </span>
          <span className="material-symbols-outlined text-slate-400 text-[18px] shrink-0">
            {expanded ? 'expand_more' : 'volume_up'}
          </span>
        </button>
      </div>
    </div>
  );
}

function StaticBullet({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-4">
      <ModuleFavicon className="w-7 h-7 mt-0.5 shrink-0" />
      <div className="text-[24px] font-semibold text-slate-900 leading-relaxed">
        {text}
      </div>
    </div>
  );
}

function TypingBullet({
  text,
  enabled,
  onComplete,
}: {
  text: string;
  enabled: boolean;
  onComplete: () => void;
}) {
  const { displayed, isComplete } = useTypingText(
    text,
    enabled,
    BULLET_TYPING_SPEED_MS
  );

  useEffect(() => {
    if (isComplete) onComplete();
  }, [isComplete, onComplete]);

  return (
    <div className="flex items-start gap-4">
      <ModuleFavicon className="w-7 h-7 mt-0.5 shrink-0" />
      <div className="text-[24px] font-semibold text-slate-900 leading-relaxed">
        {displayed}
      </div>
    </div>
  );
}

function LearningOutcomesTapSection({
  title,
  bullets,
  headerTitleAnchorRef,
  contentAreaRef,
  centerContent,
  onCompleteChange,
  onPhaseChange,
}: {
  title: string;
  bullets: string[];
  headerTitleAnchorRef: React.RefObject<HTMLHeadingElement>;
  contentAreaRef: React.RefObject<HTMLDivElement>;
  centerContent: boolean;
  onCompleteChange: (complete: boolean) => void;
  onPhaseChange: (phase: LearningOutcomesPhase) => void;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const skipIntro = prefersReducedMotion;
  const bulletSpeechTimerRef = useRef(0);
  const bulletGapTimerRef = useRef(0);
  const bulletTypingCompleteRef = useRef(false);
  const bulletSpeechCompleteRef = useRef(false);
  const activeBulletIndexRef = useRef<number | null>(null);
  const revealBulletRef = useRef<(index: number) => void>(() => {});

  const [phase, setPhase] = useState<LearningOutcomesPhase>(() =>
    skipIntro ? 'done' : 'center'
  );
  const [revealedCount, setRevealedCount] = useState(() =>
    skipIntro ? bullets.length : 0
  );
  const [cardVisible, setCardVisible] = useState(() => skipIntro);
  const [awaitingFirstBullet, setAwaitingFirstBullet] = useState(false);
  const [activeTypingIndex, setActiveTypingIndex] = useState<number | null>(
    null
  );

  const clearBulletTimers = useCallback(() => {
    window.clearTimeout(bulletSpeechTimerRef.current);
    window.clearTimeout(bulletGapTimerRef.current);
    stopAllModuleSpeech();
  }, []);

  const tryFinishBullet = useCallback(
    (index: number) => {
      if (!bulletTypingCompleteRef.current || !bulletSpeechCompleteRef.current) {
        return;
      }
      if (activeBulletIndexRef.current !== index) return;

      clearBulletTimers();
      const next = index + 1;
      if (next >= bullets.length) {
        setPhase('done');
        return;
      }

      bulletGapTimerRef.current = window.setTimeout(() => {
        revealBulletRef.current(next);
      }, BULLET_GAP_MS);
    },
    [bullets.length, clearBulletTimers]
  );

  const revealBullet = useCallback(
    (index: number) => {
      activeBulletIndexRef.current = index;
      bulletTypingCompleteRef.current = false;
      bulletSpeechCompleteRef.current = false;
      setActiveTypingIndex(index);

      void speakTextOnceAsync(bullets[index] ?? '').then(() => {
        if (activeBulletIndexRef.current !== index) return;
        bulletSpeechCompleteRef.current = true;
        tryFinishBullet(index);
      });
    },
    [bullets, tryFinishBullet]
  );

  revealBulletRef.current = revealBullet;

  const typingEnabled = phase === 'center' && !skipIntro;
  const { displayed: typedTitle, isComplete: typingComplete } = useTypingText(
    title,
    typingEnabled
  );
  const [displayTitle, setDisplayTitle] = useState(title);

  const finishIntro = useCallback(() => {
    clearBulletTimers();
    activeBulletIndexRef.current = null;
    setDisplayTitle(title);
    setCardVisible(true);
    setAwaitingFirstBullet(false);
    setActiveTypingIndex(null);
    setRevealedCount(bullets.length);
    onPhaseChange('done');
    setPhase('done');
  }, [bullets.length, clearBulletTimers, onPhaseChange, title]);

  const handleBulletTyped = useCallback(
    (index: number) => {
      if (activeBulletIndexRef.current !== index) return;

      setRevealedCount(index + 1);
      setActiveTypingIndex(null);
      bulletTypingCompleteRef.current = true;
      tryFinishBullet(index);
    },
    [tryFinishBullet]
  );

  useEffect(() => {
    return () => clearBulletTimers();
  }, [clearBulletTimers]);

  useEffect(() => {
    if (!cardVisible || typeof window === 'undefined') return;
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.getVoices();
  }, [cardVisible]);

  const advanceToHeader = useCallback(() => {
    setDisplayTitle(title);
    onPhaseChange('header');
    setPhase('header');
  }, [onPhaseChange, title]);

  const handleMoveComplete = useCallback(() => {
    onPhaseChange('reveal');
    setPhase('reveal');
  }, [onPhaseChange]);

  const startFirstBulletReveal = useCallback(() => {
    if (cardVisible || awaitingFirstBullet || activeTypingIndex !== null) return;

    setCardVisible(true);
    setAwaitingFirstBullet(true);
    clearBulletTimers();
    bulletSpeechTimerRef.current = window.setTimeout(() => {
      setAwaitingFirstBullet(false);
      revealBulletRef.current(0);
    }, CARD_TO_BULLET_DELAY_MS);
  }, [
    activeTypingIndex,
    awaitingFirstBullet,
    cardVisible,
    clearBulletTimers,
  ]);

  useLayoutEffect(() => {
    onPhaseChange(phase);
    onCompleteChange(phase === 'done' || revealedCount >= bullets.length);
  }, [phase, revealedCount, bullets.length, onPhaseChange, onCompleteChange]);

  useEffect(() => {
    if (phase === 'center') {
      setDisplayTitle(typedTitle);
    }
  }, [phase, typedTitle]);

  useEffect(() => {
    if (phase !== 'center') {
      setDisplayTitle(title);
    }
  }, [phase, title]);

  useEffect(() => {
    if (phase !== 'center' || skipIntro || !typingComplete) return;
    const timer = window.setTimeout(advanceToHeader, 700);
    return () => window.clearTimeout(timer);
  }, [phase, skipIntro, typingComplete, advanceToHeader]);

  useEffect(() => {
    if (phase !== 'reveal' || skipIntro || cardVisible) return;
    startFirstBulletReveal();
  }, [phase, skipIntro, cardVisible, startFirstBulletReveal]);

  const handleCenterTap = () => {
    if (phase === 'center') advanceToHeader();
  };

  const showCard = cardVisible && (phase === 'reveal' || phase === 'done');

  return (
    <div className="relative flex flex-col flex-1 min-h-0 h-full">
      {phase !== 'done' && !skipIntro ? (
        <button
          type="button"
          onClick={finishIntro}
          className="absolute top-0 right-0 z-20 text-sm font-semibold text-[#2E7CF6] hover:text-[#1F3864] transition-colors"
        >
          Skip intro
        </button>
      ) : null}

      {phase === 'center' || phase === 'header' ? (
        <>
          <button
            type="button"
            onClick={handleCenterTap}
            className={`absolute inset-0 z-10 ${
              phase === 'center' ? 'cursor-pointer' : 'pointer-events-none'
            }`}
            aria-label="Continue to learning outcomes"
          />
          <IntroTitleOverlay
            title={title}
            phase={phase}
            anchorRef={headerTitleAnchorRef}
            contentAreaRef={contentAreaRef}
            centerContent={centerContent}
            displayedText={displayTitle}
            onMoveComplete={handleMoveComplete}
          />
        </>
      ) : null}

      {showCard ? (
        <div
          className={`flex flex-col ${centerContent ? 'flex-1 min-h-0' : 'shrink-0'}`}
        >
          <div
            className={`w-full max-w-[1230px] mx-auto flex flex-col ${
              centerContent ? 'flex-1 min-h-0 h-full' : ''
            }`}
          >
            <div
              className={`w-[1230px] max-w-full h-[390px] rounded-2xl border border-[#E5E9F0] ${MODULE_SURFACE} shadow-[0_4px_24px_-4px_rgba(10,31,68,0.08),0_2px_6px_-2px_rgba(10,31,68,0.04)] p-6 md:p-8 border-l-4 border-l-[#2E7CF6] shrink-0 flex flex-col overflow-hidden`}
            >
              <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar space-y-5">
                {bullets.slice(0, revealedCount).map((bullet) => (
                  <StaticBullet key={bullet} text={bullet} />
                ))}
                {activeTypingIndex !== null &&
                activeTypingIndex >= revealedCount ? (
                  <TypingBullet
                    key={`typing-${bullets[activeTypingIndex]}`}
                    text={bullets[activeTypingIndex]}
                    enabled={!skipIntro}
                    onComplete={() => handleBulletTyped(activeTypingIndex)}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const TAKEAWAY_HIGHLIGHT_TEXT =
  '“Yesterday I misunderstood what was going on for you. I should have checked in rather than snapped. I am sorry. You did not deserve that.” No “but”. No explanation. No asking them to apologise back. Then let them go.';

const HIDDEN_NAV_BLOCK_IDS = new Set<number>([
  8, 9, 10, 11, 14, 20, 21, 23, 24, 26, 27,
]);

const MODULE_BG_IMAGE = moduleBgImage;
const MODULE_PAGE_TINT = 'bg-[#F7F9FC]/75';
const MODULE_SURFACE = 'bg-white/30 backdrop-blur-sm ';

function ModulePageBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center opacity-10"
      style={{ backgroundImage: `url(${MODULE_BG_IMAGE})` }}
    />
  );
}

const TECHNIQUE_STEPS: TechniqueStep[] = [
  {
    number: 1,
    title: 'Notice the rise in yourself',
    body: 'The way a pupil behaves may trigger you. A lot of the time you could feel it before you think it. The urge to respond strongly. A sense of being shown up, especially with the class watching. Try your best to notice it but not act on it in the moment.',
  },
  {
    number: 2,
    title: 'Ask yourself one question',
    body: 'Is this pupil in green, amber or red? Often you can read the answer just by looking. If you do need to ask, come alongside them and keep it quiet, so it stays between the two of you: “Is everything ok? You seem a bit somewhere else today.” This approach does not accuse and it does not demand, it just shows you have noticed and gives the pupil an opportunity to feel seen and respond in a way that feels safe and non judgmental.',
  },
  {
    number: 3,
    title: 'Try match your response to the state, not the behaviour',
    body: '• Green: they can make a choice, so this is the calm, firm conversation about what you have asked for.\n\n• Amber: ask a little less for a moment, slow your voice, and offer a small choice.\n\n• Red: ask for almost nothing, give them space rather than solutions, and leave the conversation for later.',
  },
];

const SCENARIO_OPTION_STYLE = {
  card: 'bg-[#EEF4FF]/60 backdrop-blur-sm border-[#2E7CF6]/20',
  badge: 'bg-[#DBEAFE] text-[#1D4ED8] border border-[#2E7CF6]/30',
  badgeSelected: 'bg-[#2E7CF6] text-white border-transparent',
} as const;

const SCENARIOS: Record<1 | 2 | 3, Scenario> = {
  1: {
    id: 1,
    title: 'The Pupil Who Will Not Start',
    situation:
      'It is period three on a Wednesday. You have set your Year 8 class a written task. The room is quiet, most pupils are working. One pupil, clear in your view, is staring at the page. Pen down. No writing. Two minutes have passed since you gave the instruction. You walked past once and gave a gentle prompt. Nothing changed. The pupils on either side of her have started. You have about ten seconds before you decide what to do.',
    question: 'What would you do?',
    options: {
      A: 'Say firmly, in a voice the class can hear, that she needs to start now.',
      B: 'Walk over and stand silently next to her desk for ten seconds.',
      C: 'Crouch to her eye level, side on rather than face on. Lower your voice. Ask one open question.',
      D: 'Leave it for a few more minutes. She will start eventually.',
    },
    feedback: {
      A: 'Option A. Looks reasonable, and usually backfires. Loud, in front of the class, to a pupil whose state you have not checked yet. If she is in amber or red, you have raised the demand and made her the centre of attention. There is a high chance she now refuses, walks out, or shuts down.',
      B: 'Option B. Better, but only partly. Silent presence works for some pupils. For others, especially autistic and anxious pupils, it reads as pressure and increases dysregulation. You cannot know which without checking. And if she starts, you still do not know whether she was fine or forced.',
      C: 'Option C. This is the technique in action. You have put the rise through the pause. Eye level not towering, side on not face on, voice lowered, one open question. “Is the task the problem, or is something else going on?” gives her two doors, and either is fine. Fifteen seconds spent, the rest of the lesson kept.',
      D: 'Option D. Avoidant, with a hidden cost. Leaving it sometimes works, but it quietly signals that you have stopped expecting anything. Other pupils notice. Checking in costs you fifteen seconds and keeps the expectation intact.',
    },
    point:
      'The point. The difference between the best response and the worst is not whether you hold the line. It is whether you understand where the pupil is before you do.',
  },
  2: {
    id: 2,
    title: 'The Pupil Who Walks Out',
    situation:
      'You are teaching a Year 10 class. One pupil, tense throughout and not engaging with two earlier prompts, suddenly stands, picks up his bag, and walks towards the door. He does not speak. He does not look at you. He is about four seconds from the corridor. Other pupils are watching. You have to decide right now.',
    question: 'What would you do?',
    options: {
      A: 'Step in front of the door. Tell him firmly he is not leaving.',
      B: 'Let him walk. Do not follow, do not raise your voice. Flag it to pastoral and speak to him later.',
      C: 'Call after him as he leaves, so the class hears there will be a consequence.',
      D: 'Send another pupil after him to bring him back.',
    },
    feedback: {
      A: 'Option A. Almost certain to escalate. Blocking the door of a pupil already in red is the fastest route to a serious incident. He is leaving because his brain has tipped past what it can hold. Standing in his way turns flight into fight. Pupils who would never normally be physical have hurt staff in exactly this moment.',
      B: 'Option B. Counter intuitive, and right. Letting him walk can feel like losing control. It is not. A pupil in red needs to discharge the alarm response, and walking is one of the safest ways the body does that. The follow up matters as much as the moment: flag it, and speak when he is back in green. Pupils who were not chased or shouted at come back more easily.',
      C: 'Option C. Understandable, and it costs you. Calling after him serves the audience in the room more than it serves him. He is not coming back because you raised your voice. You have added a public threat to a public exit, which makes coming back harder. Every other pupil just watched you answer distress with a threat.',
      D: 'Option D. Well meant, occasionally disastrous. The peer is now carrying something that is not their job. A dysregulated pupil approached in a corridor by another pupil can escalate quickly. Adults handle this.',
    },
    point:
      'The point. A pupil walking out is not the disaster it can feel like. The disaster is what happens if you turn that walk out into a confrontation. Your job in those four seconds is to keep it safe, not tidy.',
  },
  3: {
    id: 3,
    title: 'The Repair',
    situation:
      'Yesterday, in a busy double lesson, you snapped at a pupil who was not following an instruction. You said something like: “I have asked you three times. If you cannot follow simple instructions, you can sit outside.” She went quiet, did the work, and did not look at you again. Afterwards her form tutor told you she had been crying at break, and that her grandmother had been admitted to hospital that morning. You feel sick about it. She is in your class again in twenty minutes.',
    question: 'What is the best thing to do now?',
    options: {
      A: 'Do not bring it up. Just be especially kind to her in the lesson.',
      B: 'At the start of the lesson, apologise to her in front of the class.',
      C: 'Catch her quietly as the lesson settles. Name what happened, own it, and leave her with it.',
      D: 'Add a kind comment in her book when you mark tonight, but do not raise it in person.',
    },
    feedback: {
      A: 'Option A. The most costly of the options. Saying nothing costs trust the most, because she has not forgotten. Without repair, the moment becomes part of her quiet picture of you. Pupils who never receive repair stop believing repair is possible.',
      B: 'Option B. Right instinct, wrong setting. A public apology for a private moment makes her the centre of attention she did not ask for, and the real repair gets diluted. Keep private repair private.',
      C: 'Option C. Repair done well. You named what happened, owned the misunderstanding, did not ask her to apologise, did not defend yourself, and then let her go. Leaving her with it is the part most of us miss. She may say nothing, or just “it is fine”. That is enough. You have given her an adult naming a mistake without making her manage it. That is rare, and it sticks.',
      D: 'Option D. Kind, but incomplete. A note has too much work to do on its own. She does not know whether it means sorry, or well done. Use it as well if you like, but the spoken repair comes first.',
    },
    point:
      'The point. Anyone can misunderstand distress in a busy lesson. What matters almost as much as the technique is what you do afterwards. Clean repair. No “but”. No asking the pupil to apologise for the thing you misread.',
  },
};

// function ScriptDropdown({
//   header,
//   body,
//   dropdownId,
//   onOpenChange,
// }: DropdownProps) {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
//       <button
//         type="button"
//         onClick={() => {
//           setOpen((v) => {
//             const next = !v;
//             onOpenChange?.(dropdownId, next);
//             return next;
//           });
//         }}
//         className="w-full h-[56px] flex items-center justify-between gap-4 px-4 bg-[#1A1A33]/60 hover:bg-[#1A1A33]/75 transition-colors text-left"
//       >
//         <div className="flex items-center gap-3 min-w-0">
//           <span className="material-symbols-outlined text-[#818CF8]">
//             menu_book
//           </span>
//           <div className="text-sm font-medium text-white/85 truncate">
//             {header}
//           </div>
//         </div>
//         <span
//           className={`material-symbols-outlined text-[#818CF8] transition-transform ${
//             open ? 'rotate-180' : ''
//           }`}
//         >
//           expand_more
//         </span>
//       </button>
//       <div
//         className={`overflow-hidden transition-all duration-300 ease-out ${
//           open ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'
//         }`}
//       >
//         <div className="px-4 py-4 text-sm text-slate-200 whitespace-pre-line">
//           {body}
//         </div>
//       </div>
//     </div>
//   );
// }

function Dropdown({
  header,
  body,
  dropdownId,
  onOpenChange,
  containerClassName,
  buttonClassName,
  bodyClassName,
  variant = 'default',
  fullExpand = false,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const isCover = variant === 'cover';
  return (
    <div
      className={`md:w-auto overflow-hidden bg-white ${
        isCover
          ? 'rounded-xl border border-slate-200 shadow-[0_4px_24px_-4px_rgba(10,31,68,0.08)]'
          : 'border rounded-lg'
      } ${containerClassName ?? ''}`}
      style={isCover ? undefined : { borderColor: '#E5E9F0' }}
    >
      <button
        type="button"
        onClick={() => {
          setOpen((v) => {
            const next = !v;
            onOpenChange?.(dropdownId, next);
            return next;
          });
        }}
        className={`w-full flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition-colors text-left ${
          isCover ? 'py-4 px-5 md:px-6 min-h-[70px]' : 'h-[70px] px-[25px]'
        } ${buttonClassName ?? ''}`}
      >
        <div
          className={`${
            isCover
              ? 'text-[16px] md:text-[18px] font-medium leading-relaxed'
              : 'text-sm font-arial text-slate-900'
          }`}
          style={isCover ? { color: '#1F3864' } : undefined}
        >
          {header}
        </div>
        <span
          className={`material-symbols-outlined transition-transform shrink-0 ${
            open ? 'rotate-180' : ''
          }`}
          style={{ color: '#1F7A7A' }}
        >
          expand_more
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          open
            ? fullExpand
              ? 'max-h-none opacity-100'
              : 'max-h-[520px] opacity-100'
            : 'max-h-0 opacity-0'
        } ${bodyClassName ?? ''}`}
      >
        <div
          className={`whitespace-pre-line ${
            isCover
              ? 'px-5 md:px-6 pb-4 text-[15px] md:text-[16px] leading-relaxed text-slate-600'
              : 'px-[25px] py-4 text-slate-700'
          }`}
          style={
            isCover
              ? undefined
              : {
                  background: '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: 400,
                }
          }
        >
          {body}
        </div>
      </div>
    </div>
  );
}

function ModuleFavicon({
  className = 'w-7 h-7 object-contain shrink-0',
}: {
  className?: string;
}) {
  return <img alt="" src={logoFav} className={className} />;
}

function ResearchSourcesBody() {
  return (
    <div className="space-y-4 text-[15px] leading-relaxed text-slate-900">
      <p>
        If you would like to go deeper, the full sources are here. Each opens in
        a new tab.
      </p>
      <ul className="space-y-3 list-none pl-0">
        <li>
          Rowe, M. B. (1974). Wait time and rewards as instructional variables.
          Journal of Research in Science Teaching.{' '}
          <a
            href="https://eric.ed.gov/?id=ED061103"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2E7CF6] underline hover:text-[#2563EB]"
          >
            Free full text
          </a>
        </li>
        <li>
          The Neurodivergence Task and Finish Group: report (2026). Department
          for Education.{' '}
          <a
            href="https://assets.publishing.service.gov.uk/media/69984861339ee33f3ad0b9d0/The_Neurodivergence_Task_and_Finish_Group_report.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2E7CF6] underline hover:text-[#2563EB]"
          >
            Read the report
          </a>
        </li>
        <li>
          Connolly, S. E., Constable, H. L. and Mullally, S. L. (2023). School
          distress and the school attendance crisis. Frontiers in Psychiatry.{' '}
          <a
            href="https://www.frontiersin.org/journals/psychiatry/articles/10.3389/fpsyt.2023.1237052/full"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2E7CF6] underline hover:text-[#2563EB]"
          >
            Open access
          </a>
        </li>
      </ul>
    </div>
  );
}

function TapContinuePrompt({
  label,
  onClick,
  className = '',
  visible = true,
}: {
  label: string;
  onClick: () => void;
  className?: string;
  visible?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-3 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7CF6]/30 rounded-xl transition-all duration-[350ms] ease-out ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-2 pointer-events-none absolute inset-0'
      } ${className}`}
      aria-label={label}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <span
        className="material-symbols-outlined text-slate-400 text-[32px] animate-pulse"
        aria-hidden
      >
        touch_app
      </span>
      <span className="text-base font-semibold text-[#2E7CF6]">{label}</span>
    </button>
  );
}

function ResearchDropdownBody({
  body,
  active,
  skipAnimation,
  hasFinished,
  onFinish,
}: {
  body: string;
  active: boolean;
  skipAnimation: boolean;
  hasFinished: boolean;
  onFinish: () => void;
}) {
  const typingEnabled = active && !skipAnimation && !hasFinished;
  const { displayed, isComplete } = useTypingText(
    body,
    typingEnabled,
    BULLET_TYPING_SPEED_MS,
    'empty'
  );
  const hasSpokenRef = useRef(false);

  useEffect(() => {
    if (!active || skipAnimation || hasFinished || hasSpokenRef.current) return;
    hasSpokenRef.current = true;
    void speakTextOnceAsync(body);
  }, [active, skipAnimation, hasFinished, body]);

  useEffect(() => {
    if (!isComplete || !typingEnabled) return;
    onFinish();
  }, [isComplete, typingEnabled, onFinish]);

  if (skipAnimation || hasFinished) {
    return (
      <p className="whitespace-pre-line text-[15px] leading-relaxed text-slate-900 block w-full">
        {body}
      </p>
    );
  }

  return (
    <p className="whitespace-pre-line text-[15px] leading-relaxed text-slate-900 block w-full">
      <span>{displayed}</span>
      <span className="text-transparent">{body.slice(displayed.length)}</span>
    </p>
  );
}

function ResearchEvidenceDropdown({
  header,
  body,
  dropdownId,
  open,
  onToggle,
  isSources = false,
  skipAnimation = false,
  hasFinished = false,
  onFinish,
  equalIdle = false,
}: {
  header: string;
  body: string;
  dropdownId: string;
  open: boolean;
  onToggle: (dropdownId: string) => void;
  isSources?: boolean;
  skipAnimation?: boolean;
  hasFinished?: boolean;
  onFinish?: () => void;
  equalIdle?: boolean;
}) {
  const cardClassName =
    open || equalIdle
      ? 'flex flex-col flex-1 min-h-0 h-full'
      : 'flex flex-col shrink-0';

  return (
    <div
      className={`rounded-2xl border border-[#E5E9EB] ${MODULE_SURFACE} shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-[25px] ${cardClassName}`}
    >
      <button
        type="button"
        onClick={() => onToggle(dropdownId)}
        className="w-full flex items-start gap-6 text-left shrink-0"
        aria-expanded={open}
      >
        <ModuleFavicon className="w-10 h-10 rounded-xl object-contain shrink-0" />
        <span className="flex-1 min-w-0 text-[18px] font-semibold leading-snug text-[#121B2C] pt-1.5">
          {header}
        </span>
        <span
          className={`material-symbols-outlined shrink-0 text-slate-500 transition-transform mt-2 ${
            open ? 'rotate-180' : ''
          }`}
        >
          expand_more
        </span>
      </button>
      {open ? (
        <div className="flex flex-col flex-1 min-h-0 mt-3">
          <div className="ml-[64px] border-t border-[#C4C6CF] pt-6 flex-1 min-h-0 overflow-y-auto custom-scrollbar">
            {isSources ? (
              <ResearchSourcesBody />
            ) : (
              <ResearchDropdownBody
                body={body}
                active={open}
                skipAnimation={skipAnimation}
                hasFinished={hasFinished}
                onFinish={onFinish ?? (() => {})}
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ResearchSection({
  screen,
  onDropdownOpenChange,
  visibleCount,
  skipAnimation = false,
}: {
  screen: Screen;
  onDropdownOpenChange: (dropdownId: string, open: boolean) => void;
  visibleCount?: number;
  skipAnimation?: boolean;
}) {
  const dropdowns = screen.dropdowns ?? RESEARCH_EVIDENCE_DROPDOWNS;
  const resolvedVisibleCount =
    typeof visibleCount === 'number'
      ? Math.max(0, Math.min(visibleCount, dropdowns.length))
      : dropdowns.length;
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [finishedDropdownIds, setFinishedDropdownIds] = useState<Set<string>>(
    () => new Set()
  );

  const handleToggle = useCallback(
    (dropdownId: string) => {
      setOpenDropdownId((current) => {
        if (current === dropdownId) {
          onDropdownOpenChange(dropdownId, false);
          return null;
        }
        if (current) {
          onDropdownOpenChange(current, false);
        }
        onDropdownOpenChange(dropdownId, true);
        return dropdownId;
      });
    },
    [onDropdownOpenChange]
  );

  return (
    <div className="max-w-[1226px] mx-auto w-full flex flex-col flex-1 min-h-0 h-full gap-2">
      {dropdowns.map((d, index) => {
        const visible = index < resolvedVisibleCount;
        const dropdownId = `${screen.id}:${d.header}`;
        const isOpen = openDropdownId === dropdownId;
        const anyOpen = openDropdownId !== null;
        return (
          <div
            key={d.header}
            className={`flex flex-col min-h-0 transition-all duration-300 ease-out ${
              visible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2 pointer-events-none h-0 overflow-hidden shrink-0'
            } ${
              isOpen
                ? 'flex-1 min-h-0'
                : anyOpen
                  ? 'shrink-0'
                  : 'flex-1 min-h-0'
            }`}
          >
            <ResearchEvidenceDropdown
              header={d.header}
              body={d.body}
              dropdownId={dropdownId}
              open={isOpen}
              onToggle={handleToggle}
              isSources={d.header === RESEARCH_SOURCES_HEADER}
              skipAnimation={skipAnimation}
              hasFinished={finishedDropdownIds.has(dropdownId)}
              onFinish={() =>
                setFinishedDropdownIds((prev) => new Set(prev).add(dropdownId))
              }
              equalIdle={!anyOpen}
            />
          </div>
        );
      })}
    </div>
  );
}

function ResearchTapRevealSection({
  screen,
  headerTitleAnchorRef,
  contentAreaRef,
  centerContent,
  onDropdownOpenChange,
  onPhaseChange,
}: {
  screen: Screen;
  headerTitleAnchorRef: React.RefObject<HTMLHeadingElement>;
  contentAreaRef: React.RefObject<HTMLDivElement>;
  centerContent: boolean;
  onDropdownOpenChange: (dropdownId: string, open: boolean) => void;
  onPhaseChange?: (phase: LearningOutcomesPhase) => void;
}) {
  const dropdowns = screen.dropdowns ?? RESEARCH_EVIDENCE_DROPDOWNS;
  const title =
    MODULE_BLOCK_HEADER_TITLES[4] ??
    screen.headerTitle ??
    'The Research Behind The Technique';
  const prefersReducedMotion = usePrefersReducedMotion();
  const skipIntro = prefersReducedMotion;

  const [phase, setPhase] = useState<LearningOutcomesPhase>(() =>
    skipIntro ? 'done' : 'center'
  );
  const [displayTitle, setDisplayTitle] = useState(title);
  const typingEnabled = phase === 'center' && !skipIntro;
  const { displayed: typedTitle, isComplete: typingComplete } = useTypingText(
    title,
    typingEnabled
  );

  const [revealedCount, setRevealedCount] = useState(() =>
    skipIntro ? dropdowns.length : 0
  );

  useEffect(() => {
    onPhaseChange?.(phase);
  }, [phase, onPhaseChange]);

  useEffect(() => {
    if (phase === 'center') {
      setDisplayTitle(typedTitle);
    }
  }, [phase, typedTitle]);

  useEffect(() => {
    if (phase !== 'center') {
      setDisplayTitle(title);
    }
  }, [phase, title]);

  useEffect(() => {
    if (phase !== 'center' || skipIntro || !typingComplete) return;
    const timer = window.setTimeout(() => setPhase('header'), 700);
    return () => window.clearTimeout(timer);
  }, [phase, skipIntro, typingComplete]);

  const handleCenterTap = () => {
    if (phase === 'center') setPhase('header');
  };

  const handleMoveComplete = useCallback(() => {
    setPhase('reveal');
  }, []);

  const handleContinueClick = () => {
    if (phase !== 'reveal') return;
    setRevealedCount(dropdowns.length);
    setPhase('done');
  };

  const showPrompt = phase === 'reveal' && revealedCount === 0;
  const showList = phase === 'done' || revealedCount > 0;

  return (
    <div className="relative flex flex-col flex-1 min-h-0 h-full">
      {phase === 'center' || phase === 'header' ? (
        <>
          <button
            type="button"
            onClick={handleCenterTap}
            className={`absolute inset-0 z-10 ${
              phase === 'center' ? 'cursor-pointer' : 'pointer-events-none'
            }`}
            aria-label="Continue to research"
          />
          <IntroTitleOverlay
            title={title}
            phase={phase}
            anchorRef={headerTitleAnchorRef}
            contentAreaRef={contentAreaRef}
            centerContent={centerContent}
            displayedText={displayTitle}
            onMoveComplete={handleMoveComplete}
          />
        </>
      ) : null}

      <TapContinuePrompt
        label="Tap to continue"
        onClick={handleContinueClick}
        className="flex-1"
        visible={showPrompt}
      />

      <div
        className={`flex flex-col flex-1 min-h-0 overflow-hidden transition-opacity duration-500 ${
          showList ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ResearchSection
          screen={screen}
          onDropdownOpenChange={onDropdownOpenChange}
          visibleCount={revealedCount}
          skipAnimation={skipIntro}
        />
      </div>
    </div>
  );
}

function LearnAccordionItem({
  dropdownId,
  header,
  body,
  open,
  onToggle,
  compact = false,
  embedded = false,
}: {
  dropdownId: string;
  header: string;
  body: string;
  open: boolean;
  onToggle: (dropdownId: string, open: boolean) => void;
  compact?: boolean;
  embedded?: boolean;
}) {
  const meta = (() => {
    const lower = header.toLowerCase();
    if (lower.startsWith('green')) {
      return {
        accentBorder: 'border-emerald-100',
        caption: 'The thinking brain is in charge',
      };
    }
    if (lower.startsWith('amber')) {
      return {
        accentBorder: 'border-amber-100',
        caption: 'Energy going on staying in the room',
      };
    }
    if (lower.startsWith('red')) {
      return {
        accentBorder: 'border-red-100',
        caption: 'The alarm system is in charge',
      };
    }
    if (lower.includes('bit more on the brain')) {
      return {
        accentBorder: 'border-slate-200',
        caption: 'Optional extra detail',
      };
    }
    return {
      accentBorder: 'border-slate-200',
      caption: '',
    };
  })();

  return (
    <div
      className={
        embedded
          ? 'flex flex-col min-h-0 flex-1 overflow-hidden cursor-pointer'
          : `rounded-xl overflow-hidden cursor-pointer border border-slate-200 bg-white shadow-[0_20px_40px_-15px_rgba(47,99,120,0.06)] transition-shadow ${
              open ? 'shadow-[0_24px_48px_-12px_rgba(47,99,120,0.12)]' : ''
            }`
      }
    >
      <button
        type="button"
        onClick={() => onToggle(dropdownId, !open)}
        className={`w-full flex items-center justify-between gap-3 text-left shrink-0 ${
          embedded ? 'p-2' : compact ? 'p-4' : 'p-6'
        }`}
      >
        <div
          className={`flex items-center min-w-0 ${embedded || compact ? 'gap-3' : 'gap-6'}`}
        >
          <ModuleFavicon
            className={embedded || compact ? 'w-5 h-5' : 'w-7 h-7'}
          />
          <div className="min-w-0">
            <div
              className={`font-semibold text-slate-900 ${
                embedded || compact
                  ? 'text-[14px] leading-snug'
                  : 'text-[18px] truncate'
              }`}
            >
              {header}
            </div>
            {meta.caption ? (
              <div
                className={`text-[11px] text-slate-500 ${embedded || compact ? '' : 'truncate'}`}
              >
                {meta.caption}
              </div>
            ) : null}
          </div>
        </div>

        <span
          className={`material-symbols-outlined text-slate-500 transition-transform duration-300 shrink-0 ${
            embedded ? 'text-[20px]' : ''
          } ${open ? 'rotate-180' : ''}`}
        >
          expand_more
        </span>
      </button>

      {embedded ? (
        open ? (
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
            <div className="pb-1">
              <div
                className={`bg-[#F7F9FB] p-3 rounded-lg border ${meta.accentBorder}`}
              >
                <div className="text-[14px] text-slate-700 whitespace-pre-line leading-relaxed">
                  {body}
                </div>
              </div>
            </div>
          </div>
        ) : null
      ) : (
        <div
          className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={{ maxHeight: open ? 700 : 0 }}
        >
          <div
            className={`flex flex-col gap-6 ${
              compact ? 'px-4 pb-6 pt-2 ml-10' : 'px-6 pb-8 pt-2 ml-12 lg:ml-20'
            }`}
          >
            <div
              className={`bg-[#F7F9FB] p-4 rounded-lg border ${meta.accentBorder}`}
            >
              <div className="text-[15px] text-slate-700 whitespace-pre-line leading-relaxed">
                {body}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const TECHNIQUE_STATE_STYLES: Record<
  'green' | 'amber' | 'red',
  {
    cardBg: string;
    border: string;
    icon: string;
    iconColor: string;
    labelColor: string;
  }
> = {
  green: {
    cardBg: 'bg-emerald-50/40',
    border: 'border-emerald-500',
    icon: 'check_circle',
    iconColor: 'text-emerald-600',
    labelColor: 'text-emerald-700',
  },
  amber: {
    cardBg: 'bg-[#fff8e1]',
    border: 'border-[#ffb300]',
    icon: 'warning',
    iconColor: 'text-[#ffb300]',
    labelColor: 'text-[#b28900]',
  },
  red: {
    cardBg: 'bg-rose-50/40',
    border: 'border-rose-500',
    icon: 'emergency',
    iconColor: 'text-rose-600',
    labelColor: 'text-rose-700',
  },
};

function TechniqueStepBodyContent({
  step,
  includeExpand = true,
  includeTrafficLight = true,
  variant = 'card',
}: {
  step: TechniqueStep;
  includeExpand?: boolean;
  includeTrafficLight?: boolean;
  variant?: 'card' | 'modal';
}) {
  const leadPanel = (content: React.ReactNode) => (
    <div className="bg-[#F7F9FB] p-5 md:p-6 rounded-xl border-l-4 border-l-[#2E7CF6] mb-4">
      <div className="text-[18px] leading-relaxed" style={{ color: '#333333' }}>
        {content}
      </div>
    </div>
  );

  const bulletItems = step.body
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('•'))
    .map((line) => line.replace(/^•\s*/, ''));

  const stateLabelClass = (label: string) => {
    if (label === 'Green') return 'text-emerald-700';
    if (label === 'Amber') return 'text-amber-700';
    if (label === 'Red') return 'text-rose-700';
    return 'text-[#1F3864]';
  };

  const renderBody = () => {
    if (variant === 'modal' && bulletItems.length > 0) {
      return leadPanel(
        <ul className="space-y-4 list-none pl-0 m-0">
          {bulletItems.map((item) => {
            const stateMatch = item.match(/^(Green|Amber|Red):\s*(.+)$/);
            if (stateMatch) {
              const [, label, text] = stateMatch;
              return (
                <li
                  key={label}
                  className="flex items-start gap-2 text-[15px] md:text-[16px] leading-relaxed"
                >
                  <span
                    className={`font-semibold shrink-0 ${stateLabelClass(label)}`}
                  >
                    {label}:
                  </span>
                  <span>{text}</span>
                </li>
              );
            }

            return (
              <li
                key={item}
                className="flex items-start gap-2 text-[15px] md:text-[16px] leading-relaxed"
              >
                <span className="text-[#2E7CF6] shrink-0 leading-relaxed">
                  •
                </span>
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
      );
    }

    if (variant === 'modal' && (step.number === 1 || step.number === 2)) {
      return leadPanel(step.body);
    }

    if (bulletItems.length > 0) {
      return (
        <ul className="space-y-3 list-none pl-0 mb-4">
          {bulletItems.map((item) => {
            const stateMatch = item.match(/^(Green|Amber|Red):\s*(.+)$/);
            if (stateMatch) {
              const [, label, text] = stateMatch;
              return (
                <li
                  key={label}
                  className="flex items-start gap-2 text-[15px] leading-relaxed"
                >
                  <span
                    className={`font-semibold shrink-0 ${stateLabelClass(label)}`}
                  >
                    {label}:
                  </span>
                  <span className="text-slate-700">{text}</span>
                </li>
              );
            }

            return (
              <li
                key={item}
                className="flex items-start gap-2 text-[15px] text-slate-700 leading-relaxed"
              >
                <span className="text-[#2E7CF6] shrink-0">•</span>
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      <p className="text-[15px] text-slate-700 mb-4 leading-relaxed whitespace-pre-line">
        {step.body}
      </p>
    );
  };

  return (
    <>
      {renderBody()}

      {includeTrafficLight && step.showTrafficLight ? (
        <div className="flex items-center justify-center gap-6 my-4 p-4 rounded-xl bg-[#F7F9FB] border border-slate-200">
          <div className="flex flex-col items-center gap-1.5">
            <span className="size-5 rounded-full bg-emerald-500 ring-2 ring-white shadow-sm" />
            <span className="text-[11px] font-semibold text-emerald-700">
              Green
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="size-5 rounded-full bg-amber-400 ring-2 ring-white shadow-sm" />
            <span className="text-[11px] font-semibold text-amber-700">
              Amber
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="size-5 rounded-full bg-rose-500 ring-2 ring-white shadow-sm" />
            <span className="text-[11px] font-semibold text-rose-700">Red</span>
          </div>
        </div>
      ) : null}

      {step.stateCards && step.stateCards.length ? (
        <div
          className={`${variant === 'modal' ? 'space-y-4' : 'space-y-3'} pb-1`}
        >
          {step.stateCards.map((card) => {
            const styles = TECHNIQUE_STATE_STYLES[card.state];
            return (
              <div
                key={card.state}
                className={`flex items-start gap-3 p-3 rounded-lg border border-[#E5E9F0] ${styles.cardBg}`}
              >
                <span
                  className={`material-symbols-outlined mt-0.5 shrink-0 ${styles.iconColor}`}
                >
                  {styles.icon}
                </span>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold ${styles.labelColor}`}>
                    {card.label}
                  </p>
                  <p className="text-xs text-slate-600 leading-snug">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {includeExpand && step.expand ? (
        <div className="mt-6 pt-5 border-t border-slate-200">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#2E7CF6] mb-2">
            {step.expand.header}
          </p>
          <p className="text-[15px] text-slate-700 leading-relaxed">
            {step.expand.body}
          </p>
        </div>
      ) : null}
    </>
  );
}

function TechniqueStepDetailModal({
  open,
  step,
  onClose,
}: {
  open: boolean;
  step: TechniqueStep;
  onClose: () => void;
}) {
  const [expandOpen, setExpandOpen] = useState(false);

  useEffect(() => {
    if (!open) setExpandOpen(false);
  }, [open]);

  if (!open) return null;

  const expandId = step.expand
    ? `modal:${step.number}:${step.expand.header}`
    : null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      <button
        type="button"
        aria-label="Close step detail"
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
      />

      <div className="relative w-full max-w-[420px] max-h-[85vh] flex flex-col rounded-xl border border-slate-200 bg-white shadow-[0_20px_40px_-15px_rgba(47,99,120,0.06)] overflow-hidden">
        <div className="shrink-0 flex items-start justify-between gap-4 px-6 md:px-7 pt-6 md:pt-7 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-4 min-w-0">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2E7CF6] text-white text-sm font-semibold shrink-0">
              {step.number}
            </span>
            <h2 className="text-[18px] font-semibold text-[#2E7CF6] leading-snug">
              {step.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-500 hover:text-slate-900 transition-colors shrink-0 -mr-1 -mt-1"
            aria-label="Close step detail"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-6 md:px-7 py-4">
          <TechniqueStepBodyContent
            step={step}
            variant="modal"
            includeExpand={false}
            includeTrafficLight={false}
          />

          {step.expand && expandId ? (
            <div className="pt-3 mt-2 border-t border-slate-100 shrink-0">
              <LearnAccordionItem
                dropdownId={expandId}
                header={step.expand.header}
                body={step.expand.body}
                open={expandOpen}
                onToggle={(_, isOpen) => setExpandOpen(isOpen)}
                embedded
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body
  );
}

function TechniqueVerticalStepsSection({
  screen,
  onStepClick,
  hideLead = false,
  leadContent,
  showSteps = true,
  showKeyPoint = true,
  staggerReveal = false,
}: {
  screen: Screen;
  onStepClick: (stepNumber: number) => void;
  hideLead?: boolean;
  leadContent?: React.ReactNode;
  showSteps?: boolean;
  showKeyPoint?: boolean;
  staggerReveal?: boolean;
}) {
  const steps = screen.techniqueSteps ?? [];
  const prefersReducedMotion = usePrefersReducedMotion();
  const [revealedStepCount, setRevealedStepCount] = useState(0);

  useEffect(() => {
    if (!showSteps || !staggerReveal) {
      setRevealedStepCount(0);
      return;
    }
    if (prefersReducedMotion) {
      setRevealedStepCount(steps.length);
      return;
    }

    setRevealedStepCount(0);
    let count = 0;
    const timers: number[] = [];

    const revealNext = () => {
      count += 1;
      setRevealedStepCount(count);
      if (count < steps.length) {
        timers.push(window.setTimeout(revealNext, STEP_STAGGER_MS));
      }
    };

    timers.push(window.setTimeout(revealNext, STEP_STAGGER_MS));

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [showSteps, staggerReveal, steps.length, prefersReducedMotion]);

  const visibleStepCount =
    showSteps && staggerReveal ? revealedStepCount : showSteps ? steps.length : 0;
  const showKeyPointNow =
    showKeyPoint &&
    screen.keyPoint &&
    (!staggerReveal || revealedStepCount >= steps.length);

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col flex-1 min-h-0 h-full overflow-hidden">
      <div className="flex flex-col min-h-0 overflow-hidden">
        <div className="flex-1 min-h-0 overflow-y-auto pt-2 custom-scrollbar pr-1 -mr-1">
          {(screen.lead || leadContent) && !hideLead ? (
            <p
              className="text-[18px] leading-relaxed mb-10 pt-2"
              style={{ color: '#333333' }}
            >
              {leadContent ?? screen.lead}
            </p>
          ) : null}

          {visibleStepCount > 0 ? (
            <div className="space-y-4">
              {steps.slice(0, visibleStepCount).map((step) => (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => onStepClick(step.number)}
                  className={`w-full ${MODULE_SURFACE} h-[120px] p-5 md:p-6 rounded-xl border-l-4 border-l-[#2E7CF6] text-left hover:bg-[#EEF4FF]/75 transition-all duration-[350ms] ease-out opacity-100 translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7CF6]/30`}
                >
                  <div className="flex items-center justify-between gap-4 h-full">
                    <div className="flex items-center gap-4 min-w-0">
                      <ModuleFavicon className="w-8 h-8 shrink-0 object-contain" />
                      <span
                        className="text-[16px] md:text-[18px] font-semibold leading-snug"
                        style={{ color: '#1F3864' }}
                      >
                        Step {step.number}. {step.title}
                      </span>
                    </div>
                    <span
                      className="material-symbols-outlined text-slate-400 text-[22px] shrink-0"
                      aria-hidden
                    >
                      touch_app
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : null}

          {showKeyPointNow ? (
            <div className="mt-8 rounded-xl overflow-hidden shadow-[0_4px_24px_-4px_rgba(10,31,68,0.12)] border border-[#1F3864]/20 bg-[#1F3864] transition-all duration-[350ms] ease-out opacity-100 translate-y-0">
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#2E7CF6]/20 flex items-center justify-center shrink-0">
                    <ModuleFavicon className="w-7 h-7 md:w-8 md:h-8" />
                  </div>
                  <p className="text-[15px] md:text-[16px] leading-relaxed text-white/90 italic whitespace-pre-line">
                    {screen.keyPoint}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function TechniqueStepsSection({
  screen,
  openDropdownIds,
  onDropdownToggle,
  activeSidebarSectionKey,
}: {
  screen: Screen;
  openDropdownIds: Set<string>;
  onDropdownToggle: (dropdownId: string, open: boolean) => void;
  activeSidebarSectionKey: SidebarSectionKey | null;
}) {
  const steps = screen.techniqueSteps ?? [];
  const showTitle =
    screen.t2 &&
    !isSameAsBlockHeader(screen.t2, screen, activeSidebarSectionKey);

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col flex-1 min-h-0 h-full">
      {showTitle || screen.lead ? (
        <header className="pt-2 mb-6 shrink-0">
          {showTitle ? (
            <h2 className="text-[32px] leading-tight font-bold text-[#1F3864]">
              {screen.t2}
            </h2>
          ) : null}
          {screen.lead ? (
            <p className="text-[15px] text-slate-600 leading-relaxed mt-3 max-w-3xl">
              {screen.lead}
            </p>
          ) : null}
        </header>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch flex-1 min-h-0">
        {steps.map((step) => {
          const expandId = step.expand
            ? `${screen.id}:${step.expand.header}`
            : null;
          const isExpandOpen = expandId ? openDropdownIds.has(expandId) : false;

          return (
            <div
              key={step.number}
              className="bg-white p-6 md:p-7 rounded-xl flex flex-col h-full min-h-0 border border-slate-200 shadow-[0_20px_40px_-15px_rgba(47,99,120,0.06)] overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-4 shrink-0">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E6F4F4] text-[#1F7A7A] text-sm font-semibold shrink-0">
                  {step.number}
                </span>
                <h2 className="text-[18px] font-semibold text-slate-900 leading-snug">
                  {step.title}
                </h2>
              </div>

              <div
                className={`${
                  isExpandOpen
                    ? 'hidden'
                    : 'flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1 -mr-1'
                }`}
              >
                <p className="text-[15px] text-slate-700 mb-4 leading-relaxed whitespace-pre-line">
                  {step.body}
                </p>

                {step.bodyExtra ? (
                  <p className="text-[15px] text-slate-700 mb-4 leading-relaxed whitespace-pre-line">
                    {step.bodyExtra}
                  </p>
                ) : null}

                {step.stateCards && step.stateCards.length ? (
                  <div className="space-y-3 pb-1">
                    {step.stateCards.map((card) => {
                      const styles = TECHNIQUE_STATE_STYLES[card.state];
                      return (
                        <div
                          key={card.state}
                          className={`flex items-start gap-3 p-3 rounded-lg border border-[#E5E9F0] ${styles.cardBg}`}
                        >
                          <span
                            className={`material-symbols-outlined mt-0.5 shrink-0 ${styles.iconColor}`}
                          >
                            {styles.icon}
                          </span>
                          <div className="min-w-0">
                            <p
                              className={`text-sm font-semibold ${styles.labelColor}`}
                            >
                              {card.label}
                            </p>
                            <p className="text-xs text-slate-600 leading-snug">
                              {card.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              {step.expand ? (
                <div
                  className={`pt-3 mt-2 border-t border-slate-100 ${
                    isExpandOpen
                      ? 'flex-1 min-h-0 flex flex-col overflow-hidden'
                      : 'shrink-0'
                  }`}
                >
                  <LearnAccordionItem
                    dropdownId={expandId!}
                    header={step.expand.header}
                    body={step.expand.body}
                    open={isExpandOpen}
                    onToggle={onDropdownToggle}
                    embedded
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AboutModuleTextContent({
  screen,
  onDropdownOpenChange,
}: {
  screen: Screen;
  onDropdownOpenChange: (dropdownId: string, open: boolean) => void;
}) {
  return (
    <>
      {screen.lead ? (
        <h2
          className="shrink-0 text-[32px] leading-tight font-bold max-w-[800px] whitespace-pre-line"
          style={{ color: '#1F3864' }}
        >
          {screen.lead}
        </h2>
      ) : null}

      {screen.body || (screen.dropdowns && screen.dropdowns.length) ? (
        <div className="flex flex-col gap-10 border-l-4 border-l-[#2E7CF6] pl-5 md:pl-6 py-1 pt-10 md:pt-10">
          {screen.body ? (
            <p
              className="text-[16px] md:text-[24px] font-medium leading-relaxed whitespace-pre-line"
              style={{ color: '#1F3864' }}
            >
              {screen.body}
            </p>
          ) : null}

          {screen.dropdowns && screen.dropdowns.length ? (
            <div className="space-y-3">
              {screen.dropdowns.map((d) => (
                <Dropdown
                  key={d.header}
                  dropdownId={`${screen.id}:${d.header}`}
                  header={d.header}
                  body={d.body}
                  onOpenChange={onDropdownOpenChange}
                  variant="cover"
                  fullExpand
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

function AboutModuleDiagram() {
  return (
    <div className="relative flex justify-center items-center py-4 md:py-6 min-h-[300px] md:min-h-[340px] overflow-visible">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/felt.png")',
          opacity: 0.03,
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-visible">
        {[
          { delay: '0s', color: 'bg-[#2E7CF6]/25' },
          { delay: '1s', color: 'bg-[#2E7CF6]/20' },
          { delay: '2s', color: 'bg-[#6BA3F8]/18' },
        ].map(({ delay, color }) => (
          <div
            key={delay}
            className={`absolute w-56 h-56 md:w-72 md:h-72 rounded-full ${color} ms-animate-soft-pulse`}
            style={{ animationDelay: delay }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center px-2">
        <div className="flex justify-between w-full relative">
          <div className="absolute top-1/3 left-0 w-full h-px bg-[#1F3864]/25 -translate-y-1/2 -z-10" />

          <div className="flex flex-col items-center gap-2">
            <div
              className="w-3.5 h-3.5 rounded-full bg-rose-600 ms-animate-diagram-dot"
              style={
                {
                  animationDelay: '0s, 0s',
                  '--ms-ring-color': 'rgba(254, 205, 211, 0.65)',
                  '--ms-glow-color': 'rgba(225, 29, 72, 0.35)',
                } as React.CSSProperties
              }
            />
            <div
              className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ms-animate-diagram-label"
              style={{ animationDelay: '0s' }}
            >
              Trigger
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div
              className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-lg text-sm font-semibold text-[#2E7CF6] ms-animate-diagram-pause"
              style={{ animationDelay: '1s' }}
            >
              3s
            </div>
            <div
              className="text-[10px] font-bold text-[#2E7CF6] ms-animate-diagram-label"
              style={{ animationDelay: '1s' }}
            >
              The Pause
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div
              className="w-3.5 h-3.5 rounded-full bg-sky-700 ms-animate-diagram-dot"
              style={
                {
                  animationDelay: '2s, 2s',
                  '--ms-ring-color': 'rgba(186, 230, 253, 0.65)',
                  '--ms-glow-color': 'rgba(3, 105, 161, 0.35)',
                } as React.CSSProperties
              }
            />
            <div
              className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ms-animate-diagram-label"
              style={{ animationDelay: '2s' }}
            >
              Response
            </div>
            xxxxxxxxx
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutModuleInsightBar() {
  return (
    <div
      className={`flex mb-6 md:mb-2 items-center gap-4 py-4 px-5 md:px-6 rounded-xl ${MODULE_SURFACE} border border-[#E5E9F0] shadow-[0_4px_24px_-4px_rgba(10,31,68,0.08)]`}
    >
      <ModuleFavicon className="w-12 h-12 object-contain shrink-0" />
      <p
        className="text-[16px] md:text-[18px] leading-relaxed font-medium"
        style={{ color: '#1F3864' }}
      >
        This module is about the three seconds before you respond.
      </p>
    </div>
  );
}

function AboutModuleSection({
  screen,
  onDropdownOpenChange,
}: {
  screen: Screen;
  onDropdownOpenChange: (dropdownId: string, open: boolean) => void;
}) {
  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col flex-1 min-h-0 h-full gap-6 lg:gap-8">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start flex-1 min-h-0">
        <div className="flex flex-col gap-5">
          <AboutModuleTextContent
            screen={screen}
            onDropdownOpenChange={onDropdownOpenChange}
          />
        </div>
        <AboutModuleDiagram />
      </div>
      <AboutModuleInsightBar />
    </div>
  );
}

function ScriptSidebarPanel({
  header,
  body,
  onClose,
  className = '',
}: {
  header: string;
  body: string;
  onClose: () => void;
  className?: string;
}) {
  return (
    <aside
      className={`flex flex-col shrink-0 h-full min-h-0 border border-[#E5E9F0] bg-white overflow-hidden ${className}`}
    >
      <div className="flex items-start justify-between gap-3 shrink-0 px-4 py-4 md:px-5 border-b border-[#E5E9F0]">
        <div className="min-w-0">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Script
          </div>
          <div
            className="mt-1 text-[16px] font-semibold leading-snug"
            style={{ color: '#1F3864' }}
          >
            {header}
          </div>
        </div>
        <button
          type="button"
          aria-label="Close script"
          onClick={onClose}
          className="w-9 h-9 rounded-lg border border-[#E5E9F0] bg-[#F7F9FC] hover:bg-[#EEF3FA] transition-colors flex items-center justify-center shrink-0"
        >
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ color: '#1F7A7A' }}
          >
            close
          </span>
        </button>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-4 py-4 md:px-5 text-[15px] md:text-[16px] text-slate-600 leading-relaxed whitespace-pre-line">
        {body}
      </div>
    </aside>
  );
}

function WatchIntroHeadline({
  intro,
}: {
  intro: NonNullable<Screen['watchIntro']>;
}) {
  return (
    <h3
      className="shrink-0 text-left text-[24px] leading-tight font-regular"
      style={{ color: '#1F3864' }}
    >
      {intro.headline}
    </h3>
  );
}

function WatchSection({
  screen,
  isScriptOpen,
  onOpenScript,
  onCloseScript,
  hideIntroHeadline = false,
}: {
  screen: Screen;
  isScriptOpen: boolean;
  onOpenScript: () => void;
  onCloseScript: () => void;
  hideIntroHeadline?: boolean;
}) {
  const videoTitle = screen.videoTitle ?? 'Module 1 film, around 3 minutes';

  const videoPlayer = (
    <div className="w-full flex-1 min-h-0 flex flex-col">
      <div
        className={`w-full flex-1 min-h-0 rounded-2xl border border-[#E5E9F0] ${MODULE_SURFACE} shadow-[0_4px_24px_-4px_rgba(10,31,68,0.08),0_2px_6px_-2px_rgba(10,31,68,0.04)] overflow-hidden p-2 md:p-3 flex flex-col`}
      >
        <div className="w-full flex-1 min-h-[200px] max-h-[min(480px,52vh)] aspect-video">
          <VideoLessonPlayer
            title={videoTitle}
            videoUrl={screen.videoUrl ?? null}
            theme="light"
            compact
            hideFooter={!screen.videoUrl}
            className="h-full w-full rounded-xl border-0"
          />
        </div>
      </div>
    </div>
  );

  const scriptButton =
    screen.transcriptDropdown && !isScriptOpen ? (
      <div className="shrink-0 w-full text-left">
        <button
          type="button"
          onClick={onOpenScript}
          className="w-full flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition-colors text-left py-3 px-5 md:px-6 min-h-[56px] rounded-xl border border-slate-200 shadow-[0_4px_24px_-4px_rgba(10,31,68,0.08)]"
        >
          <div
            className="text-[16px] md:text-[18px] font-medium leading-relaxed"
            style={{ color: '#1F3864' }}
          >
            {screen.transcriptDropdown.header}
          </div>
          <span
            className="material-symbols-outlined shrink-0"
            style={{ color: '#1F7A7A' }}
          >
            menu_book
          </span>
        </button>
      </div>
    ) : null;

  const watchBody = screen.watchIntro ? (
    isScriptOpen ? (
      <div className="flex flex-col gap-6 w-full flex-1 min-h-0">
        <div className="w-full flex flex-col flex-1 min-h-0 gap-4">
          {videoPlayer}
        </div>
        {!hideIntroHeadline ? (
          <WatchIntroHeadline intro={screen.watchIntro} />
        ) : null}
        {/* <WatchIntroCompareCards intro={screen.watchIntro} /> */}
      </div>
    ) : (
      <div className="flex flex-col flex-1 min-h-0 gap-5 lg:gap-6">
        {!hideIntroHeadline ? (
          <WatchIntroHeadline intro={screen.watchIntro} />
        ) : null}
        <div className="flex flex-col flex-1 min-h-0">{videoPlayer}</div>
        {scriptButton}
        {/* <WatchIntroCompareCards intro={screen.watchIntro} /> */}
      </div>
    )
  ) : (
    <div className="space-y-8 flex-1 min-h-0">
      {screen.body ? (
        <div className="border-l-4 border-l-[#2E7CF6] pl-5 md:pl-6 py-1">
          <p
            className="text-left text-[15px] md:text-[16px] font-semibold leading-relaxed whitespace-pre-line"
            style={{ color: '#1F3864' }}
          >
            {screen.body}
          </p>
        </div>
      ) : null}
      {videoPlayer}
      {scriptButton}
    </div>
  );

  const contentClassName =
    'w-full max-w-[1200px] mx-auto flex flex-col flex-1 min-h-0 h-full gap-6 lg:gap-8';

  if (isScriptOpen && screen.transcriptDropdown) {
    return (
      <div className="relative w-full max-w-[1200px] mx-auto flex flex-1 min-h-0 h-full">
        <div className="hidden lg:flex flex-1 min-h-0 gap-6 w-full">
          <ScriptSidebarPanel
            header={screen.transcriptDropdown.header}
            body={screen.transcriptDropdown.body}
            onClose={onCloseScript}
            className="w-[min(380px,38%)] rounded-xl shrink-0"
          />
          <div className={`${contentClassName} min-w-0 !max-w-none flex-1`}>
            {watchBody}
          </div>
        </div>
        <div className="lg:hidden absolute inset-0 z-20 flex flex-col overflow-hidden">
          <ScriptSidebarPanel
            header={screen.transcriptDropdown.header}
            body={screen.transcriptDropdown.body}
            onClose={onCloseScript}
            className="flex-1 w-full rounded-xl shadow-lg"
          />
        </div>
      </div>
    );
  }

  return <div className={contentClassName}>{watchBody}</div>;
}

function CoverSection({ screen }: { screen: Screen }) {
  const topics = [
    { label: 'Distress', image: scenario1Image },
    { label: 'Defiance', image: scenario2Image },
    { label: 'Overwhelm', image: scenario3Image },
  ] as const;

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col flex-1 min-h-0 h-full gap-4 md:gap-5">
      <h2
        className="shrink-0 text-[32px] leading-tight font-bold max-w-3xl"
        style={{ color: '#1F3864' }}
      >
        {screen.body?.trim()}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 min-h-0">
        {topics.map((item) => (
          <div key={item.label} className="flex flex-col min-h-0 gap-2">
            <div className="flex-1 min-h-[120px] max-h-[200px] sm:max-h-none relative overflow-hidden rounded-2xl shadow-md">
              <img
                className="w-full h-full object-cover"
                src={item.image}
                alt={item.label}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F3864]/40 to-transparent" />
            </div>
            <p
              className="shrink-0 text-center text-[14px] font-semibold"
              style={{ color: '#1F7A7A' }}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <div className="shrink-0 flex items-center gap-4 py-4 px-5 md:px-6 rounded-xl bg-white border border-slate-200 shadow-[0_4px_24px_-4px_rgba(10,31,68,0.08)]">
        <ModuleFavicon className="w-12 h-12 object-contain shrink-0" />
        <p
          className="text-[16px] md:text-[18px] leading-relaxed font-medium"
          style={{ color: '#1F3864' }}
        >
          And what to do in the three seconds before you respond.
        </p>
      </div>
    </div>
  );
}

function TechniqueHonestSection({ screen }: { screen: Screen }) {
  return (
    <div className="max-w-[1200px] mx-auto w-full">
      {screen.keyPoint ? (
        <div className="rounded-xl h-[400px] overflow-hidden shadow-[0_4px_24px_-4px_rgba(10,31,68,0.12)] border border-[#1F3864]/20 bg-[#1F3864]">
          <div className="p-8 md:p-10 h-full flex flex-col justify-center">
            <div className="flex items-start gap-4 md:gap-6">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#2E7CF6]/20 flex items-center justify-center shrink-0">
                <ModuleFavicon className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[16px] md:text-[18px] leading-relaxed text-white/90 italic">
                  &ldquo;{screen.keyPoint}&rdquo;
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function WhatNotToDoStepperSection({ screen }: { screen: Screen }) {
  const steps = screen.timelineSteps ?? [];
  const [activeStep, setActiveStep] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);
  const active = steps[activeStep];

  const switchStep = (index: number) => {
    if (index === activeStep || !steps[index]) return;
    setContentVisible(false);
    setTimeout(() => {
      setActiveStep(index);
      setContentVisible(true);
    }, 300);
  };

  const stepCount = steps.length;
  const trackInset = stepCount > 0 ? `${50 / stepCount}%` : '0%';
  const progressFill = stepCount > 1 ? (activeStep / (stepCount - 1)) * 100 : 0;

  return (
    <div className="w-full max-w-[1200px] mx-auto relative flex flex-col flex-1 min-h-0 h-full overflow-hidden pt-2">
      {screen.body ? (
        <header className="shrink-0 mb-6">
          <h2
            className="text-[32px] leading-tight font-bold"
            style={{ color: '#1F3864' }}
          >
            {screen.body}
          </h2>
        </header>
      ) : null}
      <div className="relative flex items-start justify-between mb-6 shrink-0 px-1">
        <div
          className="absolute top-5 h-1 z-0 rounded-full overflow-hidden"
          style={{ left: trackInset, right: trackInset }}
        >
          <div className="relative h-full w-full rounded-full bg-slate-200">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-[#2E7CF6] transition-all duration-500"
              style={{ width: `${progressFill}%` }}
            />
          </div>
        </div>
        {steps.map((step, index) => {
          const isActive = activeStep === index;
          const isCompleted = index <= activeStep;
          return (
            <button
              key={step.header}
              type="button"
              onClick={() => switchStep(index)}
              className="relative z-10 flex flex-col items-center group flex-1 min-w-0"
            >
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 active:scale-95 shrink-0 ${
                  isActive
                    ? 'border-[#2E7CF6] bg-[#2E7CF6]/10 text-[#2E7CF6] ring-4 ring-[#2E7CF6]/15'
                    : isCompleted
                      ? 'border-[#2E7CF6] bg-[#2E7CF6]/10 text-[#2E7CF6]'
                      : 'border-slate-300 bg-white text-slate-500 group-hover:border-[#2E7CF6]'
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  {step.icon}
                </span>
              </div>
              <span
                className={`mt-2 text-[11px] font-medium text-center leading-tight px-0.5 hidden sm:block ${
                  isActive
                    ? 'text-[#1F3864] font-bold'
                    : 'text-slate-500 opacity-60'
                }`}
              >
                {index + 1}. {step.shortLabel}
              </span>
            </button>
          );
        })}
      </div>

      {active ? (
        <div
          className={`grid grid-cols-12 gap-4 w-full flex-1 min-h-0 overflow-hidden transition-all duration-300 ${
            contentVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <div
            className={`col-span-12 w-full ${MODULE_SURFACE} p-4 md:pt-10 md:px-5 rounded-xl border border-slate-200 shadow-[0_20px_40px_-15px_rgba(47,99,120,0.06)] flex flex-col min-h-0 overflow-hidden`}
          >
            <div className="ml-0 md:ml-4 flex items-center gap-3 mb-3 shrink-0 ">
              <div className="p-3 rounded-lg bg-[#2E7CF6]/10 text-[#2E7CF6] shrink-0">
                <span className="material-symbols-outlined text-3xl">
                  {active.icon}
                </span>
              </div>
              <div className="min-w-0">
                <h2 className="text-lg md:text-2xl font-semibold text-[#1F3864] leading-snug">
                  {active.header}
                </h2>
                <p className="text-sm md:text-base font-medium text-slate-500 mt-0.5">
                  {activeStep + 1} of {steps.length}
                </p>
              </div>
            </div>
            <p className="text-[15px] md:text-[20px]  ml-0 md:ml-4 py-2 overflow-y-auto custom-scrollbar text-slate-700 leading-relaxed">
              {active.body}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const PRACTICE_INTRO_STEPS = [
  {
    number: 1,
    label: 'Read it',
    detail: 'Read the situation',
    icon: 'menu_book',
  },
  {
    number: 2,
    label: 'Choose',
    detail: 'Pick what you would do',
    icon: 'touch_app',
  },
  {
    number: 3,
    label: 'Compare',
    detail: 'See the feedback',
    icon: 'compare_arrows',
  },
] as const;

function PracticeIntroSection({ screen }: { screen: Screen }) {
  return (
    <div className="max-w-[1200px] mx-auto flex flex-col flex-1 min-h-0 h-full overflow-hidden pt-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 flex-1 min-h-0 items-stretch">
        <div className="lg:col-span-7 flex flex-col min-h-0 overflow-hidden">
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1 -mr-1">
            {screen.t2 ? (
              <h2
                className="text-[32px] leading-tight font-bold mb-4"
                style={{ color: '#1F3864' }}
              >
                {screen.t2}
              </h2>
            ) : null}

            {screen.lead ? (
              <p
                className="text-[18px] leading-relaxed mb-6"
                style={{ color: '#333333' }}
              >
                {screen.lead}
              </p>
            ) : null}

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {PRACTICE_INTRO_STEPS.map((step) => (
                <div
                  key={step.number}
                  className={`${MODULE_SURFACE} rounded-xl overflow-hidden border border-slate-200 shadow-[0_20px_40px_-15px_rgba(47,99,120,0.06)]`}
                >
                  <div
                    className="w-full h-[170px] p-5 flex flex-col items-center justify-center text-center gap-4"
                    aria-label={`${step.label}. ${step.detail}`}
                  >
                    <div className="size-14 shrink-0 aspect-square rounded-full bg-[#2E7CF6]/10 flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-[28px] leading-none text-[#2E7CF6]"
                        style={{ fontVariationSettings: '"FILL" 1' }}
                      >
                        {step.icon}
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 shrink-0">
                      <div className="text-[15px] font-semibold leading-tight text-[#1F3864]">
                        {step.label}
                      </div>
                      <div className="h-1 w-12 rounded-full bg-[#2E7CF6]/20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {screen.body ? (
              <p className="text-[15px] text-slate-700 leading-relaxed">
                {screen.body}
              </p>
            ) : null}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col min-h-[220px] lg:min-h-0">
          <div className="relative flex-1 min-h-0 rounded-xl overflow-hidden border border-slate-200 shadow-[0_20px_40px_-15px_rgba(47,99,120,0.06)]">
            <img
              className="w-full h-full object-cover object-[center_65%]"
              src={structurePracticeImage}
              alt="Practise scenarios"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ScenarioHeading({ scenarioId }: { scenarioId: 1 | 2 | 3 }) {
  return (
    <h2
      className="w-full min-w-0 text-left text-[24px] leading-tight font-semibold mb-4 shrink-0"
      style={{ color: '#1F3864' }}
    >
      Scenario {scenarioId} of 3
    </h2>
  );
}

function ScenarioIntroCallout() {
  return (
    <p
      className={`mb-4 shrink-0 w-full min-w-0 text-left rounded-xl border-l-4 border-l-[#2E7CF6] ${MODULE_SURFACE} px-5 py-4 text-[16px] md:text-[17px] leading-relaxed font-medium`}
      style={{ color: '#1F3864' }}
    >
      Read the situation, then choose what you would do.
    </p>
  );
}

function ScenarioInsightCard({ children }: { children: string }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-[0_4px_24px_-4px_rgba(10,31,68,0.12)] border border-[#1F3864]/20 bg-[#1F3864]">
      <div className="p-5 md:p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#2E7CF6]/20 flex items-center justify-center shrink-0">
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ color: '#2E7CF6' }}
            >
              lightbulb
            </span>
          </div>
          <div>
            <div className="text-[15px] font-semibold text-white mb-2">
              The point
            </div>
            <div className="text-[14px] leading-relaxed text-white/90 whitespace-pre-line">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScenarioChoiceGrid({
  scenarioId,
  selected,
  onSelect,
}: {
  scenarioId: 1 | 2 | 3;
  selected: ScenarioOptionKey | null;
  onSelect: (key: ScenarioOptionKey) => void;
}) {
  const scenario = SCENARIOS[scenarioId];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {(Object.keys(scenario.options) as ScenarioOptionKey[]).map((key) => {
        const isSelected = selected === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onSelect(key)}
            className={`text-left rounded-xl border p-6 md:p-7 min-h-[120px] transition-all ${
              isSelected
                ? 'bg-[#EEF4FF] border-[#2E7CF6] shadow-[0_0_0_1px_rgba(46,124,246,0.25)]'
                : `${SCENARIO_OPTION_STYLE.card} hover:border-[#2E7CF6]/40 shadow-[0_20px_40px_-15px_rgba(47,99,120,0.06)]`
            }`}
          >
            <div className="flex items-start gap-5">
              <span
                className={`flex items-center justify-center w-12 h-12 rounded-xl text-base font-bold shrink-0 ${
                  isSelected
                    ? SCENARIO_OPTION_STYLE.badgeSelected
                    : SCENARIO_OPTION_STYLE.badge
                }`}
              >
                {key}
              </span>
              <p className="text-[16px] text-slate-700 leading-relaxed">
                {scenario.options[key]}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function ScenarioSituationSection({
  scenarioId,
  selected,
  onSelect,
  hideSituation = false,
  hideOptions = false,
  situationContent,
  showScenarioHeading = true,
  showIntroCallout = false,
  situationVisible = true,
  optionsVisible = true,
  situationRevealOverlay,
  optionsRevealOverlay,
}: {
  scenarioId: 1 | 2 | 3;
  selected: ScenarioOptionKey | null;
  onSelect: (key: ScenarioOptionKey) => void;
  hideSituation?: boolean;
  hideOptions?: boolean;
  situationContent?: React.ReactNode;
  showScenarioHeading?: boolean;
  showIntroCallout?: boolean;
  situationVisible?: boolean;
  optionsVisible?: boolean;
  situationRevealOverlay?: React.ReactNode;
  optionsRevealOverlay?: React.ReactNode;
}) {
  const scenario = SCENARIOS[scenarioId];

  return (
    <div className="max-w-[1200px] mx-auto w-full min-w-0 self-stretch flex flex-col flex-1 min-h-0 h-full overflow-hidden pt-2">
      {showScenarioHeading ? (
        <ScenarioHeading scenarioId={scenarioId} />
      ) : null}
      {showIntroCallout ? <ScenarioIntroCallout /> : null}
      <div className="relative flex-1 min-h-0 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1 -mr-1">
        {!hideSituation ? (
          <div
            className={`w-full ${MODULE_SURFACE} p-6 md:p-6 h-[200px] lg:p-10 rounded-xl border-l-4 border-l-[#2E7CF6] transition-all duration-[350ms] ease-out ${
              situationVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            <p
              className="text-[18px] md:text-[20px] lg:text-[20px] leading-relaxed whitespace-pre-line"
              style={{ color: '#1F3864' }}
            >
              {situationContent ?? scenario.situation}
            </p>
          </div>
        ) : null}

        {!hideOptions ? (
          <div
            className={`mt-8 space-y-6 transition-all duration-[350ms] ease-out ${
              optionsVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            <h3
              className="text-[24px] md:text-[24px] leading-tight font-semibold"
              style={{ color: '#1F3864' }}
            >
              {scenario.title}
            </h3>
            <ScenarioChoiceGrid
              scenarioId={scenarioId}
              selected={selected}
              onSelect={onSelect}
            />
          </div>
        ) : null}
        </div>
        {situationRevealOverlay}
        {optionsRevealOverlay}
      </div>
    </div>
  );
}

function ScenarioCompareModal({
  scenarioId,
  selected,
  open,
  onClose,
}: {
  scenarioId: 1 | 2 | 3;
  selected: ScenarioOptionKey;
  open: boolean;
  onClose: () => void;
}) {
  const scenario = SCENARIOS[scenarioId];
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!open) setShowAll(false);
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      <button
        type="button"
        aria-label="Close compare feedback"
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
      />

      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl border border-slate-200 bg-white shadow-[0_30px_120px_rgba(15,23,42,0.18)]">
        <div className="flex items-start justify-between gap-4 shrink-0 p-5 md:p-6 border-b border-slate-200">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#2E7CF6] mb-1">
              Compare your choice
            </p>
            <p className="text-[18px] font-semibold text-[#1F3864]">
              Option {selected}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-500 hover:text-slate-900 transition-colors shrink-0"
            aria-label="Close compare feedback"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-5 md:p-6 space-y-5">
          <div
            className={`${MODULE_SURFACE} rounded-xl border border-[#2E7CF6]/30 shadow-[0_20px_40px_-15px_rgba(47,99,120,0.06)] p-5 md:p-6`}
          >
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#2E7CF6] mb-2">
              Your choice
            </p>
            <p className="text-[15px] text-slate-700 leading-relaxed whitespace-pre-line">
              {scenario.feedback[selected]}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="text-[14px] font-semibold text-[#2E7CF6] hover:text-[#1F3864] transition-colors"
          >
            {showAll ? 'Hide other options' : 'See all options'}
          </button>

          {showAll ? (
            <div className="space-y-3">
              {(Object.keys(scenario.feedback) as ScenarioOptionKey[])
                .filter((key) => key !== selected)
                .map((key) => (
                  <div
                    key={key}
                    className={`${MODULE_SURFACE} rounded-xl border border-slate-200 p-4 md:p-5`}
                  >
                    <p className="text-[13px] font-semibold text-slate-500 mb-2">
                      Option {key}
                    </p>
                    <p className="text-[14px] text-slate-700 leading-relaxed whitespace-pre-line">
                      {scenario.feedback[key]}
                    </p>
                  </div>
                ))}
            </div>
          ) : null}

          <ScenarioInsightCard>{scenario.point}</ScenarioInsightCard>
        </div>
      </div>
    </div>,
    document.body
  );
}

function ModuleInlineHeader({
  screen,
  activeSidebarSectionKey,
  isModuleContentsOpen,
  onToggleModuleContents,
  visible = true,
  keepTitleAnchor = false,
  hideTitle = false,
  suppressEntranceAnimation = false,
  titleAnchorRef,
}: {
  screen: Screen;
  activeSidebarSectionKey: SidebarSectionKey | null;
  isModuleContentsOpen: boolean;
  onToggleModuleContents: () => void;
  visible?: boolean;
  keepTitleAnchor?: boolean;
  hideTitle?: boolean;
  suppressEntranceAnimation?: boolean;
  titleAnchorRef?: React.RefObject<HTMLHeadingElement>;
}) {
  const title = getModulePageTitle(screen, activeSidebarSectionKey);

  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = !prefersReducedMotion && !suppressEntranceAnimation;
  const HEADER_FADE_MS = 350;
  const [mounted, setMounted] = useState(visible);
  const [shown, setShown] = useState(visible);

  useEffect(() => {
    if (!shouldAnimate) {
      setMounted(visible);
      setShown(visible);
      return;
    }

    if (visible) {
      setMounted(true);
      requestAnimationFrame(() => setShown(true));
      return;
    }

    setShown(false);
    const timer = window.setTimeout(() => setMounted(false), HEADER_FADE_MS);
    return () => window.clearTimeout(timer);
  }, [visible, shouldAnimate]);

  const titleBlock = (
    <div className="px-5 md:px-14">
      <div className="max-w-[1200px] mx-auto w-full min-w-0">
        <div
          className={`max-h-[120px] overflow-visible ${
            hideTitle && visible
              ? 'opacity-0 invisible pointer-events-none'
              : 'opacity-100 visible'
          }`}
          aria-hidden={hideTitle && visible}
        >
          <ModulePartTitle
            title={title}
            blockId={screen.id}
            titleRef={titleAnchorRef}
          />
        </div>
      </div>
    </div>
  );

  if (!visible && keepTitleAnchor) {
    return (
      <div
        className="absolute inset-x-0 top-0 -z-10 opacity-0 pointer-events-none"
        aria-hidden
      >
        <div className="pt-4 pb-2">
          <div className="mb-3 h-11" aria-hidden />
          {titleBlock}
        </div>
      </div>
    );
  }

  if (!mounted) return null;

  return (
    <div
      className={`shrink-0 pt-4 pb-2 border-b border-slate-200 ${MODULE_PAGE_TINT} backdrop-blur-sm transition-all duration-[350ms] ease-out ${
        shown
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="flex items-stretch justify-between mb-3 w-full">
        <Link
          to="/dashboard/my-learning/mind-sync"
          className="flex items-center gap-2.5 text-slate-600 hover:text-[#1F3864] transition-colors  px-3 py-2 hover:bg-[#EEF4FF] hover:border-[#2E7CF6]/30 shrink-0"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          <span className="text-sm font-semibold uppercase tracking-widest">
            Back to Mind Sync
          </span>
        </Link>
        {!isModuleContentsOpen ? (
          <button
            type="button"
            onClick={onToggleModuleContents}
            aria-expanded={false}
            aria-label="Open module contents"
            className="hidden md:flex items-center gap-2.5 text-slate-600 hover:text-[#1F3864] transition-colors  px-3 py-2 hover:bg-[#EEF4FF] hover:border-[#2E7CF6]/30 shrink-0"
          >
            <ModuleFavicon className="w-6 h-6 shrink-0" />
            <span className="text-sm font-semibold uppercase tracking-widest">
              Module Contents
            </span>
            <span className="material-symbols-outlined text-lg">
              chevron_left
            </span>
          </button>
        ) : null}
      </div>
      {titleBlock}
    </div>
  );
}

function LandingSection({
  screen,
  onNext,
}: {
  screen: Screen;
  onNext: () => void;
}) {
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={moduleBgImage}
          alt="Mind Sync"
          className="w-full h-full object-cover object-[center_7%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/55 to-transparent" />
        <div className="absolute inset-0 bg-white/10" />
      </div>

      <div className="relative z-20 shrink-0 pt-4 pointer-events-auto">
        <Link
          to="/dashboard/my-learning/mind-sync"
          className="inline-flex items-center gap-2.5 text-slate-700 hover:text-slate-900 transition-colors px-3 py-2  hover:border-[#2E7CF6]/30 shrink-0"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          <span className="text-sm font-semibold uppercase tracking-widest">
            Back to Mind Sync
          </span>
        </Link>
      </div>

      <button
        type="button"
        onClick={onNext}
        aria-label="Start Module 1"
        className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-8 w-full min-h-0 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7CF6] focus-visible:ring-offset-2"
      >
        {screen.t1 ? (
          <h1
            className="text-5xl md:text-6xl lg:text-7xl leading-tight font-bold mb-6 tracking-tight transition-transform group-hover:scale-[1.02]"
            style={{ color: '#1F3864' }}
          >
            {screen.t1}
          </h1>
        ) : null}
        {screen.t2 ? (
          <h2
            className="text-3xl md:text-4xl lg:text-5xl leading-snug font-bold max-w-3xl transition-transform group-hover:scale-[1.02]"
            style={{ color: '#1F7A7A' }}
          >
            {screen.t2}
          </h2>
        ) : null}
        {screen.lead ? (
          <p className="mt-6 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl text-slate-600 transition-transform group-hover:scale-[1.01]">
            {screen.lead}
          </p>
        ) : null}
        <span className="mt-8 text-sm font-semibold uppercase tracking-widest text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
          Click to begin
        </span>
        <ModuleFavicon className="mt-8 w-28 h-28 md:w-32 md:h-32 object-contain transition-transform group-hover:scale-105" />
      </button>

      <div className="relative z-20 shrink-0 flex justify-center pb-10 md:pb-14 pointer-events-none">
        {/* reserved bottom spacing */}
      </div>
    </div>
  );
}

type TocItem = { index: number; label: string; blockId: number };

function ModuleContentsSidebar({
  toc,
  sidebarSections,
  openSections,
  activeSidebarSectionKey,
  index,
  screen,
  toggleSection,
  setIndex,
  sidebarScrollRef,
  suppressAutoOpenRef,
  isSidebarTranscriptOpen,
  setIsSidebarTranscriptOpen,
  isOpen,
  onToggle,
}: {
  toc: TocItem[];
  sidebarSections: SidebarSection[];
  openSections: Record<SidebarSectionKey, boolean>;
  activeSidebarSectionKey: SidebarSectionKey | null;
  index: number;
  screen: Screen;
  toggleSection: (key: SidebarSectionKey) => void;
  setIndex: (index: number) => void;
  sidebarScrollRef: React.MutableRefObject<HTMLDivElement | null>;
  suppressAutoOpenRef: React.MutableRefObject<boolean>;
  isSidebarTranscriptOpen: boolean;
  setIsSidebarTranscriptOpen: (open: boolean) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <aside
      className={`relative hidden md:flex flex-col shrink-0 h-full bg-white overflow-hidden transition-[width,opacity,border] duration-200 ${
        isOpen
          ? 'w-[280px] border-l border-slate-200 opacity-100'
          : 'w-0 border-0 opacity-0 pointer-events-none'
      }`}
    >
      <div className="p-6 border-b flex items-start justify-between gap-3 shrink-0 min-w-[280px]">
        <div className="min-w-0">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">
            Module Contents
          </h2>
          <p className="text-xs text-slate-400">{toc.length} blocks</p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-label="Close module contents"
          className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-[#EEF4FF] hover:border-[#2E7CF6]/30 transition-colors flex items-center justify-center shrink-0"
        >
          <span className="material-symbols-outlined text-slate-600 text-lg">
            chevron_right
          </span>
        </button>
      </div>
      <div
        ref={sidebarScrollRef}
        className="flex-1 min-h-0 min-w-[280px] overflow-y-auto custom-scrollbar bg-white"
      >
        {sidebarSections.map((section) => {
          const isOpen = openSections[section.key];
          const isActiveSection = section.key === activeSidebarSectionKey;
          const isCollapsible =
            section.key !== 'closing' && section.key !== 'watch';
          const visibleIndices = section.indices.filter((i) => {
            const item = toc[i];
            if (!item) return false;
            if (
              item.blockId === 0 ||
              item.blockId === 8 ||
              item.blockId === 9 ||
              item.blockId === 10 ||
              item.blockId === 11 ||
              item.blockId === 14 ||
              item.blockId === 20 ||
              item.blockId === 21 ||
              item.blockId === 23 ||
              item.blockId === 24 ||
              item.blockId === 26 ||
              item.blockId === 27
            )
              return false;
            return true;
          });

          const isSectionActive = isActiveSection;

          const canCollapse = isCollapsible && visibleIndices.length > 1;
          const shouldShowItems = canCollapse && isOpen;
          return (
            <div key={section.key} className="border-b border-slate-200">
              {canCollapse ? (
                <button
                  type="button"
                  onClick={() => toggleSection(section.key)}
                  data-sidebar-section-header="true"
                  data-section-key={section.key}
                  aria-expanded={isOpen}
                  className={`w-full text-left px-4 py-4 border-t flex items-center justify-between gap-3 transition-colors relative ${
                    isSectionActive
                      ? 'bg-[#EEF4FF]'
                      : isOpen
                        ? 'bg-[#F7FAFF]'
                        : 'hover:bg-slate-50'
                  }`}
                >
                  {isSectionActive ? (
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2E7CF6]/60 to-transparent" />
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <div
                      className={`text-xs font-bold uppercase tracking-widest truncate ${
                        isActiveSection || isOpen
                          ? 'text-[#1F3864]'
                          : 'text-slate-700'
                      }`}
                    >
                      {section.label}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {visibleIndices.length} blocks
                    </div>
                  </div>
                  <span
                    className={`material-symbols-outlined text-slate-500 transition-transform shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const targetIndex = section.indices[0];
                    if (typeof targetIndex !== 'number') return;
                    if (targetIndex !== index)
                      suppressAutoOpenRef.current = true;
                    setIndex(targetIndex);
                  }}
                  data-sidebar-section-header="true"
                  data-section-key={section.key}
                  className={`w-full text-left px-4 py-4 flex items-center justify-between gap-3 transition-colors relative ${
                    isSectionActive ? 'bg-[#EEF4FF]' : 'hover:bg-slate-50'
                  }`}
                >
                  {isSectionActive ? (
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2E7CF6]/60 to-transparent" />
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <div
                      className={`text-xs font-bold uppercase tracking-widest truncate ${
                        isActiveSection ? 'text-[#1F3864]' : 'text-slate-700'
                      }`}
                    >
                      {section.label}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {visibleIndices.length} blocks
                    </div>
                  </div>
                </button>
              )}

              {shouldShowItems ? (
                <div>
                  {visibleIndices.map((i) => {
                    const item = toc[i];
                    if (!item) return null;
                    const isCurrent = item.index === index;
                    const isLanding = section.landingBlockId === item.blockId;
                    return (
                      <button
                        key={`${item.blockId}-${item.index}`}
                        type="button"
                        onClick={() => setIndex(item.index)}
                        data-sidebar-item="true"
                        data-toc-index={item.index}
                        className={`w-full text-left px-4 py-3 border-t flex items-start gap-3 transition-colors cursor-pointer ${
                          isCurrent
                            ? 'border-slate-200 bg-[#bdd2f8]'
                            : 'border-slate-200 hover:bg-[#EEF4FF]'
                        }`}
                      >
                        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          {isCurrent ? (
                            <div className="w-6 h-6 rounded-full border border-[#2E7CF6] flex items-center justify-center">
                              <div className="w-2 h-2 bg-[#2E7CF6] rounded-full animate-pulse" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full border border-slate-300" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-xs truncate ${
                              isCurrent
                                ? 'font-bold text-slate-900'
                                : 'font-medium text-slate-700'
                            }`}
                          >
                            {item.label}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {isLanding
                              ? 'Section overview'
                              : `Block ${item.blockId}`}
                          </p>
                        </div>
                      </button>
                    );
                  })}

                  {section.key === 'watch' &&
                  screen.type === 'video' &&
                  screen.transcriptDropdown ? (
                    <div className="p-4 border-t border-white/5">
                      <button
                        type="button"
                        onClick={() => setIsSidebarTranscriptOpen(true)}
                        className="w-full h-[56px] rounded-xl border border-white/10 bg-[#1A1A33]/60 hover:bg-[#1A1A33]/75 transition-colors flex items-center gap-3 px-4 text-left"
                      >
                        <span className="material-symbols-outlined text-[#818CF8]">
                          menu_book
                        </span>
                        <span className="text-sm font-medium text-white/85 truncate">
                          {screen.transcriptDropdown.header}
                        </span>
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {isSidebarTranscriptOpen &&
      screen.type === 'video' &&
      screen.transcriptDropdown ? (
        <div className="absolute inset-0 z-20">
          <button
            type="button"
            aria-label="Close transcript"
            onClick={() => setIsSidebarTranscriptOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="absolute inset-3 glass-panel rounded-2xl border border-white/10 bg-[#020617]/90 backdrop-blur p-4 shadow-[0_30px_120px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                  Transcript
                </div>
                <div className="mt-1 text-sm font-semibold text-white truncate">
                  {screen.transcriptDropdown.header}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSidebarTranscriptOpen(false)}
                className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-colors flex items-center justify-center shrink-0"
              >
                <span className="material-symbols-outlined text-white/80">
                  close
                </span>
              </button>
            </div>

            <div className="mt-4 flex-1 min-h-0 overflow-y-auto custom-scrollbar text-sm text-slate-200 whitespace-pre-line leading-relaxed pr-1">
              {screen.transcriptDropdown.body}
            </div>
          </div>
        </div>
      ) : null}
    </aside>
  );
}

function parseTakeawaySteps(text: string): {
  steps: { number: number; body: string }[];
  footerLabel?: string;
} {
  const steps: { number: number; body: string }[] = [];
  let footerLabel: string | undefined;

  for (const block of text.trim().split(/\n\n+/)) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    const stepMatch = trimmed.match(/^(\d+)\.\s+([\s\S]+)/);
    if (stepMatch) {
      steps.push({
        number: Number(stepMatch[1]),
        body: stepMatch[2].trim(),
      });
      continue;
    }

    footerLabel = trimmed;
  }

  return { steps, footerLabel };
}

function ClosingSection({
  screen,
  activeSidebarSectionKey,
}: {
  screen: Screen;
  activeSidebarSectionKey: SidebarSectionKey | null;
}) {
  const showTitle =
    screen.t2 &&
    !isSameAsBlockHeader(screen.t2, screen, activeSidebarSectionKey);

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col flex-1 min-h-0 h-full justify-center gap-5 md:gap-6">
      {showTitle ? (
        <h2
          className="shrink-0 text-[32px] leading-tight font-bold max-w-3xl"
          style={{ color: '#1F3864' }}
        >
          {screen.t2}
        </h2>
      ) : null}

      <div
        className={`rounded-xl border border-slate-200 ${MODULE_SURFACE} shadow-[0_20px_40px_-15px_rgba(47,99,120,0.06)] overflow-hidden border-l-4 border-l-[#2E7CF6] p-6 md:p-8`}
      >
        <div className="flex items-start gap-4 md:gap-5">
          <ModuleFavicon className="w-8 h-8 mt-0.5 shrink-0" />
          <div className="space-y-5 min-w-0">
            <p
              className="text-[16px] md:text-[17px] leading-relaxed"
              style={{ color: '#333333' }}
            >
              {screen.closingBody}
            </p>
            <Link
              to="/dashboard/my-learning/mind-sync/module-2"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm md:text-base font-semibold text-white bg-[#2E7CF6] hover:bg-[#2563EB] transition-colors"
            >
              <span>Start Module 2</span>
              <span className="material-symbols-outlined text-[20px]">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function TakeawayCardSection({ screen }: { screen: Screen }) {
  const [headingLine1, headingLine2 = ''] = (
    screen.takeawayHeading ?? ''
  ).split('\n');

  const hasHighlight = Boolean(
    screen.takeawayBody?.includes(TAKEAWAY_HIGHLIGHT_TEXT)
  );
  const highlightParts = hasHighlight
    ? (screen.takeawayBody ?? '').split(TAKEAWAY_HIGHLIGHT_TEXT)
    : [];
  const parsedSteps = hasHighlight
    ? parseTakeawaySteps(highlightParts[0] ?? '')
    : {
        steps: [] as { number: number; body: string }[],
        footerLabel: undefined as string | undefined,
      };

  const renderCardBody = () => {
    if (!screen.takeawayBody) return null;

    if (!hasHighlight) {
      return (
        <p className="text-[14px] md:text-[18px] whitespace-pre-wrap leading-snug">
          {screen.takeawayBody}
        </p>
      );
    }

    return (
      <>
        <div className="space-y-2">
          {parsedSteps.steps.map((step) => (
            <div
              key={step.number}
              className="flex items-start gap-3 rounded-lg border border-slate-100 bg-[#F7F9FB] p-3 md:p-3.5"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#2E7CF6]/10 text-[#2E7CF6] text-xs font-bold shrink-0">
                {step.number}
              </span>
              <p className="text-[14px] md:text-[15px] leading-snug flex-1 min-w-0">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {highlightParts[1] ? (
          <p className="text-[14px] md:text-[15px] whitespace-pre-wrap leading-snug">
            {highlightParts[1]}
          </p>
        ) : null}
      </>
    );
  };

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col flex-1 min-h-0 h-full overflow-hidden gap-3">
      {screen.body ? (
        <header className="pt-2 shrink-0">
          <h2
            className="text-[32px] leading-tight font-bold max-w-[1200px]"
            style={{ color: '#1F3864' }}
          >
            {screen.body}
          </h2>
        </header>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 flex-1 min-h-0 items-stretch">
        <div
          className={`rounded-xl border border-slate-200 ${MODULE_SURFACE} shadow-[0_20px_40px_-15px_rgba(47,99,120,0.06)] overflow-hidden border-l-4 border-l-[#2E7CF6] flex flex-col min-h-0`}
        >
          <div className="p-5 md:p-6 flex flex-col min-h-0">
            <div className="flex items-start gap-3 mb-3 shrink-0">
              <ModuleFavicon className="w-7 h-7 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                  Printable, saveable card
                </div>
                {headingLine1 ? (
                  <h3
                    className="text-[20px] md:text-[22px] leading-tight font-bold"
                    style={{ color: '#1F3864' }}
                  >
                    {headingLine1}
                  </h3>
                ) : null}
                {headingLine2 ? (
                  <p
                    className="text-[15px] md:text-[16px] font-semibold mt-0.5"
                    style={{ color: '#1F7A7A' }}
                  >
                    {headingLine2}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="space-y-2 min-h-0" style={{ color: '#1F3864' }}>
              {renderCardBody()}
            </div>
          </div>
        </div>

        {hasHighlight ? (
          <div className="flex flex-col gap-2 min-h-0 flex-1">
            {parsedSteps.footerLabel ? (
              <p
                className="shrink-0 text-sm md:text-[15px] font-semibold uppercase tracking-wide"
                style={{ color: '#1F3864' }}
              >
                {parsedSteps.footerLabel}
              </p>
            ) : null}
            <div className="bg-[#F7F9FB] p-4 md:p-5 rounded-xl border-l-4 border-l-[#2E7CF6] shrink-0">
              <p className="text-[14px] md:text-[15px] leading-snug text-[#1F3864] whitespace-pre-wrap">
                {TAKEAWAY_HIGHLIGHT_TEXT}
              </p>
            </div>
            <div className="relative flex-1 min-h-[100px] rounded-xl overflow-hidden border border-slate-200 shadow-[0_20px_40px_-15px_rgba(47,99,120,0.06)]">
              ˆ 𝛉 = (X X) ⊺ −1 X ⊺ y
              <img
                src={structureTakeawayImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F3864]/30 to-transparent" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function parseLearnStateSections(body: string): {
  whatYouSee?: string;
  underneath?: string;
  whatHelps?: string;
} {
  const parts = body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const res: {
    whatYouSee?: string;
    underneath?: string;
    whatHelps?: string;
  } = {};

  for (const p of parts) {
    const lower = p.toLowerCase();
    if (lower.startsWith('what you see:')) {
      res.whatYouSee = p.replace(/^what you see:\s*/i, '');
      continue;
    }
    if (lower.startsWith('underneath:')) {
      res.underneath = p.replace(/^underneath:\s*/i, '');
      continue;
    }
    if (lower.startsWith('what helps:')) {
      res.whatHelps = p.replace(/^what helps:\s*/i, '');
      continue;
    }
  }

  return res;
}

function LearnStateModal({
  open,
  title,
  accentColor,
  body,
  onClose,
}: {
  open: boolean;
  title: string;
  accentColor: string;
  body: string;
  onClose: () => void;
}) {
  if (!open) return null;
  const sections = parseLearnStateSections(body);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white max-w-2xl w-full rounded-xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-start gap-6 mb-6">
            <h2
              className="text-2xl md:text-3xl font-black"
              style={{ color: accentColor }}
            >
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="space-y-6">
            {sections.whatYouSee ? (
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  What you see
                </div>
                <div className="text-sm md:text-base text-slate-800 leading-relaxed">
                  {sections.whatYouSee}
                </div>
              </div>
            ) : null}

            {sections.underneath ? (
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: `${accentColor}14` }}
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Underneath
                </div>
                <div className="text-sm md:text-base text-slate-800 leading-relaxed">
                  {sections.underneath}
                </div>
              </div>
            ) : null}

            {sections.whatHelps ? (
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  What helps
                </div>
                <div className="text-sm md:text-base text-slate-800 leading-relaxed">
                  {sections.whatHelps}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function KeyPoint({ children }: { children: string }) {
  return (
    <div className="rounded-2xl border border-amber-300/60 bg-amber-50 px-5 py-4 text-slate-900 whitespace-pre-line">
      {children}
    </div>
  );
}

export default function MindSyncTeacherTrainingModule01Page() {
  const navigate = useNavigate();
  const screens: Screen[] = useMemo(
    () =>
      (
        [
          {
            id: 0,
            type: 'landing',
            t1: 'Module 1',
            t2: 'The Three Second Pause',
            lead: 'Recognising the difference between distress, defiance and overwhelm in the classroom, and how you may respond to it.',
          },
          // {
          //   id: 1,
          //   type: 'cover',
          //   t1: 'The Three Second Pause',
          //   t2: 'Reading behaviour in the moment',
          //   body: 'How to tell the difference between distress, defiance and overwhelm. ',
          // },
          // {
          //   id: 2,
          //   type: 'text',
          //   t2: 'About this module',
          //   lead: 'Sometimes a pupil’s behaviour can look like defiance when what is really going on is distress.',
          //   body: 'Same pupil, same behaviour, a different read, a completely different outcome.',
          //   dropdowns: [
          //     {
          //       header: 'Does this only apply to pupils with a diagnosis?',
          //       body: 'No. The brain patterns here show up across autism, ADHD, dyslexia and dyspraxia, in pupils with no diagnosis at all, and in any pupil on a bad day.',
          //     },
          //   ],
          // },
          {
            id: 3,
            type: 'bullets',
            t2: 'By the end you will be able to',
            bullets: [
              'Understand the difference between distress, defiance and overwhelm.',
              'Notice the early signs that a pupil is becoming overwhelmed.',
              'Use the three second pause in the classroom.',
            ],
          },
          {
            id: 4,
            type: 'research',
            headerTitle: 'The research behind the technique',
            dropdowns: RESEARCH_EVIDENCE_DROPDOWNS,
          },
          {
            id: 5,
            type: 'divider',
            t2: 'The three second pause, in a real classroom',
            watchIntro: {
              headline:
                'You are about to watch the same moment twice: a pupil who has stopped engaging, and how his teacher responds. The first time she reacts straight away. The second time she waits three seconds. See what a difference three seconds can make.',
              // before: {
              //   version: 'Version 1',
              //   timing: '~1 second',
              //   description:
              //     'The teacher responds on reflex, the way any of us might.',
              // },
              after: {
                version: 'Version 2',
                timing: '3 seconds',
                description: 'In the second she waits three.',
              },
              footer: 'Watch what changes.',
            },
            videoTitle: 'Module 1 film, around 3 minutes',
            videoUrl: MODULE_1_MAIN_VIDEO_URL,
            transcriptDropdown: {
              header: 'Read the full script',
              body: 'OPEN. Clean Elara logo, then a soft dissolve into the classroom.\n\nSCENE 1, a pupil who has checked out. A Year 9 English lesson in full flow. Daniel is near the back.\nHis book is closed and he is turning a pen over and over in his hands, bending it, clicking it, eyes\nsomewhere else. The pupils either side of him are writing.\n\nNarrator: Year 9 English, period four on a Wednesday. Watch the boy at the back. His book is shut,\nand he is turning a pen over and over in his hands. He is not being difficult and he is not being loud. He\nhas just stopped being able to join in.\n\nSCENE 2, the ask, and two realities. Ms Patel asks him calmly to get his book out. He does not open it.\nfsmall tense shake of the head, and a low mutter. From the front it looks like a knock back. Then a\nshort view from Daniel’s side: the room tilts, the light hums, a pencil tap is too loud.\n\nNarrator: A fair, ordinary instruction. From the front of the room, that looks like a refusal. But from\ninside his head, it is not refusal at all. He heard the tone, not the words. Same moment. Two\ncompletely different realities.\n\nSCENE 3, what often happens. She responds in about a second, on reflex. She asks again, harder,\nand names a consequence. It stops being about a book and starts being about winning.\n\nSCENE 4, what could happen instead. The same moment again. Narrator: In a classroom, most of us\nwait about one second before we respond. Researchers have actually measured it. And when a\nteacher holds that pause for just a few seconds longer, what happens next in the room can change\ncompletely. She feels herself about to react, and instead she waits. Three seconds. Then she comes\ndown to his level, off to the side, and asks one quiet question.\n\nSCENE 5, the outcome. He takes two minutes, comes back, and does the work. Narrator: Two\nversions of the same lesson, and the only real difference between them was about two seconds. Not a\nbetter teacher. Not a different pupil. Two seconds.\n\nCLOSE. Clean Elara logo.',
            },
          },
          {
            id: 6,
            type: 'video',
            t2: 'The three second pause, in a real classroom',
            videoTitle: 'Module 1 film, around 2 minutes',
            videoUrl: null,
            transcriptDropdown: {
              header: 'Read the full script',
              body: 'OPEN. Clean Elara logo on a plain background. Hold 2 to 3 seconds.\nSoft fade into the classroom.\n\nSCENE 1, the lesson and Daniel (0:00 to 0:30). Wide shot of a Year 9 English lesson already in full flow. The class is working, Ms Patel is teaching in her stride. We move to Daniel near the back: his book is not out, his desk is bare while the pupils beside him work, his pen is on the floor, and he is turned towards the window, not the board. Calm and still, not disturbing anyone.\n\nCaptions, one at a time: “Daniel, Year 9. He has ADHD.” “He is not disrupting anyone.” “His brain cannot hold focus right now.”\n\nMs Patel glances over, sees him, takes it in, and chooses to give him a minute.\n\nNarrator: This is an ordinary Year 9 English lesson, and it is going well. Now look at the back of the room. This is Daniel. He has ADHD. He is not messing about and he is not distracting anyone. His book is not even out, and his pen is on the floor. However hard he tries, his brain cannot hold on to the lesson right now. His teacher has noticed. She has not acted yet. That is the most important second in the lesson, and most observers would not even see it.\n\nSCENE 2, the first ask (0:30 to 1:00). Ms Patel comes alongside Daniel. Calm, low voice. “Daniel, book out please. We are on page forty two.”\n\nDaniel does not respond. He does not get his book out, does not turn to the page, does not look at her. A small mutter under his breath. Ms Patel’s face tightens for a second. Two pupils nearby are watching.\n\nCut to Daniel’s view for two seconds. The room feels louder. The light hums. A pencil tapping is too loud. His face is blank, his jaw tight. He heard the tone, not the words. The tone felt like pressure.\n\nNarrator: We have just seen two versions of the same moment. From the front of the class, it looks as if Daniel has refused a reasonable instruction. From inside Daniel’s head, he could not process it, and he is already starting to shut down. Same behaviour, completely different reality.\n\nSCENE 3, the pause (1:00 to 1:35). Ms Patel is about to repeat herself, more firmly. We see her start to react, then stop herself. She holds it. Three seconds. Caption, low on screen: “The three second pause.” She is choosing.\n\nShe crouches to Daniel’s eye level, side on, not face on. Lower, slower voice. “Daniel. Quick check in. Are you with me, or are you somewhere else right now?” After a few seconds, a tiny shake of the head. Almost nothing, but it is an answer. “OK. Take two minutes. Get a drink. Come back when you are ready. I will catch you up on the page.”\n\nDaniel gets up slowly and goes out. Ms Patel turns back to the class as if nothing unusual has happened.\n\nNarrator: That was the three second pause. It cost her about a minute of lesson time. Without it, this could have gone a very different way. It might have tipped into a behaviour incident, with Daniel walking out and the rest of the lesson lost. Because she paused, it did not have to. He took a short break, came back, and got on with his work.\n\nSCENE 4, the takeaway (1:35 to 2:05). End of lesson. The bell goes. Daniel hands his book to Ms Patel as he leaves. She glances at it. He has done the work. A small nod between them. Ms Patel sits, lets out a breath. Something nearly went wrong, and did not. Not because she was a better teacher than yesterday, but because she paused for three seconds.\n\nNarrator: The pause is not soft. It is not letting him off. It is the difference between responding to what is actually happening and responding to what you assumed was happening. In this module, we will show you exactly how to do it, and when it matters most.\n\nCLOSE. Fade to the clean Elara logo on a plain background. Hold about 3 seconds. Soft music resolves.',
            },
          },
          {
            id: 7,
            type: 'divider',
            t1: 'Part 2. Learn',
            lead: 'What you just watched, in plain language.',
            body: 'During a lesson, a pupil can look calm on the outside while, inside, they are in one of three very different states. Each state needs a different response from you, and the most common mistake is to respond to all three in the same way. Tap each state to see what it looks like, what is going on underneath, and what may help.',
          },
          {
            id: 8,
            type: 'text',
            t3: 'State 1. Calmly engaged (green)',
            body: 'The thinking brain is online. The pupil can follow instructions, manage impulses and learn. Most of your lesson assumes pupils are here. Most are, most of the time.',
            // dropdowns: [
            //   {
            //     header: 'A bit more on the brain',
            //     body: 'The thinking brain is the prefrontal cortex, just behind the forehead. In green it is in charge, so the pupil has the capacity to learn, remember and make choices.',
            //   },
            // ],
          },
          {
            id: 9,
            type: 'text',
            t3: 'State 2. Dysregulated (amber)',
            body: 'Something has knocked the pupil out of green: a loud room, a fall out at break, work that feels too hard, being tired or hungry. The thinking brain is only partly online and the alarm system has switched on. They look fidgety, restless, distracted. They did not choose this.',
          },
          {
            id: 10,
            type: 'key',
            t3: 'State 3. Shut down (red)',
            body: 'The alarm system is in charge and the thinking brain has gone offline. The pupil cannot process language the way you expect. They may freeze, refuse to move, go silent, or lash out. None of this is choice in the everyday sense. The brain has to come back down first.',
            keyPoint:
              'The single most important point. A pupil in amber or red cannot learn from a consequence in the moment. Their thinking brain is not online to take it in. Give the consequence later, when they are back in green. That is when it teaches.',
          },
          {
            id: 11,
            type: 'accordion',
            t2: 'The three states, side by side',
            // body: 'A quick reference. Tap each state to see what you might see, what is happening underneath, and what helps in the moment.',
            accordionTitle: 'The three states, side by side',
            accordionItems: [
              {
                header: 'Green. Calmly engaged',
                body: 'What you see: on task, following instructions, productive movement, able to wait for help.\n\nUnderneath: the thinking brain is in charge. There is capacity to learn and to choose.\n\nWhat helps: teach, stretch, push gently. High expectations work best here.',
              },
              {
                header: 'Amber. Dysregulated',
                body: 'What you see: fidgety, restless, off task, short or muttered replies, slower to follow. Can look cheeky or low level disruptive.\n\nUnderneath: something has knocked them out of green. A loud room, a fall out at break, work that feels too hard, being tired or hungry. The thinking brain is only partly online. Their energy is going on staying in the room, so less is left for learning. They did not choose this.\n\nWhat helps: co regulate first. Lower your voice. Reduce the demand briefly. Offer a small choice. Buy ninety seconds. Most pupils come back within two minutes if you do not push.',
              },
              {
                header: 'Red. Shut down',
                body: 'What you see: frozen, silent, head down. May refuse to move, may walk out, may say something that is not their usual voice.\n\nUnderneath: the alarm system is in charge and the thinking brain has gone offline. Language does not process the way you expect. The brain has to come back down first.\n\nWhat helps: reduce demands to almost zero. Quiet voice. Side on, not face on. Offer space, not solutions. Do not negotiate. Give the brain time to come back.',
              },
              {
                header: 'A bit more on the brain',
                body: 'The thinking brain is the prefrontal cortex, just behind the forehead. In green it is in charge, so a pupil has the capacity to learn, remember and make choices. When the alarm system fires, that part goes quiet first.',
              },
            ],
            keyPoint:
              'A pupil in amber or red cannot take in a conversation about their behaviour while it is happening. The thinking brain is not online to process it. Have that conversation later, once they are back in green. That is when it teaches them something.',
          },
          {
            id: 12,
            type: 'text',
            t2: 'Three states, and why the difference matters.',
            body: 'During a lesson, a pupil’s brain can be in one of three states. From the front of the room they can look similar. They need very different things from you, and the costly mistake is treating one as if it were another. Tap each state.',
          },

          {
            id: 14,
            type: 'technique',
            t2: 'The three steps',
            lead: 'Full view — all three steps side by side for comparison.',
            // techniqueSteps: TECHNIQUE_STEPS,
          },

          {
            id: 17,
            type: 'technique_intro',
            t2: 'The Technique. The Three Second Pause',
            lead: 'The three second pause is a short gap between what a pupil does and how you respond. In that gap, you work out which state the pupil is in before you react. It has three steps.',
            techniqueSteps: TECHNIQUE_STEPS,
            keyPoint:
              'You will not manage this every time, and you are not meant to. The goal is not perfection. It is self-awareness.',
          },
          // {
          //   id: 18,
          //   type: 'divider',
          //   t1: 'Part 3. Practise',
          //   t2: 'Three situations you will recognise.',
          //   lead: 'Read it, choose what you would do, then compare.',
          //   body: 'There are no trick questions, and the aim is not to score well. It is to notice your own instinct, and where a small shift might help. Some options feel reasonable and quietly make things harder.',
          // },
          { id: 19, type: 'scenario_situation', scenarioId: 1 },
          { id: 20, type: 'scenario_choose', scenarioId: 1 },
          { id: 21, type: 'scenario_feedback', scenarioId: 1 },
          { id: 22, type: 'scenario_situation', scenarioId: 2 },
          { id: 23, type: 'scenario_choose', scenarioId: 2 },
          { id: 24, type: 'scenario_feedback', scenarioId: 2 },
          { id: 25, type: 'scenario_situation', scenarioId: 3 },
          { id: 26, type: 'scenario_choose', scenarioId: 3 },
          { id: 27, type: 'scenario_feedback', scenarioId: 3 },
          {
            id: 28,
            type: 'takeaway',
            t1: 'Part 4. Your take away card',
            body: 'A one page summary of the whole module, made to fit a phone screen, a lanyard insert, or a noticeboard. Do not try to remember the module. Just keep this close.',
            takeawayHeading: 'THE THREE SECOND PAUSE\nThe pocket version',
            takeawayBody:
              '1. Notice the rise in yourself. The tight chest, the urge to snap, the feeling of being undermined. Notice it. Do not reply yet.\n\n2. Ask one quiet question. Inside: is this pupil green, amber or red? Out loud if you need to: “Quick check in. Are you with me, or somewhere else?”\n\n3. Match your response to the state, not the behaviour. Green: teach. Amber: lower the demand, offer a choice, buy ninety seconds. Red: reduce demands to almost zero, offer space, save the conversation for later.\n\nAnd when it does not go well:\n\n“Yesterday I misunderstood what was going on for you. I should have checked in rather than snapped. I am sorry. You did not deserve that.” No “but”. No explanation. No asking them to apologise back. Then let them go.',
          },
          {
            id: 29,
            type: 'closing',
            t2: 'That is Module 1',
            closingBody:
              'Next in the pathway: Module 2, Don’t Break What’s Working. How to tell when a quietly off task pupil is actually coping, and what it costs to take their coping away.',
          },
        ] as Screen[]
      ).filter((s) => s.id !== 6 && s.id !== 12),
    []
  );

  const [index, setIndex] = useState(0);
  const [learnStateModalKey, setLearnStateModalKey] = useState<
    'green' | 'amber' | 'red' | null
  >(null);
  const [openDropdownIds, setOpenDropdownIds] = useState<Set<string>>(
    () => new Set()
  );
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const headerTitleAnchorRef = useRef<HTMLHeadingElement>(null);
  const scrollRestoreTopRef = useRef<number | null>(null);
  const sidebarScrollRef = useRef<HTMLDivElement | null>(null);
  const suppressAutoOpenRef = useRef(false);
  const lastAutoOpenIndexRef = useRef<number | null>(null);
  const [scenarioAnswers, setScenarioAnswers] = useState<
    Partial<Record<1 | 2 | 3, ScenarioOptionKey>>
  >({});
  const [isScenarioCompareOpen, setIsScenarioCompareOpen] = useState(false);
  const [scenarioCompareSeen, setScenarioCompareSeen] = useState<
    Partial<Record<1 | 2 | 3, boolean>>
  >({});
  const [activeTechniqueStep, setActiveTechniqueStep] = useState<number | null>(
    null
  );
  const [block3IntroPhase, setBlock3IntroPhase] =
    useState<LearningOutcomesPhase>('center');
  const [block4IntroPhase, setBlock4IntroPhase] =
    useState<LearningOutcomesPhase>('center');
  const [watchIntroPhase, setWatchIntroPhase] =
    useState<WatchIntroPhase>('center');
  const [threeStatesIntroPhase, setThreeStatesIntroPhase] = useState<
    | 'center'
    | 'header'
    | 'reveal_paragraph'
    | 'paragraph'
    | 'reveal_cards'
    | 'done'
  >('center');
  const [techniqueIntroPhase, setTechniqueIntroPhase] =
    useState<TechniqueIntroPhase>('center');
  const [scenarioIntroPhase, setScenarioIntroPhase] =
    useState<ScenarioIntroPhase>('reveal_situation');
  const [scenarioMainTitleIntroPlayed, setScenarioMainTitleIntroPlayed] =
    useState(false);
  const [scenarioCalloutDismissed, setScenarioCalloutDismissed] = useState(
    () =>
      typeof window !== 'undefined' &&
      localStorage.getItem(SCENARIO_CALLOUT_KEY) === '1'
  );
  const [block3IntroComplete, setBlock3IntroComplete] = useState(false);

  const handleBlock3PhaseChange = useCallback(
    (phase: LearningOutcomesPhase) => {
      setBlock3IntroPhase(phase);
    },
    []
  );

  const handleBlock4PhaseChange = useCallback(
    (phase: LearningOutcomesPhase) => {
      setBlock4IntroPhase(phase);
    },
    []
  );

  const handleBlock3CompleteChange = useCallback((complete: boolean) => {
    setBlock3IntroComplete(complete);
  }, []);

  const [openSections, setOpenSections] = useState<
    Record<SidebarSectionKey, boolean>
  >({
    introduction: false,
    research: false,
    watch: false,
    learn: false,
    practise: false,
    takeaway: false,
    closing: false,
  });

  const toggleSection = (key: SidebarSectionKey) => {
    setOpenSections((prev) => {
      if (prev[key]) {
        return {
          introduction: false,
          research: false,
          watch: false,
          learn: false,
          practise: false,
          takeaway: false,
          closing: false,
        };
      }
      return {
        introduction: key === 'introduction',
        research: key === 'research',
        watch: key === 'watch',
        learn: key === 'learn',
        practise: key === 'practise',
        takeaway: key === 'takeaway',
        closing: key === 'closing',
      };
    });
  };

  const [isSidebarTranscriptOpen, setIsSidebarTranscriptOpen] = useState(false);
  const [isWatchScriptOpen, setIsWatchScriptOpen] = useState(false);
  const [isModuleContentsOpen, setIsModuleContentsOpen] = useState(false);
  const toggleModuleContents = () => setIsModuleContentsOpen((v) => !v);

  const prefersReducedMotion = usePrefersReducedMotion();
  const NAV_FADE_MS = 350;
  const [isScreenTransitioning, setIsScreenTransitioning] = useState(false);
  const transitionTimerRef = useRef(0);

  useEffect(() => {
    return () => window.clearTimeout(transitionTimerRef.current);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    setIsScreenTransitioning(false);
  }, [index, prefersReducedMotion]);

  const transitionToIndex = useCallback(
    (targetIndex: number) => {
      if (targetIndex === index) return;
      if (isScreenTransitioning) return;

      const from = screens[index];
      const to = screens[Math.min(screens.length - 1, Math.max(0, targetIndex))];
      const skipFade = shouldSkipPractiseScenarioNavTransition(from, to);

      if (prefersReducedMotion || skipFade) {
        setIndex(targetIndex);
        return;
      }

      setIsScreenTransitioning(true);
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = window.setTimeout(() => {
        setIndex(targetIndex);
      }, NAV_FADE_MS);
    },
    [index, isScreenTransitioning, prefersReducedMotion, screens]
  );

  useEffect(() => {
    setIsWatchScriptOpen(false);
    setIsScenarioCompareOpen(false);
    setActiveTechniqueStep(null);
  }, [index]);

  const toc = useMemo(() => {
    return screens.map((s, i) => {
      const label =
        s.type === 'landing'
          ? 'Module 1'
          : s.type === 'cover'
            ? (s.t2 ?? 'Reading behaviour in the moment')
            : s.type === 'scenario_situation' && s.scenarioId
              ? `Scenario ${s.scenarioId} · Read`
              : s.type === 'scenario_choose' && s.scenarioId
                ? `Scenario ${s.scenarioId} · Choose`
                : s.type === 'scenario_feedback' && s.scenarioId
                  ? `Scenario ${s.scenarioId} · Compare`
                  : s.type === 'research'
                    ? 'Research'
                    : s.headerTitle || s.t1 || s.t2 || s.t3 || `Block ${s.id}`;
      return {
        index: i,
        label,
        blockId: s.id,
      };
    });
  }, [screens]);

  const sidebarSections = useMemo((): SidebarSection[] => {
    const indicesByBlockId = new Map<number, number>();
    toc.forEach((t) => indicesByBlockId.set(t.blockId, t.index));

    const range = (start: number, end: number) => {
      const out: number[] = [];
      for (let b = start; b <= end; b += 1) {
        const idx = indicesByBlockId.get(b);
        if (typeof idx === 'number') out.push(idx);
      }
      return out;
    };

    return [
      {
        key: 'introduction',
        label: SIDEBAR_SECTION_LABELS.introduction,
        indices: range(1, 3),
      },
      {
        key: 'research',
        label: SIDEBAR_SECTION_LABELS.research,
        indices: range(4, 4),
      },
      {
        key: 'watch',
        label: SIDEBAR_SECTION_LABELS.watch,
        indices: range(5, 5),
      },
      {
        key: 'learn',
        label: SIDEBAR_SECTION_LABELS.learn,
        indices: range(7, 17),
        landingBlockId: 7,
      },
      {
        key: 'practise',
        label: SIDEBAR_SECTION_LABELS.practise,
        indices: range(18, 27),
        landingBlockId: 18,
      },
      {
        key: 'takeaway',
        label: SIDEBAR_SECTION_LABELS.takeaway,
        indices: range(28, 28),
      },
      {
        key: 'closing',
        label: SIDEBAR_SECTION_LABELS.closing,
        indices: range(29, 29),
      },
    ];
  }, [toc]);

  const activeSidebarSectionKey = useMemo((): SidebarSectionKey | null => {
    const section = sidebarSections.find((s) => s.indices.includes(index));
    return section?.key ?? null;
  }, [index, sidebarSections]);

  useEffect(() => {
    if (!activeSidebarSectionKey) return;
    if (lastAutoOpenIndexRef.current === null) {
      lastAutoOpenIndexRef.current = index;
      return;
    }
    if (lastAutoOpenIndexRef.current === index) return;
    lastAutoOpenIndexRef.current = index;
    if (suppressAutoOpenRef.current) {
      suppressAutoOpenRef.current = false;
      return;
    }
    setOpenSections((prev) => {
      if (prev[activeSidebarSectionKey]) return prev;
      return {
        ...prev,
        [activeSidebarSectionKey]: true,
      };
    });
  }, [activeSidebarSectionKey, index]);

  useEffect(() => {
    const container = sidebarScrollRef.current;
    if (!container) return;

    const raf = window.requestAnimationFrame(() => {
      const activeEl = container.querySelector(
        `[data-sidebar-item="true"][data-toc-index="${index}"]`
      ) as HTMLElement | null;

      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
        return;
      }

      if (!activeSidebarSectionKey) return;
      const sectionEl = container.querySelector(
        `[data-sidebar-section-header="true"][data-section-key="${activeSidebarSectionKey}"]`
      ) as HTMLElement | null;
      if (!sectionEl) return;
      sectionEl.scrollIntoView({ block: 'nearest' });
    });

    return () => window.cancelAnimationFrame(raf);
  }, [index, activeSidebarSectionKey, openSections]);

  const screen = screens[Math.min(screens.length - 1, Math.max(0, index))];

  const threeStatesTitle =
    MODULE_BLOCK_HEADER_TITLES[7] ??
    screen.headerTitle ??
    screen.t2 ??
    screen.t1 ??
    '';

  const techniqueTitle =
    screen.id === 17
      ? getModulePageTitle(screen, activeSidebarSectionKey)
      : '';

  const scenarioTitle =
    screen.type === 'scenario_situation' ? SCENARIO_MAIN_TITLE : '';

  const shouldPlayScenarioMainTitleIntro =
    screen.type === 'scenario_situation' &&
    screen.scenarioId === 1 &&
    !scenarioMainTitleIntroPlayed &&
    !prefersReducedMotion;

  const showScenarioIntroCallout =
    screen.type === 'scenario_situation' &&
    screen.scenarioId === 1 &&
    !scenarioCalloutDismissed;

  const dismissScenarioCallout = useCallback(() => {
    setScenarioCalloutDismissed(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem(SCENARIO_CALLOUT_KEY, '1');
    }
  }, []);

  const narratorEnabled =
    index === 0 ||
    screen.type === 'bullets' ||
    screen.type === 'research' ||
    (screen.id === 5 &&
      (watchIntroPhase === 'center' || watchIntroPhase === 'header')) ||
    (screen.id === 7 &&
      (threeStatesIntroPhase === 'center' ||
        threeStatesIntroPhase === 'header')) ||
    (screen.id === 17 &&
      (techniqueIntroPhase === 'center' || techniqueIntroPhase === 'header')) ||
    (shouldPlayScenarioMainTitleIntro &&
      (scenarioIntroPhase === 'center' || scenarioIntroPhase === 'header'));
  const narratorText = useMemo(() => {
    if (!narratorEnabled) return '';
    if (index === 0) {
      const parts = [screen.t1, screen.t2, screen.lead].filter(Boolean);
      return parts.join('. ');
    }

    const title =
      screen.type === 'scenario_situation'
        ? SCENARIO_MAIN_TITLE
        : MODULE_BLOCK_HEADER_TITLES[screen.id] ??
          screen.headerTitle ??
          screen.t2 ??
          screen.t1 ??
          '';

    if (
      screen.type === 'bullets' ||
      screen.type === 'research' ||
      screen.id === 5 ||
      screen.id === 7 ||
      screen.id === 17 ||
      screen.type === 'scenario_situation'
    ) {
      return title;
    }

    const parts = [title, screen.lead, screen.body].filter(Boolean);
    return parts.join('. ');
  }, [index, narratorEnabled, screen]);

  const watchTitle = getModulePageTitle(screen, activeSidebarSectionKey);
  const watchTypingEnabled =
    screen.id === 5 && watchIntroPhase === 'center' && !prefersReducedMotion;
  const { displayed: typedWatchTitle, isComplete: watchTypingComplete } =
    useTypingText(watchTitle, watchTypingEnabled);

  const watchIntroText =
    screen.id === 5 ? (screen.watchIntro?.headline ?? '') : '';
  const watchIntroSpokenRef = useRef(false);
  const watchIntroSpeechTimerRef = useRef(0);
  const [watchIntroTypingActive, setWatchIntroTypingActive] = useState(false);
  const watchIntroTypingEnabled =
    screen.id === 5 &&
    watchIntroPhase === 'intro' &&
    watchIntroTypingActive &&
    !prefersReducedMotion;
  const {
    displayed: typedWatchIntroText,
    isComplete: watchIntroTypingComplete,
  } = useTypingText(watchIntroText, watchIntroTypingEnabled, 42, 'empty');

  const [watchIntroVideoRevealed, setWatchIntroVideoRevealed] = useState(false);
  const [watchIntroVideoMounted, setWatchIntroVideoMounted] = useState(false);
  const [watchIntroVideoShown, setWatchIntroVideoShown] = useState(false);

  useEffect(() => {
    if (screen.id !== 5) return;
    if (prefersReducedMotion) {
      if (!watchIntroVideoRevealed) {
        setWatchIntroVideoMounted(false);
        setWatchIntroVideoShown(false);
        return;
      }
      setWatchIntroVideoMounted(true);
      setWatchIntroVideoShown(true);
      return;
    }

    if (watchIntroPhase !== 'intro' || !watchIntroVideoRevealed) {
      setWatchIntroVideoMounted(false);
      setWatchIntroVideoShown(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setWatchIntroVideoMounted(true);
      requestAnimationFrame(() => setWatchIntroVideoShown(true));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [
    screen.id,
    prefersReducedMotion,
    watchIntroPhase,
    watchIntroVideoRevealed,
  ]);

  useLayoutEffect(() => {
    if (screen.id !== 5) return;
    setWatchIntroPhase(prefersReducedMotion ? 'reveal_intro' : 'center');
    setWatchIntroVideoRevealed(false);
    setWatchIntroVideoMounted(false);
    setWatchIntroVideoShown(false);
    watchIntroSpokenRef.current = false;
    setWatchIntroTypingActive(false);
    window.clearTimeout(watchIntroSpeechTimerRef.current);
  }, [index, screen.id, prefersReducedMotion]);

  useEffect(() => {
    if (screen.id !== 5) return;
    if (watchIntroPhase !== 'intro') {
      watchIntroSpokenRef.current = false;
      setWatchIntroTypingActive(false);
      window.clearTimeout(watchIntroSpeechTimerRef.current);
      return;
    }
    if (watchIntroSpokenRef.current || !watchIntroText.trim()) return;

    watchIntroSpokenRef.current = true;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
    speakTextOnce(watchIntroText);

    if (prefersReducedMotion) {
      setWatchIntroTypingActive(true);
      return;
    }

    watchIntroSpeechTimerRef.current = window.setTimeout(() => {
      setWatchIntroTypingActive(true);
    }, SPEECH_LEAD_MS);

    return () => window.clearTimeout(watchIntroSpeechTimerRef.current);
  }, [screen.id, watchIntroPhase, watchIntroText, prefersReducedMotion]);

  useEffect(() => {
    if (screen.id !== 5) return;
    if (prefersReducedMotion) return;
    if (watchIntroPhase !== 'center') return;

    if (!watchTypingComplete) return;

    const timer = window.setTimeout(() => {
      setWatchIntroPhase('header');
    }, 700);

    return () => window.clearTimeout(timer);
  }, [screen.id, prefersReducedMotion, watchIntroPhase, watchTypingComplete]);

  useEffect(() => {
    setOpenDropdownIds(new Set());
  }, [index]);

  useEffect(() => {
    if (screen.id !== 3) return;
    localStorage.removeItem('mindsync-m1-block3-intro-done');
    setBlock3IntroPhase('center');
    setBlock3IntroComplete(false);
  }, [index, screen.id]);

  const threeStatesBodySpokenRef = useRef(false);
  const threeStatesBodySpeechTimerRef = useRef(0);
  const [threeStatesBodyTypingActive, setThreeStatesBodyTypingActive] =
    useState(false);

  useEffect(() => {
    if (screen.id !== 7) return;
    setThreeStatesIntroPhase(prefersReducedMotion ? 'done' : 'center');
    threeStatesBodySpokenRef.current = false;
    setThreeStatesBodyTypingActive(false);
    window.clearTimeout(threeStatesBodySpeechTimerRef.current);
  }, [index, screen.id, prefersReducedMotion]);

  const threeStatesTitleTypingEnabled =
    screen.id === 7 &&
    threeStatesIntroPhase === 'center' &&
    !prefersReducedMotion;
  const {
    displayed: typedThreeStatesTitle,
    isComplete: threeStatesTitleTypingComplete,
  } = useTypingText(threeStatesTitle, threeStatesTitleTypingEnabled);

  useEffect(() => {
    if (screen.id !== 7) return;
    if (prefersReducedMotion) return;
    if (threeStatesIntroPhase !== 'center') return;
    if (!threeStatesTitleTypingComplete) return;

    const timer = window.setTimeout(() => {
      setThreeStatesIntroPhase('header');
    }, 700);

    return () => window.clearTimeout(timer);
  }, [
    screen.id,
    prefersReducedMotion,
    threeStatesIntroPhase,
    threeStatesTitleTypingComplete,
  ]);

  const threeStatesBodyText =
    screen.id === 7 ? (screen.body ?? '') : '';
  const threeStatesBodyTypingEnabled =
    screen.id === 7 &&
    threeStatesIntroPhase === 'paragraph' &&
    threeStatesBodyTypingActive &&
    !prefersReducedMotion;
  const {
    displayed: typedThreeStatesBody,
    isComplete: threeStatesBodyTypingComplete,
  } = useTypingText(
    threeStatesBodyText,
    threeStatesBodyTypingEnabled,
    42,
    'empty'
  );

  useEffect(() => {
    if (screen.id !== 7) return;
    if (threeStatesIntroPhase !== 'paragraph') {
      threeStatesBodySpokenRef.current = false;
      setThreeStatesBodyTypingActive(false);
      window.clearTimeout(threeStatesBodySpeechTimerRef.current);
      return;
    }
    if (threeStatesBodySpokenRef.current || !threeStatesBodyText.trim()) return;

    threeStatesBodySpokenRef.current = true;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
    speakTextOnce(threeStatesBodyText);

    if (prefersReducedMotion) {
      setThreeStatesBodyTypingActive(true);
      return;
    }

    threeStatesBodySpeechTimerRef.current = window.setTimeout(() => {
      setThreeStatesBodyTypingActive(true);
    }, SPEECH_LEAD_MS);

    return () => window.clearTimeout(threeStatesBodySpeechTimerRef.current);
  }, [
    screen.id,
    threeStatesIntroPhase,
    threeStatesBodyText,
    prefersReducedMotion,
  ]);

  useEffect(() => {
    if (screen.id !== 7) return;
    if (prefersReducedMotion) return;
    if (threeStatesIntroPhase !== 'paragraph') return;
    if (!threeStatesBodyTypingComplete) return;
    setThreeStatesIntroPhase('reveal_cards');
  }, [
    screen.id,
    prefersReducedMotion,
    threeStatesIntroPhase,
    threeStatesBodyTypingComplete,
  ]);

  const techniqueLeadSpokenRef = useRef(false);
  const techniqueLeadSpeechTimerRef = useRef(0);
  const [techniqueLeadTypingActive, setTechniqueLeadTypingActive] =
    useState(false);

  useEffect(() => {
    if (screen.id !== 17) return;
    setTechniqueIntroPhase(prefersReducedMotion ? 'done' : 'center');
    techniqueLeadSpokenRef.current = false;
    setTechniqueLeadTypingActive(false);
    window.clearTimeout(techniqueLeadSpeechTimerRef.current);
  }, [index, screen.id, prefersReducedMotion]);

  const techniqueTitleTypingEnabled =
    screen.id === 17 &&
    techniqueIntroPhase === 'center' &&
    !prefersReducedMotion;
  const {
    displayed: typedTechniqueTitle,
    isComplete: techniqueTitleTypingComplete,
  } = useTypingText(techniqueTitle, techniqueTitleTypingEnabled);

  useEffect(() => {
    if (screen.id !== 17) return;
    if (prefersReducedMotion) return;
    if (techniqueIntroPhase !== 'center') return;
    if (!techniqueTitleTypingComplete) return;

    const timer = window.setTimeout(() => {
      setTechniqueIntroPhase('header');
    }, 700);

    return () => window.clearTimeout(timer);
  }, [
    screen.id,
    prefersReducedMotion,
    techniqueIntroPhase,
    techniqueTitleTypingComplete,
  ]);

  const techniqueLeadText = screen.id === 17 ? (screen.lead ?? '') : '';
  const techniqueLeadTypingEnabled =
    screen.id === 17 &&
    techniqueIntroPhase === 'paragraph' &&
    techniqueLeadTypingActive &&
    !prefersReducedMotion;
  const {
    displayed: typedTechniqueLead,
    isComplete: techniqueLeadTypingComplete,
  } = useTypingText(
    techniqueLeadText,
    techniqueLeadTypingEnabled,
    42,
    'empty'
  );

  useEffect(() => {
    if (screen.id !== 17) return;
    if (techniqueIntroPhase !== 'paragraph') {
      techniqueLeadSpokenRef.current = false;
      setTechniqueLeadTypingActive(false);
      window.clearTimeout(techniqueLeadSpeechTimerRef.current);
      return;
    }
    if (techniqueLeadSpokenRef.current || !techniqueLeadText.trim()) return;

    techniqueLeadSpokenRef.current = true;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
    speakTextOnce(techniqueLeadText);

    if (prefersReducedMotion) {
      setTechniqueLeadTypingActive(true);
      return;
    }

    techniqueLeadSpeechTimerRef.current = window.setTimeout(() => {
      setTechniqueLeadTypingActive(true);
    }, SPEECH_LEAD_MS);

    return () => window.clearTimeout(techniqueLeadSpeechTimerRef.current);
  }, [
    screen.id,
    techniqueIntroPhase,
    techniqueLeadText,
    prefersReducedMotion,
  ]);

  useEffect(() => {
    if (screen.id !== 17) return;
    if (prefersReducedMotion) return;
    if (techniqueIntroPhase !== 'paragraph') return;
    if (!techniqueLeadTypingComplete) return;

    const timer = window.setTimeout(() => {
      setTechniqueIntroPhase('reveal');
    }, 700);

    return () => window.clearTimeout(timer);
  }, [
    screen.id,
    prefersReducedMotion,
    techniqueIntroPhase,
    techniqueLeadTypingComplete,
  ]);

  const scenarioSituationSpokenRef = useRef(false);
  const scenarioSituationSpeechTimerRef = useRef(0);
  const [scenarioSituationTypingActive, setScenarioSituationTypingActive] =
    useState(false);

  useLayoutEffect(() => {
    if (screen.type !== 'scenario_situation') return;

    setScenarioIntroPhase(
      prefersReducedMotion
        ? 'done'
        : screen.scenarioId === 1 && !scenarioMainTitleIntroPlayed
          ? 'center'
          : 'reveal_situation'
    );
    scenarioSituationSpokenRef.current = false;
    setScenarioSituationTypingActive(false);
    window.clearTimeout(scenarioSituationSpeechTimerRef.current);
  }, [
    index,
    screen.id,
    screen.type,
    screen.scenarioId,
    prefersReducedMotion,
    scenarioMainTitleIntroPlayed,
  ]);

  const scenarioTitleTypingEnabled =
    screen.type === 'scenario_situation' &&
    scenarioIntroPhase === 'center' &&
    !prefersReducedMotion;
  const {
    displayed: typedScenarioTitle,
    isComplete: scenarioTitleTypingComplete,
  } = useTypingText(scenarioTitle, scenarioTitleTypingEnabled);

  useEffect(() => {
    if (screen.type !== 'scenario_situation') return;
    if (prefersReducedMotion) return;
    if (scenarioIntroPhase !== 'center') return;
    if (!scenarioTitleTypingComplete) return;

    const timer = window.setTimeout(() => {
      setScenarioIntroPhase('header');
    }, 700);

    return () => window.clearTimeout(timer);
  }, [
    screen.type,
    prefersReducedMotion,
    scenarioIntroPhase,
    scenarioTitleTypingComplete,
  ]);

  const scenarioSituationText =
    screen.type === 'scenario_situation' && screen.scenarioId
      ? SCENARIOS[screen.scenarioId].situation
      : '';
  const scenarioSituationTypingEnabled =
    screen.type === 'scenario_situation' &&
    scenarioIntroPhase === 'situation' &&
    scenarioSituationTypingActive &&
    !prefersReducedMotion;
  const {
    displayed: typedScenarioSituation,
    isComplete: scenarioSituationTypingComplete,
  } = useTypingText(
    scenarioSituationText,
    scenarioSituationTypingEnabled,
    42,
    'empty'
  );

  useEffect(() => {
    if (screen.type !== 'scenario_situation') return;
    if (scenarioIntroPhase !== 'situation') {
      scenarioSituationSpokenRef.current = false;
      setScenarioSituationTypingActive(false);
      window.clearTimeout(scenarioSituationSpeechTimerRef.current);
      return;
    }
    if (scenarioSituationSpokenRef.current || !scenarioSituationText.trim())
      return;

    scenarioSituationSpokenRef.current = true;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
    speakTextOnce(scenarioSituationText);

    if (prefersReducedMotion) {
      setScenarioSituationTypingActive(true);
      return;
    }

    scenarioSituationSpeechTimerRef.current = window.setTimeout(() => {
      setScenarioSituationTypingActive(true);
    }, SPEECH_LEAD_MS);

    return () => window.clearTimeout(scenarioSituationSpeechTimerRef.current);
  }, [
    screen.type,
    scenarioIntroPhase,
    scenarioSituationText,
    prefersReducedMotion,
  ]);

  useEffect(() => {
    if (screen.type !== 'scenario_situation') return;
    if (prefersReducedMotion) return;
    if (scenarioIntroPhase !== 'situation') return;
    if (!scenarioSituationTypingComplete) return;

    const timer = window.setTimeout(() => {
      setScenarioIntroPhase('reveal_options');
    }, 700);

    return () => window.clearTimeout(timer);
  }, [
    screen.type,
    prefersReducedMotion,
    scenarioIntroPhase,
    scenarioSituationTypingComplete,
  ]);

  useEffect(() => {
    if (screen.type !== 'scenario_situation') return;

    const scenarioId = screen.scenarioId;
    if (scenarioId !== 1 && scenarioId !== 2 && scenarioId !== 3) return;

    setScenarioAnswers((prev) => {
      if (!prev[scenarioId]) return prev;
      const next = { ...prev };
      delete next[scenarioId];
      return next;
    });
  }, [index, screen.type, screen.scenarioId]);

  const handleDropdownOpenChange = (dropdownId: string, open: boolean) => {
    const el = scrollAreaRef.current;
    const skipAutoScrollOnOpen =
      screen.id === 2 || screen.id === 3 || screen.type === 'technique';

    setOpenDropdownIds((prev) => {
      const next = new Set(prev);
      const wasCurrentScreenOpen = isDropdownOpenForScreen(prev, screen.id);

      if (open) next.add(dropdownId);
      else next.delete(dropdownId);

      const willCurrentScreenOpen = isDropdownOpenForScreen(next, screen.id);

      if (el) {
        if (open && !wasCurrentScreenOpen) {
          scrollRestoreTopRef.current = el.scrollTop;
        }

        requestAnimationFrame(() => {
          if (!el) return;

          if (open) {
            if (screen.type !== 'accordion' && !skipAutoScrollOnOpen) {
              el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
            }
            return;
          }

          if (!willCurrentScreenOpen && scrollRestoreTopRef.current !== null) {
            el.scrollTo({
              top: scrollRestoreTopRef.current,
              behavior: 'smooth',
            });
            scrollRestoreTopRef.current = null;
          }
        });
      }

      return next;
    });
  };

  const isCurrentScreenDropdownOpen = isDropdownOpenForScreen(
    openDropdownIds,
    screen.id
  );
  const isIntroReadMoreLayoutOpen =
    isCurrentScreenDropdownOpen && (screen.id === 2 || screen.id === 3);

  const learnStatesScreen = useMemo(
    () => screens.find((s) => s.id === 11) ?? null,
    [screens]
  );

  const learnStateItems = useMemo(() => {
    const items = learnStatesScreen?.accordionItems ?? [];
    const find = (prefix: string) =>
      items.find((i) => i.header.toLowerCase().startsWith(prefix)) ?? null;
    return {
      green: find('green'),
      amber: find('amber'),
      red: find('red'),
      brain: find('a bit more'),
      keyPoint: learnStatesScreen?.keyPoint ?? '',
    };
  }, [learnStatesScreen]);

  const getPrevVisibleIndex = (fromIndex: number) => {
    for (let i = fromIndex - 1; i >= 0; i -= 1) {
      if (!HIDDEN_NAV_BLOCK_IDS.has(screens[i].id)) return i;
    }
    return null;
  };

  const getNextVisibleIndex = (fromIndex: number) => {
    for (let i = fromIndex + 1; i < screens.length; i += 1) {
      if (!HIDDEN_NAV_BLOCK_IDS.has(screens[i].id)) return i;
    }
    return null;
  };

  const prevVisibleIndex = getPrevVisibleIndex(index);
  const nextVisibleIndex = getNextVisibleIndex(index);

  const canGoNext = useMemo(() => {
    if (screen.id === 3) {
      return block3IntroComplete;
    }
    if (screen.type === 'scenario_situation' && screen.scenarioId) {
      return Boolean(scenarioAnswers[screen.scenarioId]);
    }
    return true;
  }, [
    screen.id,
    screen.type,
    screen.scenarioId,
    scenarioAnswers,
    block3IntroComplete,
  ]);

  const nextLabel = useMemo(() => {
    if (screen.id === 29) return 'Back to pathway';
    if (screen.id === 28) return 'Finish';
    if (screen.type === 'scenario_situation' && screen.scenarioId) {
      return scenarioCompareSeen[screen.scenarioId] ? 'Next' : 'Compare';
    }
    return 'Next';
  }, [screen.id, screen.type, screen.scenarioId, scenarioCompareSeen]);

  const skipScenarioSectionEnterAnimation =
    screen.type === 'scenario_situation' &&
    (scenarioMainTitleIntroPlayed || (screen.scenarioId ?? 0) > 1);

  const introTitleMovingToHeader =
    (screen.id === 3 && block3IntroPhase === 'header') ||
    (screen.id === 4 && block4IntroPhase === 'header') ||
    (screen.id === 5 && watchIntroPhase === 'header') ||
    (screen.id === 7 && threeStatesIntroPhase === 'header') ||
    (screen.id === 17 && techniqueIntroPhase === 'header') ||
    (shouldPlayScenarioMainTitleIntro && scenarioIntroPhase === 'header');

  return (
    <div
      className="flex flex-col min-h-screen bg-[#F7F9FC] text-slate-900"
      style={{ fontFamily: 'Arial' }}
    >
      <ModuleAudioGuide
        autoNarrationEnabled={narratorEnabled}
        autoNarrationText={narratorText}
      />
      {screen.type === 'landing' ? (
        <LandingSection screen={screen} onNext={() => transitionToIndex(1)} />
      ) : (
        <main className="flex w-full h-screen overflow-hidden">
          <div
            ref={mainContentRef}
            className="flex-1 min-w-0 overflow-hidden flex flex-col p-0 relative bg-[#F7F9FC]"
          >
            <ModulePageBackground />
            <div className="relative z-10 flex flex-col flex-1 min-h-0 overflow-hidden">
              <div
                className={`flex flex-col flex-1 min-h-0 overflow-hidden transition-all duration-[350ms] ease-out ${
                  isScreenTransitioning
                    ? 'opacity-0 translate-y-2 pointer-events-none'
                    : 'opacity-100 translate-y-0'
                }`}
              >
                <ModuleInlineHeader
                  screen={screen}
                  activeSidebarSectionKey={activeSidebarSectionKey}
                  isModuleContentsOpen={isModuleContentsOpen}
                  onToggleModuleContents={toggleModuleContents}
                  suppressEntranceAnimation={introTitleMovingToHeader}
                  visible={
                    (screen.id !== 3 || block3IntroPhase !== 'center') &&
                    (screen.id !== 4 || block4IntroPhase !== 'center') &&
                    (screen.id !== 5 || watchIntroPhase !== 'center') &&
                    (screen.id !== 7 || threeStatesIntroPhase !== 'center') &&
                    (screen.id !== 17 || techniqueIntroPhase !== 'center') &&
                    (screen.type !== 'scenario_situation' ||
                      !shouldPlayScenarioMainTitleIntro ||
                      scenarioIntroPhase !== 'center')
                  }
                  keepTitleAnchor={
                    (screen.id === 3 && block3IntroPhase === 'center') ||
                    (screen.id === 4 && block4IntroPhase === 'center') ||
                    (screen.id === 5 && watchIntroPhase === 'center') ||
                    (screen.id === 7 && threeStatesIntroPhase === 'center') ||
                    (screen.id === 17 && techniqueIntroPhase === 'center') ||
                    (shouldPlayScenarioMainTitleIntro &&
                      scenarioIntroPhase === 'center')
                  }
                  hideTitle={
                    (screen.id === 3 &&
                      (block3IntroPhase === 'center' ||
                        block3IntroPhase === 'header')) ||
                    (screen.id === 4 &&
                      (block4IntroPhase === 'center' ||
                        block4IntroPhase === 'header')) ||
                    (screen.id === 5 &&
                      (watchIntroPhase === 'center' ||
                        watchIntroPhase === 'header')) ||
                    (screen.id === 7 &&
                      (threeStatesIntroPhase === 'center' ||
                        threeStatesIntroPhase === 'header')) ||
                    (screen.id === 17 &&
                      (techniqueIntroPhase === 'center' ||
                        techniqueIntroPhase === 'header')) ||
                    (shouldPlayScenarioMainTitleIntro &&
                      (scenarioIntroPhase === 'center' ||
                        scenarioIntroPhase === 'header'))
                  }
                  titleAnchorRef={headerTitleAnchorRef}
                />
                <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
                  <div
                    key={index}
                    className="flex flex-col flex-1 min-h-0 overflow-hidden"
                  >
                    <div
                      ref={scrollAreaRef}
                      className={`relative flex-1 min-h-0 custom-scrollbar scroll-smooth ${
                        screen.id === 16 ||
                        screen.id === 17 ||
                        screen.id === 18 ||
                        screen.type === 'closing' ||
                        screen.type === 'takeaway' ||
                        screen.type === 'research' ||
                        screen.type === 'scenario_situation' ||
                        screen.type === 'scenario_choose' ||
                        screen.type === 'cover' ||
                        screen.type === 'technique' ||
                        screen.type === 'technique_intro' ||
                        screen.id === 2 ||
                        screen.id === 3 ||
                        screen.id === 4 ||
                        screen.id === 5 ||
                        screen.id === 7
                          ? 'pb-4 flex flex-col'
                          : 'pb-24'
                      } ${
                        isCurrentScreenDropdownOpen
                          ? 'overflow-y-auto'
                          : 'overflow-hidden'
                      }`}
                    >
                      <section
                        className={`${
                          skipScenarioSectionEnterAnimation ? '' : 'step-transition'
                        } ${
                          screen.id === 16 ||
                          screen.id === 17 ||
                          screen.id === 18 ||
                          screen.type === 'closing' ||
                          screen.type === 'takeaway' ||
                          screen.type === 'research' ||
                          screen.type === 'scenario_situation' ||
                          screen.type === 'scenario_choose' ||
                          screen.type === 'cover' ||
                          screen.type === 'technique' ||
                          screen.type === 'technique_intro' ||
                          screen.id === 2 ||
                          screen.id === 3 ||
                          screen.id === 4 ||
                          screen.id === 5 ||
                          screen.id === 7
                            ? isIntroReadMoreLayoutOpen
                              ? 'flex flex-col'
                              : 'flex flex-col flex-1 min-h-full h-full'
                            : 'space-y-4'
                        }`}
                      >
                        {screen.type === 'cover' ? (
                          <div className="p-5 md:p-6 md:px-14 flex flex-col flex-1 min-h-0 h-full">
                            <CoverSection screen={screen} />
                          </div>
                        ) : screen.type === 'technique_intro' ? (
                          <div className="p-2 md:p-2 md:px-14 flex flex-col flex-1 min-h-0 h-full relative overflow-hidden">
                            {techniqueIntroPhase === 'center' ||
                            techniqueIntroPhase === 'header' ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (techniqueIntroPhase === 'center') {
                                      setTechniqueIntroPhase('header');
                                    }
                                  }}
                                  className={`absolute inset-0 z-10 ${
                                    techniqueIntroPhase === 'center'
                                      ? 'cursor-pointer'
                                      : 'pointer-events-none'
                                  }`}
                                  aria-label="Continue to technique intro"
                                />
                                <IntroTitleOverlay
                                  title={techniqueTitle}
                                  phase={
                                    techniqueIntroPhase === 'header'
                                      ? 'header'
                                      : 'center'
                                  }
                                  anchorRef={headerTitleAnchorRef}
                                  contentAreaRef={mainContentRef}
                                  centerContent={!isModuleContentsOpen}
                                  displayedText={
                                    techniqueIntroPhase === 'center'
                                      ? typedTechniqueTitle
                                      : techniqueTitle
                                  }
                                  onMoveComplete={() =>
                                    setTechniqueIntroPhase('paragraph')
                                  }
                                />
                              </>
                            ) : null}

                            <TechniqueVerticalStepsSection
                              screen={screen}
                              onStepClick={setActiveTechniqueStep}
                              hideLead={
                                techniqueIntroPhase === 'center' ||
                                techniqueIntroPhase === 'header'
                              }
                              leadContent={
                                techniqueIntroPhase === 'paragraph' ? (
                                  <>
                                    <span>{typedTechniqueLead}</span>
                                    <span className="text-transparent">
                                      {techniqueLeadText.slice(
                                        typedTechniqueLead.length
                                      )}
                                    </span>
                                  </>
                                ) : techniqueIntroPhase === 'reveal' ||
                                  techniqueIntroPhase === 'done' ? (
                                  techniqueLeadText
                                ) : undefined
                              }
                              showSteps={techniqueIntroPhase === 'done'}
                              staggerReveal={techniqueIntroPhase === 'done'}
                              showKeyPoint={techniqueIntroPhase === 'done'}
                            />

                            {techniqueIntroPhase === 'reveal' ? (
                              <TapContinuePrompt
                                label="Tap to continue"
                                onClick={() => setTechniqueIntroPhase('done')}
                                className="absolute inset-0 z-20"
                              />
                            ) : null}
                          </div>
                        ) : screen.type === 'technique' ? (
                          <div className="p-5 md:p-6 md:px-14 flex flex-col flex-1 min-h-0 h-full">
                            <TechniqueStepsSection
                              screen={screen}
                              openDropdownIds={openDropdownIds}
                              onDropdownToggle={handleDropdownOpenChange}
                              activeSidebarSectionKey={activeSidebarSectionKey}
                            />
                          </div>
                        ) : screen.type === 'takeaway' ? (
                          <div className="p-5 md:p-6 md:px-14 flex flex-col flex-1 min-h-0 h-full overflow-hidden">
                            <TakeawayCardSection screen={screen} />
                          </div>
                        ) : screen.type === 'closing' ? (
                          <div className="p-5 md:p-6 md:px-14 flex flex-col flex-1 min-h-0 h-full overflow-hidden">
                            <ClosingSection
                              screen={screen}
                              activeSidebarSectionKey={activeSidebarSectionKey}
                            />
                          </div>
                        ) : screen.type === 'technique_honest' ? (
                          <div className="p-5 md:p-6 md:px-14">
                            <TechniqueHonestSection screen={screen} />
                          </div>
                        ) : screen.id === 16 ? (
                          <div className="w-full p-5 md:p-6 md:px-14 flex flex-col flex-1 min-h-0 h-full overflow-hidden">
                            <WhatNotToDoStepperSection screen={screen} />
                          </div>
                        ) : screen.id === 18 ? (
                          <div className="p-5 md:p-6 md:px-14 flex flex-col flex-1 min-h-0 h-full overflow-hidden">
                            <PracticeIntroSection screen={screen} />
                          </div>
                        ) : screen.type === 'scenario_situation' &&
                          screen.scenarioId ? (
                          <div className="p-5 md:p-6 md:px-14 w-full min-w-0 self-stretch flex flex-col flex-1 min-h-0 h-full overflow-hidden relative">
                            {shouldPlayScenarioMainTitleIntro &&
                            (scenarioIntroPhase === 'center' ||
                              scenarioIntroPhase === 'header') ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (scenarioIntroPhase === 'center') {
                                      setScenarioIntroPhase('header');
                                    }
                                  }}
                                  className={`absolute inset-0 z-10 ${
                                    scenarioIntroPhase === 'center'
                                      ? 'cursor-pointer'
                                      : 'pointer-events-none'
                                  }`}
                                  aria-label="Continue to scenario"
                                />
                                <IntroTitleOverlay
                                  title={scenarioTitle}
                                  phase={
                                    scenarioIntroPhase === 'header'
                                      ? 'header'
                                      : 'center'
                                  }
                                  anchorRef={headerTitleAnchorRef}
                                  contentAreaRef={mainContentRef}
                                  centerContent={!isModuleContentsOpen}
                                  displayedText={
                                    scenarioIntroPhase === 'center'
                                      ? typedScenarioTitle
                                      : scenarioTitle
                                  }
                                  onMoveComplete={() => {
                                    setScenarioMainTitleIntroPlayed(true);
                                    setScenarioIntroPhase('reveal_situation');
                                  }}
                                />
                              </>
                            ) : null}

                            <ScenarioSituationSection
                              scenarioId={screen.scenarioId}
                              selected={
                                scenarioAnswers[screen.scenarioId] ?? null
                              }
                              onSelect={(key) => {
                                setScenarioAnswers((prev) => ({
                                  ...prev,
                                  [screen.scenarioId!]: key,
                                }));
                                setScenarioCompareSeen((prev) => ({
                                  ...prev,
                                  [screen.scenarioId!]: false,
                                }));
                              }}
                              hideSituation={
                                scenarioIntroPhase === 'center' ||
                                scenarioIntroPhase === 'header' ||
                                scenarioIntroPhase === 'reveal_situation'
                              }
                              hideOptions={scenarioIntroPhase !== 'done'}
                              showScenarioHeading={
                                scenarioIntroPhase === 'reveal_situation' ||
                                scenarioIntroPhase === 'situation' ||
                                scenarioIntroPhase === 'reveal_options' ||
                                scenarioIntroPhase === 'done'
                              }
                              showIntroCallout={
                                showScenarioIntroCallout &&
                                scenarioIntroPhase === 'reveal_situation'
                              }
                              situationVisible={
                                scenarioIntroPhase === 'situation' ||
                                scenarioIntroPhase === 'reveal_options' ||
                                scenarioIntroPhase === 'done'
                              }
                              situationContent={
                                scenarioIntroPhase === 'situation' ? (
                                  prefersReducedMotion ? (
                                    scenarioSituationText
                                  ) : (
                                    <>
                                      <span>{typedScenarioSituation}</span>
                                      <span className="text-transparent">
                                        {scenarioSituationText.slice(
                                          typedScenarioSituation.length
                                        )}
                                      </span>
                                    </>
                                  )
                                ) : scenarioIntroPhase === 'reveal_options' ||
                                  scenarioIntroPhase === 'done' ? (
                                  scenarioSituationText
                                ) : undefined
                              }
                              optionsVisible={scenarioIntroPhase === 'done'}
                              situationRevealOverlay={
                                scenarioIntroPhase === 'reveal_situation' ? (
                                  <TapContinuePrompt
                                    label="Tap to continue"
                                    onClick={() => {
                                      if (showScenarioIntroCallout) {
                                        dismissScenarioCallout();
                                      }
                                      setScenarioIntroPhase('situation');
                                    }}
                                    className="absolute inset-0 z-20"
                                  />
                                ) : null
                              }
                              optionsRevealOverlay={
                                scenarioIntroPhase === 'reveal_options' ? (
                                  <TapContinuePrompt
                                    label="Tap to continue"
                                    onClick={() =>
                                      setScenarioIntroPhase('done')
                                    }
                                    className="absolute inset-0 z-20"
                                  />
                                ) : null
                              }
                            />
                          </div>
                        ) : screen.id === 2 ? (
                          <div className="p-5 md:p-6 md:px-14 flex flex-col flex-1 min-h-0 h-full">
                            <AboutModuleSection
                              screen={screen}
                              onDropdownOpenChange={handleDropdownOpenChange}
                            />
                          </div>
                        ) : screen.type === 'research' || screen.id === 4 ? (
                          <div className="p-5 md:p-6 md:px-14 flex flex-col flex-1 min-h-0 h-full overflow-hidden">
                            <ResearchTapRevealSection
                              screen={screen}
                              headerTitleAnchorRef={headerTitleAnchorRef}
                              contentAreaRef={mainContentRef}
                              centerContent={!isModuleContentsOpen}
                              onDropdownOpenChange={handleDropdownOpenChange}
                              onPhaseChange={handleBlock4PhaseChange}
                            />
                          </div>
                        ) : screen.id === 5 ? (
                          <div className="p-5 md:p-6 md:px-14 flex flex-col flex-1 min-h-0 h-full relative">
                            {watchIntroPhase === 'center' ||
                            watchIntroPhase === 'header' ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    watchIntroPhase === 'center'
                                      ? setWatchIntroPhase('header')
                                      : null
                                  }
                                  className={`absolute inset-0 z-10 ${
                                    watchIntroPhase === 'center'
                                      ? 'cursor-pointer'
                                      : 'pointer-events-none'
                                  }`}
                                  aria-label="Continue to watch"
                                />
                                <IntroTitleOverlay
                                  title={watchTitle}
                                  phase={
                                    watchIntroPhase === 'center'
                                      ? 'center'
                                      : 'header'
                                  }
                                  anchorRef={headerTitleAnchorRef}
                                  contentAreaRef={mainContentRef}
                                  centerContent={!isModuleContentsOpen}
                                  displayedText={
                                    watchIntroPhase === 'center'
                                      ? typedWatchTitle
                                      : watchTitle
                                  }
                                  onMoveComplete={() =>
                                    setWatchIntroPhase('reveal_intro')
                                  }
                                />
                              </>
                            ) : null}

                            {watchIntroPhase === 'reveal_intro' ||
                            (watchIntroPhase === 'intro' &&
                              watchIntroTypingComplete &&
                              !watchIntroVideoRevealed) ? (
                              <TapContinuePrompt
                                label={
                                  watchIntroPhase === 'intro'
                                    ? 'Continue to see video'
                                    : 'Tap to continue'
                                }
                                onClick={() => {
                                  if (watchIntroPhase === 'reveal_intro') {
                                    setWatchIntroPhase('intro');
                                    return;
                                  }
                                  setWatchIntroVideoRevealed(true);
                                  if (prefersReducedMotion) {
                                    setWatchIntroPhase('done');
                                  }
                                }}
                                className="absolute inset-0"
                              />
                            ) : null}

                            {watchIntroPhase === 'intro' ? (
                              <div className="w-full max-w-[1200px] mx-auto transition-all duration-[350ms] ease-out opacity-100 translate-y-0">
                                <div className="flex flex-col gap-6">
                                  <div className="px-2 md:px-3">
                                    <h3
                                      className="shrink-0 text-left text-[24px] leading-tight font-regular whitespace-pre-line"
                                      style={{ color: '#1F3864' }}
                                    >
                                      {prefersReducedMotion ? (
                                        watchIntroText
                                      ) : (
                                        <>
                                          <span>{typedWatchIntroText}</span>
                                          <span className="text-transparent">
                                            {watchIntroText.slice(
                                              typedWatchIntroText.length
                                            )}
                                          </span>
                                        </>
                                      )}
                                    </h3>
                                  </div>

                                  {watchIntroVideoMounted ? (
                                    <div
                                      className={`transition-all duration-[350ms] ease-out ${
                                        watchIntroVideoShown
                                          ? 'opacity-100 translate-y-0'
                                          : 'opacity-0 translate-y-2 pointer-events-none'
                                      }`}
                                    >
                                      <div className="w-full flex flex-col">
                                        <div className="w-full min-h-0 flex flex-col">
                                          <div
                                            className={`w-full min-h-0 rounded-2xl border border-[#E5E9F0] ${MODULE_SURFACE} shadow-[0_4px_24px_-4px_rgba(10,31,68,0.08),0_2px_6px_-2px_rgba(10,31,68,0.04)] overflow-hidden p-2 md:p-3 flex flex-col`}
                                          >
                                            <div className="w-full min-h-[180px] max-h-[min(420px,46vh)] aspect-video">
                                              <VideoLessonPlayer
                                                title={
                                                  screen.videoTitle ??
                                                  'Module 1 film, around 3 minutes'
                                                }
                                                videoUrl={
                                                  screen.videoUrl ?? null
                                                }
                                                theme="light"
                                                compact
                                                hideFooter={!screen.videoUrl}
                                                className="h-full w-full rounded-xl border-0"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {screen.transcriptDropdown &&
                                      !isWatchScriptOpen ? (
                                        <div className="mt-5 shrink-0 w-full text-left">
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setWatchIntroPhase('done');
                                              setIsWatchScriptOpen(true);
                                            }}
                                            className="w-full flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition-colors text-left py-3 px-5 md:px-6 min-h-[56px] rounded-xl border border-slate-200 shadow-[0_4px_24px_-4px_rgba(10,31,68,0.08)]"
                                          >
                                            <div
                                              className="text-[16px] md:text-[18px] font-medium leading-relaxed"
                                              style={{ color: '#1F3864' }}
                                            >
                                              {screen.transcriptDropdown.header}
                                            </div>
                                            <span
                                              className="material-symbols-outlined shrink-0"
                                              style={{ color: '#1F7A7A' }}
                                            >
                                              menu_book
                                            </span>
                                          </button>
                                        </div>
                                      ) : null}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            ) : null}

                            {watchIntroPhase === 'done' ? (
                              <div className="transition-all duration-[350ms] ease-out opacity-100 translate-y-0">
                                <div className="transition-all duration-[350ms] ease-out opacity-100">
                                  <WatchSection
                                    screen={screen}
                                    isScriptOpen={isWatchScriptOpen}
                                    onOpenScript={() =>
                                      setIsWatchScriptOpen(true)
                                    }
                                    onCloseScript={() =>
                                      setIsWatchScriptOpen(false)
                                    }
                                    hideIntroHeadline
                                  />
                                </div>
                              </div>
                            ) : null}
                          </div>
                        ) : screen.id === 3 && screen.bullets ? (
                          <div className="p-5 md:p-6 md:px-14 flex flex-col flex-1 min-h-0 h-full">
                            <LearningOutcomesTapSection
                              title={
                                MODULE_BLOCK_HEADER_TITLES[3] ??
                                'What You Will Learn On This Module'
                              }
                              bullets={screen.bullets}
                              headerTitleAnchorRef={headerTitleAnchorRef}
                              contentAreaRef={mainContentRef}
                              centerContent={!isModuleContentsOpen}
                              onCompleteChange={handleBlock3CompleteChange}
                              onPhaseChange={handleBlock3PhaseChange}
                            />
                          </div>
                        ) : screen.id === 7 ? (
                          <div className="p-5 md:p-6 md:px-14 flex flex-col flex-1 min-h-0 h-full relative">
                            <div className="relative flex flex-col flex-1 min-h-0 h-full">
                              <div className="relative max-w-[1200px] mx-auto w-full flex flex-col flex-1 min-h-0 h-full">
                                {threeStatesIntroPhase === 'center' ||
                                threeStatesIntroPhase === 'header' ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (
                                          threeStatesIntroPhase === 'center'
                                        ) {
                                          setThreeStatesIntroPhase('header');
                                        }
                                      }}
                                      className={`absolute inset-0 z-10 ${
                                        threeStatesIntroPhase === 'center'
                                          ? 'cursor-pointer'
                                          : 'pointer-events-none'
                                      }`}
                                      aria-label="Continue to three states"
                                    />
                                    <IntroTitleOverlay
                                      title={threeStatesTitle}
                                      phase={
                                        threeStatesIntroPhase === 'header'
                                          ? 'header'
                                          : 'center'
                                      }
                                      anchorRef={headerTitleAnchorRef}
                                      contentAreaRef={mainContentRef}
                                      centerContent={!isModuleContentsOpen}
                                      displayedText={
                                        threeStatesIntroPhase === 'center'
                                          ? typedThreeStatesTitle
                                          : threeStatesTitle
                                      }
                                      onMoveComplete={() =>
                                        setThreeStatesIntroPhase(
                                          prefersReducedMotion
                                            ? 'done'
                                            : 'reveal_paragraph'
                                        )
                                      }
                                    />
                                  </>
                                ) : null}

                                {threeStatesIntroPhase === 'reveal_paragraph' ? (
                                  <TapContinuePrompt
                                    label="Tap to continue"
                                    onClick={() =>
                                      setThreeStatesIntroPhase('paragraph')
                                    }
                                    className="absolute inset-0"
                                  />
                                ) : null}

                                <header
                                  className={`mb-10 transition-all duration-[350ms] ease-out ${
                                    threeStatesIntroPhase === 'paragraph' ||
                                    threeStatesIntroPhase === 'reveal_cards' ||
                                    threeStatesIntroPhase === 'done'
                                      ? 'opacity-100 translate-y-0'
                                      : 'opacity-0 translate-y-2 pointer-events-none'
                                  }`}
                                >
                                  <div
                                    className={`mt-6 p-10 max-w-full min-h-[230px] ${MODULE_SURFACE} rounded-xl border-l-4 border-l-[#2E7CF6]`}
                                  >
                                    <p
                                      className="text-[24px] font-regular leading-relaxed whitespace-pre-line"
                                      style={{ color: '#333333' }}
                                    >
                                      {prefersReducedMotion ||
                                      threeStatesIntroPhase ===
                                        'reveal_cards' ||
                                      threeStatesIntroPhase === 'done' ? (
                                        screen.body
                                      ) : (
                                        <>
                                          <span>{typedThreeStatesBody}</span>
                                          <span className="text-transparent">
                                            {threeStatesBodyText.slice(
                                              typedThreeStatesBody.length
                                            )}
                                          </span>
                                        </>
                                      )}
                                    </p>
                                  </div>
                                </header>

                                {threeStatesIntroPhase === 'reveal_cards' ? (
                                  <TapContinuePrompt
                                    label="Tap to continue"
                                    onClick={() =>
                                      setThreeStatesIntroPhase('done')
                                    }
                                    className="absolute inset-0"
                                  />
                                ) : null}

                                <div
                                  className={`w-full transition-all duration-[350ms] ease-out ${
                                    threeStatesIntroPhase === 'done'
                                      ? 'opacity-100 translate-y-0'
                                      : 'opacity-0 translate-y-2 pointer-events-none'
                                  }`}
                                >
                                  <div>
                                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                                      {(
                                        [
                                          {
                                            key: 'green' as const,
                                            title: 'State One',
                                            subtitle: 'Ready for learning',
                                            accentText: 'text-emerald-800',
                                            iconBg: 'bg-emerald-100',
                                            iconText: 'text-emerald-700',
                                            barBg: 'bg-emerald-100',
                                            icon: 'psychology',
                                          },
                                          {
                                            key: 'amber' as const,
                                            title: 'State Two',
                                            subtitle: 'Escalation imminent',
                                            accentText: 'text-amber-700',
                                            iconBg: 'bg-amber-100',
                                            iconText: 'text-amber-700',
                                            barBg: 'bg-amber-100',
                                            icon: 'warning',
                                          },
                                          {
                                            key: 'red' as const,
                                            title: 'State Three',
                                            subtitle: 'Full survival mode',
                                            accentText: 'text-rose-700',
                                            iconBg: 'bg-rose-100',
                                            iconText: 'text-rose-700',
                                            barBg: 'bg-rose-100',
                                            icon: 'emergency_home',
                                          },
                                        ] as const
                                      ).map((card) => {
                                        return (
                                          <div
                                            key={card.key}
                                            className={`${MODULE_SURFACE} rounded-2xl overflow-hidden border border-[#E5E9EB] shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-shadow w-full min-h-[320px] flex flex-col`}
                                          >
                                            <button
                                              type="button"
                                              onClick={() =>
                                                setLearnStateModalKey(card.key)
                                              }
                                              className="w-full flex-1 min-h-[320px] p-6 md:p-8 flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-0.5"
                                            >
                                              <div
                                                className={`size-20 md:size-24 lg:size-28 shrink-0 aspect-square rounded-full ${card.iconBg} flex items-center justify-center`}
                                              >
                                                <span
                                                  className={`material-symbols-outlined text-[28px] leading-none ${card.iconText}`}
                                                  style={{
                                                    fontVariationSettings:
                                                      '"FILL" 1',
                                                  }}
                                                >
                                                  {card.icon}
                                                </span>
                                              </div>
                                              <div className="flex flex-col items-center gap-1.5 shrink-0">
                                                <div
                                                  className={`text-[15px] font-semibold leading-tight ${card.accentText}`}
                                                >
                                                  {card.title}
                                                </div>
                                                <div
                                                  className={`h-1 w-12 rounded-full ${card.barBg}`}
                                                />
                                              </div>
                                              <span className="material-symbols-outlined text-slate-400 text-[18px] shrink-0">
                                                expand_more
                                              </span>
                                            </button>
                                          </div>
                                        );
                                      })}
                                    </div>

                                    {learnStateItems.brain?.body ? (
                                      <div className="mt-6"></div>
                                    ) : null}
                                  </div>
                                </div>

                                <LearnStateModal
                                  open={learnStateModalKey === 'green'}
                                  title={
                                    learnStateItems.green?.header ??
                                    'State One: Green. Calmly engaged'
                                  }
                                  accentColor="#37675e"
                                  body={learnStateItems.green?.body ?? ''}
                                  onClose={() => setLearnStateModalKey(null)}
                                />
                                <LearnStateModal
                                  open={learnStateModalKey === 'amber'}
                                  title={
                                    learnStateItems.amber?.header ??
                                    'State Two: Amber. Dysregulated'
                                  }
                                  accentColor="#ba7a1a"
                                  body={learnStateItems.amber?.body ?? ''}
                                  onClose={() => setLearnStateModalKey(null)}
                                />
                                <LearnStateModal
                                  open={learnStateModalKey === 'red'}
                                  title={
                                    learnStateItems.red?.header ??
                                    'State Three: Red. Shut down'
                                  }
                                  accentColor="#ba1a1a"
                                  body={learnStateItems.red?.body ?? ''}
                                  onClose={() => setLearnStateModalKey(null)}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="p-5 md:p-6 md:px-14 flex flex-col min-h-0">
                            <>
                              <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2 flex-wrap" />
                              </div>

                              {screen.id === 8 ||
                              screen.id === 9 ||
                              screen.id === 10 ? (
                                <div className="flex-1 flex flex-col gap-6 min-h-0">
                                  {activeSidebarSectionKey !== 'learn' ? (
                                    <div className="text-center">
                                      {screen.t3 ? (
                                        <h3 className="text-lg md:text-xl font-bold text-slate-900">
                                          {screen.t3}
                                        </h3>
                                      ) : null}
                                      <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                                    </div>
                                  ) : null}

                                  {screen.body ? (
                                    <div
                                      className={`w-full mx-auto ${
                                        screen.id === 10
                                          ? 'max-w-[1100px]'
                                          : 'max-w-[784px]'
                                      }`}
                                    >
                                      <div
                                        className={`whitespace-pre-line text-center md:text-left ${
                                          screen.id === 10
                                            ? 'text-base md:text-lg leading-relaxed text-slate-100/90'
                                            : 'text-sm md:text-base text-slate-700 leading-relaxed'
                                        }`}
                                      >
                                        {screen.body}
                                      </div>
                                    </div>
                                  ) : null}

                                  {screen.id !== 10 ? (
                                    <div className="flex justify-center">
                                      <div className="w-full max-w-[520px] md:w-[520px] rounded-2xl overflow-hidden border border-slate-200 bg-white">
                                        <img
                                          src={structureLearnImage}
                                          alt="Learn"
                                          className="w-full h-[220px] md:h-[280px] object-cover"
                                        />
                                      </div>
                                    </div>
                                  ) : null}

                                  {screen.dropdowns &&
                                  screen.dropdowns.length ? (
                                    <div className="space-y-3 w-full max-w-[920px] mx-auto">
                                      {screen.dropdowns.map((d) => (
                                        <div key={d.header} className="w-full">
                                          <div className="[&>div>button]:py-4 [&>div>button]:px-5">
                                            <Dropdown
                                              dropdownId={`${screen.id}:${d.header}`}
                                              header={d.header}
                                              body={d.body}
                                              onOpenChange={
                                                handleDropdownOpenChange
                                              }
                                            />
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : null}
                                </div>
                              ) : null}

                              {screen.type === 'divider' &&
                              screen.t1 &&
                              !isPartTitleDuplicate(
                                screen.t1,
                                activeSidebarSectionKey
                              ) ? (
                                <div className="text-center">
                                  <h1 className="text-2xl md:text-4xl font-black text-slate-900">
                                    {screen.t1}
                                  </h1>
                                  <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                                </div>
                              ) : null}

                              {screen.t1 &&
                              screen.type !== 'divider' &&
                              !isPartTitleDuplicate(
                                screen.t1,
                                activeSidebarSectionKey
                              ) &&
                              activeSidebarSectionKey !== 'learn' ? (
                                screen.t2 ? (
                                  <div className="text-center">
                                    <h1 className="text-2xl md:text-4xl font-black text-slate-900">
                                      {screen.t1}
                                    </h1>
                                    <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                                  </div>
                                ) : (
                                  <h1 className="text-2xl md:text-4xl font-black text-slate-900">
                                    {screen.t1}
                                  </h1>
                                )
                              ) : null}

                              {screen.t2 &&
                              !screen.t1 &&
                              !isSameAsBlockHeader(
                                screen.t2,
                                screen,
                                activeSidebarSectionKey
                              ) &&
                              screen.id !== 3 &&
                              screen.id !== 4 &&
                              screen.id !== 11 &&
                              screen.id !== 12 &&
                              screen.type !== 'accordion' &&
                              screen.type !== 'video' ? (
                                activeSidebarSectionKey !== 'learn' ? (
                                  <div className="text-center">
                                    <h2 className="text-xl md:text-2xl font-black text-slate-900">
                                      {screen.t2}
                                    </h2>
                                    <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                                  </div>
                                ) : null
                              ) : null}

                              {screen.t3 &&
                              !isSameAsBlockHeader(
                                screen.t3,
                                screen,
                                activeSidebarSectionKey
                              ) &&
                              (typeof screen.t1 !== 'string' ||
                                screen.t1.trim().toLowerCase() !==
                                  screen.t3.trim().toLowerCase()) &&
                              (typeof screen.t2 !== 'string' ||
                                screen.t2.trim().toLowerCase() !==
                                  screen.t3.trim().toLowerCase()) &&
                              screen.id !== 8 &&
                              screen.id !== 9 &&
                              screen.id !== 10 &&
                              activeSidebarSectionKey !== 'learn' ? (
                                <h3 className="text-lg md:text-xl font-bold text-slate-900">
                                  {screen.t3}
                                </h3>
                              ) : null}

                              {screen.lead && screen.id !== 7 ? (
                                <div className="text-base md:text-lg font-semibold text-slate-900 whitespace-pre-line">
                                  {screen.lead}
                                </div>
                              ) : null}

                              {screen.body &&
                              screen.id !== 7 &&
                              screen.id !== 5 &&
                              screen.id !== 8 &&
                              screen.id !== 9 &&
                              screen.id !== 10 &&
                              screen.id !== 12 &&
                              screen.id !== 18 &&
                              screen.type !== 'accordion' ? (
                                <div
                                  className={`text-sm md:text-base text-slate-700 whitespace-pre-line leading-relaxed ${
                                    screen.type === 'divider' ? 'mt-4' : ''
                                  }`}
                                >
                                  {screen.body}
                                </div>
                              ) : null}
                            </>

                            {screen.bullets && screen.id !== 3 ? (
                              <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-slate-200 ">
                                {screen.bullets.map((b) => (
                                  <li key={b} className="leading-relaxed">
                                    {b}
                                  </li>
                                ))}
                              </ul>
                            ) : null}

                            {screen.keyPoint ? (
                              screen.id === 10 ? (
                                <div className="mt-8 w-full max-w-[784px] mx-auto">
                                  <Dropdown
                                    dropdownId={`${screen.id}:key-point`}
                                    header="The single most important point."
                                    body={screen.keyPoint}
                                    onOpenChange={handleDropdownOpenChange}
                                    containerClassName="rounded-xl"
                                    buttonClassName="h-[64px]"
                                  />
                                </div>
                              ) : screen.id === 11 ? null : (
                                <KeyPoint>{screen.keyPoint}</KeyPoint>
                              )
                            ) : null}

                            {screen.type === 'video' ? (
                              <div className="space-y-3">
                                {screen.t2 ? (
                                  <div className="text-center">
                                    <h2 className="text-xl  md:text-2xl font-black text-white">
                                      {screen.t2}
                                    </h2>
                                    <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                                  </div>
                                ) : null}

                                <div className="flex justify-center">
                                  <div className="w-full max-w-[784px] space-y-3">
                                    <VideoLessonPlayer
                                      title={screen.videoTitle ?? 'Video'}
                                      videoUrl={screen.videoUrl}
                                      className="rounded-[18px]"
                                    />
                                  </div>
                                </div>

                                {screen.videoPrompt ? (
                                  <div className="text-sm text-slate-200 text-center">
                                    {screen.videoPrompt}
                                  </div>
                                ) : null}
                              </div>
                            ) : null}

                            {screen.dropdowns &&
                            screen.id !== 2 &&
                            screen.id !== 5 &&
                            screen.id !== 8 &&
                            screen.id !== 9 &&
                            screen.id !== 10 &&
                            screen.id !== 18 ? (
                              <div className="space-y-3">
                                {screen.dropdowns.map((d) => (
                                  <div
                                    key={d.header}
                                    className="w-full md:w-[715px]"
                                  >
                                    <div className="[&>div>button]:py-6 [&>div>button]:px-6">
                                      <Dropdown
                                        dropdownId={`${screen.id}:${d.header}`}
                                        header={d.header}
                                        body={d.body}
                                        onOpenChange={handleDropdownOpenChange}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : null}

                            {screen.type === 'accordion' &&
                            screen.accordionItems ? (
                              <div className="pt-2">
                                {screen.t2 &&
                                screen.id !== 11 &&
                                screen.id !== 16 &&
                                activeSidebarSectionKey !== 'learn' ? (
                                  <div className="text-center">
                                    <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                                      {screen.t2}
                                    </h2>
                                    <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                                  </div>
                                ) : null}

                                {screen.body && screen.id !== 16 ? (
                                  <div className="text-sm md:text-base text-slate-600 text-center whitespace-pre-line leading-relaxed max-w-[720px] mx-auto">
                                    {screen.body}
                                  </div>
                                ) : null}

                                {screen.id === 11 ? (
                                  <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                                    <div className="lg:col-span-8 flex flex-col gap-4">
                                      {screen.accordionItems.map((item) => {
                                        const dropdownId = `${screen.id}:${item.header}`;
                                        return (
                                          <LearnAccordionItem
                                            key={item.header}
                                            dropdownId={dropdownId}
                                            header={item.header}
                                            body={item.body}
                                            open={openDropdownIds.has(
                                              dropdownId
                                            )}
                                            onToggle={handleDropdownOpenChange}
                                          />
                                        );
                                      })}
                                    </div>

                                    <aside className="lg:col-span-4">
                                      <div className="lg:sticky lg:top-6 p-8 bg-[#1F7A7A] rounded-xl text-white shadow-[0_20px_40px_-15px_rgba(47,99,120,0.18)] flex flex-col gap-6">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                                          <span className="material-symbols-outlined text-white">
                                            lightbulb
                                          </span>
                                        </div>
                                        <h4 className="text-[20px] font-semibold">
                                          The single most important point.
                                        </h4>
                                        {screen.keyPoint ? (
                                          <div className="text-[15px] opacity-90 leading-relaxed whitespace-pre-line">
                                            {screen.keyPoint}
                                          </div>
                                        ) : null}
                                      </div>
                                    </aside>
                                  </div>
                                ) : (
                                  <div className="mt-8 space-y-4 max-w-[920px] mx-auto">
                                    {screen.accordionItems.map((item) => (
                                      <Dropdown
                                        key={item.header}
                                        dropdownId={`${screen.id}:${item.header}`}
                                        header={item.header}
                                        body={item.body}
                                        onOpenChange={handleDropdownOpenChange}
                                        containerClassName="rounded-xl"
                                        buttonClassName="h-[64px]"
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : null}
                          </div>
                        )}
                      </section>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`sticky bottom-0 mt-auto pt-4 pb-2 border-t border-slate-200 ${MODULE_PAGE_TINT} backdrop-blur-sm`}
              >
                <div className="flex items-center justify-between gap-2 max-w-[1280px] mx-auto">
                  <button
                    type="button"
                    disabled={
                      prevVisibleIndex === null || isScreenTransitioning
                    }
                    onClick={() => {
                      if (prevVisibleIndex === null) return;
                      transitionToIndex(prevVisibleIndex);
                    }}
                    className={`flex items-center gap-2 h-12 px-5 rounded-full text-sm font-semibold border transition-colors ${
                      prevVisibleIndex === null || isScreenTransitioning
                        ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="material-symbols-outlined">
                      arrow_back
                    </span>
                    <span>Previous</span>
                  </button>

                  <button
                    type="button"
                    disabled={
                      !canGoNext ||
                      nextVisibleIndex === null ||
                      isScreenTransitioning
                    }
                    onClick={() => {
                      if (screen.id === 29) {
                        navigate('/dashboard/my-learning/mind-sync');
                        return;
                      }

                      if (
                        screen.type === 'scenario_situation' &&
                        screen.scenarioId &&
                        !scenarioCompareSeen[screen.scenarioId]
                      ) {
                        setIsScenarioCompareOpen(true);
                        return;
                      }

                      if (nextVisibleIndex === null) return;
                      transitionToIndex(nextVisibleIndex);
                    }}
                    className={`flex items-center gap-2 h-12 px-6 rounded-full text-sm font-semibold border border-transparent transition-colors ${
                      canGoNext &&
                      nextVisibleIndex !== null &&
                      !isScreenTransitioning
                        ? 'bg-gradient-to-r from-[#60A5FA] to-[#9333EA] text-white hover:shadow-indigo-500/20'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span>{nextLabel}</span>
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <ModuleContentsSidebar
            toc={toc}
            sidebarSections={sidebarSections}
            openSections={openSections}
            activeSidebarSectionKey={activeSidebarSectionKey}
            index={index}
            screen={screen}
            toggleSection={toggleSection}
            setIndex={transitionToIndex}
            sidebarScrollRef={sidebarScrollRef}
            suppressAutoOpenRef={suppressAutoOpenRef}
            isSidebarTranscriptOpen={isSidebarTranscriptOpen}
            setIsSidebarTranscriptOpen={setIsSidebarTranscriptOpen}
            isOpen={isModuleContentsOpen}
            onToggle={toggleModuleContents}
          />
        </main>
      )}

      {screen.type === 'scenario_situation' &&
      screen.scenarioId &&
      scenarioAnswers[screen.scenarioId] ? (
        <ScenarioCompareModal
          scenarioId={screen.scenarioId}
          selected={scenarioAnswers[screen.scenarioId]!}
          open={isScenarioCompareOpen}
          onClose={() => {
            setIsScenarioCompareOpen(false);
            setScenarioCompareSeen((prev) => ({
              ...prev,
              [screen.scenarioId!]: true,
            }));
          }}
        />
      ) : null}

      {activeTechniqueStep !== null &&
      screen.techniqueSteps?.find((s) => s.number === activeTechniqueStep) ? (
        <TechniqueStepDetailModal
          open
          step={
            screen.techniqueSteps.find((s) => s.number === activeTechniqueStep)!
          }
          onClose={() => setActiveTechniqueStep(null)}
        />
      ) : null}
    </div>
  );
}
