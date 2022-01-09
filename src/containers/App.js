import React, { useState, useEffect } from 'react';
// import List from '../components/List';
import './App.css';
import VirtualizedAutocomplete from '../components/VirtualizedAutocomplete';

import _ from 'lodash';

function App() {
	const [characters, setCharacters] = useState([]);
	// const [charactersAttributes, setCharactersAttributes] = useState([]);

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

	useEffect(() => {
		_.cloneDeep(fetchPages('https://rickandmortyapi.com/api/character'));
	}, []);

	const charactersWithAttributes = _.cloneDeep(
		characters.map((character) => {
			return {
				id: character.id,
				charName: character.name,
				charStatus: character.status,
				species: character.species,
				gender: character.gender,
				charLocation: character.location.name,
				episode: character.episode,
				created: character.created,
				// image: character.image,
			};
		}),
	);
	const idArray = charactersWithAttributes.map((character) => {
		return character.id;
	});

	// console.log(charactersWithAttributes);

	const defaultProps = {
		options: charactersWithAttributes,
		getOptionLabel: (option) => `${option.charName}`,
	};

	return !characters.length ? (
		<h1>Loading</h1>
	) : (
		<div className='tc'>
			<h1 className='f1'>Rick and morty Characters list</h1>
			<VirtualizedAutocomplete
				defaultProps={defaultProps}
				characters={charactersWithAttributes}
				// id={idArray}
				CharName={charactersWithAttributes.name}
				created={charactersWithAttributes.created}
				episode={charactersWithAttributes.episode}
				CharLocation={charactersWithAttributes.location}
				gender={charactersWithAttributes.gender}
				species={charactersWithAttributes.species}
				CharStatus={charactersWithAttributes.status}
			/>
		</div>
	);
}

export default App;
