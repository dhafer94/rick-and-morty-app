import React, { useState, useEffect } from 'react';
// import List from '../components/List';
import './App.css';
import VirtualizedAutocomplete from '../components/VirtualizedAutocomplete';

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

	const defaultProps = {
		options: listItems,
		getOptionLabel: (option) =>
			option.id + ' - ' + option.name + ' - ' + option.status,
	};

	return !characters.length ? (
		<h1>Loading</h1>
	) : (
		<div className='tc'>
			<h1 className='f1'>Rick and morty Characters list</h1>

			<VirtualizedAutocomplete
				defaultProps={defaultProps}
				options={listItems}
			/>
		</div>
	);
	// );
}

export default App;
