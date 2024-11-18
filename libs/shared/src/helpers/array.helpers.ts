export const ArrayUnique = (arr: object[], key: string) => {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
};
