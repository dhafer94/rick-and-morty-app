import React from 'react';
import Card from '@mui/material/Card';
// import { makeStyles } from '@mui/styles';

export default function Profile({ characters, id }) {
	// console.log(characters[0].name);
	const characterFilter = characters.filter((character) => character.id === id);
	// console.log(characterFilter[0]);
	const character = characterFilter.map((character) => {
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

	// console.log(character[0]);

	return (
		// <Card></Card>
		<Card key={character[0].id}>
			<p>Name: {character[0].charName}</p>
			<p>Species: {character[0].species}</p>
			<p>Gender:{character[0].gender}</p>
			<p>Location: {character[0].charLocation}</p>
			<p>Episode: {character[0].episode}</p>
			<p>Status: {character[0].charStatus}</p>
			<p>Created: {character[0].created}</p>
		</Card>
	);
}
