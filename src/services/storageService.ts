import { UserProfile, UserPreferences, Submission, Mission } from '../types';
import { initialMockUser, mockSubmissions } from '../data/mockUserData';
import { initialMissions } from '../data/missionsData';

const KEYS = {
  USER: 'algopilot_user_profile',
  BOOKMARKS: 'algopilot_bookmarked_problems',
  SUBMISSIONS: 'algopilot_submissions',
  MISSIONS: 'algopilot_missions',
  SOLVED_PROBLEMS: 'algopilot_solved_problems',
  CODE_DRAFTS: 'algopilot_code_drafts',
  DEMO_AUTH: 'algopilot_demo_auth_active'
};

export const storageService = {
  getUserProfile(): UserProfile {
    try {
      const data = localStorage.getItem(KEYS.USER);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to read user profile from storage', e);
    }
    return initialMockUser;
  },

  saveUserProfile(user: UserProfile): void {
    try {
      localStorage.setItem(KEYS.USER, JSON.stringify(user));
    } catch (e) {
      console.warn('Failed to save user profile to storage', e);
    }
  },

  updatePreferences(prefs: Partial<UserPreferences>): UserProfile {
    const user = this.getUserProfile();
    const updated = {
      ...user,
      preferences: {
        ...user.preferences,
        ...prefs
      }
    };
    this.saveUserProfile(updated);
    return updated;
  },

  getBookmarks(): string[] {
    try {
      const data = localStorage.getItem(KEYS.BOOKMARKS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to read bookmarks', e);
    }
    return ['prob-3', 'prob-4']; // Initial sample bookmarks
  },

  toggleBookmark(problemId: string): string[] {
    const bookmarks = this.getBookmarks();
    const index = bookmarks.indexOf(problemId);
    let updated: string[];
    if (index >= 0) {
      updated = bookmarks.filter(id => id !== problemId);
    } else {
      updated = [...bookmarks, problemId];
    }
    try {
      localStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save bookmarks', e);
    }
    return updated;
  },

  isBookmarked(problemId: string): boolean {
    return this.getBookmarks().includes(problemId);
  },

  getSolvedProblemIds(): string[] {
    try {
      const data = localStorage.getItem(KEYS.SOLVED_PROBLEMS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to read solved problems', e);
    }
    return ['prob-1', 'prob-4', 'prob-5']; // Initial sample solved
  },

  markProblemSolved(problemId: string): string[] {
    const solved = this.getSolvedProblemIds();
    if (!solved.includes(problemId)) {
      const updated = [...solved, problemId];
      try {
        localStorage.setItem(KEYS.SOLVED_PROBLEMS, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save solved problem', e);
      }
      return updated;
    }
    return solved;
  },

  getSubmissions(): Submission[] {
    try {
      const data = localStorage.getItem(KEYS.SUBMISSIONS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to read submissions', e);
    }
    return mockSubmissions;
  },

  addSubmission(sub: Submission): Submission[] {
    const current = this.getSubmissions();
    const updated = [sub, ...current];
    try {
      localStorage.setItem(KEYS.SUBMISSIONS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save submission', e);
    }
    return updated;
  },

  getMissions(): Mission[] {
    try {
      const data = localStorage.getItem(KEYS.MISSIONS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to read missions', e);
    }
    return initialMissions;
  },

  toggleMissionCompleted(missionId: string): Mission[] {
    const current = this.getMissions();
    const updated = current.map(m => {
      if (m.id === missionId) {
        const nextState = !m.isCompleted;
        return {
          ...m,
          isCompleted: nextState,
          currentCount: nextState ? m.requiredCount : Math.max(0, m.requiredCount - 1)
        };
      }
      return m;
    });
    try {
      localStorage.setItem(KEYS.MISSIONS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save missions', e);
    }
    return updated;
  },

  saveCodeDraft(problemId: string, lang: string, code: string): void {
    try {
      const key = `${KEYS.CODE_DRAFTS}_${problemId}_${lang}`;
      localStorage.setItem(key, code);
    } catch (e) {
      console.warn('Failed to save code draft', e);
    }
  },

  getCodeDraft(problemId: string, lang: string): string | null {
    try {
      const key = `${KEYS.CODE_DRAFTS}_${problemId}_${lang}`;
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },

  isDemoAuthActive(): boolean {
    return localStorage.getItem(KEYS.DEMO_AUTH) !== 'false';
  },

  setDemoAuthActive(active: boolean): void {
    localStorage.setItem(KEYS.DEMO_AUTH, active ? 'true' : 'false');
  },

  resetAllDemoData(): void {
    try {
      localStorage.removeItem(KEYS.USER);
      localStorage.removeItem(KEYS.BOOKMARKS);
      localStorage.removeItem(KEYS.SUBMISSIONS);
      localStorage.removeItem(KEYS.MISSIONS);
      localStorage.removeItem(KEYS.SOLVED_PROBLEMS);
    } catch (e) {
      console.warn('Failed to reset demo data', e);
    }
  }
};
