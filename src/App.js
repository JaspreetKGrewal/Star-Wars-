import React from "react";
import "./App.css";
import CharactersList from "./Components/CharactersList/CharactersList";
import CharacterDetails from "./Components/CharacterDetails/CharacterDetails";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";

function App() {

  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path = "/" element= {<HomePage/>}/>
      <Route path = "/characters" element ={ <CharactersList/> } />
      <Route path = "/characters/:id" element ={ <CharacterDetails/> } />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
