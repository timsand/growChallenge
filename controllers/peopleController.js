import { getAllPeople } from "../providers/index.js";

export const getPeople = async (req, res) => {
  console.log("Getting people!");
  const sort = req.query.sort;
  if (!isSortValid(sort)) {
    return res.status(400).send("Bad Request");
  }

  const people = await getAllPeople();

  if (sort) {
    return res.send(sortPeople(people, sort));
  }

  return res.send(people);
};

const isSortValid = (sort) => {
  if (!sort) return true;

  const s = sort.toLocaleLowerCase();
  if (s === "name" || s === "height" || s === "mass") return true;
  return false;
};

const sortPeople = (people, sort) => {
  const s = sort.toLocaleLowerCase();

  // Sort mass or height
  if (s === "height" || s === "mass") {
    return people.sort((a, b) => {
      // Handle an edge case where unknown is listed, sort to the bottom
      if (a[s] === "unknown") return -1;
      // Thousands have commas here, so we need to handle that edge case
      // Did some reading online and most people seem to prefer this regex
      return (
        parseInt(a[s].replace(/,/g, "")) - parseInt(b[s].replace(/,/g, ""))
      );
    });
  }

  // Sort names
  return people.sort((a, b) => {
    // Handle casing (just in case)
    const personOne = a[s].toLocaleLowerCase();
    const personTwo = b[s].toLocaleLowerCase();

    if (personOne === personTwo) {
      return 0;
    }

    return personOne > personTwo ? 1 : -1;
  });
};
