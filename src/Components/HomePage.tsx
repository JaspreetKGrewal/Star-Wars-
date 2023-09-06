import React from 'react';
import { useNavigate } from 'react-router-dom';

//Home page with button to navigate to Characters page
export default function HomePage() {
 const navigateTo = useNavigate();
  return (
    <div>
    <header className="App-header">
    <h2>Welcome to the world of Star Wars!!</h2>
    <section>
    <button data-testid="charactersButton" onClick={()=>{navigateTo("/characters")}}>Characters</button>
    </section>
  </header>
  </div>
  )
}
