import axios from "axios";
import { config } from "../config.js";
import { getLastPage } from "../utils/pagination.utils.js";

const getPeople = async (page = 1) => {
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

export const getPlanets = async (page = 1) => {
  const url = `${config.api}planets/?page=${page}`;

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
// only returns 82. Since there's already a discrepancy there, I'm going to write a function that will find all people, given that the pageSize is fixed at 10. This method
// will be agnostic to the number of people actually in the API as long as the pageSize does not change
export const getAllPeople = async (pageSize = 10) => {
  const { count, results: firstPageResult } = await getPeople();
  // TODO - Check valid results
  const lastPage = getLastPage(count, pageSize);

  console.log("PEOPLE LAST PAGE ", lastPage);

  const networkResults = [];
  for (let i = 1 + 1; i <= lastPage; i++) {
    networkResults.push(getPeople(i));
  }

  const networkResultsSettled = await Promise.allSettled(networkResults);

  return networkResultsSettled.reduce((acc, cur) => {
    return [...acc, ...cur.value.results]; // There's room to maybe optimize time complexity here
  }, firstPageResult);
};

// NOTE: As you can see, there's a bit of code reuse with the above method. There's definitely room to optimize this and avoid duplicate code
export const getAllPlanets = async (pageSize = 10) => {
  const { count, results: firstPageResult } = await getPlanets();
  // TODO - Check valid results
  const lastPage = getLastPage(count, pageSize);

  console.log("PLANETS LAST PAGE ", lastPage);

  const networkResults = [];
  for (let i = 1 + 1; i <= lastPage; i++) {
    networkResults.push(getPlanets(i));
  }

  const networkResultsSettled = await Promise.allSettled(networkResults);

  return networkResultsSettled.reduce((acc, cur) => {
    return [...acc, ...cur.value.results];
  }, firstPageResult);
};
