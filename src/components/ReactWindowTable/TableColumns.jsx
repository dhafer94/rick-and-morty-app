import React from 'react';
import clsx from 'clsx';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

/**
 * Renders the headers row based on the columns provided.
 */
const TableColumns = ({ classes, columns }) => (
	<TableRow component='div' className={clsx(classes.row, classes.headerRow)}>
		{columns.map((column, colIndex) => {
			return (
				<TableCell
					key={colIndex}
					component='div'
					variant='head'
					align={column.numeric || false ? 'right' : 'left'}
					className={clsx(
						classes.cell,
						classes.column,
						!column.width && classes.expandingCell,
					)}
					style={{
						flexBasis: column.width || false,
						height: 48,
					}}
					scope='col'>
					{column.label}
				</TableCell>
			);
		})}
	</TableRow>
);

export default TableColumns;
