import axios from "axios";
import { config } from "../config.js";
import { getLastPage } from "../utils/pagination.utils.js";

export const getPeople = async (page = 1) => {
  const url = `${config.api}people/?page=${page}`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    // In production, this would be handled more gracefully... I'm familiar with
    // throwing a custom HTTP error that then gets handled by error handler middleware
    console.log(e);
    throw new Error("Request failed");
  }
};

// NOTE: There are a couple ways to go about fetching everyone from the API... The github README states that the API endpoint returns 87, but calling the API actually
// only returns 82. Since there's already a discrepancy there, I'm going to write a function that will find all people, given that the offset is fixed at 10. This method
// will be agnostic to the number of people actually in the API as long as the offset does not change
export const getAllPeople = async (offset = 10) => {
  const { count, results: firstPageResult } = await getPeople();
  // TODO - Check valid results
  const lastPage = getLastPage(count, offset);

  const networkResults = [];
  for (let i = 1; i <= lastPage; i++) {
    console.log(i);
    networkResults.push(getPeople(i));
  }

  const networkResultsSettled = await Promise.allSettled(networkResults);

  return networkResultsSettled.reduce((acc, cur) => {
    acc.push(cur.value.results);
    return acc;
  }, firstPageResult);
};

export const getPlanets = async () => {};
