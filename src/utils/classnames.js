/**
 * Gets concatenated classnames from given arguments.
 *
 * @param {(string|string[]|Object|Object[])} args Arguments to get classname string from.
 */
const classnames = (...args) => args.reduce((classes, arg) => {
  if (typeof arg === 'string' && /^[^\s]*$/.test(arg)) return `${classes} ${arg}`;
  if (Array.isArray(arg) && arg.length) return `${classes} ${classnames(...arg)}`;
  if (typeof arg === 'object' && arg !== null) return `${classes} ${classnames(...Object.keys(arg).filter(key => arg[key]))}`;
  return classes;
}, '').trim();

export default classnames;
