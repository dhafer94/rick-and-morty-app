import React, { useState, useEffect } from 'react';
import List from '../components/List';
import './App.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

function App() {
	const [characters, setCharacters] = useState([]);

	useEffect(() => {
		fetch(`https://rickandmortyapi.com/api/character/`)
			.then((response) => {
				return response.json();
			})
			.then((users) => {
				// console.log(users.results);
				setCharacters(users.results);
			});
	}, []);

	const listItems = characters.map((character) => {
		return {
			id: character.id,
			name: character.name,
			status: character.status,
			image: character.image,
		};
	});

	// a.name;
	// b.species;
	// c.gender;
	// d.location;
	// e.episode;
	// f.status;
	// g.created;
	// console.log(listItems[2]);

	const defaultProps = {
		options: listItems,
		getOptionLabel: (option) => option.name + option.status,
	};

	return !characters.length ? (
		<h1>Loading</h1>
	) : (
		<div className='tc'>
			<h1 className='f1'>Rick and morty Characters list</h1>
			<Autocomplete
				{...defaultProps}
				id='auto-highlight'
				autoHighlight
				renderInput={(params) => (
					<TextField
						{...params}
						label='Choose a character'
						variant='standard'
					/>
				)}
			/>
		</div>
	);
}

export default App;
