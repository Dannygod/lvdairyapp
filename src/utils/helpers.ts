/**
 * Love Diary - Utility Helpers
 */

// Date formatting helpers
export const formatDate = (date: Date, format: 'short' | 'long' | 'relative' = 'short'): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (format === 'relative') {
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  }

  const options: Intl.DateTimeFormatOptions =
    format === 'long'
      ? { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      : { month: 'short', day: 'numeric' };

  return date.toLocaleDateString('en-US', options);
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

// Calculate days between two dates
export const daysBetween = (date1: Date, date2: Date): number => {
  const diffMs = Math.abs(date2.getTime() - date1.getTime());
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
};

// Calculate anniversary info
export const getAnniversaryInfo = (startDate: Date): {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  nextAnniversary: Date;
  daysUntilNext: number;
} => {
  const now = new Date();
  const totalDays = daysBetween(startDate, now);

  const years = now.getFullYear() - startDate.getFullYear();
  const months =
    (now.getFullYear() - startDate.getFullYear()) * 12 +
    (now.getMonth() - startDate.getMonth());

  // Calculate next anniversary
  const nextAnniversary = new Date(startDate);
  nextAnniversary.setFullYear(now.getFullYear());
  if (nextAnniversary < now) {
    nextAnniversary.setFullYear(now.getFullYear() + 1);
  }

  const daysUntilNext = daysBetween(now, nextAnniversary);

  return {
    years,
    months,
    days: totalDays % 30,
    totalDays,
    nextAnniversary,
    daysUntilNext,
  };
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

// Generate unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Capitalize first letter
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Random greeting based on time of day
export const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 5) return 'Sweet dreams';
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Good night';
};

// Shuffle array (for random challenges, prompts)
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get random item from array
export const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Validate entry content
export const validateEntry = (content: string): { valid: boolean; error?: string } => {
  if (!content.trim()) {
    return { valid: false, error: 'Entry cannot be empty' };
  }
  if (content.length < 10) {
    return { valid: false, error: 'Entry is too short' };
  }
  if (content.length > 5000) {
    return { valid: false, error: 'Entry is too long (max 5000 characters)' };
  }
  return { valid: true };
};

// Calculate love index average
export const calculateAverageLoveIndex = (entries: { loveIndex: number }[]): number => {
  if (entries.length === 0) return 0;
  const sum = entries.reduce((acc, entry) => acc + entry.loveIndex, 0);
  return Math.round(sum / entries.length);
};

// Group entries by date
export const groupEntriesByDate = <T extends { timestamp: string }>(
  entries: T[]
): Record<string, T[]> => {
  return entries.reduce((groups, entry) => {
    const date = new Date(entry.timestamp).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(entry);
    return groups;
  }, {} as Record<string, T[]>);
};

export default {
  formatDate,
  formatTime,
  daysBetween,
  getAnniversaryInfo,
  truncateText,
  generateId,
  debounce,
  capitalize,
  getTimeBasedGreeting,
  shuffleArray,
  getRandomItem,
  validateEntry,
  calculateAverageLoveIndex,
  groupEntriesByDate,
};
