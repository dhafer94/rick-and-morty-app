import React from 'react';
import Card from '@mui/material/Card';
import { makeStyles } from '@mui/styles';
import { Grid } from '@material-ui/core';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import VirtualizedAutocomplete from '../VirtualizedAutocomplete/VirtualizedAutocomplete';

export default function Profile({
	characters,
	id,
	likedChars,
	// setLikedChars,
	// isLoggedIn,
	agreed,
}) {
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
			// width: '50%',
			padding: '0 30px',
			textAlign: 'center',
		},
		container: {
			display: 'block',
			height: 'fit',
		},
		episodes: {
			background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
			border: 0,
			borderRadius: 3,
			boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
			color: 'white',
			height: `fit-content`,
			// width: '50%',
			padding: '0 30px',
		},
		icon: {
			background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
			border: 0,
			borderRadius: 3,
			boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		},
	});
	const classes = useStyles();

	//Tried to do the likes part, it needs more time and optimization, do it later

	// const likeHandlers = (evt) => {
	// 	// console.log(evt.target.innerText);
	// 	if (evt.target.innerText == 'Like' && isLoggedIn) {
	// 		likedChars.filter((likedChar) => {
	// 			setLikedChars(likedChars.push(1));
	// 			return { ...likedChar };
	// 		});
	// 	}
	// };
	// console.log(likedChars);

	// return (
	return agreed === true ? (
		<Grid item xs={12}>
			<VirtualizedAutocomplete
				defaultProps={{
					options: likedChars,
					getOptionLabel: (option) => `${option.charName}`,
				}}
				characters={likedChars}
			/>{' '}
		</Grid>
	) : (
		<Grid direction='row' container className={classes.container}>
			<Grid item xs={6}>
				<Card className={classes.Profile} key={character[0].id}>
					<Grid item xs={12}>
						<p className={classes.info}>Name: {character[0].charName}</p>
						<p className={classes.info}>Species: {character[0].species}</p>
						<p className={classes.info}>Gender:{character[0].gender}</p>
						<p className={classes.info}>
							Location: {character[0].charLocation}
						</p>
						<p className={classes.info}>Status: {character[0].charStatus}</p>
						<p className={classes.info}>Created: {character[0].created}</p>
					</Grid>
					<Grid item xs={12}>
						<BottomNavigation
							className={classes.icon}
							// value={value}
							// onChange={(event, newValue) => {
							// 	setValue(newValue);
							// }}
							// onClick={likeHandlers}
						>
							<BottomNavigationAction
								key={character[0].id}
								label='Like'
								icon={<ThumbUpIcon />}
							/>
							<AddPhotoAlternateIcon label='Add a photo' fontSize='large' />
							<BottomNavigationAction
								label='Dislike'
								icon={<ThumbDownIcon />}
							/>
						</BottomNavigation>
					</Grid>
				</Card>
			</Grid>
			<Grid item xs={6}>
				<Card className={classes.episodes} key={character[0].id}>
					<div className={classes.info}>
						Episodes List:
						{character[0].episode.map((e) => (
							<p className={classes.info}>Episode: {e}</p>
						))}
					</div>
				</Card>
			</Grid>
		</Grid>
	);
}
