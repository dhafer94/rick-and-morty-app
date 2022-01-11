import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { List } from 'react-virtualized';
import Profile from '../components/Profile';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import ReactWindowTable from '../components/ReactWindowTable/ReactWindowTable';
import { makeStyles } from '@material-ui/styles';
// import { positions } from '@mui/system';
import './VirtualizedAutocomplete.css';

const useStyles = makeStyles((theme) => ({
	mainContainer: {
		display: 'block',
		flexDirection: 'row',
		textAlign: 'center',
		margin: 0,
		padding: 0,
	},
	container: {
		// flexGrow: 1,
		height: 600,
		background: '#99D8D0',
	},
	title: {
		fontSize: '60px',
		textAlign: 'center',
	},
	paper: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		background: '#B7EFCD',
	},
	toolbar: {
		paddingLeft: theme.spacing(8),
		paddingRight: theme.spacing(4),
	},
	spacer: {
		flex: '1 1 100%',
	},
}));

const ListboxComponent = React.forwardRef(function ListboxComponent(
	props,
	ref,
) {
	const { children, role, ...other } = props;
	const itemCount = Array.isArray(children) ? children.length : 0;
	const itemSize = 36;

	return (
		<div ref={ref}>
			<div {...other}>
				<List
					height={250}
					width={300}
					rowHeight={itemSize}
					overscanCount={5}
					rowCount={itemCount}
					rowRenderer={(props) => {
						return React.cloneElement(children[props.index], {
							//here we add the props that we need in our child nodes
							style: props.style,
							// they key changer to make them unique
							key: props.key,
						});
					}}
					role={role}
				/>
			</div>
		</div>
	);
});
function VirtualizedAutocomplete({ characters, defaultProps, width }) {
	const [route, setRoute] = useState('home');
	const [charId, setCharId] = useState('');
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

	const classes = useStyles();

	const handleChange = (evt, newVal) => {
		setCharId(newVal.id);
		setRoute('profile');
	};
	// console.log(characters);
	return route === 'home' ? (
		<div className={classes.mainContainer} key={charId}>
			<h1 className={classes.title}>Rick and morty Characters list</h1>
			<Autocomplete
				{...defaultProps}
				sx={{ width: 300 }}
				autoHighlight
				selectOnFocus
				isOptionEqualToValue={(option, value) => option.name === value.name}
				onChange={handleChange} //main handler
				ListboxComponent={ListboxComponent}
				renderInput={(params) => (
					// console.log(params)
					<TextField
						{...params}
						variant='standard'
						label='Choose a character'
						key={charId}
						sx={{
							width: 300,
							display: 'flex',
						}}
					/>
				)}
			/>
			<Container maxWidth='lg' className={classes.container}>
				<Paper className={classes.paper}>
					<Toolbar className={classes.toolbar}>
						<div className={classes.spacer} />
					</Toolbar>
					<ReactWindowTable data={characters} columns={columns} />
				</Paper>
			</Container>
		</div>
	) : (
		<div>
			<ul>
				<li>
					<a href='Home'>Home</a>{' '}
				</li>
			</ul>
			<Profile id={charId} characters={characters} />
		</div>
	);
}
export default VirtualizedAutocomplete;
