import "./App.css";
import React, { useState, useEffect } from "react";
import { randomNumber, formatPokeData } from "./helperFunctions";
import MainPage from "./components/MainPage";
import NavBar from "./components/NavBar";
import RightSideBar from "./components/RightSideBar";

const url = `https://pokeapi.co/api/v2/pokemon/`; // the base url for searching a pokemon, minus the actual number or name

// Helpers to make fetching cleaner to read:

function fetchPokemonFromSearchTerm(term) {
  return fetch(`${url}${term}`)
    .then((response) => response.json())
    .then(formatPokeData);
}

function fetchRandomPokemon() {
  return fetchPokemonFromSearchTerm(randomNumber(900));
}

const App = () => {
  const [searchTermState, setSearchTermState] = useState("");
  let [searchHistoryState, setSearchHistoryState] = useState([]);
  let [myTeamState, setMyTeamState] = useState([]);
  const [showTeamState, setShowTeamState] = useState(true);
  const [errorState, setErrorState] = useState(false);

  useEffect(() => {
    fetchRandomPokemon().then((pokeData) => {
      searchHistoryState = searchHistoryState.filter(
        (item) => item.name !== pokeData.name
      );

      setSearchHistoryState([pokeData, ...searchHistoryState]);
    });
  }, []);

  function toggleRightBarMode() {
    // let showTeam = !showTeamState
    setShowTeamState(!showTeamState);
  }

  function handleSearchClick(e) {
    setErrorState(false);

    fetchPokemonFromSearchTerm(searchTermState)
      .then((pokeData) => {
        // let { searchHistory } = this.state;
        searchHistoryState = searchHistoryState.filter(
          (item) => item.name !== pokeData.name
        );

        setSearchHistoryState([pokeData, ...searchHistoryState]);
      })
      .catch((err) => {
        //Error({ error: "No Pokemon Found" });
        setErrorState("No Pokemon Found");
      });
    let searchBar = document.querySelector("#search-bar");
    searchBar.value = "";
    e.preventDefault();
  }

  function handleSearchChange(e) {
    setSearchTermState(e.target.value);
  }
  function handleAddToTeamClick(e) {
    //let { searchHistoryState, myTeamState } = {setSearchHistoryState, setMyTeamState};
    myTeamState = new Set([searchHistoryState[0], ...myTeamState]);
    setMyTeamState([...myTeamState]);
  }
  function handleRemoveFromTeamClick(removalIndex) {
    console.log(removalIndex);
    // let { myTeam } = this.state;
    myTeamState.splice(removalIndex, 1);
    setMyTeamState(myTeamState.splice(removalIndex, 1));
  }

  function handleHistoryCardClick(historyIndex) {
    // let { searchHistory } = this.state;
    let clicked = searchHistoryState.splice(historyIndex, 1);
    searchHistoryState = [...clicked, ...searchHistoryState];
    setSearchHistoryState(searchHistoryState);
  }

  // let { searchTerm, searchHistory, myTeam, showTeam, error } = this.state;
  let lastSearched =
    searchHistoryState.length > 0 ? searchHistoryState[0] : false;
  //console.log("LAST SEARCHED: ", lastSearched)
  return (
    <div className="App column">
      <NavBar
        showTeam={showTeamState}
        handleSearchChange={handleSearchChange}
        handleSearchClick={handleSearchClick}
        toggleRightBarMode={toggleRightBarMode}
      />
      <div className="row">
        <MainPage
          lastSearched={lastSearched}
          searchTerm={searchTermState}
          error={errorState}
          handleAddToTeamClick={handleAddToTeamClick}
        />
        <RightSideBar
          myTeam={myTeamState}
          searchHistory={searchHistoryState}
          showTeam={showTeamState}
          handleRemoveFromTeamClick={handleRemoveFromTeamClick}
          handleHistoryCardClick={handleHistoryCardClick}
        />
      </div>
    </div>
  );
};

export default App;
