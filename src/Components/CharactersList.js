/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import "./CharactersList.css";
import "./Loader.css";
import { useEffect, useState } from "react";

const CharactersList = () => {
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const navigateTo = useNavigate();
  let id = 1;

  useEffect(() => {
    fetchCharacters();
  }, [currentPage]);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://swapi.dev/api/people/?page=${currentPage}`);
      const data = await response.json();
      setCharacters(data.results);
      setTotalPages(Math.ceil(data.count / itemsPerPage));
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
                let a = item.url.split("/");
                id = a[a.length-2];
                navigateTo(`/characters/${id}`);
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
    <div>
    <nav className="pagination">
      <button
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        }}
      >
        Previous
      </button>
      <span>{currentPage}  /  {totalPages}</span>
      <button
        onClick={() => {
          if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
          }
        }}
      >
        Next
      </button>
    </nav>
     </div>
    </div>
  );
};

export default CharactersList;
