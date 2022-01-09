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
					// key={props.key}
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
}) {
	// console.log(
	// 	characters.map((i) => {
	// 		return i.name;
	// 	}),
	// );
	const [route, setRoute] = useState('home');
	const [cName, SetCName] = useState([]);
	const handleChange = (evt) => {
		if (evt.type === 'click') {
			if (evt.target.textContent) {
				SetCName(evt.target.textContent);
				setRoute('profile');
				console.log(evt);
			}
		} else if (evt.type === 'keydown' && evt.keyCode === 13) {
			console.log(evt);
			evt.target.addEventListener('keyup', (evt) => {
				if (evt.type === 'keyup' && evt.keyCode === 13) {
					SetCName(evt.target.value);
					setRoute('profile');
					// console.log(evt.target.value);
					console.log(evt);
				}
			});
		}
	};
	console.log(cName);

	// const [profile, setProfile] = useState([]);
	// console.log(myKey[0]);
	// const names = name.map((option, i) => {
	// 	return option;
	// });
	// console.log(id);

	// let options = id.map((i) => {
	// 	return i;
	// });

	// console.log(myKey);
	return (
		<div>
			{route === 'home' ? (
				<Autocomplete
					{...defaultProps}
					id={`character`}
					// id={id}
					// key={key}
					style={{ width }}
					autoHighlight
					selectOnFocus
					isOptionEqualToValue={(option, value) => option.name === value.name}
					// onKeyUp={handleChange}
					// onClick={handleChange}
					onChange={handleChange}
					// onInputChange={handleChange}
					ListboxComponent={ListboxComponent}
					// options={options}
					// value={options}
					// renderOption={ }
					// componentsProps={(options.map((option)=>))}
					renderInput={(params) => (
						// console.log(params)
						<TextField
							{...params}
							// inputProps={{
							// 	...params.inputProps,
							// }}
							// id={id}
							// key={key}
							variant='standard'
							label='Choose a character'
							fullWidth
							// InputLabelProps={{
							// 	value: params.charName,
							// 	id: params.inputProps.id,
							// }}
							// myprop={id.map((i) => {
							// 	return console.log(i)&& i;
							// })}
							// value.hiddenLabel
						/>
					)}
				/>
			) : (
				<Profile cName={cName} characters={characters} />
			)}
		</div>
	);
}
export default VirtualizedAutocomplete;
