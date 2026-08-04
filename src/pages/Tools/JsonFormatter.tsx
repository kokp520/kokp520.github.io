import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Editor from '@monaco-editor/react';

interface StructureDiagnostic {
  isValid: boolean;
  message?: string;
  unmatchedLines?: { line: number; col: number; char: string; desc: string }[];
  errorLine?: number;
}

export const JsonFormatter: React.FC = () => {
  const [inputJson, setInputJson] = useState<string>('');
  const [outputJson, setOutputJson] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [errorLine, setErrorLine] = useState<number | null>(null);
  const [diagnostic, setDiagnostic] = useState<StructureDiagnostic | null>(null);
  const [fixMessage, setFixMessage] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<number>(15);
  
  // Keep track of the input editor instance so we can scroll/jump to line
  const editorRef = useRef<any>(null);

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
    if (editorRef.current) {
      editorRef.current.revealLineInCenter(targetLine);
      editorRef.current.setPosition({ lineNumber: targetLine, column: 1 });
      editorRef.current.focus();
    }
  };

  const copyToClipboard = () => {
    if (outputJson) {
      navigator.clipboard.writeText(outputJson);
      alert('Copied output to clipboard!');
    }
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
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

      <div style={{ width: '100%', maxWidth: '1200px', zIndex: 1 }}>
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

            <h1 
              className="game-color-shift"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '1.2rem',
                margin: 0
              }}
            >
              JSON FORMATTER
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ fontFamily: "'VT323', monospace", color: '#A7A9BE', fontSize: '1.1rem' }}>
              Powered by Monaco Editor (Press <kbd style={{ background: '#2A2A3B', padding: '2px 6px', border: '1px solid #000' }}>Ctrl+F</kbd> inside editor to search)
            </div>

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
              <span style={{ color: '#2CB67D', minWidth: '40px', textAlign: 'center' }}>{fontSize}px</span>
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
                onClick={() => setFontSize(15)}
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
          </div>
        </div>

        {/* Middle Action Bar */}
        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          flexWrap: 'wrap',
          background: '#16161A',
          padding: '12px 16px',
          border: '4px solid #000000',
          borderBottom: 'none',
          boxShadow: '4px 0px 0px rgba(0,0,0,0.5)',
          justifyContent: 'center'
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
            border: '4px solid #000',
            borderTop: '2px solid #2CB67D',
            borderBottom: 'none'
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
            border: '4px solid #000',
            borderTop: '2px solid #FF3B30',
            borderBottom: 'none',
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

        {/* Side-by-side Editors layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          background: '#000',
          border: '4px solid #000000',
          boxShadow: '6px 6px 0px rgba(0,0,0,0.8)'
        }}>
          {/* INPUT EDITOR */}
          <div style={{ borderRight: '4px solid #000' }}>
            <div style={{
              background: '#16161A',
              padding: '10px 16px',
              borderBottom: '2px solid #000',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.8rem', color: '#FF8E3C' }}>INPUT JSON</span>
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
            </div>
            <div style={{ height: '500px', width: '100%' }}>
              <Editor
                height="100%"
                language="json"
                theme="vs-dark"
                value={inputJson}
                onChange={(value) => setInputJson(value || '')}
                onMount={handleEditorDidMount}
                options={{
                  minimap: { enabled: false },
                  fontSize: fontSize,
                  wordWrap: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  insertSpaces: true
                }}
              />
            </div>
          </div>

          {/* OUTPUT EDITOR */}
          <div>
            <div style={{
              background: '#16161A',
              padding: '10px 16px',
              borderBottom: '2px solid #000',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.8rem', color: '#2CB67D' }}>OUTPUT</span>
              <button
                onClick={copyToClipboard}
                style={{
                  background: '#2CB67D',
                  color: '#0F0E17',
                  border: '1px solid #000',
                  padding: '2px 8px',
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '0.55rem',
                  cursor: 'pointer',
                  boxShadow: '1px 1px 0px #000'
                }}
              >
                📋 COPY
              </button>
            </div>
            <div style={{ height: '500px', width: '100%' }}>
              <Editor
                height="100%"
                language="json"
                theme="vs-dark"
                value={outputJson}
                options={{
                  minimap: { enabled: false },
                  fontSize: fontSize,
                  wordWrap: 'on',
                  readOnly: true,
                  scrollBeyondLastLine: false,
                  automaticLayout: true
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
