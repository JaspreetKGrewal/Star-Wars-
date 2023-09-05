import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Loader.css";
import "./CharacterDetails.css";
import {
  getAllFilms,
  getCharacterDetails,
  getHomeworld,
} from "../../api/apiRequest";
import axios from "axios";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { CharacterDetail } from "../CharactersList/CharactersList";

const CharacterDetails = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [character, setCharacter] = useState<CharacterDetail>({
    name: '',
    gender: '',
    height: '',
    mass: '',
    hair_color: '',
    skin_color: '',
    eye_color:'',
    birth_year: ''
  });
  const [planet, setPlanet] = useState({
    name: ''
  });
  const [films, setFilms] = useState<string[]>([]);

  //Fetch home planet
  const fetchHomeworld = async (url: string) => {
    try {
      const response = await getHomeworld(url);
      setPlanet(response.data);
    } catch (error) {
      alert("Failed to get home planet");
    }
  };

  //Fetch films featuring for each character
  const fetchFilms = async (urls: string[]) => {
    setLoading(true);
    const requests = await getAllFilms(urls);
    axios.all(requests).then((responses: any[]) => {
      const filmTitles: string[] = responses.map((resp) => resp.data.title);
      setFilms(filmTitles);
      setLoading(false);
    });
  };

  //Fetch Character's details
  const fetchCharacterDetails = async (characterId: string | undefined) => {
    setLoading(true);
    try {
      const response = await getCharacterDetails(characterId);
      setCharacter(response.data);
      fetchHomeworld(response.data.homeworld);
      fetchFilms(response.data.films);
    } catch (error) {
      alert("Failed to display character's details");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacterDetails(id);
  }, []);

  // Setting Breadcrumbs
  const paths = [
    { label: "Home", url: "/", active: false },
    { label: "Characters", url: "/characters", active: false },
    {
      label: character ? character.name : "Character Details",
      url: `/characters/${id}`,
      active: true,
    },
  ];

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        character &&
        planet &&
        films && (
          <div>
            <header className="App-header">
              <Breadcrumbs paths={paths} />
              <h2>{character.name} Details</h2>

              <section className="list">
                <ul>
                  <p>Gender: {character.gender}</p>
                  <p>Height: {character.height}</p>
                  <p>Mass: {character.mass}</p>
                  <p>Hair Color: {character.hair_color}</p>
                  <p>Skin Color: {character.skin_color}</p>
                  <p>Eye Color: {character.eye_color}</p>
                  <p>Birth Year: {character.birth_year}</p>
                  <p>Planet: {planet.name}</p>
                  <p>Films: {films.join(", ")} </p>
                </ul>
              </section>
            </header>
          </div>
        )
      )}
      ;
    </div>
  );
};

export default CharacterDetails;
