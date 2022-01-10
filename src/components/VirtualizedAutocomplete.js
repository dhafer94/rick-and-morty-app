import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { List } from 'react-virtualized';
import Profile from './Profile';

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
					width={800}
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
	const handleChange = (evt, newVal) => {
		setCharId(newVal.id);
		setRoute('profile');
	};
	return (
		<div className='tc'>
			{route === 'home' ? (
				<div key={charId}>
					<h1 className='f1'>Rick and morty Characters list</h1>
					<Autocomplete
						{...defaultProps}
						style={{ width }}
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
								fullWidth
								key={charId}
							/>
						)}
					/>
				</div>
			) : (
				<Profile id={charId} characters={characters} />
			)}
		</div>
	);
}
export default VirtualizedAutocomplete;
