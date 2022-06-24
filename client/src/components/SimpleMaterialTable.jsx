import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { withStyles } from '@mui/styles';

const styles = theme => ({
  root: {
    '& a': {
      fontWeight: 'bold',
      cursor: 'pointer'
    }
  },
  disabled: {
    '& > td, & > th, & > td *, & > th *': {
      color: theme.palette.text.disabled + ' !important'
    }
  }
})

const SimpleMaterialTable = props => {
  const { classes, data, columns, disableHeader, dense } = props;
  return (
    <TableContainer component={Paper}>
      <Table>
        {!disableHeader && <TableHead>
          <TableRow>
            {columns?.map((headCell, i) => (
              <TableCell
                key={headCell.id}
                padding={dense ? 'none' : 'normal'}
                sx={{ ...(i === 0 && dense && { paddingLeft: 2 }), fontWeight: 'bold' }}
              >
                {headCell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>}
        <TableBody>
          {(data ?? []).map((row) => (
            <TableRow
              hover
              className={row.disabled && classes.disabled}
              key={row.id}
            >
              {columns.map((column, i) => 
                <TableCell
                  sx={{
                    color: 'primary',
                    ...(i === 0 && dense && { paddingLeft: 2 }),
                    ...(i === 0 && column.bold && { fontWeight: 'bold' } )
                  }}
                  padding={dense ? 'none' : 'normal'}
                >
                  {row[column.id]}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default withStyles(styles)(SimpleMaterialTable);