const calculateDateDiff = (date: string): string => {
  const d1 = Date.parse(date + 'T00:00:00.000Z');
  const d2 = Date.now();
  const delta = Math.round((d1 - d2) / 1000);

  if (delta < 0) return 'N/A';

  const diffDays = Math.floor(delta / 86400);
  const diffHours = Math.floor((delta % 86400) / 3600);
  const diffMinutes = Math.floor((delta % 3600) / 60);
  const diffSeconds = Math.floor(delta % 60);

  return `${diffDays} days, ${diffHours} hrs, ${diffMinutes} mins, ${diffSeconds} secs`;
};

const isEventOpen = (date: string): boolean => Date.parse(date) > Date.now();

const shouldShowResults = (date: string): boolean => Date.parse(date) < Date.now();

const dateIsValid = (inputTs: number, startDate: string, endDate: string): boolean => {
  const ts = inputTs * 1000;
  const startTs = Date.parse(startDate);
  const endTs = Date.parse(endDate);

  if (ts < startTs || ts > endTs) return false;

  return true;
};

const returnTimestamp = (d: string, extraDays: number = 0): number =>
  Date.parse(d + 'T00:00:00.000Z') / 1000 + extraDays * 86400;

const convertToDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toISOString();
};

export {
  calculateDateDiff,
  isEventOpen,
  shouldShowResults,
  dateIsValid,
  returnTimestamp,
  convertToDate
};
