import React, { useState, useEffect } from 'react';
import VirtualizedAutocomplete from '../components/VirtualizedAutocomplete/VirtualizedAutocomplete';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import ReactWindowTable from '../components/ReactWindowTable/ReactWindowTable';
import Profile from '../components/Profile/Profile';
import { makeStyles } from '@material-ui/styles';
import Grid from '@mui/material/Grid';
import FacebookLogin from 'react-facebook-login';
import HomeIcon from '@mui/icons-material/Home';
import useLocalStorage from '../useLocalStorage';

// import './App.css';

function App() {
	const [characters, setCharacters] = useLocalStorage('characters', []);
	const [route, setRoute] = useLocalStorage('route', 'home');
	const [charId, setCharId] = useLocalStorage('charID', '');
	const [searchfield, setSearchfield] = useLocalStorage('searchfield', '');

	console.log(characters);
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
		// image1: {
		// 	position: 'absolute',
		// 	height: '100%',
		// 	width: '15%',
		// 	opacity: '60%',
		// 	// transform: 'scaleX(-1)',
		// },
		// image2: {
		// 	position: 'absolute',
		// 	right: 0,
		// 	height: '100%',
		// 	width: '10rem',
		// 	opacity: '60%',
		// 	// transform: 'scaleX(-1)',
		// },

		nav: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
		},
		linkUl: { listStyle: 'none' },

		logo: {
			width: 300,
			marginBottom: '2%',
		},
		logoSection: {
			display: 'flex',
			flexDirection: 'row',
			margin: '0 5%',
			// flexWrap: 'nowrap',
			// maxWidth: '30%',
			// marginLeft: '10%',
			// marginBottom: '1%',
		},
		listSection: { display: 'flex', flexDirection: 'row' },
		titlecontainer: {
			display: 'flex',
			flexDirection: 'column',
			width: '50%',
			marginTop: '11rem',
			marginBottom: '10rem',
		},
		h1: {
			color: '#363636',
		},
		fbIcon: {
			// position: 'absolute',
			// display: 'block',
			// marginLeft: '200%',
		},

		title: {
			fontSize: '50px',
			textAlign: 'center',
			maxWidth: '100%',
			// marginTop: '30%',
			// marginLeft: '20%',
			// marginBottom: '5%',
		},
		listing: {
			fontFamily: 'Playfair Display, serif',
			display: 'flex',
			textAlign: 'center',
			flex: 'column',
		},
		// table
		container: {
			flex: 'row',
			flexGrow: 1,
			height: '30rem',
			width: '50%',
			padding: '0 5%',
			paddingBottom: '1%',
		},

		paper: {
			height: '100%',
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			background: '#a5fc94',
		},
		card: {
			width: 'fit-content',
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
			<Grid container className={classes.nav}>
				<ul className={classes.linkUl}>
					<li>
						<a className={classes.link} href='home'>
							<HomeIcon fontSize='large' className={classes.button} />
						</a>
					</li>
				</ul>
			</Grid>
			<Grid item xs={12} flexDirection='column'>
				<Grid container className={classes.logoSection}>
					<Grid className={classes.logoGrid} item xs={12}>
						<img
							className={classes.logo}
							src={require('./logo.png')}
							alt='logo'
						/>
					</Grid>
					<Grid item xs={12}>
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
					</Grid>
				</Grid>
			</Grid>
			{searchfield === '' ? (
				<Grid container>
					<Grid item xs={6}>
						<Grid container xs={12} className={classes.titlecontainer}>
							<Grid className={classes.titleGrid} item xs={12}>
								<h1 className={classes.title}>
									Rick and morty Characters list
								</h1>
							</Grid>
							<Grid item xs={12}>
								<FacebookLogin
									size={'small'}
									className={classes.fbIcon}
									appId='1088597931155576'
									autoLoad={true}
									fields='name,email,picture'
									// callback={responseFacebook}
									// cssClass='my-facebook-button-class'
									// icon={<FacebookIcon />}
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={6} className={classes.listSection}>
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
					</Grid>
				</Grid>
			) : (
				<Grid container>
					<Grid item xs={6}>
						<Grid container xs={12} className={classes.titlecontainer}>
							<Grid className={classes.titleGrid} item xs={12}>
								<h1 className={classes.title}>
									Rick and morty Characters list
								</h1>
							</Grid>
							<Grid item xs={12}>
								<FacebookLogin
									size={'small'}
									className={classes.fbIcon}
									appId='1088597931155576'
									autoLoad={true}
									fields='name,email,picture'
									// callback={responseFacebook}
									// cssClass='my-facebook-button-class'
									// icon={<FacebookIcon />}
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={6} className={classes.listSection}>
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
					</Grid>
				</Grid>
			)}
		</div>
	) : (
		//rendering the selected character based on the searchfield choice or table click
		<div className={classes.root}>
			<nav className={classes.nav}>
				<ul className={classes.linkUl}>
					<li>
						<a className={classes.link} href='home'>
							<HomeIcon fontSize='large' className={classes.button} />
						</a>
					</li>
				</ul>
			</nav>
			<Grid className={classes.logoGrid} item xs={12}>
				<img className={classes.logo} src={require('./logo.png')} alt='logo' />
			</Grid>
			<Profile
				className={classes.card}
				id={charId}
				characters={charactersWithTheNeededAttributes}
			/>
		</div>
	);
}

export default App;
