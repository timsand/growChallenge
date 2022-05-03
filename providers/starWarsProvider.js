import axios from "axios";
import { config } from "../config.js";

export const getPeople = async () => {
  const url = `${config}people`;

  const response = await axios.get(url);
  if (response.status === "200") {
    return response;
  }

  // In production, this would be handled more gracefully... I'm familiar with
  // throwing a custom HTTP error that then gets handled by error handler middleware
  throw new Error("Request failed");
};

export const getPlanets = async () => {};
