import PokemonCard from "./PokemonCard";

export default function RightSideBar({
  showTeam,
  myTeam,
  searchHistory,
  handleRemoveFromTeamClick,
  handleHistoryCardClick
}) {
  let properHtml = showTeam ? (
    <div className="my-team">
      <h1>MY TEAM</h1>
      {console.log("MY TEAM: ", myTeam)}
      {myTeam.map((pokemon, index) => (
        <PokemonCard
          pokemon={pokemon}
          key={pokemon.name + index}
          isTeamCard={true}
          index={index}
          handleRemoveFromTeamClick={handleRemoveFromTeamClick}
        />
      ))}
    </div>
  ) : (
    <div className="search-history">
      <h1>SEARCHED POKÉMON</h1>
      {searchHistory.map((pokemon, index) => (
        <PokemonCard
          pokemon={pokemon}
          key={pokemon.name + index}
          index={index}
          handleHistoryCardClick={handleHistoryCardClick}
        />
      ))}
    </div>
  );

  return <div className="right-bar column">{properHtml}</div>;
}
