import React from 'react';

export default function Profile({ characters, cName }) {
	// console.log(characters[0].name);
	const characterFilter = characters.filter(
		(character) => character.charName === cName,
	);
	// console.log(characterFilter[0]);
	const FilteredCharacters = characterFilter.map((character) => {
		return {
			charName: character.charName,
			species: character.species,
			gender: character.gender,
			charLocation: character.charLocation,
			episode: character.episode,
			charStatus: character.charStatus,
			created: character.created,
		};
	});

	console.log(characters);

	const charInfo = FilteredCharacters.map((character) => {
		return (
			<div>
				<p>Name: {character.charName}</p>
				<p>Species: {character.species}</p>
				<p>Gender:{character.gender}</p>
				<p>Location: {character.charLocation}</p>
				<p>Episode: {character.episode}</p>
				<p>Status: {character.charStatus}</p>
				<p>Created: {character.created}</p>
			</div>
		);
	});

	return <div>{charInfo}</div>;
}
