import React from 'react';
import { Award, CheckCircle2, TrendingUp, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { sampleFeedbackReportMock } from '../../data/interviewData';
import { Link } from 'react-router-dom';

interface FeedbackReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
}

export const FeedbackReportModal: React.FC<FeedbackReportModalProps> = ({
  isOpen,
  onClose,
  onRestart
}) => {
  const report = sampleFeedbackReportMock;

  const verdictColor = {
    'Strong Hire': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    'Lean Hire': 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    'Needs Practice': 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    'Not Ready': 'text-rose-400 bg-rose-500/10 border-rose-500/30'
  }[report.verdict];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mock Interview Evaluation Report" maxWidth="2xl">
      <div className="space-y-6 text-slate-200 text-sm">
        {/* Banner with Overall Score and Verdict */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-1">
            <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
              Simulation Assessment Result
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-white">{report.overallScore}</span>
              <span className="text-slate-500 text-sm">/ 10.0</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${verdictColor}`}>
                {report.verdict}
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 max-w-xs">
            ⚡ <strong>Phase 1 Demonstration:</strong> Simulated multi-dimensional evaluation rubric. No audio or automated judging claims.
          </div>
        </div>

        {/* Categories Breakdown */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Competency Breakdown
          </h4>
          <div className="space-y-3">
            {report.categories.map((cat, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">{cat.name}</span>
                  <span className="font-mono text-indigo-400 font-bold">
                    {cat.score} / {cat.maxScore}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    style={{ width: `${(cat.score / cat.maxScore) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 pt-0.5">{cat.feedback}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Key Strengths</span>
            </div>
            <ul className="text-xs space-y-1.5 text-slate-300 list-disc list-inside">
              {report.strengths.map((str, i) => (
                <li key={i}>{str}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Target Improvements</span>
            </div>
            <ul className="text-xs space-y-1.5 text-slate-300 list-disc list-inside">
              {report.improvements.map((imp, i) => (
                <li key={i}>{imp}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technical Summary */}
        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <span className="font-semibold text-slate-200 block mb-1">Interviewer Summary:</span>
          {report.technicalSummary}
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800 gap-3">
          <Button variant="outline" size="sm" onClick={onRestart} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
            Start New Session
          </Button>

          <Link to="/problems">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Practice Recommended Problems
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
