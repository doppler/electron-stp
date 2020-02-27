import createIndexes from './createIndexes';
import createViews from './createViews';

export { createIndexes, createViews };

export function sessionBoolean(arg: string): boolean;
export function sessionBoolean(arg: {}): void;
export function sessionBoolean(arg: any) {
  if (typeof arg === 'object') {
    Object.entries(arg).forEach(entry => {
      const currentValue = JSON.parse(
        window.sessionStorage.getItem('stp:booleans') || '{}'
      );
      window.sessionStorage.setItem(
        'stp:booleans',
        JSON.stringify({ ...currentValue, [entry[0]]: entry[1] })
      );
    });
    return;
  }
  const currentValue = JSON.parse(
    window.sessionStorage.getItem('stp:booleans') || '{}'
  );
  return currentValue[arg];
}

export function invalidIfHasErrorFor(
  errors: IValidationError[],
  fieldName: string
): string {
  return errors.map(e => e.context.key).includes(fieldName) ? 'invalid' : '';
}
