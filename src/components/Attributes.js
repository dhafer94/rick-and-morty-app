import React from "react";

export default function Attributes({ characters, id }) {

  // console.log(characters[0].name);
  const character = characters.filter((character) => character.id);
  // console.log(character);
  // .then((character) => {
  //   return {
  //     name: character.name,
  //     species: character.species,
  //     gender: character.gender,
  //     location: character.location,
  //     episode: character.episode,
  //     characterStatus: character.status,
  //     created: character.created
  //   };
  // });
  // const newCharacters = JSON.parse(characters);
  // console.log(character);
  return (
    <div>
      {/* <p>Name: {profile.name}</p>
      <p>Species: {profile.species}</p>
      <p>Gender:{profile.gender}</p>
      <p>Location: {profile.location}</p>
      <p>Episode: {profile.episode}</p>
      <p>Status: {profile.characterStatus}</p>
      <p>Created: {profile.created}</p> */}
    </div>

    // <h1>Loading</h1>
  );
}
