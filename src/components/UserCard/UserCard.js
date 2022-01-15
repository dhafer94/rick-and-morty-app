import React from 'react';
import { Avatar, Card, Grid } from '@mui/material';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

const useStyles = makeStyles((theme) => ({
	container: {
		width: 'fit-content',
		border: '1px solid black',
		borderRadius: '50px',
		boxShadow: '2px 5px 15px -3px #a5fc94',
	},
}));

export default function UserCard({
	userPicture,
	userName,
	likedChars,
	agreedFunc,
}) {
	const classes = useStyles();
	return (
		<Grid container className={classes.container}>
			<Grid sx={{ mx: 'auto' }} item={12}>
				<CardContent sx={{ mx: 'auto' }}>
					<CardMedia
						component='img'
						sx={{ width: 50, margin: 'auto' }}
						image={userPicture}
						alt='User picture'
					/>
					<Typography sx={{ mb: 1.5 }} color='text.Primary'>
						{userName}
					</Typography>
					<Typography sx={{ textAlign: 'right' }} variant='body2'>
						{`you liked ${likedChars.length} characters`}
					</Typography>
				</CardContent>
			</Grid>
			<CardActions sx={{ margin: 'auto' }}>
				<Button
					sx={{ color: 'black' }}
					className={classes.link}
					onClick={agreedFunc}
					size='big'>
					click here if you would like to see Your favourite characters
				</Button>
			</CardActions>
		</Grid>
	);
}
