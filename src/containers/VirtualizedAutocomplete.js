import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { List } from 'react-virtualized';
import Profile from '../components/Profile';

import { makeStyles } from '@material-ui/styles';
// import { positions } from '@mui/system';
import './VirtualizedAutocomplete.css';

const useStyles = makeStyles((theme) => ({
	listing: {
		display: 'flex',
		textAlign: 'center',
		background: 'white',
		flex: 'column-reverse',
	},
	title: {
		fontSize: '60px',
		textAlign: 'center',
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
function VirtualizedAutocomplete({ defaultProps, width, setRoute, setCharId }) {
	const classes = useStyles();

	function handlechange(evt, newVal) {
		// console.log('works');
		setCharId(newVal.id);
		setRoute('profile');
	}
	// console.log(charId);
	// return route === 'home' ? (
	return (
		<div className={classes.maincontainer}>
			<h1 className={classes.title}>Rick and morty Characters list</h1>
			<div className={classes.listing}>
				<Autocomplete
					{...defaultProps}
					sx={{ width }}
					autoHighlight
					selectOnFocus
					isOptionEqualToValue={(option, value) => option.name === value.name}
					onChange={handlechange} //main handler
					ListboxComponent={ListboxComponent}
					renderInput={(params) => (
						// console.log(params)
						<TextField
							{...params}
							variant='standard'
							label='Choose a character'
							// key={charId}
							sx={{
								width: 300,
								display: 'flex',
							}}
						/>
					)}
				/>
			</div>
		</div>
	);
	// ) : (
	// 	<div>
	// 		<ul>
	// 			<li>
	// 				<a href='Home'>Home</a>{' '}
	// 			</li>
	// 		</ul>
	// 		<Profile id={charId} characters={defaultProps.options} />
	// 	</div>
	// );
}
export default VirtualizedAutocomplete;
