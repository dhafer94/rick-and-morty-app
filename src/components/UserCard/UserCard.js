import React from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

const useStyles = makeStyles((theme) => ({
	container: {
		width: 'fit-content',
		borderRadius: '50px',
		boxShadow: '2px 5px 15px -3px #a5fc94',
		background: 'rgba(0, 0, 0, 0.4)',
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
			<Grid sx={{ mx: 'auto' }} item xs={12}>
				<CardContent sx={{ mx: 'auto' }}>
					<CardMedia
						component='img'
						sx={{ width: 50, margin: 'auto' }}
						image={userPicture}
						alt='User picture'
					/>
					<Typography
						sx={{
							mb: 1.5,
							textShadow: '#a5fc94 1px 1px 0px',
							fontSize: '20px',
							fontWeight: 'bold',
						}}
						color='text.Primary'>
						{userName}
					</Typography>
					<Typography
						sx={{
							textAlign: 'center',
							textShadow: '#a5fc94 1px 1px 0px',
							fontSize: '20px',
							fontWeight: 'bold',
						}}
						variant='body2'>
						{`you liked ${likedChars.length} characters`}
					</Typography>
				</CardContent>
			</Grid>
			<CardActions sx={{ margin: 'auto' }}>
				<Button
					sx={{
						color: 'black',
						textShadow: '#a5fc94 1px 1px 0px',
						fontSize: '20px',
						fontWeight: 'bold',
					}}
					className={classes.link}
					onClick={agreedFunc}
					size='big'>
					click here if you would like to see Your favourite characters
				</Button>
			</CardActions>
		</Grid>
	);
}
