const HEX_COLOR_REGEX = /^(#|0x)([\da-f]{2})([\da-f]{2})([\da-f]{2})$/;
const RGBA_COLOR_REGEX = /^rgb(a)?\s*?\(\s*?(000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\s*?,\s*?(000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\s*?,\s*?(000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\s*?(,\s*?(0|0\.\d*|1|1.0*)\s*?)?\)$/;
const RGB_OPENING_REGEX = /^rgb/;
const RGB_CLOSING_REGEX = /\)$/;

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

  // The given color is in rgb or rgba format.
  if (rgba) {
    // The given color is in full rgba format.
    // There is no need to touch the color.
    if (rgba[1] && rgba[6]) return color;
    // The given color is almost full rgba format only alpha missing.
    // Append the alpha argument to it.
    if (rgba[1] && !rgba[6]) return color.replace(RGB_CLOSING_REGEX, `, ${alpha}`);
    // The given color is is rgb format.
    // Append the definition and the alpha value to it.
    if (!rgba[1] && !rgba[6]) return color.replace(RGB_OPENING_REGEX, 'rgba').replace(RGB_CLOSING_REGEX, `, ${alpha}`);
  }

  // The given color is in proper hex format.
  if (hex && hex[2] && hex[3] && hex[4]) {
    const red = parseInt(hex[2], 16) || 0;
    const green = parseInt(hex[3], 16) || 0;
    const blue = parseInt(hex[4], 16) || 0;
    return `rgba(${red},${green},${blue},${alpha})`;
  }

  throw new Error(`${color} cannot be converted to RGBA color format.`);
};

export default convertColorToRgba;
