const rules = [
  [',', '،'],
  ['a', 'ا'],
  ['h', 'ح'],
  ['sh', 'ش'],
  ['kh', 'خ'],
  ['zh', 'ژ'],
  ['ch', 'چ'],
  ['gh', 'ق'],
  ['gh', 'غ'],
  ['s', 'ث'],
  ['s', 'ص'],
  ['z', 'ذ'],
  ['z', 'ض'],
  ['z', 'ظ'],
  ['t', 'ط'],
  ['a', 'ع'],
  ['b', 'ب'],
  ['d', 'د'],
  ['f', 'ف'],
  ['g', 'گ'],
  ['h', 'ه'],
  ['i', 'ی'],
  ['j', 'ج'],
  ['k', 'ک'],
  ['l', 'ل'],
  ['m', 'م'],
  ['n', 'ن'],
  ['p', 'پ'],
  ['r', 'ر'],
  ['s', 'س'],
  ['t', 'ت'],
  ['v', 'و'],
  ['x', 'خ'],
  ['y', 'ی'],
  ['z', 'ز'],
];

export const fingilish = (word: string) => {
  let result = '';

  const splitWords = word.replace(/ +/g, '').split('');

  for (let i = 0; i < splitWords.length; i++) {
    const char = splitWords[i];
    const findRule = rules.find((r) => r[1] == char);
    if (findRule) {
      result += findRule[0];
    } else {
      result += char;
    }
  }

  return result;
};
