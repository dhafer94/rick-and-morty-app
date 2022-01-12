import React, { useState } from 'react';
import clsx from 'clsx';

import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import memoize from 'memoize-one';

import { makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import TableColumns from './TableColumns';
import Profile from '../Profile';

export const useStyles = makeStyles((theme) => ({
	tableContainer: {
		display: 'flex',
		flex: 1,
	},
	table: {
		height: '100%',
		width: '100%',
	},
	list: {},
	thead: {},
	tbody: {
		width: '100%',
		background: 'red',
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		alignItems: 'center',
		boxSizing: 'border-box',
		minWidth: '100%',
		width: '100',
	},
	headerRow: {},
	cell: {
		display: 'block',
		flexGrow: 0,
		flexShrink: 0,
		textAlign: 'center',
	},
	expandingCell: {
		flex: 1,
	},
	column: {},
}));

/**
 * Row component
 */
// const Row = ;

/**
 * itemKey function for returning the key prop for an item.
 * see https://react-window.vercel.app/#/api/FixedSizeList  -> itemKey prop
 */
const itemKey = (index, data) => data.items[index].id;

/**
 * wee define this here because I wanted to pass my  columns prop from App, and classes from ReactWindowTable
 * see https://react-window.vercel.app/#/api/FixedSizeList  -> itemData prop
 */
const createItemData = memoize((classes, columns, data) => ({
	columns,
	classes,
	items: data,
}));

const ReactWindowTable = ({
	data,
	columns,
	characters,
	setCharId,
	setRoute,
}) => {
	const classes = useStyles();
	const clickHandler = (evt) => {
		// console.log(evt.target.id);
		if (evt.target.id) {
			console.log(evt.target.id);
			setCharId(Number(evt.target.id));
			setRoute('profile');
		} else if (evt.target.id) {
			// console.log(evt.target.id);
			setCharId(Number(evt.target.id));
			setRoute('profile');
		}
	};
	// console.log(route);
	// memoized data passed to the Row item renderer
	const itemData = createItemData(classes, columns, data);

	// return route === 'home' ? (
	return (
		<div className={classes.tableContainer}>
			<Table className={classes.table} component='div'>
				<TableHead component='div' className={classes.thead}>
					<TableColumns classes={classes} columns={columns} />
				</TableHead>
				<TableBody component='div' className={classes.tbody}>
					<AutoSizer>
						{({ height, width }) => (
							<List
								className={classes.list}
								height={height}
								width={width}
								itemCount={data.length}
								itemSize={48}
								itemKey={itemKey}
								itemData={itemData}>
								{({ index, style, data: { columns, items, classes } }) => {
									const item = items[index];

									return (
										<TableRow
											onClick={clickHandler}
											component='div'
											className={classes.row}
											style={style}>
											{columns.map((column, colIndex) => {
												return (
													<TableCell
														id={item.id}
														key={item.id + colIndex}
														component='div'
														variant='body'
														align={column.numeric || false ? 'right' : 'left'}
														className={clsx(
															classes.cell,
															!column.width && classes.expandingCell,
														)}
														style={{
															flexBasis: column.width || false,
															height: 48,
														}}>
														{item[column.dataKey]}
													</TableCell>
												);
											})}
										</TableRow>
									);
								}}
							</List>
						)}
					</AutoSizer>
				</TableBody>
			</Table>
		</div>
	);
	// ) : (
	// 	<div>
	// 		<ul>
	// 			<li>
	// 				<a href='Home'>Home</a>{' '}
	// 			</li>
	// 		</ul>
	// 		<Profile id={charId} characters={characters} />
	// 	</div>
	// );
};

export default ReactWindowTable;
