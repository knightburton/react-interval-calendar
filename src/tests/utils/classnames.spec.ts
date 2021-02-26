import classnames from '../../utils/classnames';

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
  it('returns valid classname from undefined argument', () => {
    expect(classnames(undefined)).toEqual(mock.result.empty);
  });

  it('returns valid classname from null argument', () => {
    expect(classnames(null)).toEqual(mock.result.empty);
  });

  it('returns valid classname from empty argument', () => {
    expect(classnames()).toEqual(mock.result.empty);
  });

  it('returns valid classname from empty array argument', () => {
    expect(classnames(mock.raw.emptyArray)).toEqual(mock.result.empty);
  });

  it('returns valid classname from empty object argument', () => {
    expect(classnames(mock.raw.emptyObject)).toEqual(mock.result.empty);
  });

  it('returns valid classname from number argument', () => {
    expect(classnames(mock.raw.number)).toEqual(mock.result.empty);
  });

  it('returns valid classname from boolean argument', () => {
    expect(classnames(mock.raw.boolean)).toEqual(mock.result.empty);
  });

  it('returns valid classname from string argument', () => {
    expect(classnames(mock.raw.string)).toEqual(mock.result.string);
  });

  it('returns valid classname from multiple string arguments', () => {
    expect(classnames(...mock.raw.stringMultiple)).toEqual(mock.result.stringMultiple);
  });

  it('returns valid classname from string array argument', () => {
    expect(classnames(mock.raw.array)).toEqual(mock.result.array);
  });

  it('returns valid classname from multiple string array argument', () => {
    expect(classnames(mock.raw.arrayMultiple)).toEqual(mock.result.arrayMultiple);
  });

  it('returns valid classname from object argument', () => {
    expect(classnames(mock.raw.object)).toEqual(mock.result.object);
  });

  it('returns valid classname from object with all argument', () => {
    expect(classnames(mock.raw.objectMultipleAll)).toEqual(mock.result.objectMultipleAll);
  });

  it('returns valid classname from object with no argument', () => {
    expect(classnames(mock.raw.objectMultipleNone)).toEqual(mock.result.objectMultipleNone);
  });

  it('returns valid classname from object with some argument', () => {
    expect(classnames(mock.raw.objectMultipleSome)).toEqual(mock.result.objectMultipleSome);
  });

  it('returns valid classname from diverse arguments', () => {
    expect(classnames(...mock.raw.diverseSimple)).toEqual(mock.result.diverseSimple);
  });

  it('returns valid classname from diverse nested arguments', () => {
    expect(classnames(...mock.raw.diverseNested)).toEqual(mock.result.diverseNested);
  });
});
