import axios from "axios";

export const getCharacterDetails = (characterId: string | undefined): Promise<any> => {
    const request = axios.get(`https://swapi.dev/api/people/${characterId}/`); 
    return request;
  };

  export const getHomeworld = (url: string): Promise<any> => {
    const request = axios.get(url);
    return request;
  };

  export const getAllFilms = (urls: string[]): Promise<any>[] => {
    const requests = urls.map((url) => axios.get(url));
    return requests;
}
  
export const getCharacters = (currentPage: string): Promise<any> =>  {
  const request = axios.get(`https://swapi.dev/api/people/?page=${currentPage}`)
  return request;
}
