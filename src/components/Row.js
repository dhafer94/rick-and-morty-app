import React from 'react';

const Row = ({ name, status, img, id }) => {
	return (
		<div>
			{/* <img src={`${img}`} alt={`${name} character`} /> */}
			<div>
				<h2>{name}</h2>
				<p>{status}</p>
			</div>
		</div>
	);
};

export default Row;
