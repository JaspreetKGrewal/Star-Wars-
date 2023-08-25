import { useNavigate } from "react-router-dom";
import "./CharactersList.css";
import "../Loader.css";
import { useEffect, useState } from "react";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";

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

  //Fetch all characters and display 10 per page
  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?page=${currentPage}`
      );
      const data = await response.json();
      setCharacters(data.results);
      setTotalPages(Math.ceil(data.count / itemsPerPage));
      setLoading(false);
    } catch (error) {
      alert("Failed to fetch Star Wars characters!", error.msg);
      setLoading(false);
    }
  };

  // Setting Breadcrumbs
  const paths = [
    { label: "Home", url: "/" },
    { label: "Characters", url: "/characters" },
  ];

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <header className="App-header">
          <h2>Star War Characters</h2>
          <Breadcrumbs paths={paths} />
          <section>
            {characters.map((item, index) => (
              <ul
                key={index}
                onClick={() => {
                  let getId = item.url.split("/");
                  id = getId[getId.length - 2];
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
          <span>
            {" "}
            {currentPage} / {totalPages}{" "}
          </span>
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
          </section>
        </header>
      )}
    </div>
  );
};

export default CharactersList;
