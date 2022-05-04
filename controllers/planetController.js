import {
  getAllPlanets as getAllPlanetsFromAPI,
  getAllPeople,
} from "../providers/index.js";

export const getPlanets = async (req, res) => {
  console.log("Getting planets!");

  const planets = await getAllPlanetsFromAPI();
  const people = await getAllPeople(); // Get all people first so we don't need to send network requests for every planets person

  return res.send(replaceResidentLinksWithNames(planets, people));
};

const replaceResidentLinksWithNames = (planets, people) => {
  return planets.map((planet) => {
    const { residents } = planet;
    const newResidents = residents.map((resident) => {
      const splitLink = resident.split("/");
      const id = parseInt(splitLink[splitLink.length - 2]);

      // HACK: After wondering why I couldn't get the data to match up nicely, I discovered that person number 17 is missing from the API, breaking the nice relationship
      // that I had between my own data (with index starting at position 0) and the data represented by the links. Therefore with people HIGHER than position 16 we actually
      // need to decrement our id by TWO in order to preserve this relationship. This is obviously not a sustainable approach, but it does work for now.
      if (id < 17) {
        return people[id - 1].name;
      } else {
        return people[id - 2].name;
      }
    });

    planet.residents = newResidents;
    return planet;
  });
};
