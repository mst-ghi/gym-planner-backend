export function pluck<T, K>(array: T[], key: string): K[] {
  return array.map((a) => a[key]);
}

export function deduplicate<T>(arr: T[]): T[] {
  const result = [];
  if (arr.length > 0) {
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if (result.indexOf(element) === -1) {
        result.push(element);
      }
    }
  }
  return result;
}

export const arrayUnique = (arr: object[], key: string) => {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
};

export const sortArrayObjects = (objectsArray: object[], sortKey: string) => {
  let retVal;

  if (1 < objectsArray.length) {
    const pivotIndex = Math.floor((objectsArray.length - 1) / 2); // Middle index
    const pivotItem = objectsArray[pivotIndex]; // Value in the middle index
    const less = [];
    const more = [];

    objectsArray.splice(pivotIndex, 1); // Remove the item in the pivot position
    objectsArray.forEach(function (value, index, array) {
      value[sortKey] <= pivotItem[sortKey] // Compare the 'sortKey' proiperty
        ? less.push(value)
        : more.push(value);
    });

    retVal = sortArrayObjects(less, sortKey).concat([pivotItem], sortArrayObjects(more, sortKey));
  } else {
    retVal = objectsArray;
  }

  return retVal;
};

export const reGroupArrayObject = (arr: object[], key: string) => {
  const result = [];
  let ObjMap = {};

  arr.forEach((element) => {
    const makeKey = element[key];
    if (!ObjMap[makeKey]) {
      ObjMap[makeKey] = [];
    }
    ObjMap[makeKey].push(element);
  });

  Object.keys(ObjMap).forEach((el) => {
    result.push({
      groupKey: el,
      values: ObjMap[el],
    });
  });

  return result;
};
