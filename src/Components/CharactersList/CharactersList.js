import { useNavigate } from "react-router-dom";
import "./CharactersList.css";
import "../Loader.css";
import { useEffect, useState } from "react";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { LiaGreaterThanSolid, LiaLessThanSolid } from "react-icons/lia";

const CharactersList = () => {
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const navigateTo = useNavigate();
  const nextPageCondition = currentPage === totalPages;
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
    { label: "Home", url: "/", active: false },
    { label: "Characters", url: "/characters", active: true },
  ];

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <header className="App-header">
          <Breadcrumbs paths={paths} />
          <h2>Star War Characters</h2>
          <section className="section">
            <LiaLessThanSolid
              style={{
                color: currentPage === 1 ? "#94b0e9" : "black",
                fontSize: "40",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            />
            <div>
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
                  <li>{item.name}</li>
                </ul>
              ))}
            </div>
            <LiaGreaterThanSolid
              style={{
                color: nextPageCondition ? "#94b0e9" : "black",
                fontSize: "40",
                cursor: nextPageCondition ? "not-allowed" : "pointer",
              }}
              onClick={() => {
                if (currentPage < totalPages) {
                  setCurrentPage(currentPage + 1);
                }
              }}
            />
          </section>
        </header>
      )}
    </div>
  );
};

export default CharactersList;
