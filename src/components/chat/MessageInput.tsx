
import React, { useState, useRef, useEffect } from 'react';
import { TextGenerateEffect } from '../ui/text-generate-effect';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onSend?: (value: string) => void;
};

const MessageInput = (props: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [caretPos, setCaretPos] = useState(0);
  const [caretCoords, setCaretCoords] = useState({ left: 0, top: 0 });
  const [fontSize, setFontSize] = useState(18);
  const [effectKey, setEffectKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive font size
  useEffect(() => {
    const handleResize = () => {
      setFontSize(window.innerWidth < 640 ? 14 : 18);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update caret position and coordinates
  const updateCaret = () => {
    if (!inputRef.current || !mirrorRef.current || !containerRef.current) return;
    const caret = inputRef.current.selectionStart || 0;
    setCaretPos(caret);
    mirrorRef.current.textContent = (props.value || "").slice(0, caretPos);
    const mirrorRect = mirrorRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    setCaretCoords({
      left: mirrorRect.left - containerRect.left,
      top: mirrorRect.top - containerRect.top,
    });
  };

  useEffect(() => {
    updateCaret();
    // eslint-disable-next-lineconst showEffect = !isFocused && (!props.value || props.value.length === 0);
  }, [props.value, fontSize]);

  // Effect to re-render TextGenerateEffect while NOT focused
  useEffect(() => {
    if (!isFocused ) {
      intervalRef.current = setInterval(() => {
        setEffectKey(prev => prev + 1);
      }, 3500); // Slower pace
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isFocused]);

  // Show effect only when NOT focused
  const showEffect = !isFocused && (!props.value || props.value.length === 0);

  // Destructure onFocus and merge with internal logic
  const { onFocus, onSend, ...rest } = props;

  return (
    <div className="w-full py-4">
      <div className="relative max-w-2xl w-full mx-auto border border-white rounded-xl">
        <div className="relative flex flex-col bg-black/5" ref={containerRef}>
          {/* Mirror span for caret position calculation */}
          <span
            ref={mirrorRef}
            className="invisible absolute whitespace-pre font-mono font-semibold tracking-wide text-lg px-6 py-4"
            style={{
              fontSize: fontSize,
              left: 0,
              top: 0,
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          >
            {(props.value || "").slice(0, caretPos)}
          </span>
          {/* TextGenerateEffect at caret position */}
          {showEffect && (
            <div
              className="absolute z-20 pointer-events-none"
              style={{
                left: caretCoords.left + 22,
                top: caretCoords.top + 18,
              }}
            >
              <TextGenerateEffect
                key={effectKey}
                words="Generate Code</> or Text Seamlessly With NOVA...!"
                className="text-gray-300 tracking-wide font-light font-mono mb-0"
                fontSize={fontSize}
              />
            </div>
          )}
          <input
            ref={inputRef}
            type="text"
            className="font-mono font-semibold tracking-wide text-xl flex-1 bg-transparent outline-none text-white placeholder:text-gray-400 px-8 py-5 rounded-xl"
            value={props.value || ""}
            onChange={props.onChange}
            onFocus={e => {
              setIsFocused(true);
              setTimeout(updateCaret, 0);
              if (onFocus) onFocus(e); // Call parent onFocus if provided
            }}
            onBlur={() => setIsFocused(false)}
            onClick={updateCaret}
            onKeyUp={updateCaret}
            onSelect={updateCaret}
            style={{ fontSize }}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey && !props.disabled) {
                e.preventDefault();
                if (props.onSend) props.onSend(String(props.value || ""));
              }
            }}
            {...rest}
          />
          <div className="h-12 bg-black rounded-b-xl">
            <div className="absolute left-3 bottom-3 flex items-center gap-2">
              <label className="cursor-pointer rounded-lg p-2 bg-white/5 hover:bg-white/10">
                <input className="hidden" type="file" />
                <svg className="text-white/40 hover:text-white transition-colors" strokeLinejoin="round" strokeLinecap="round" strokeWidth={2} stroke="currentColor" fill="none" viewBox="0 0 24 24" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
                  <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
              </label>
              <button
                className="rounded-full flex items-center gap-2 px-1.5 py-1 border h-8 cursor-pointer bg-sky-500/15 hover:bg-sky-500/20 border-sky-400 text-sky-500 font-mono font-semibold tracking-wide text-sm"
                type="button"
                onClick={() => props.onSend && props.onSend(String(props.value || ""))}
                disabled={props.disabled}
              >
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  <svg className="text-sky-500" strokeLinejoin="round" strokeLinecap="round" strokeWidth={2} stroke="currentColor" fill="none" viewBox="0 0 24 24" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
                    <circle r={10} cy={12} cx={12} />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <span className="text-sm text-sky-500">Search</span>
              </button>
            </div>
            <div className="absolute right-3 bottom-3">
              <button className="rounded-lg p-2 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white cursor-pointer transition-colors font-mono font-semibold tracking-wide text-sm" type="button">
                <svg strokeLinejoin="round" strokeLinecap="round" strokeWidth={2} stroke="currentColor" fill="none" viewBox="0 0 24 24" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
