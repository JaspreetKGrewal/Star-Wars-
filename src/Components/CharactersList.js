import { useNavigate } from "react-router-dom";
import "./CharactersList.css";
import "./Loader.css";
import { useEffect, useState } from "react";

const CharactersList = () => {
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/people/");
      const data = await response.json();
      setCharacters(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch Star Wars characters!", error.msg);
      setLoading(false);
    }
  };
  return (
    <div>{loading ? ( <div className="loader-container">
    <div className="spinner"></div>
    </div>)
      :(
      <header className="App-header">
        <h2>Star War Characters</h2>
        <section>
          {characters.map((item) => (
            <ul
              onClick={() => {
                navigateTo(`/characters/${item.id}`);
              }}
              className="list"
            >
              <p>{item.name}</p>
              <p>
                {item.gender} {item.height}
              </p>
            </ul>
          ))}
        </section>
      </header>
      )}
    </div>
  );
};

export default CharactersList;
