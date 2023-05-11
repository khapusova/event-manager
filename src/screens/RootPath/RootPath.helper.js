export const getStr = (genList, distributedList, screen, posData) => {
  let result;
  const totalLen = genList.length;
  const arr = distributedList[screen];

  if (posData <= totalLen) {
    result = `${1}-${totalLen} of ${totalLen}`;
  }

  result = `${1 + screen * posData}-${
    arr.length + screen * posData
  } of ${totalLen}`;

  return result;
};

export const distributedByNumber = (lst, num) => {
  let list = lst;
  const result = [];

  while (list.length > 0) {
    const sublist = list.length > num ? list.slice(0, num) : list;
    list = list.slice(sublist.length);
    result.push(sublist);
  }

  return result;
};
