import { mapDimension } from "./constants";

export const generateEmptyMap = () => {
  const emptyMap = [];
  for (let i = 0; i < mapDimension; i++) {
    emptyMap.push([]);
    for (let j = 0; j < mapDimension; j++) {
      emptyMap[i].push(0);
    }
  }
  return emptyMap;
}