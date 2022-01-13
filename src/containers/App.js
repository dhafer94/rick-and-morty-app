import React, { useState, useEffect } from 'react';
import VirtualizedAutocomplete from '../components/VirtualizedAutocomplete/VirtualizedAutocomplete';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import ReactWindowTable from '../components/ReactWindowTable/ReactWindowTable';
import Profile from '../components/Profile/Profile';
import { makeStyles } from '@material-ui/styles';
// import './App.css';

function App() {
	const [characters, setCharacters] = useState([]);
	const [route, setRoute] = useState('home');
	const [charId, setCharId] = useState('');
	const [searchfield, setSearchfield] = useState('');

	const useStyles = makeStyles((theme) => ({
		root: {
			fontFamily: 'Playfair Display, serif',
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
		logo: {
			width: '20%',
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
			fontFamily: 'Playfair Display, serif',
			display: 'flex',
			textAlign: 'center',
			background: 'white',
			flex: 'column',
		},
		container: {
			flexGrow: 1,
			height: 500,
			width: '50%',
			padding: 0,
			display: 'inline',
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
	// styling
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
	//for the autocomplete in the virtualized table component
	const handleInputChange = (evt) => {
		let item = evt.target.value;
		setSearchfield(item);
	};
	//comparing the table items agains the typed text to show the corresponding rows
	const searchfieldFilter = charactersWithTheNeededAttributes.filter(
		(character) => {
			if (character && character.charName.toLowerCase().includes(searchfield)) {
				return {
					id: character.id,
					charName: character.charName,
					charStatus: character.charStatus,
					species: character.species,
					gender: character.gender,
					charLocation: character.charLocation,
					episode: character.episode,
					created: character.created,
				};
			}
		},
	);
	return route === 'home' && !charId ? (
		<div className={classes.root}>
			<img className={classes.logo} src={require('./logo.png')} alt='logo' />
			<h1 className={classes.title}>Rick and morty Characters list</h1>

			<VirtualizedAutocomplete
				defaultProps={{
					options: charactersWithTheNeededAttributes,
					getOptionLabel: (option) => `${option.charName}`,
				}}
				characters={charactersWithTheNeededAttributes}
				setRoute={setRoute}
				setCharId={setCharId}
				onInputchange={handleInputChange}
			/>
			{searchfield === '' ? (
				<Container maxWidth='lg' className={classes.container}>
					<Paper className={classes.paper}>
						<ReactWindowTable
							data={charactersWithTheNeededAttributes}
							columns={columns}
							characters={charactersWithTheNeededAttributes}
							setCharId={setCharId}
							searchfield={searchfield}
						/>
					</Paper>
				</Container>
			) : (
				<Container maxWidth='lg' className={classes.container}>
					<Paper className={classes.paper}>
						<ReactWindowTable
							data={searchfieldFilter}
							columns={columns}
							characters={searchfieldFilter}
							setCharId={setCharId}
							searchfield={searchfield}
						/>
					</Paper>
				</Container>
			)}
		</div>
	) : (
		//rendering the selecting character based on the searchfield choice or table click
		<div>
			<Profile id={charId} characters={charactersWithTheNeededAttributes} />
		</div>
	);
}

export default App;
