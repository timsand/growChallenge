// utility
export const getLastPage = (count, offset) => {
  return Math.floor(count / offset) + 1;
};
