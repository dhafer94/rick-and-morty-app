import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { List } from 'react-virtualized';
import { makeStyles } from '@material-ui/styles';
import './VirtualizedAutocomplete.css';
//styles
const useStyles = makeStyles((theme) => ({
	maincontainer: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		borderRadius: 20,
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
					width={400}
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
	handlechange,
	handleInputChange,
}) {
	const classes = useStyles();

	return (
		<Autocomplete
			{...defaultProps}
			sx={{ width }}
			autoHighlight
			selectOnFocus
			// setroute={defaultProps}
			isOptionEqualToValue={(option, value) => option.name === value.name}
			//searchfield selection handler
			onChange={handlechange}
			//filtering through the list to show the characters based on autocomplete
			onInputChange={handleInputChange}
			ListboxComponent={ListboxComponent}
			renderInput={(params) => (
				<TextField
					{...params}
					variant='standard'
					className={classes.autocomplete}
					label='Choose a character'
					//for styling
					sx={{
						width: 400,
						display: 'flex',
						marginLeft: '5%',
						position: 'absolute',
						top: '6rem',
					}}
				/>
			)}
		/>
	);
}
export default VirtualizedAutocomplete;
