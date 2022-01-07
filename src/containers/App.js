import React, { useState, useEffect } from 'react';
// import List from '../components/List';
import './App.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { FixedSizeList as List } from 'react-window';

function App() {
	const [characters, setCharacters] = useState([]);

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

	useEffect(() => {
		fetchPages('https://rickandmortyapi.com/api/character');
	}, []);

	// console.log('characters', characters);

	const Row = ({ index, style }) => <div style={style}>Row {index}</div>;

	const Example = () => (
		<List height={150} itemCount={1000} itemSize={35} width={300}>
			{Row}
		</List>
	);

	const listItems = characters.map((character) => {
		return {
			id: character.id,
			name: character.name,
			status: character.status,
			species: character.species,
			location: character.location,
			episode: character.episode,
			created: character.created,
			// image: character.image,
		};
	});
	// console.log('listItems', listItems);

	const defaultProps = {
		options: listItems,
		getOptionLabel: (option) =>
			option.id + '. ' + option.name + ' - ' + option.status,
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
				selectOnFocus
				renderInput={
					(params) => (
						// console.log(params)
						<TextField
							{...params}
							label='Choose a character'
							variant='standard'
						/>
					)
					// defaultProps.options[700].id
				}
			/>
		</div>
	);
	// );
}

export default App;
