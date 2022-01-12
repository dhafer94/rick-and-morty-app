import React, { useState, useEffect } from 'react';
// import List from '../components/List';
import './App.css';
import VirtualizedAutocomplete from './VirtualizedAutocomplete';
import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import ReactWindowTable from '../components/ReactWindowTable/ReactWindowTable';
import Profile from '../components/Profile';
function App() {
	const [characters, setCharacters] = useState([]);

	const useStyles = makeStyles((theme) => ({
		root: {
			display: 'flex',
			padding: 0,
			margin: 0,
			flexDirection: 'column',
			textAlign: 'center',
			justifyContent: 'center',
			background: '#00b0c8',
			height: '100%',
			width: '100%',
		},
		h1: {
			color: '#363636',
		},
		'*::-webkit-scrollbar': {
			width: '15px',
		},
		'*::-webkit-scrollbar-track': {
			background: '#E4EFEF',
		},
		'*::-webkit-scrollbar-thumb': {
			background: '#1D388F61',
			borderRadius: '2px',
			height: '20px',
		},
		listing: {
			display: 'flex',
			textAlign: 'center',
			background: 'white',
			flex: 'column-reverse',
		},
		container: {
			flexGrow: 1,
			height: 500,
			width: '50%',
			padding: 0,
		},
		title: {
			fontSize: '60px',
			textAlign: 'center',
		},
		paper: {
			height: '100%',
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			background: '#a5fc94',
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
	const columns = [
		{
			label: 'Name',
			dataKey: 'charName',
		},
		{
			label: 'Status',
			dataKey: 'charStatus',
		},
	];
	const [route, setRoute] = useState('home');
	const [charId, setCharId] = useState('');

	// const handleChange = (evt, newVal) => {
	// 	setCharId(newVal.id);
	// 	setRoute('profile');
	// };
	// console.log(route);
	// return !characters.length ? (
	// 	<h1>Loading</h1>
	// ) : (
	const onInputchange = (evt) => {};
	return route === 'home' && !charId ? (
		<div className={classes.root}>
			<VirtualizedAutocomplete
				defaultProps={{
					options: charactersWithTheNeededAttributes,
					getOptionLabel: (option) => `${option.charName}`,
				}}
				characters={charactersWithTheNeededAttributes}
				// handleclick={}
				// handle={(evt, newVal) => handleChange}
				setRoute={setRoute}
				setCharId={setCharId}
				onInputchange={onInputchange}
			/>
			<Container maxWidth='lg' className={classes.container}>
				<Paper className={classes.paper}>
					<ReactWindowTable
						data={charactersWithTheNeededAttributes}
						columns={columns}
						characters={charactersWithTheNeededAttributes}
						setCharId={setCharId}
					/>
				</Paper>
			</Container>
		</div>
	) : (
		<div>
			<Profile id={charId} characters={charactersWithTheNeededAttributes} />
		</div>
	);

	// );
}

export default App;
