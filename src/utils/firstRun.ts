const FIRST_RUN_KEY = 'stp:isFirstRun';

export const isFirstRun = JSON.parse(
  window.localStorage.getItem(FIRST_RUN_KEY) || 'true'
);

export const setFirstRun = () =>
  window.localStorage.setItem(FIRST_RUN_KEY, 'false');
