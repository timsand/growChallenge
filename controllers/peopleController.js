import { getPeople as getPeopleFromAPI } from "../providers.js";

export const getPeople = async (req, res) => {
  // Check for req url query

  const people = await getPeopleFromAPI();
  console.log(people);
  return res.send(people);
};
