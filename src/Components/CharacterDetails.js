import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

   //Fetch Character's details
   const fetchCharacterDetails = async (characterId) => {
    try {
      const response = await fetch("https://swapi.dev/api/people/1/");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch Star Wars character!", error.msg);
    }
  };

  async function fetchDetails() {
    const data = await fetchCharacterDetails(id);
    setCharacter(data);
  }
  useEffect(() => {
    fetchDetails();
  }, [id]);

  
  return (
    <div>
      <h2>{character.name} Details</h2>
      <p>Gender: {character.gender}</p>
      <p>height: {character.height}</p>
      <p>mass: {character.mass}</p>
      <p>hair_color: {character.hair_color}</p>
      <p>skin_color: {character.skin_color}</p>
      <p>eye_color:{character.eye_color}</p>
      <p>birth_year: {character.birth_year}</p>
      <p>gender: {character.gender}</p>
    </div>
  );
};

export default CharacterDetails;
