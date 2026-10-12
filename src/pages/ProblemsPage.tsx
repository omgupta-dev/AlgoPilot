import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Bookmark,
  CheckCircle2,
  Clock,
  ArrowUpDown,
  Terminal,
  ExternalLink,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { mockProblems } from '../data/problemsData';
import { DSATopic, Difficulty, Problem } from '../types';
import { storageService } from '../services/storageService';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Modal } from '../components/common/Modal';

const ALL_TOPICS: DSATopic[] = [
  'Arrays',
  'Strings',
  'Linked Lists',
  'Stacks',
  'Queues',
  'Hashing',
  'Binary Search',
  'Trees',
  'Graphs',
  'Dynamic Programming',
  'Greedy Algorithms',
  'Backtracking'
];

export const ProblemsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialTopic = searchParams.get('topic') || 'All';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedTopic, setSelectedTopic] = useState<string>(initialTopic);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'title' | 'difficulty' | 'acceptanceRate'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Bookmarks and Solved status from storage
  const [bookmarks, setBookmarks] = useState<string[]>(() => storageService.getBookmarks());
  const [solvedIds, setSolvedIds] = useState<string[]>(() => storageService.getSolvedProblemIds());

  // Quick Problem Preview Modal
  const [previewProblem, setPreviewProblem] = useState<Problem | null>(null);

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = storageService.toggleBookmark(id);
    setBookmarks(updated);
  };

  // Filter and sort problems
  const filteredProblems = useMemo(() => {
    return mockProblems.filter(prob => {
      // Search title, tags, description
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = prob.title.toLowerCase().includes(q);
        const matchesTags = prob.tags.some(t => t.toLowerCase().includes(q));
        const matchesTopic = prob.topic.toLowerCase().includes(q);
        if (!matchesTitle && !matchesTags && !matchesTopic) return false;
      }

      // Topic filter
      if (selectedTopic !== 'All' && prob.topic !== selectedTopic) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'All' && prob.difficulty !== selectedDifficulty) {
        return false;
      }

      // Status filter
      const isSolved = solvedIds.includes(prob.id);
      const isBookmarked = bookmarks.includes(prob.id);
      if (selectedStatus === 'Solved' && !isSolved) return false;
      if (selectedStatus === 'Todo' && isSolved) return false;
      if (selectedStatus === 'Bookmarked' && !isBookmarked) return false;

      return true;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === 'acceptanceRate') {
        comparison = a.acceptanceRate - b.acceptanceRate;
      } else if (sortBy === 'difficulty') {
        const order = { Easy: 1, Medium: 2, Hard: 3 };
        comparison = order[a.difficulty] - order[b.difficulty];
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [searchQuery, selectedTopic, selectedDifficulty, selectedStatus, sortBy, sortOrder, bookmarks, solvedIds]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            DSA Practice Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse and filter through {mockProblems.length} foundational algorithmic challenges.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">
            Showing <strong className="text-white">{filteredProblems.length}</strong> problems
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by title, tag, or topic (e.g. Binary Search, Two Pointers)..."
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Difficulty Dropdown */}
          <div>
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="w-full py-2 px-3 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Status Dropdown */}
          <div>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full py-2 px-3 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="Solved">Solved</option>
              <option value="Todo">Todo (Unsolved)</option>
              <option value="Bookmarked">Bookmarked</option>
            </select>
          </div>
        </div>

        {/* Topic Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          <button
            onClick={() => setSelectedTopic('All')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
              selectedTopic === 'All'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/50'
            }`}
          >
            All Topics
          </button>
          {ALL_TOPICS.map(t => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                selectedTopic === t
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Card>

      {/* Problem Table / List */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 w-12 text-center">Status</th>
                <th className="py-3 px-4">Problem Title</th>
                <th className="py-3 px-4">Topic</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Acceptance</th>
                <th className="py-3 px-4">Est. Time</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProblems.length > 0 ? (
                filteredProblems.map(prob => {
                  const isSolved = solvedIds.includes(prob.id);
                  const isBookmarked = bookmarks.includes(prob.id);

                  return (
                    <tr
                      key={prob.id}
                      onClick={() => setPreviewProblem(prob)}
                      className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                    >
                      {/* Status */}
                      <td className="py-3 px-4 text-center">
                        {isSolved ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-slate-700 mx-auto" />
                        )}
                      </td>

                      {/* Title & Tags */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                          {prob.title}
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap mt-1">
                          {prob.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="text-[10px] text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Topic */}
                      <td className="py-3 px-4 text-slate-300">
                        <Badge variant="topic" size="sm">
                          {prob.topic}
                        </Badge>
                      </td>

                      {/* Difficulty */}
                      <td className="py-3 px-4">
                        <Badge difficulty={prob.difficulty} size="sm" />
                      </td>

                      {/* Acceptance */}
                      <td className="py-3 px-4 font-mono text-slate-400">
                        {prob.acceptanceRate}%
                      </td>

                      {/* Est Time */}
                      <td className="py-3 px-4 text-slate-400">
                        ~{prob.estimatedTimeMin} mins
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={e => toggleBookmark(e, prob.id)}
                            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition-colors"
                            title={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
                          >
                            <Bookmark
                              className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`}
                            />
                          </button>

                          <Link to={`/workspace/${prob.id}`}>
                            <Button variant="outline" size="sm" leftIcon={<Terminal className="w-3 h-3" />}>
                              Solve
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No problems match the selected filters or search keywords.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Problem Preview Modal */}
      {previewProblem && (
        <Modal
          isOpen={!!previewProblem}
          onClose={() => setPreviewProblem(null)}
          title={previewProblem.title}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex items-center gap-2 flex-wrap pb-2 border-b border-slate-800">
              <Badge difficulty={previewProblem.difficulty} />
              <Badge variant="topic">{previewProblem.topic}</Badge>
              <span className="text-slate-400">Acceptance: {previewProblem.acceptanceRate}%</span>
              <span className="text-slate-400">Time: ~{previewProblem.estimatedTimeMin} mins</span>
            </div>

            <div className="space-y-2 whitespace-pre-line leading-relaxed text-slate-200">
              {previewProblem.description}
            </div>

            {/* Examples preview */}
            <div className="space-y-2 pt-2">
              <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                Sample Example:
              </span>
              <pre className="p-3 bg-slate-950 font-mono rounded-lg border border-slate-800 text-indigo-300">
                Input: {previewProblem.examples[0].input}
                {'\n'}Output: {previewProblem.examples[0].output}
              </pre>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setPreviewProblem(null)}>
                Close Preview
              </Button>
              <Link to={`/workspace/${previewProblem.id}`}>
                <Button variant="gradient" size="sm" rightIcon={<Terminal className="w-3.5 h-3.5" />}>
                  Open in Coding Workspace
                </Button>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
