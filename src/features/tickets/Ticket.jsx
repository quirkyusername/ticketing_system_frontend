import { TableCell, TableRow } from '@mui/material';
import React from 'react'

const Ticket = ({id,title, description}) => {
  return (
    // <article>
        
        
    //         <p>{title}</p>
        
        
    //         <p>{description}</p>
        
    // </article>

    <TableRow
        key={id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell component="th" scope="ticket">
            {id}
        </TableCell>
        <TableCell align="right">{title}</TableCell>
        <TableCell align="right">{description}</TableCell>
    </TableRow>
  );
}

export default Ticket