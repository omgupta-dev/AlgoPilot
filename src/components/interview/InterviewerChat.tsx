import React, { useState } from 'react';
import { Send, Bot, User, HelpCircle, Lightbulb } from 'lucide-react';
import { InterviewMessage } from '../../types';

interface InterviewerChatProps {
  messages: InterviewMessage[];
  onSendMessage: (text: string) => void;
  onRequestHint: () => void;
  onAskClarification: () => void;
}

export const InterviewerChat: React.FC<InterviewerChatProps> = ({
  messages,
  onSendMessage,
  onRequestHint,
  onAskClarification
}) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-200">AI Technical Interviewer</span>
        </div>
        <span className="text-[11px] text-slate-400">Live Dialogue</span>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.sender === 'candidate' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.sender === 'candidate'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-purple-600/30 text-purple-300 border border-purple-500/40'
              }`}
            >
              {msg.sender === 'candidate' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                msg.sender === 'candidate'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-slate-800/80 text-slate-200 rounded-tl-none border border-slate-700/60'
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-[10px] text-slate-400 mt-1 block opacity-70">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px]">
        <button
          onClick={onRequestHint}
          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/50 whitespace-nowrap transition-colors"
        >
          <Lightbulb className="w-3 h-3 text-amber-400" />
          <span>Ask for Hint</span>
        </button>
        <button
          onClick={onAskClarification}
          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/50 whitespace-nowrap transition-colors"
        >
          <HelpCircle className="w-3 h-3 text-cyan-400" />
          <span>Clarify Constraints</span>
        </button>
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="p-3 bg-slate-950/90 border-t border-slate-800 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Speak to interviewer (e.g., 'I am thinking of using a two-pointer approach...')"
          className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
