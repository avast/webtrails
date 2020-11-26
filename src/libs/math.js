
// calculate average of array
export const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

export const max = arr => Math.max(...arr);

export const min = arr => Math.min(...arr);


export default {
  average,
  max,
  min
}
