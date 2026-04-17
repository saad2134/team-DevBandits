"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SavedProvider {
  savedIds: number[];
  toggleSave: (id: number) => void;
  isSaved: (id: number) => boolean;
}

const SavedContext = createContext<SavedProvider | undefined>(undefined);

const STORAGE_KEY = "saved_opportunity_ids";

function isValidDeadline(deadline: string | null): boolean {
  if (!deadline || deadline === "Rolling") return true;
  
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();
  
  const deadlineLower = deadline.toLowerCase();
  
  if (deadlineLower.includes("rolling")) return true;
  if (deadlineLower.includes("in ") && deadlineLower.includes("days")) {
    const daysMatch = deadlineLower.match(/in (\d+) days?/);
    if (daysMatch) {
      const days = parseInt(daysMatch[1]);
      const deadlineDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
      return deadlineDate >= now;
    }
  }
  if (deadlineLower.includes("next week")) {
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return nextWeek >= now;
  }
  if (deadlineLower.includes("in ") && deadlineLower.includes("weeks")) {
    const weeksMatch = deadlineLower.match(/in (\d+) weeks?/);
    if (weeksMatch) {
      const weeks = parseInt(weeksMatch[1]);
      const deadlineDate = new Date(now.getTime() + weeks * 7 * 24 * 60 * 60 * 1000);
      return deadlineDate >= now;
    }
  }
  
  try {
    const deadlineDate = new Date(deadline);
    return deadlineDate >= now;
  } catch {
    return true;
  }
}

export function SavedProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedIds(parsed);
        }
      } catch (e) {
        console.error("Failed to parse saved IDs from localStorage", e);
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
    }
  }, [savedIds, isHydrated]);

  const toggleSave = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id)
        ? prev.filter((savedId) => savedId !== id)
        : [...prev, id]
    );
  };

  const isSaved = (id: number) => savedIds.includes(id);

  return (
    <SavedContext.Provider value={{ savedIds, toggleSave, isSaved }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error("useSaved must be used within a SavedProvider");
  }
  return context;
}

export { isValidDeadline };