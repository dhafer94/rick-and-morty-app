import React, { useState, useEffect } from 'react';
// import List from '../components/List';
import './App.css';
import VirtualizedAutocomplete from '../components/VirtualizedAutocomplete';

import _ from 'lodash';

function App() {
	const [characters, setCharacters] = useState([]);

	//fetching all the characters in one large array using the pagination from the API
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
		_.cloneDeep(fetchPages('https://rickandmortyapi.com/api/character'));
	}, []);

	const charactersWithAttributes = characters.map((character) => {
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

	return !characters.length ? (
		<h1>Loading</h1>
	) : (
		<div className='tc'>
			<VirtualizedAutocomplete
				defaultProps={{
					options: charactersWithAttributes,
					getOptionLabel: (option) => `${option.charName}`,
				}}
				characters={charactersWithAttributes}
			/>
		</div>
	);
}

export default App;
