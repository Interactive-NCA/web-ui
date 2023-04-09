
export function findMinMax(arr) {
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      for (let k = 0; k < arr[i][j].length; k++) {
        if (arr[i][j][k] < min) {
          min = arr[i][j][k];
        }
        if (arr[i][j][k] > max) {
          max = arr[i][j][k];
        }
      }
    }
  }
  return [min, max];
}
