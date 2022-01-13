import React from 'react';
import Card from '@mui/material/Card';
import { makeStyles } from '@mui/styles';

export default function Profile({ characters, id }) {
	// here we filter the id that was passed from the parent state to render the child accordingly
	const characterFilter = characters.filter((character) => character.id === id);

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
	const useStyles = makeStyles({
		Profile: {
			background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
			border: 0,
			borderRadius: 3,
			boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
			color: 'white',
			height: `fit-content`,
			padding: '0 30px',
		},
	});
	const classes = useStyles();

	return (
		<div>
			<h2>
				{' '}
				<a href='home'>Home</a>{' '}
			</h2>
			<Card className={classes.Profile} key={character[0].id}>
				<p>Name: {character[0].charName}</p>
				<p>Species: {character[0].species}</p>
				<p>Gender:{character[0].gender}</p>
				<p>Location: {character[0].charLocation}</p>
				<p>Episode: {character[0].episode}</p>
				<p>Status: {character[0].charStatus}</p>
				<p>Created: {character[0].created}</p>
			</Card>
		</div>
	);
}
