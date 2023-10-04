import { ClassNames } from '../types';

/**
 * Gets concatenated classnames from given arguments.
 *
 * @param args Arguments to get class name string from.
 */
const classnames = (...args: ClassNames[]): string =>
  args
    .reduce((classes: string, arg) => {
      if (typeof arg === 'string' && /^[^\s]*$/.test(arg)) return `${classes} ${arg}`;
      if (Array.isArray(arg) && arg.length) return `${classes} ${classnames(...arg)}`;
      if (typeof arg === 'object' && arg !== null) return `${classes} ${classnames(...Object.keys(arg).filter(key => arg[key] && typeof arg[key] === 'boolean'))}`;
      return classes;
    }, '')
    .trim();

export default classnames;
