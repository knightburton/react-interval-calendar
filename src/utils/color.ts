const HEX_REGEX = /^[\da-fA-F]*$/;
const HEX_COLOR_REGEX = /^(#|0x)([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
const RGBA_COLOR_REGEX = /^rgb(a)?\s*?\(\s*?(000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\s*?,\s*?(000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\s*?,\s*?(000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\s*?(,\s*?(0|0\.\d*|1|1.0*)\s*?)?\)$/;
const RGB_OPENING_REGEX = /^rgb/;
const RGB_CLOSING_REGEX = /\)$/;

/**
 * Converts the hexadecimal string to number.
 *
 * @param hex Hexadecimal value to convert.
 * @param defaultValue Return value in case of invalid hex.
 */
export const convertHexToInteger = (hex?: string | null, defaultValue = 0): number => (hex && HEX_REGEX.test(hex) ? parseInt(hex, 16) : defaultValue);

/**
 * Converts the given hex, rgb color to rgba format
 * or accept rgba format.
 *
 * @param color Color in hex, rgb or rgba format to convert.
 * @param alpha Alpha value for rgba pattern.
 */
export const convertColorToRgba = (color: string, alpha = 0.2): string => {
  const rgba = RGBA_COLOR_REGEX.exec(color);
  const hex = HEX_COLOR_REGEX.exec(color);

  if (!rgba && !hex) throw new Error(`${color} is not in Hexadecimal, RGB or RGBA Color format.`);
  if (alpha < 0 || alpha > 1) throw new Error(`${alpha} is not from 0 to 1 range for rgba.`);

  // The given color is in full rgba format.
  // There is no need to touch the color.
  if (rgba && rgba[1] && rgba[6]) return color;
  // The given color is almost full rgba format only alpha missing.
  // Append the alpha argument to it.
  if (rgba && rgba[1] && !rgba[6]) return color.replace(RGB_CLOSING_REGEX, `, ${alpha})`);
  // The given color is is rgb format.
  // Append the definition and the alpha value to it.
  if (rgba && !rgba[1] && !rgba[6]) return color.replace(RGB_OPENING_REGEX, 'rgba').replace(RGB_CLOSING_REGEX, `, ${alpha})`);

  // If the rgb pattern did not match it must be hex.
  const red = convertHexToInteger(hex && hex[2]);
  const green = convertHexToInteger(hex && hex[3]);
  const blue = convertHexToInteger(hex && hex[4]);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

export default convertColorToRgba;
