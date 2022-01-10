import React from 'react';

export default function Profile({ characters, id }) {
	// console.log(characters[0].name);
	const characterFilter = characters.filter(
		(character) => character.id === id,
	);
	// console.log(characterFilter[0]);
	const FilteredCharacters = characterFilter.map((character) => {
		return {
			id: character.id,
			charName: character.charName,
			species: character.species,
			gender: character.gender,
			charLocation: character.charLocation,
			episode: character.episode,
			charStatus: character.charStatus,
			created: character.created,
		};
	});

	// console.log(characters);

	const charInfo = FilteredCharacters.map((character) => {
		return (
			<div>
				<p id={character.id}>Name: {character.charName}</p>
				<p id={character.id}>Species: {character.species}</p>
				<p id={character.id}>Gender:{character.gender}</p>
				<p id={character.id}>Location: {character.charLocation}</p>
				<p id={character.id}>Episode: {character.episode}</p>
				<p id={character.id}>Status: {character.charStatus}</p>
				<p id={character.id}>Created: {character.created}</p>
			</div >
		);
	});

	return <div>{charInfo}</div>;
}
