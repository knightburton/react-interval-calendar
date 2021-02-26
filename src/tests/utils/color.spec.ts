import { convertHexToInteger, convertColorToRgba } from '../../utils/color';

const mockHex = {
  raw: {
    valid: '99F',
    validAllZero: '0000000',
    validAllF: 'ffFFfFF',
    invalid: 'G',
    newDefaultValue: {
      hex: 'IK',
      value: 255,
    },
  },
  result: {
    defaultValue: 0,
    valid: 2463,
    validAllZero: 0,
    validAllF: 268435455,
    invalid: 0,
    newDefaultValue: 255,
  },
};
const mockFormatError = (value: string) => new Error(`${value} is not in Hexadecimal, RGB or RGBA Color format.`);
const mockAlphaError = (value: number) => new Error(`${value} is not from 0 to 1 range for rgba.`);
const mockColor = {
  raw: {
    rgba: 'rgba(11, 22, 33, 0.3)',
    rgbaSpace: 'rgba(11,22,33,0.3)',
    rgbaMin: 'rgba(0, 0, 0, 0)',
    rgbaMax: 'rgba(255, 255, 255, 1)',
    rgbaInvalid: 'rgba(256, 1, 0, 10)',
    rgbaInvalidArgs: 'rgba(1, 1, 1, 1, 45)',
    rgbaInvalidShort: 'rgba(33, 76)',
    rgbaMissingAlpha: 'rgba(45, 45, 45)',
    rgb: 'rgb(45, 45, 45)',
    rgbMin: 'rgb(0, 0, 0)',
    rgbMax: 'rgb(255, 255, 255)',
    rgbInvalid: 'rgb(222, 333, 444)',
    hex: '#112233',
    hex0x: '0x112233',
    hexMin: '#000000',
    hexMax: '#ffffff',
    hexInvalid: '#gg1122',
    hexInvalidShort: '#fff',
    alpha: {
      color: 'rgb(34, 45, 56)',
      value: 0.6,
    },
    alphaMin: {
      color: 'rgba(123, 234, 65)',
      value: 0,
    },
    alphaMax: {
      color: '#AFBD33',
      value: 1,
    },
    alphaInvalidHigh: {
      color: '#ABCDEF',
      value: 1.3,
    },
    alphaInvalidLow: {
      color: '#fedcba',
      value: -0.4,
    },
  },
  result: {
    rgba: 'rgba(11, 22, 33, 0.3)',
    rgbaSpace: 'rgba(11,22,33,0.3)',
    rgbaMin: 'rgba(0, 0, 0, 0)',
    rgbaMax: 'rgba(255, 255, 255, 1)',
    rgbaInvalid: mockFormatError('rgba(256, 1, 0, 10)'),
    rgbaInvalidArgs: mockFormatError('rgba(1, 1, 1, 1, 45)'),
    rgbaInvalidShort: mockFormatError('rgba(33, 76)'),
    rgbaMissingAlpha: 'rgba(45, 45, 45, 0.2)',
    rgb: 'rgba(45, 45, 45, 0.2)',
    rgbMin: 'rgba(0, 0, 0, 0.2)',
    rgbMax: 'rgba(255, 255, 255, 0.2)',
    rgbInvalid: mockFormatError('rgb(222, 333, 444)'),
    hex: 'rgba(17, 34, 51, 0.2)',
    hex0x: 'rgba(17, 34, 51, 0.2)',
    hexMin: 'rgba(0, 0, 0, 0.2)',
    hexMax: 'rgba(255, 255, 255, 0.2)',
    hexInvalid: mockFormatError('#gg1122'),
    hexInvalidShort: mockFormatError('#fff'),
    alpha: 'rgba(34, 45, 56, 0.6)',
    alphaMin: 'rgba(123, 234, 65, 0)',
    alphaMax: 'rgba(175, 189, 51, 1)',
    alphaInvalidHigh: mockAlphaError(1.3),
    alphaInvalidLow: mockAlphaError(-0.4),
  },
};

describe('convertHexToInteger', () => {
  it('returns valid integer from null', () => {
    expect(convertHexToInteger(null)).toEqual(mockHex.result.defaultValue);
  });

  it('returns valid integer from undefined', () => {
    expect(convertHexToInteger(undefined)).toEqual(mockHex.result.defaultValue);
  });

  it('returns valid integer from normal hex', () => {
    expect(convertHexToInteger(mockHex.raw.valid)).toEqual(mockHex.result.valid);
  });

  it('returns valid integer from all zero hex', () => {
    expect(convertHexToInteger(mockHex.raw.validAllZero)).toEqual(mockHex.result.validAllZero);
  });

  it('returns valid integer from all F hex', () => {
    expect(convertHexToInteger(mockHex.raw.validAllF)).toEqual(mockHex.result.validAllF);
  });

  it('returns valid integer from invalid hex value and default fallback', () => {
    expect(convertHexToInteger(mockHex.raw.invalid)).toEqual(mockHex.result.invalid);
  });

  it('returns valid integer from an invalid text and given default value', () => {
    expect(convertHexToInteger(mockHex.raw.newDefaultValue.hex, mockHex.raw.newDefaultValue.value)).toEqual(mockHex.result.newDefaultValue);
  });
});

describe('convertColorToRgba', () => {
  it('returns valid rgba from rgba', () => {
    expect(convertColorToRgba(mockColor.raw.rgba)).toEqual(mockColor.result.rgba);
  });

  it('returns valid rgba from rgba space', () => {
    expect(convertColorToRgba(mockColor.raw.rgbaSpace)).toEqual(mockColor.result.rgbaSpace);
  });

  it('returns valid rgba from rgba format with minimum values', () => {
    expect(convertColorToRgba(mockColor.raw.rgbaMin)).toEqual(mockColor.result.rgbaMin);
  });

  it('returns valid rgba from rgba format with maximum values', () => {
    expect(convertColorToRgba(mockColor.raw.rgbaMax)).toEqual(mockColor.result.rgbaMax);
  });

  it('throws error because of invalid rgba values', () => {
    expect(() => convertColorToRgba(mockColor.raw.rgbaInvalid)).toThrow(mockColor.result.rgbaInvalid);
  });

  it('throws error because of invalid args', () => {
    expect(() => convertColorToRgba(mockColor.raw.rgbaInvalidArgs)).toThrow(mockColor.result.rgbaInvalidArgs);
  });

  it('throws error because of invalid number of args', () => {
    expect(() => convertColorToRgba(mockColor.raw.rgbaInvalidShort)).toThrow(mockColor.result.rgbaInvalidShort);
  });

  it('returns valid rgba from rgba missing alpha', () => {
    expect(convertColorToRgba(mockColor.raw.rgbaMissingAlpha)).toEqual(mockColor.result.rgbaMissingAlpha);
  });

  it('returns valid rgba from rgb format', () => {
    expect(convertColorToRgba(mockColor.raw.rgb)).toEqual(mockColor.result.rgb);
  });

  it('returns valid rgba from rgb format with minimum values', () => {
    expect(convertColorToRgba(mockColor.raw.rgbMin)).toEqual(mockColor.result.rgbMin);
  });

  it('returns valid rgba from rgb format with maximum values', () => {
    expect(convertColorToRgba(mockColor.raw.rgbMax)).toEqual(mockColor.result.rgbMax);
  });

  it('throws error because of invalid rgb values', () => {
    expect(() => convertColorToRgba(mockColor.raw.rgbInvalid)).toThrow(mockColor.result.rgbInvalid);
  });

  it('returns valid rgba from hex format', () => {
    expect(convertColorToRgba(mockColor.raw.hex)).toEqual(mockColor.result.hex);
  });

  it('returns valid rgba from hex0x format', () => {
    expect(convertColorToRgba(mockColor.raw.hex0x)).toEqual(mockColor.result.hex0x);
  });

  it('returns valid rgba from hex format minimum values', () => {
    expect(convertColorToRgba(mockColor.raw.hexMin)).toEqual(mockColor.result.hexMin);
  });

  it('returns valid rgba from hex format maximum values', () => {
    expect(convertColorToRgba(mockColor.raw.hexMax)).toEqual(mockColor.result.hexMax);
  });

  it('throws error because of invalid hex format', () => {
    expect(() => convertColorToRgba(mockColor.raw.hexInvalid)).toThrow(mockColor.result.hexInvalid);
  });

  it('throws error because of invalid shorthand hex format', () => {
    expect(() => convertColorToRgba(mockColor.raw.hexInvalidShort)).toThrow(mockColor.result.hexInvalidShort);
  });

  it('returns valid rgba with new alpha value', () => {
    expect(convertColorToRgba(mockColor.raw.alpha.color, mockColor.raw.alpha.value)).toEqual(mockColor.result.alpha);
  });

  it('returns valid rgba with alpha on minimum value', () => {
    expect(convertColorToRgba(mockColor.raw.alphaMin.color, mockColor.raw.alphaMin.value)).toEqual(mockColor.result.alphaMin);
  });

  it('returns valid rgba with alpha on maximum value', () => {
    expect(convertColorToRgba(mockColor.raw.alphaMax.color, mockColor.raw.alphaMax.value)).toEqual(mockColor.result.alphaMax);
  });

  it('throws error because of high alpha value', () => {
    expect(() => convertColorToRgba(mockColor.raw.alphaInvalidHigh.color, mockColor.raw.alphaInvalidHigh.value)).toThrow(mockColor.result.alphaInvalidHigh);
  });

  it('throws error because of low alpha value', () => {
    expect(() => convertColorToRgba(mockColor.raw.alphaInvalidLow.color, mockColor.raw.alphaInvalidLow.value)).toThrow(mockColor.result.alphaInvalidLow);
  });
});
