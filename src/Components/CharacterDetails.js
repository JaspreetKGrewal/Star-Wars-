import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Loader.css";

const CharacterDetails = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  //Fetch Character's details
  const getCharacterDetails = (characterId) => {
    const request = axios.get(`https://swapi.dev/api/people/${characterId}/`);
    return request;
  };
  const fetchCharacterDetails = async (characterId) => {
    setLoading(true);
    try {
      const response = await getCharacterDetails(characterId);
      setCharacter(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to display character's details", error.msg);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(id);
    fetchCharacterDetails(id);
  }, [id]);

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        character && (
          <div>
            <header className="App-header">
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
