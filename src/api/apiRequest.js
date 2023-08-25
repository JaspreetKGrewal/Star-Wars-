import axios from "axios";

export const getCharacterDetails = (characterId) => {
    const request = axios.get(`https://swapi.dev/api/people/${characterId}/`);
    return request;
  };

  export const getHomeworld = (url) => {
    const request = axios.get(url);
    return request;
  };

  export const getAllFilms = (urls) => {
    const requests = urls.map((url) => axios.get(url));
    return requests;
  }
