import React from "react";
import "./App.css";
import axios from "axios";

function App() {

  // Fetch  list of characters
   const fetchCharacters = async () => {
    try {
      const response = await axios.get("https://swapi.dev/api/people/");
      return response.data;
      const data = response.json();
    } catch (error) {
      console.error("Failed to fetch Star Wars characters!", error.msg);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h2>Welcome to the world of Star Wars!!</h2>
        <section>
        <button onClick={fetchCharacters}>Characters</button>
        </section>
      </header>
    </div>
  );
}

export default App;
