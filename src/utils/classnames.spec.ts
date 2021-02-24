import classnames from './classnames';

const mock = {
  raw: {
    empty: '',
    emptyArray: [],
    emptyObject: {},
    number: 1024,
    boolean: true,
    string: 'classnames__mock',
    stringMultiple: ['classnames__one', 'classnames__two'],
    array: ['classnames__array__one'],
    arrayMultiple: ['classnames__array__one', 'classnames__array__two'],
    object: { classnames__object__one: true },
    objectMultipleAll: { classnames__object__one: true, classnames__object__two: true },
    objectMultipleNone: { classnames__object__one: false, classnames__object__two: false },
    objectMultipleSome: { classnames__object__one: true, classnames__object__two: false, classnames__object__three: true },
    diverseSimple: ['classnames__string', ['classnames__array__string'], { classnames__object: true }, [{ classnames__object_array: true }]],
    diverseNested: [
      's__1',
      ['as__1', 'as__2'],
      ['as__3', 'as__4', 'as__5', 'as__6'],
      {
        o__1: true,
        o__2: false,
        o__3: false,
        o__4: true,
      },
      ['as__7', ['as__8']],
      [
        { o__5: true, o__6: true, o__7: false },
        { o__8: false, o__9: false, o__10: true },
        { o__11: undefined, o__12: null, o__13: 13, o__14: 'invalid' },
      ],
      [[['as__9', { o__15: true }]]],
      's__2',
      [undefined, null, 'as__10'],
    ],
  },
  result: {
    empty: '',
    string: 'classnames__mock',
    stringMultiple: 'classnames__one classnames__two',
    array: 'classnames__array__one',
    arrayMultiple: 'classnames__array__one classnames__array__two',
    object: 'classnames__object__one',
    objectMultipleAll: 'classnames__object__one classnames__object__two',
    objectMultipleNone: '',
    objectMultipleSome: 'classnames__object__one classnames__object__three',
    diverseSimple: 'classnames__string classnames__array__string classnames__object classnames__object_array',
    diverseNested: 's__1 as__1 as__2 as__3 as__4 as__5 as__6 o__1 o__4 as__7 as__8 o__5 o__6 o__10 as__9 o__15 s__2 as__10',
  },
};

describe('classnames', () => {
  test('valid - undefined argument', () => {
    expect(classnames(undefined)).toEqual(mock.result.empty);
  });

  test('valid - null argument', () => {
    expect(classnames(null)).toEqual(mock.result.empty);
  });

  test('valid - empty argument', () => {
    expect(classnames()).toEqual(mock.result.empty);
  });

  test('valid - empty array argument', () => {
    expect(classnames(mock.raw.emptyArray)).toEqual(mock.result.empty);
  });

  test('valid - empty object argument', () => {
    expect(classnames(mock.raw.emptyObject)).toEqual(mock.result.empty);
  });

  test('valid - number argument', () => {
    expect(classnames(mock.raw.number)).toEqual(mock.result.empty);
  });

  test('valid - boolean argument', () => {
    expect(classnames(mock.raw.boolean)).toEqual(mock.result.empty);
  });

  test('valid - string argument', () => {
    expect(classnames(mock.raw.string)).toEqual(mock.result.string);
  });

  test('valid - multiple string arguments', () => {
    expect(classnames(...mock.raw.stringMultiple)).toEqual(mock.result.stringMultiple);
  });

  test('valid - string array argument', () => {
    expect(classnames(mock.raw.array)).toEqual(mock.result.array);
  });

  test('valid - multiple string array argument', () => {
    expect(classnames(mock.raw.arrayMultiple)).toEqual(mock.result.arrayMultiple);
  });

  test('valid - object argument', () => {
    expect(classnames(mock.raw.object)).toEqual(mock.result.object);
  });

  test('valid - object with all argument', () => {
    expect(classnames(mock.raw.objectMultipleAll)).toEqual(mock.result.objectMultipleAll);
  });

  test('valid - object with no argument', () => {
    expect(classnames(mock.raw.objectMultipleNone)).toEqual(mock.result.objectMultipleNone);
  });

  test('valid - object with some argument', () => {
    expect(classnames(mock.raw.objectMultipleSome)).toEqual(mock.result.objectMultipleSome);
  });

  test('valid - diverse arguments', () => {
    expect(classnames(...mock.raw.diverseSimple)).toEqual(mock.result.diverseSimple);
  });

  test('valid - diverse nested arguments', () => {
    expect(classnames(...mock.raw.diverseNested)).toEqual(mock.result.diverseNested);
  });
});
