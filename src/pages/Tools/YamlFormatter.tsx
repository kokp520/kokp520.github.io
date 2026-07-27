import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Editor from '@monaco-editor/react';
import YAML from 'yaml';

export const YamlFormatter: React.FC = () => {
  const [inputYaml, setInputYaml] = useState<string>('');
  const [outputYaml, setOutputYaml] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [errorLine, setErrorLine] = useState<number | null>(null);
  const [fixMessage, setFixMessage] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<number>(15);
  
  // Keep track of the input editor instance so we can scroll/jump to line
  const editorRef = useRef<any>(null);

  // Helper to extract line number from YAML parse errors
  const extractErrorLine = (errMsg: string, rawText: string): number | null => {
    const lineMatch = errMsg.match(/at line\s+(\d+)/i) || errMsg.match(/line\s+(\d+)/i);
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

  // Helper to auto-fix common YAML formatting issues
  const repairYamlText = (rawStr: string): string => {
    let cleaned = rawStr;
    // 1. Replace tab characters with 2 spaces (YAML forbids tabs for indentation)
    cleaned = cleaned.replace(/\t/g, '  ');

    // 2. If user pasted raw JSON, convert JSON to YAML!
    const trimmed = cleaned.trim();
    if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
      try {
        const parsedJson = JSON.parse(cleaned);
        return YAML.stringify(parsedJson, { indent: 2 });
      } catch {
        // Not valid JSON, continue with normal YAML repair
      }
    }

    // 3. Remove trailing whitespace on lines
    cleaned = cleaned.split('\n').map(line => line.trimEnd()).join('\n');

    return cleaned;
  };

  const formatYaml = () => {
    setFixMessage(null);
    try {
      if (!inputYaml.trim()) {
        setOutputYaml('');
        setError(null);
        setErrorLine(null);
        return;
      }
      const parsed = YAML.parse(inputYaml);
      const formatted = YAML.stringify(parsed, { indent: 2 });
      setOutputYaml(formatted);
      setError(null);
      setErrorLine(null);
    } catch (e: any) {
      const msg = e.message || 'Invalid YAML syntax';
      setError(msg);
      setErrorLine(extractErrorLine(msg, inputYaml));
    }
  };

  const convertToJson = () => {
    setFixMessage(null);
    try {
      if (!inputYaml.trim()) {
        setOutputYaml('');
        setError(null);
        setErrorLine(null);
        return;
      }
      const parsed = YAML.parse(inputYaml);
      const jsonStr = JSON.stringify(parsed, null, 2);
      setOutputYaml(jsonStr);
      setError(null);
      setErrorLine(null);
    } catch (e: any) {
      const msg = e.message || 'Invalid YAML syntax';
      setError(msg);
      setErrorLine(extractErrorLine(msg, inputYaml));
    }
  };

  const autoFixYaml = () => {
    if (!inputYaml.trim()) return;
    try {
      const repaired = repairYamlText(inputYaml);
      const parsed = YAML.parse(repaired);
      const formatted = YAML.stringify(parsed, { indent: 2 });
      setInputYaml(repaired);
      setOutputYaml(formatted);
      setError(null);
      setErrorLine(null);
      setFixMessage('Successfully auto-repaired and formatted YAML!');
    } catch (e: any) {
      const msg = e.message || 'Unknown syntax error';
      setError(`Auto-fix attempted, but could not resolve all errors: ${msg}`);
      setErrorLine(extractErrorLine(msg, inputYaml));
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
    if (outputYaml) {
      navigator.clipboard.writeText(outputYaml);
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
        <title>YAML Formatter | adi's Toolbox</title>
        <meta name="description" content="Format, validate, repair, convert YAML to JSON, powered by Monaco Editor." />
      </Helmet>

      <div style={{ width: '100%', maxWidth: '1200px', zIndex: 1 }}>
        {/* Header Navigation */}
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
              color: '#FF8E3C',
              margin: 0,
              textShadow: '3px 3px 0px #000000'
            }}>
              YAML FORMATTER
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

        {/* Action Bar */}
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
            onClick={formatYaml}
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
            ⚡ FORMAT YAML
          </button>

          <button
            onClick={convertToJson}
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
            🔄 CONVERT TO JSON
          </button>

          <button
            onClick={autoFixYaml}
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
            🛠️ AUTO-FIX YAML
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
            gap: '8px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div>✖ YAML PARSE ERROR: {error}</div>
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
            <div style={{ fontFamily: "'VT323', monospace", fontSize: '1rem', color: '#A7A9BE' }}>
              Tip: Click <strong>"🛠️ AUTO-FIX YAML"</strong> above to auto-convert invalid tabs to 2 spaces or convert JSON to YAML!
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
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.8rem', color: '#FF8E3C' }}>INPUT YAML</span>
              <button
                onClick={() => { setInputYaml(''); setOutputYaml(''); setError(null); setErrorLine(null); setFixMessage(null); }}
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
                language="yaml"
                theme="vs-dark"
                value={inputYaml}
                onChange={(value) => setInputYaml(value || '')}
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
                language="yaml"
                theme="vs-dark"
                value={outputYaml}
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
