import createIndexes from './createIndexes';
import createViews from './createViews';

export { createIndexes, createViews };

export function sessionBoolean(arg: string): boolean;
export function sessionBoolean(arg: {}): void;
export function sessionBoolean(arg: string | object) {
  if (typeof arg === 'object') {
    Object.entries(arg).forEach(entry => {
      window.sessionStorage.setItem(`stp:${entry[0]}`, entry[1]);
    });
    return;
  }
  return JSON.parse(window.sessionStorage.getItem(`stp:${arg}`) || 'false');
}
