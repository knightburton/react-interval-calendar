const HEX_COLOR_REGEX = /^(#|0x)([\da-f]{2})([\da-f]{2})([\da-f]{2})$/;

/**
 * Converts the given hex color to rgba format.
 *
 * @param hex Color in hex format to convert.
 * @param alpha Alpha value for rgba pattern.
 */
export const convertHexToRgba = (hex: string, alpha = 0.2): string => {
  if (typeof hex !== 'string' || !HEX_COLOR_REGEX.test(hex)) throw new Error(`${hex} is not in Hexadecimal Color format.`);
  if (alpha < 0 || alpha > 1) throw new Error(`${alpha} is not from 0 to 1 range for rgba.`);
  const groups = HEX_COLOR_REGEX.exec(hex);

  const red = (groups?.[2] && parseInt(groups[1], 16)) || 0;
  const green = (groups?.[3] && parseInt(groups[2], 16)) || 0;
  const blue = (groups?.[4] && parseInt(groups[3], 16)) || 0;

  return `rgba(${red},${green},${blue},${alpha})`;
};

export default convertHexToRgba;
