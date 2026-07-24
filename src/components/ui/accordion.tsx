import React, {
  createContext,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type AccordionValue = string;

type AccordionContextValue = {
  openValues: Set<AccordionValue>;
  multiple: boolean;
  toggleValue: (value: AccordionValue) => void;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

type AccordionItemContextValue = {
  value: AccordionValue;
  isOpen: boolean;
  headerId: string;
  panelId: string;
  toggle: () => void;
};

const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null
);

type AccordionProps = {
  multiple?: boolean;
  defaultValue?: AccordionValue | AccordionValue[];
  children: React.ReactNode;
  className?: string;
};

export function Accordion({
  multiple = false,
  defaultValue,
  children,
  className,
}: AccordionProps) {
  const initial = useMemo(() => {
    const values = Array.isArray(defaultValue)
      ? defaultValue
      : defaultValue
        ? [defaultValue]
        : [];
    return new Set<AccordionValue>(values);
  }, [defaultValue]);

  const [openValues, setOpenValues] = useState<Set<AccordionValue>>(initial);

  const toggleValue = (value: AccordionValue) => {
    setOpenValues((prev) => {
      const next = new Set(prev);
      const isOpen = next.has(value);

      if (multiple) {
        if (isOpen) next.delete(value);
        else next.add(value);
        return next;
      }

      if (isOpen) return new Set();
      return new Set([value]);
    });
  };

  const ctx = useMemo<AccordionContextValue>(
    () => ({ openValues, multiple, toggleValue }),
    [openValues, multiple]
  );

  return (
    <AccordionContext.Provider value={ctx}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

type AccordionItemProps = {
  value: AccordionValue;
  children: React.ReactNode;
  className?: string;
};

export function AccordionItem({
  value,
  children,
  className,
}: AccordionItemProps) {
  const accordion = useContext(AccordionContext);
  if (!accordion) {
    throw new Error('AccordionItem must be used within Accordion');
  }

  const uid = useId();
  const isOpen = accordion.openValues.has(value);
  const headerId = `accordion-${uid}-header`;
  const panelId = `accordion-${uid}-panel`;

  const ctx = useMemo<AccordionItemContextValue>(
    () => ({
      value,
      isOpen,
      headerId,
      panelId,
      toggle: () => accordion.toggleValue(value),
    }),
    [value, isOpen, headerId, panelId, accordion]
  );

  return (
    <AccordionItemContext.Provider value={ctx}>
      <div className={className} data-state={isOpen ? 'open' : 'closed'}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

type AccordionHeaderProps = {
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
};

export function AccordionHeader({
  children,
  className,
  showIcon = true,
}: AccordionHeaderProps) {
  const item = useContext(AccordionItemContext);
  if (!item) {
    throw new Error('AccordionHeader must be used within AccordionItem');
  }

  return (
    <button
      type="button"
      id={item.headerId}
      aria-controls={item.panelId}
      aria-expanded={item.isOpen}
      onClick={item.toggle}
      className={className}
    >
      <span className="min-w-0 flex-1">{children}</span>
      {showIcon && (
        <span
          className={`material-symbols-outlined text-white/70 transition-transform duration-300 ${
            item.isOpen ? 'rotate-180' : ''
          }`}
          style={{ fontSize: '28px' }}
          aria-hidden
        >
          expand_more
        </span>
      )}
    </button>
  );
}

type AccordionPanelProps = {
  children: React.ReactNode;
  className?: string;
};

export function AccordionPanel({ children, className }: AccordionPanelProps) {
  const item = useContext(AccordionItemContext);
  if (!item) {
    throw new Error('AccordionPanel must be used within AccordionItem');
  }

  const innerRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    if (item.isOpen) {
      setMaxHeight(el.scrollHeight);
      return;
    }

    setMaxHeight(0);
  }, [item.isOpen, children]);

  return (
    <div
      id={item.panelId}
      role="region"
      aria-labelledby={item.headerId}
      className={className}
      style={{ maxHeight }}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

type AccordionWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export function AccordionWrapper({
  children,
  className,
}: AccordionWrapperProps) {
  return <div className={className}>{children}</div>;
}
