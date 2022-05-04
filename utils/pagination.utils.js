/**
 * Utility function that determines the last page in a collection given a total number of documents and a page size
 * Useful for determining how many pages to query if attempting to get all results
 * @param {number} count - The total number of documents
 * @param {number} pageSize - The number of documents per page
 * @returns {number} - Number representing the final page in the pagination
 */
export const getLastPage = (count, pageSize) => {
  // console.log({ count, pageSize });
  const mod = count % pageSize; // If mod is 0, we don't add 1 to our result since the last document is on the page
  // console.log(mod);

  // let ps;
  // if (mod === 0) {
  //   console.log("MOD 0");
  //   ps = count / pageSize;
  //   console.log(ps);
  //   return ps;
  // } else {
  //   console.log("MOD NOT 0");
  //   ps = Math.floor(count / pageSize) + 1;
  //   console.log(ps);
  //   return ps;
  // }
  return mod === 0 ? count / pageSize : Math.floor(count / pageSize) + 1;
};
