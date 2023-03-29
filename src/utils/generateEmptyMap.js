export const generateEmptyMap = () => {
  const emptyMap = [];
  for (let i = 0; i < 16; i++) {
    emptyMap.push([]);
    for (let j = 0; j < 16; j++) {
      emptyMap[i].push(0);
    }
  }
  return emptyMap;
}