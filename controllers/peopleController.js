import {
  getPeople as getPeopleFromAPI,
  getAllPeople,
} from "../providers/index.js";

export const getPeople = async (req, res) => {
  // Check for req url query

  const people = await getAllPeople();
  return res.send(people);
};
