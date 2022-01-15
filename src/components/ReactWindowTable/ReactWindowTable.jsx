import React from 'react';
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

//styles
export const useStyles = makeStyles((theme) => ({
	tableContainer: {
		display: 'flex',
		flex: 1,
		border: '4px solid #6867AC',
		borderRadius: '5px',
		// background: '#6867AC',
	},
	table: {
		height: '100%',
		width: '100%',
	},
	list: {},
	thead: {
		background: '#6867AC',
		border: '1.5px solid #6867AC',
		borderRadius: '20px',
	},
	tbody: {
		width: '100%',
		// background: 'red',
		border: '1px solid #6867AC',
		borderRadius: '20px',
	},
	row: {
		cursor: 'pointer',
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		alignItems: 'center',
		boxSizing: 'border-box',
		minWidth: '100%',
		width: '100',
	},
	'row:hover': {
		background: '#363636',
	},
	headerRow: {
		cursor: 'default',
	},
	cell: {
		display: 'block',
		flexGrow: 0,
		flexShrink: 0,
		textAlign: 'center',
		borderBottom: '1px solid #363636',
	},
	expandingCell: {
		flex: 1,
	},
	column: {
		borderRight: 'none',
	},
}));

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

const ReactWindowTable = ({ data, columns, clickHandler }) => {
	const classes = useStyles();

	// memoized data passed to the Row item renderer
	const itemData = createItemData(classes, columns, data);

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
								{/* Row component */}

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
};

export default ReactWindowTable;
