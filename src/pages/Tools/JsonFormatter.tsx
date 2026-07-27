import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface StructureDiagnostic {
  isValid: boolean;
  message?: string;
  unmatchedLines?: { line: number; col: number; char: string; desc: string }[];
  errorLine?: number;
}

interface CodeEditorProps {
  title: string;
  titleColor: string;
  value: string;
  onChange?: (val: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  fontSize: number;
  height?: string;
  textColor: string;
  extraHeaderButtons?: React.ReactNode;
  editorRef?: React.RefObject<HTMLTextAreaElement>;
}

const CodeEditorWithLineNumbers: React.FC<CodeEditorProps> = ({
  title,
  titleColor,
  value,
  onChange,
  readOnly = false,
  placeholder,
  fontSize,
  height = '300px',
  textColor,
  extraHeaderButtons,
  editorRef
}) => {
  const localRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = editorRef || localRef;
  const gutterRef = useRef<HTMLDivElement>(null);
  const [jumpLine, setJumpLine] = useState<string>('');

  const lines = value.split('\n');
  const lineCount = Math.max(1, lines.length);

  const handleScroll = () => {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const jumpToLineNum = (targetLineNum: number) => {
    if (!textareaRef.current) return;
    const clampedLine = Math.max(1, Math.min(targetLineNum, lineCount));
    
    // Calculate character position for line start
    let charPos = 0;
    for (let i = 0; i < clampedLine - 1; i++) {
      charPos += lines[i].length + 1; // +1 for \n
    }

    const targetLineTextLength = lines[clampedLine - 1] ? lines[clampedLine - 1].length : 0;

    textareaRef.current.focus();
    textareaRef.current.setSelectionRange(charPos, charPos + targetLineTextLength);

    // Scroll to position (lineHeight is approximately fontSize * 1.4)
    const lineHeight = fontSize * 1.4;
    textareaRef.current.scrollTop = Math.max(0, (clampedLine - 3) * lineHeight);
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpLine, 10);
    if (!isNaN(num)) {
      jumpToLineNum(num);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {/* Editor Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.8rem', color: titleColor }}>
            {title}
          </div>
          <span style={{ fontSize: '0.9rem', color: '#A7A9BE', fontFamily: "'VT323', monospace" }}>
            [{lineCount} lines]
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Jump to Line Form */}
          <form onSubmit={handleJumpSubmit} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.55rem', color: '#A7A9BE' }}>
              LINE:
            </span>
            <input
              type="number"
              min="1"
              max={lineCount}
              value={jumpLine}
              onChange={(e) => setJumpLine(e.target.value)}
              placeholder="Line #"
              style={{
                width: '60px',
                background: '#16161A',
                color: '#FFFFFE',
                border: '1px solid #000000',
                padding: '2px 6px',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                textAlign: 'center',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                background: '#2A2A3B',
                color: '#FF8E3C',
                border: '1px solid #000000',
                padding: '2px 8px',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.55rem',
                cursor: 'pointer'
              }}
            >
              GO
            </button>
          </form>

          {extraHeaderButtons}
        </div>
      </div>

      {/* Editor Body with Gutter */}
      <div style={{
        display: 'flex',
        width: '100%',
        height,
        background: '#16161A',
        border: '4px solid #000000',
        boxShadow: 'inset 4px 4px 0px rgba(0,0,0,0.5)',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          style={{
            width: `${Math.max(40, String(lineCount).length * 10 + 20)}px`,
            background: '#0F0E17',
            borderRight: '2px solid #242629',
            padding: '16px 8px 16px 0',
            textAlign: 'right',
            color: '#666',
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: `${fontSize}px`,
            lineHeight: '1.4',
            userSelect: 'none',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1} style={{ cursor: 'pointer' }} onClick={() => jumpToLineNum(i + 1)}>
              {i + 1}
            </div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          onScroll={handleScroll}
          readOnly={readOnly}
          placeholder={placeholder}
          style={{
            flex: 1,
            height: '100%',
            background: 'transparent',
            color: textColor,
            border: 'none',
            padding: '16px',
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: `${fontSize}px`,
            lineHeight: '1.4',
            resize: 'none',
            outline: 'none',
            boxSizing: 'border-box',
            whiteSpace: 'pre',
            overflowY: 'scroll'
          }}
        />
      </div>
    </div>
  );
};

export const JsonFormatter: React.FC = () => {
  const [inputJson, setInputJson] = useState<string>('');
  const [outputJson, setOutputJson] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [errorLine, setErrorLine] = useState<number | null>(null);
  const [diagnostic, setDiagnostic] = useState<StructureDiagnostic | null>(null);
  const [fixMessage, setFixMessage] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<number>(14);

  // Find & Replace state
  const [showFindReplace, setShowFindReplace] = useState<boolean>(false);
  const [findText, setFindText] = useState<string>('');
  const [replaceText, setReplaceText] = useState<string>('');
  const [matchCount, setMatchCount] = useState<number | null>(null);

  const findInputRef = useRef<HTMLInputElement>(null);
  const inputTextAreaRef = useRef<HTMLTextAreaElement>(null);

  // Keyboard shortcut for Ctrl+F / Cmd+F or Ctrl+H / Cmd+H
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'f' || e.key.toLowerCase() === 'h')) {
        e.preventDefault();
        setShowFindReplace(true);
        setTimeout(() => {
          findInputRef.current?.focus();
          findInputRef.current?.select();
        }, 50);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update match count when findText changes
  useEffect(() => {
    if (!findText) {
      setMatchCount(null);
      return;
    }
    try {
      const regex = new RegExp(escapeRegExp(findText), 'g');
      const inputMatches = (inputJson.match(regex) || []).length;
      const outputMatches = (outputJson.match(regex) || []).length;
      setMatchCount(inputMatches + outputMatches);
    } catch {
      setMatchCount(null);
    }
  }, [findText, inputJson, outputJson]);

  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // Diagnostic tool to analyze unbalanced brackets/braces
  const diagnoseJsonStructure = (rawStr: string): StructureDiagnostic => {
    const stack: { char: string; line: number; col: number; context: string }[] = [];
    let inString = false;
    let isEscaped = false;
    let line = 1;
    let col = 0;

    const lines = rawStr.split('\n');

    for (let i = 0; i < rawStr.length; i++) {
      const ch = rawStr[i];

      if (ch === '\n') {
        line++;
        col = 0;
        continue;
      }
      col++;

      if (inString) {
        if (isEscaped) {
          isEscaped = false;
        } else if (ch === '\\') {
          isEscaped = true;
        } else if (ch === '"') {
          inString = false;
        }
        continue;
      }

      if (ch === '"') {
        inString = true;
        continue;
      }

      if (ch === '{' || ch === '[') {
        const lineText = lines[line - 1]?.trim() || '';
        stack.push({ char: ch, line, col, context: lineText.slice(0, 45) });
      } else if (ch === '}' || ch === ']') {
        const expectedChar = ch === '}' ? '{' : '[';
        if (stack.length === 0) {
          return {
            isValid: false,
            message: `Unexpected closing '${ch}' at Line ${line}, Column ${col} (no matching '${expectedChar}' was opened).`,
            unmatchedLines: [{ line, col, char: ch, desc: `Extra closing '${ch}'` }],
            errorLine: line
          };
        }

        const top = stack[stack.length - 1];
        if (top.char !== expectedChar) {
          return {
            isValid: false,
            message: `Mismatched bracket at Line ${line}: encountered '${ch}', but expected '${top.char === '{' ? '}' : ']'}' to close '${top.char}' opened at Line ${top.line} ("${top.context}").`,
            unmatchedLines: [
              { line: top.line, col: top.col, char: top.char, desc: `Unclosed '${top.char}' (${top.context})` },
              { line, col, char: ch, desc: `Mismatched '${ch}'` }
            ],
            errorLine: line
          };
        }

        stack.pop();
      }
    }

    if (inString) {
      return {
        isValid: false,
        message: `Unterminated string starting around Line ${line}. Missing closing double quote '"'.`,
        errorLine: line
      };
    }

    if (stack.length > 0) {
      const unclosed = stack.map(s => ({
        line: s.line,
        col: s.col,
        char: s.char,
        desc: `Unclosed '${s.char}' opened at Line ${s.line}: "${s.context}"`
      }));

      const top = stack[stack.length - 1];
      return {
        isValid: false,
        message: `Missing closing bracket(s)! Unclosed '${top.char}' opened at Line ${top.line}: "${top.context}". Total unclosed elements: ${stack.length}.`,
        unmatchedLines: unclosed,
        errorLine: top.line
      };
    }

    return { isValid: true };
  };

  // Helper to extract line number from JSON parse error message
  const extractErrorLine = (errMsg: string, rawText: string): number | null => {
    const lineMatch = errMsg.match(/line\s+(\d+)/i);
    if (lineMatch) {
      return parseInt(lineMatch[1], 10);
    }

    const posMatch = errMsg.match(/position\s+(\d+)/i);
    if (posMatch) {
      const pos = parseInt(posMatch[1], 10);
      const textUpToPos = rawText.slice(0, pos);
      return textUpToPos.split('\n').length;
    }

    return null;
  };

  // Helper to repair common JSON syntax errors
  const repairJsonText = (rawStr: string): string => {
    let cleaned = rawStr;
    cleaned = cleaned.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
    cleaned = cleaned.replace(/\/\/.*/g, '');
    cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');
    cleaned = cleaned.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '"$1"');
    cleaned = cleaned.replace(/([{,]\s*)([a-zA-Z0-9_$]+)\s*:/g, '$1"$2":');
    cleaned = cleaned.replace(/\bNone\b/g, 'null')
                     .replace(/\bTrue\b/g, 'true')
                     .replace(/\bFalse\b/g, 'false')
                     .replace(/\bundefined\b/g, 'null')
                     .replace(/\bNaN\b/g, 'null');
    cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');

    // Structural repair: auto-close unclosed brackets/braces if any remain
    const diag = diagnoseJsonStructure(cleaned);
    if (!diag.isValid && diag.unmatchedLines && diag.unmatchedLines.length > 0) {
      // Append missing closing brackets in reverse order
      let closingSuffix = '';
      for (let i = diag.unmatchedLines.length - 1; i >= 0; i--) {
        const item = diag.unmatchedLines[i];
        if (item.char === '{') closingSuffix += '\n}';
        if (item.char === '[') closingSuffix += '\n]';
      }
      cleaned += closingSuffix;
    }

    return cleaned;
  };

  const formatJson = () => {
    setFixMessage(null);
    setDiagnostic(null);
    try {
      if (!inputJson.trim()) {
        setOutputJson('');
        setError(null);
        setErrorLine(null);
        return;
      }
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutputJson(formatted);
      setError(null);
      setErrorLine(null);
    } catch (e: any) {
      const msg = e.message || 'Invalid JSON syntax';
      setError(msg);
      setErrorLine(extractErrorLine(msg, inputJson));
      setDiagnostic(diagnoseJsonStructure(inputJson));
    }
  };

  const minifyJson = () => {
    setFixMessage(null);
    setDiagnostic(null);
    try {
      if (!inputJson.trim()) {
        setOutputJson('');
        setError(null);
        setErrorLine(null);
        return;
      }
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setOutputJson(minified);
      setError(null);
      setErrorLine(null);
    } catch (e: any) {
      const msg = e.message || 'Invalid JSON syntax';
      setError(msg);
      setErrorLine(extractErrorLine(msg, inputJson));
      setDiagnostic(diagnoseJsonStructure(inputJson));
    }
  };

  const autoFixJson = () => {
    if (!inputJson.trim()) return;
    try {
      const repairedText = repairJsonText(inputJson);
      const parsed = JSON.parse(repairedText);
      const formatted = JSON.stringify(parsed, null, 2);
      setInputJson(repairedText);
      setOutputJson(formatted);
      setError(null);
      setErrorLine(null);
      setDiagnostic(null);
      setFixMessage('Successfully auto-repaired and formatted JSON syntax & structure!');
    } catch (e: any) {
      const msg = e.message || 'Unknown syntax error';
      setError(`Auto-fix attempted, but could not resolve all errors: ${msg}`);
      setErrorLine(extractErrorLine(msg, inputJson));
      setDiagnostic(diagnoseJsonStructure(inputJson));
      setFixMessage(null);
    }
  };

  const jumpToInputLine = (targetLine: number) => {
    if (!inputTextAreaRef.current) return;
    const lines = inputJson.split('\n');
    const clampedLine = Math.max(1, Math.min(targetLine, lines.length));
    
    let charPos = 0;
    for (let i = 0; i < clampedLine - 1; i++) {
      charPos += lines[i].length + 1;
    }

    const targetLineTextLength = lines[clampedLine - 1] ? lines[clampedLine - 1].length : 0;

    inputTextAreaRef.current.focus();
    inputTextAreaRef.current.setSelectionRange(charPos, charPos + targetLineTextLength);

    const lineHeight = fontSize * 1.4;
    inputTextAreaRef.current.scrollTop = Math.max(0, (clampedLine - 3) * lineHeight);
  };

  const copyToClipboard = () => {
    if (outputJson) {
      navigator.clipboard.writeText(outputJson);
      alert('Copied output to clipboard!');
    }
  };

  const handleReplaceAll = () => {
    if (!findText) return;
    const regex = new RegExp(escapeRegExp(findText), 'g');
    
    const newInput = inputJson.replace(regex, replaceText);
    setInputJson(newInput);

    if (outputJson) {
      const newOutput = outputJson.replace(regex, replaceText);
      setOutputJson(newOutput);
    }
  };

  return (
    <div style={{
      fontFamily: "'VT323', 'DotGothic16', monospace",
      background: '#0F0E17',
      color: '#FFFFFE',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '40px 20px',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      <Helmet>
        <title>JSON Formatter | adi's Toolbox</title>
        <meta name="description" content="Format, validate, repair, line jump, diagnose structure, search, and replace JSON strings easily." />
      </Helmet>

      <div style={{ width: '100%', maxWidth: '1100px', zIndex: 1 }}>
        {/* Header and Controls */}
        <div style={{
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link 
              to="/tools" 
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.65rem',
                color: '#FF8E3C',
                textDecoration: 'none',
                background: '#2A2A3B',
                padding: '10px 16px',
                border: '3px solid #000000',
                boxShadow: '3px 3px 0px #000000',
                imageRendering: 'pixelated'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FF8E3C';
                e.currentTarget.style.color = '#0F0E17';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2A2A3B';
                e.currentTarget.style.color = '#FF8E3C';
              }}
            >
              ◄ BACK TO TOOLBOX
            </Link>

            <h1 style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '1.4rem',
              color: '#2CB67D',
              margin: 0,
              textShadow: '3px 3px 0px #000000'
            }}>
              JSON FORMATTER
            </h1>
          </div>

          {/* Top Tool Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Font Zoom Controls */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#16161A',
              border: '2px solid #000',
              padding: '4px 8px',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.65rem'
            }}>
              <span style={{ color: '#A7A9BE' }}>ZOOM:</span>
              <button
                onClick={() => setFontSize((prev) => Math.max(10, prev - 2))}
                style={{
                  background: '#2A2A3B',
                  color: '#FFFFFE',
                  border: '1px solid #000',
                  padding: '2px 6px',
                  cursor: 'pointer'
                }}
                title="Decrease font size"
              >-</button>
              <span style={{ color: '#FF8E3C', minWidth: '40px', textAlign: 'center' }}>{fontSize}px</span>
              <button
                onClick={() => setFontSize((prev) => Math.min(32, prev + 2))}
                style={{
                  background: '#2A2A3B',
                  color: '#FFFFFE',
                  border: '1px solid #000',
                  padding: '2px 6px',
                  cursor: 'pointer'
                }}
                title="Increase font size"
              >+</button>
              <button
                onClick={() => setFontSize(14)}
                style={{
                  background: '#2A2A3B',
                  color: '#A7A9BE',
                  border: '1px solid #000',
                  padding: '2px 6px',
                  cursor: 'pointer',
                  marginLeft: '4px'
                }}
              >RESET</button>
            </div>

            {/* Find & Replace Toggle Button */}
            <button
              onClick={() => {
                setShowFindReplace(!showFindReplace);
                if (!showFindReplace) {
                  setTimeout(() => findInputRef.current?.focus(), 50);
                }
              }}
              style={{
                background: showFindReplace ? '#2CB67D' : '#2A2A3B',
                color: showFindReplace ? '#0F0E17' : '#FFFFFE',
                border: '2px solid #000000',
                padding: '6px 12px',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.65rem',
                cursor: 'pointer',
                boxShadow: '2px 2px 0px #000000'
              }}
            >
              🔍 FIND & REPLACE {showFindReplace ? '▲' : '▼'}
            </button>
          </div>
        </div>

        {/* Find & Replace Panel */}
        {showFindReplace && (
          <div style={{
            background: '#16161A',
            border: '3px solid #2CB67D',
            padding: '16px',
            marginBottom: '20px',
            boxShadow: '4px 4px 0px #000000',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.7rem',
              color: '#2CB67D'
            }}>
              <span>FIND & REPLACE (CTRL+F / CMD+F)</span>
              <button
                onClick={() => setShowFindReplace(false)}
                style={{
                  background: 'transparent',
                  color: '#FF3B30',
                  border: 'none',
                  fontFamily: "'Press Start 2P', monospace",
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >✕ CLOSE</button>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1 1 280px' }}>
                <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.65rem', color: '#FF8E3C', width: '65px' }}>FIND:</span>
                <input
                  ref={findInputRef}
                  type="text"
                  value={findText}
                  onChange={(e) => setFindText(e.target.value)}
                  placeholder="Text or string to search..."
                  style={{
                    flex: 1,
                    background: '#0F0E17',
                    color: '#FFFFFE',
                    border: '2px solid #000000',
                    padding: '8px 12px',
                    fontFamily: 'monospace',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1 1 280px' }}>
                <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.65rem', color: '#2CB67D', width: '65px' }}>REPLACE:</span>
                <input
                  type="text"
                  value={replaceText}
                  onChange={(e) => setReplaceText(e.target.value)}
                  placeholder="Replacement text..."
                  style={{
                    flex: 1,
                    background: '#0F0E17',
                    color: '#FFFFFE',
                    border: '2px solid #000000',
                    padding: '8px 12px',
                    fontFamily: 'monospace',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              <button
                onClick={handleReplaceAll}
                disabled={!findText}
                style={{
                  background: findText ? '#FF8E3C' : '#383A3F',
                  color: '#0F0E17',
                  border: '2px solid #000000',
                  padding: '8px 16px',
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '0.65rem',
                  cursor: findText ? 'pointer' : 'not-allowed',
                  boxShadow: '2px 2px 0px #000000'
                }}
              >
                REPLACE ALL
              </button>
            </div>

            {matchCount !== null && (
              <div style={{ fontFamily: "'VT323', monospace", fontSize: '1.1rem', color: '#A7A9BE' }}>
                Found <span style={{ color: '#FF8E3C', fontWeight: 'bold' }}>{matchCount}</span> occurrence(s) in editor.
              </div>
            )}
          </div>
        )}

        {/* Stacked Layout: Top / Bottom */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Panel: INPUT JSON with Line Numbers */}
          <CodeEditorWithLineNumbers
            title="INPUT JSON"
            titleColor="#FF8E3C"
            value={inputJson}
            onChange={(val) => setInputJson(val)}
            placeholder="Paste your raw or invalid JSON string here..."
            fontSize={fontSize}
            height="320px"
            textColor="#FFFFFE"
            editorRef={inputTextAreaRef}
            extraHeaderButtons={
              <button
                onClick={() => { setInputJson(''); setOutputJson(''); setError(null); setErrorLine(null); setDiagnostic(null); setFixMessage(null); }}
                style={{
                  background: '#2A2A3B',
                  color: '#A7A9BE',
                  border: '1px solid #000',
                  padding: '2px 8px',
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '0.55rem',
                  cursor: 'pointer'
                }}
              >
                CLEAR
              </button>
            }
          />

          {/* Middle Action Bar */}
          <div style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            flexWrap: 'wrap',
            background: '#16161A',
            padding: '12px 16px',
            border: '3px solid #000000',
            boxShadow: '3px 3px 0px #000000'
          }}>
            <button
              onClick={formatJson}
              style={{
                background: '#FF8E3C',
                color: '#0F0E17',
                border: '3px solid #000000',
                padding: '10px 20px',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: '3px 3px 0px #000000',
                transition: 'transform 0.1s'
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translate(2px, 2px)';
                e.currentTarget.style.boxShadow = '1px 1px 0px #000000';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translate(0px, 0px)';
                e.currentTarget.style.boxShadow = '3px 3px 0px #000000';
              }}
            >
              ⚡ FORMAT / BEAUTIFY
            </button>

            <button
              onClick={minifyJson}
              style={{
                background: '#2CB67D',
                color: '#0F0E17',
                border: '3px solid #000000',
                padding: '10px 20px',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: '3px 3px 0px #000000',
                transition: 'transform 0.1s'
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translate(2px, 2px)';
                e.currentTarget.style.boxShadow = '1px 1px 0px #000000';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translate(0px, 0px)';
                e.currentTarget.style.boxShadow = '3px 3px 0px #000000';
              }}
            >
              📦 MINIFY
            </button>

            <button
              onClick={autoFixJson}
              style={{
                background: '#E53170',
                color: '#FFFFFE',
                border: '3px solid #000000',
                padding: '10px 20px',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: '3px 3px 0px #000000',
                transition: 'transform 0.1s'
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translate(2px, 2px)';
                e.currentTarget.style.boxShadow = '1px 1px 0px #000000';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translate(0px, 0px)';
                e.currentTarget.style.boxShadow = '3px 3px 0px #000000';
              }}
            >
              🛠️ AUTO-FIX JSON
            </button>
          </div>

          {/* Status / Messages */}
          {fixMessage && (
            <div style={{
              color: '#2CB67D',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.65rem',
              background: 'rgba(44, 182, 125, 0.15)',
              padding: '10px 16px',
              border: '2px solid #2CB67D'
            }}>
              ✓ {fixMessage}
            </div>
          )}

          {error && (
            <div style={{
              color: '#FF3B30',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.65rem',
              background: 'rgba(255, 59, 48, 0.15)',
              padding: '12px 16px',
              border: '2px solid #FF3B30',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div>✖ PARSE ERROR: {error}</div>
                {errorLine && (
                  <button
                    onClick={() => jumpToInputLine(errorLine)}
                    style={{
                      background: '#FF3B30',
                      color: '#FFFFFE',
                      border: '1px solid #000000',
                      padding: '4px 10px',
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: '0.55rem',
                      cursor: 'pointer',
                      boxShadow: '2px 2px 0px #000000'
                    }}
                  >
                    🎯 JUMP TO LINE {errorLine}
                  </button>
                )}
              </div>

              {/* Structural Diagnostic info for Unbalanced Brackets / Braces */}
              {diagnostic && !diagnostic.isValid && (
                <div style={{
                  background: '#16161A',
                  border: '1px dashed #FF8E3C',
                  padding: '10px 12px',
                  color: '#FF8E3C',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.6rem' }}>
                    🔍 BRACKET / STRUCTURAL ANALYSIS:
                  </div>
                  <div style={{ fontFamily: "'VT323', monospace", fontSize: '1.1rem', color: '#FFFFFE' }}>
                    {diagnostic.message}
                  </div>

                  {diagnostic.unmatchedLines && diagnostic.unmatchedLines.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                      {diagnostic.unmatchedLines.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => jumpToInputLine(item.line)}
                          style={{
                            background: '#2A2A3B',
                            color: '#FF8E3C',
                            border: '1px solid #FF8E3C',
                            padding: '4px 8px',
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: '0.55rem',
                            cursor: 'pointer'
                          }}
                        >
                          🎯 JUMP TO LINE {item.line} ({item.char})
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div style={{ fontFamily: "'VT323', monospace", fontSize: '1rem', color: '#A7A9BE' }}>
                Tip: Click <strong>"🛠️ AUTO-FIX JSON"</strong> above to attempt automatic repair of unclosed braces/brackets, missing quotes, single quotes, and trailing commas!
              </div>
            </div>
          )}

          {/* Bottom Panel: OUTPUT JSON with Line Numbers */}
          <CodeEditorWithLineNumbers
            title="OUTPUT JSON"
            titleColor="#2CB67D"
            value={outputJson}
            readOnly={true}
            placeholder="Formatted JSON will appear here..."
            fontSize={fontSize}
            height="360px"
            textColor="#2CB67D"
            extraHeaderButtons={
              outputJson ? (
                <button
                  onClick={copyToClipboard}
                  style={{
                    background: '#2CB67D',
                    color: '#0F0E17',
                    border: '2px solid #000000',
                    padding: '4px 12px',
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '0.65rem',
                    cursor: 'pointer',
                    boxShadow: '2px 2px 0px #000000'
                  }}
                >
                  📋 COPY RESULT
                </button>
              ) : null
            }
          />
        </div>
      </div>
    </div>
  );
};
