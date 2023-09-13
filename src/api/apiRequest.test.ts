import axios from "axios";
import { getAllFilms, getCharacterDetails, getCharacters, getHomeworld } from "./apiRequest";
import { MOCK_CHARACTERS, MOCK_CHARACTER_DETAILS, MOCK_FILMS, MOCK_HOMEWORLD } from "../Mock/mockData"

jest.mock('axios');
axios.get = jest.fn()
    .mockImplementationOnce(() => Promise.resolve({ data: MOCK_CHARACTER_DETAILS }))      
    .mockImplementationOnce(() => Promise.resolve({ data: MOCK_HOMEWORLD }))
    .mockImplementationOnce(() => Promise.resolve({ data: MOCK_CHARACTERS }))
    .mockImplementationOnce(() => Promise.resolve({ data: MOCK_FILMS }));    

describe('api request', () => {
    it('should get character details', () => { 
        const requestCharacterDetails = getCharacterDetails("1")
        expect(requestCharacterDetails).toBeDefined()        
     })
      
     it('should get homeworld', () => { 
         const requestHomeworld = getHomeworld("https://swapi.dev/api/planets/1/")
         expect(requestHomeworld).toBeDefined()        
     })
    
     it('should get Characters', () => { 
        const requestCharacters = getCharacters("1")
        expect(requestCharacters).toBeDefined()        
     })
     it('should get all films', () => { 
         const requestFilms = getAllFilms(["https://swapi.dev/api/films/1/", 
                                            "https://swapi.dev/api/films/2/"])
        expect(requestFilms).toBeDefined()        
    })
    
})