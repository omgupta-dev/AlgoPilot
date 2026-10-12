import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { RotateCcw, Copy, Check, Code, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '../../types';

interface CodeEditorProps {
  language: SupportedLanguage;
  code: string;
  onChange: (value: string) => void;
  onReset: () => void;
  isDark?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  code,
  onChange,
  onReset,
  isDark = true
}) => {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<number>(14);
  const [editorLoadFailed, setEditorLoadFailed] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const monacoLang = language === 'cpp' ? 'cpp' : language === 'python' ? 'python' : 'java';

  return (
    <div className="flex flex-col h-full bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden shadow-inner">
      {/* Editor Controls Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono text-[11px]">
            <Code className="w-3.5 h-3.5" />
            <span>{language.toUpperCase()}</span>
          </div>
          <span className="text-slate-500 text-[11px] hidden sm:inline">Monaco Editor Sandbox</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Font Size Selector */}
          <div className="flex items-center gap-1 text-slate-400">
            <span className="text-[11px]">Size:</span>
            <select
              value={fontSize}
              onChange={e => setFontSize(Number(e.target.value))}
              className="bg-slate-800 text-slate-200 rounded px-1.5 py-0.5 border border-slate-700 text-[11px] focus:outline-none"
            >
              <option value={12}>12px</option>
              <option value={14}>14px</option>
              <option value={16}>16px</option>
            </select>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            title="Copy code"
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Reset Code Button */}
          <button
            onClick={onReset}
            title="Reset to starter template"
            className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-700/60"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="text-[11px]">Reset</span>
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="flex-1 min-h-[300px] relative">
        {!editorLoadFailed ? (
          <Editor
            height="100%"
            language={monacoLang}
            value={code}
            theme={isDark ? 'vs-dark' : 'light'}
            onChange={value => onChange(value || '')}
            options={{
              fontSize,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 4,
              wordWrap: 'on',
              lineNumbers: 'on',
              folding: true,
              fontFamily: '"JetBrains Mono", Consolas, monospace',
              padding: { top: 12, bottom: 12 }
            }}
            loading={
              <div className="flex items-center justify-center h-full text-slate-400 text-xs gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-indigo-400" />
                <span>Loading Monaco Editor...</span>
              </div>
            }
          />
        ) : (
          /* Fallback Textarea if Monaco CDN is blocked */
          <textarea
            value={code}
            onChange={e => onChange(e.target.value)}
            className="w-full h-full p-4 bg-slate-950 font-mono text-sm text-slate-200 resize-none focus:outline-none"
            spellCheck={false}
          />
        )}
      </div>
    </div>
  );
};
