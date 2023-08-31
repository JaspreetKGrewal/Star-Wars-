import axios from "axios";

export const getCharacterDetails = (characterId: string | undefined) => {
    const request = axios.get(`https://swapi.dev/api/people/${characterId}/`);
    return request;
  };

  export const getHomeworld = (url: string) => {
    const request = axios.get(url);
    return request;
  };

  export const getAllFilms = (urls: string[]) => {
    const requests = urls.map((url) => axios.get(url));
    return requests;
  }
