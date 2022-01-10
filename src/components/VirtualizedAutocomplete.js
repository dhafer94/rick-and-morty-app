import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { List } from 'react-virtualized';
// import { FixedSizeList as List } from 'react-window';
import Profile from './Profile';

const ListboxComponent = React.forwardRef(function ListboxComponent(
	props,
	ref,
) {
	const { keys, children, role, ...other } = props;
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
					key={Array(826).keys()}
					rowRenderer={(props) => {
						return React.cloneElement(children[props.index], {
							style: props.style,
						});
					}}
					role={role}
				/>
			</div>
		</div>
	);
});

// const handleKeyUp = (evt) => {
// 	// console.log(evt.keyCode);
// 	characters.map((character) => {
// 		if ((character.name = evt.input)) {
// 			evt.target.addEventListener('keyup', () => {});
// 		}
// 	});
// 	if (evt.keyCode === 13) {
// 		console.log(evt.target.value);
// 	}
// };

function VirtualizedAutocomplete({
	characters,
	defaultProps,
	width,
	id,
	charName,
	created,
	episode,
	charLocation,
	gender,
	species,
	charStatus,
	idArray,
}) {
	const [route, setRoute] = useState('home');
	const [charId, setCharId] = useState('');
	const handleChange = (evt, newVal) => {
		setCharId(newVal.id);
		setRoute('profile');
	};
	return (
		<div className='tc'>
			{route === 'home' ? (
				<div>
					<h1 className='f1'>Rick and morty Characters list</h1>
					<Autocomplete
						{...defaultProps}
						// ListboxProps={...characters}
						// id={id}
						// key={key}
						style={{ width }}
						autoHighlight
						selectOnFocus
						isOptionEqualToValue={(option, value) => option.name === value.name}
						// onKeyUp={handleChange}
						// onClick={handleChange}
						onChange={handleChange} //main handler
						// onSelect={handleSelect}
						// onChange={(event, newValue) => {
						// console.log(newValue.id);
						// 	if (newValue.id ===)
						// //this will give you the selected value dictionary (source)
						// }}
						// onInputChange={handleChange}
						ListboxComponent={ListboxComponent}
						// options={options}
						// value={options}
						// renderOption={ }
						// componentsProps={(options.map((option)=>))}
						// ListboxProps={{ key: characters.id }}
						renderInput={(params) => (
							// console.log(params)
							<TextField
								{...params}
								// inputProps={{
								// 	...params.inputProps,
								// }}
								// id={idArray}
								// key={key}
								variant='standard'
								label='Choose a character'
								fullWidth
								// onSelect={handleSelect}
								// value={val}
								// key={charId}
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
