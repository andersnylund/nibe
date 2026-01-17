/**
 * Locale utilities for date formatting throughout the app.
 * Uses the browser's locale for automatic localization.
 */

// Get the user's browser locale (e.g., 'fi-FI' for Finland)
export const userLocale = navigator.language || 'fi-FI';

/**
 * Format a date for display (e.g., "15.1.2025" in Finnish locale)
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString(userLocale);
}

/**
 * Format a date with short month (e.g., "15. tammik. 2025" in Finnish)
 */
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString(userLocale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format a date with long month (e.g., "tammikuu 2025" in Finnish)
 */
export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString(userLocale, {
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Format week label (e.g., "Viikko 12, 2025" in Finnish)
 */
export function formatWeekLabel(week: number, year: string): string {
  // Use Intl to get localized "Week" word
  const weekWord = getLocalizedWeekWord();
  return `${weekWord} ${week}, ${year}`;
}

/**
 * Get the localized word for "Week"
 */
function getLocalizedWeekWord(): string {
  // Common translations for "Week"
  const weekTranslations: Record<string, string> = {
    fi: 'Viikko',
    sv: 'Vecka',
    en: 'Week',
    de: 'Woche',
    fr: 'Semaine',
    es: 'Semana',
    it: 'Settimana',
    nl: 'Week',
    da: 'Uge',
    no: 'Uke',
    pl: 'Tydzień',
  };

  const langCode = userLocale.split('-')[0].toLowerCase();
  return weekTranslations[langCode] || 'Week';
}
