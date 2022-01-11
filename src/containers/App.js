import React, { useState, useEffect } from 'react';
// import List from '../components/List';
import './App.css';
import VirtualizedAutocomplete from './VirtualizedAutocomplete';
import { makeStyles } from '@material-ui/styles';
import { red } from '@mui/material/colors';

function App() {
	const [characters, setCharacters] = useState([]);

	const useStyles = makeStyles((theme) => ({
		root: {
			display: 'flex',
			flexDirection: 'row',
			textAlign: 'center',
			justifyContent: 'center',
			background: '#99D8D0',
		},
	}));
	//fetching all the characters in one large array using the information from the API
	const fetchPages = async (url) => {
		const res = await fetch(url);
		const data = await res.json();
		setCharacters((characters) => {
			return [...characters, ...data.results];
		});
		if (data.info && data.info.next) {
			fetchPages(data.info.next);
		}
	};

	// This can be done without the syntactic sugar as well
	// const fetchPages = (url) => {
	// 	fetch(url)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			setCharacters((characters) => {
	// 				return [...characters, ...data.results];
	// 			});
	// 			if (data.info && data.info.next) {
	// 				fetchPages(data.info.next);
	// 			}
	// 		});
	// };

	//ComponentDidMount
	useEffect(() => {
		fetchPages('https://rickandmortyapi.com/api/character/');
	}, []);

	const charactersWithTheNeededAttributes = characters.map((character) => {
		return {
			id: character.id,
			charName: character.name,
			charStatus: character.status,
			species: character.species,
			gender: character.gender,
			charLocation: character.location.name,
			episode: character.episode,
			created: character.created,
		};
	});
	// console.log(charactersWithTheNeededAttributes);
	const classes = useStyles();

	return !characters.length ? (
		<h1>Loading</h1>
	) : (
		<div className={classes.root}>
			<VirtualizedAutocomplete
				defaultProps={{
					options: charactersWithTheNeededAttributes,
					getOptionLabel: (option) => `${option.charName}`,
				}}
				characters={charactersWithTheNeededAttributes}
			/>
		</div>
	);
}

export default App;
