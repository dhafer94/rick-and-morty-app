import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { List } from 'react-virtualized';
import { makeStyles } from '@material-ui/styles';
import './VirtualizedAutocomplete.css';

//styles
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

//Adapter for virtualization
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

function VirtualizedAutocomplete({
	defaultProps,
	width,
	setRoute,
	setCharId,
	onInputchange,
}) {
	const classes = useStyles();

	const handlechange = (evt, newVal) => {
		setCharId(newVal.id);
		setRoute('profile');
	};

	return (
		<div className={classes.maincontainer}>
			<h1 className={classes.title}>Rick and morty Characters list</h1>
			<div className={classes.listing}>
				<Autocomplete
					{...defaultProps}
					sx={{ width }}
					autoHighlight
					selectOnFocus
					autoComplete={true}
					isOptionEqualToValue={(option, value) => option.name === value.name}
					//searchfield selection handler
					onChange={handlechange}
					//filtering through the list to show the characters based on autocomplete
					onInputChange={(evt) => onInputchange(evt)}
					ListboxComponent={ListboxComponent}
					renderInput={(params) => (
						<TextField
							{...params}
							variant='standard'
							label='Choose a character'
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
}
export default VirtualizedAutocomplete;
