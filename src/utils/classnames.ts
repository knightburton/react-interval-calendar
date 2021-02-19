/**
 * Gets concatenated classnames from given arguments.
 *
 * @param args Arguments to get classname string from.
 */
const classnames = (...args: (string | string[] | Object | Object[])[]): string => args.reduce((classes: string, arg) => {
  if (typeof arg === 'string' && /^[^\s]*$/.test(arg)) return `${classes} ${arg}`;
  if (Array.isArray(arg) && arg.length) return `${classes} ${classnames(...arg)}`;
  if (typeof arg === 'object' && arg !== null) return `${classes} ${classnames(...Object.keys(arg).filter(key => arg[key]))}`;
  return classes;
}, '').trim();

export default classnames;
